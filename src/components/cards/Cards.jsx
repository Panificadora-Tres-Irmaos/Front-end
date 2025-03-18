import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import style from "./Cards.module.css";

function CardExample() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const categoria = "paes";

  useEffect(() => {
    axios
      .get(
        `https://back-end-u0qf.onrender.com/produto/find_categoria?categoria=${categoria}`
      )
      .then((response) => {
        setProdutos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      });
  }, [categoria]);

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  return (
    <div className={style.container}>
      {produtos.length > 0 ? (
        produtos.map((produto) => (
          <Card key={produto.id} style={{ width: "18rem", margin: "10px", border: "none" }}>
            <Card.Img 
              variant="top"
              src={produto.imagem || "https://via.placeholder.com/150"}
              id={style.imagem}
            />
            <Card.Body id={style.divPrinc}>
              <Card.Title>{produto.nome}</Card.Title>
              <Card.Text id={style.descricao}>{produto.descricao}</Card.Text>
              <Button variant="primary" id={style.btn}>Adcionar ao carrinho</Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>Nenhum produto encontrado.</p>
      )}
    </div>
  );
}

export default CardExample;