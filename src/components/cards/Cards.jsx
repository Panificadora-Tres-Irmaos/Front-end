import { useEffect, useState } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import style from './Cards.module.css';

function CardExample() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const categoria = 'paes'

  useEffect(() => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://back-end-u0qf.onrender.com/produto/find_categoria?categoria=${categoria}`)
      .then((response) => {
        setLoading(false);
        setProdutos(response.data); // Supondo que a API retorna um array de produtos
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos: ", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-around">
      {loading ? (
        <p>Carregando...</p>
      ) : (
        produtos.map((produto) => (
          <Card key={produto.id} style={{ width: '12rem', border: '2px black solid', margin: "10px" }}>
            <Card.Img variant="top" src={produto.imagem || "https://via.placeholder.com/150"} height={150} />
            <Card.Body className={style.divPrinc}>
              <Card.Title>{produto.nome}</Card.Title>
              <Card.Text id='preco'>R$ {produto.preco.toFixed(2)}</Card.Text>
              <Card.Text className={style.descricao}>
                {produto.descricao}
              </Card.Text>
              <Button variant="primary" className={style.btn}>Adicionar ao carrinho</Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default CardExample;