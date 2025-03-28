import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import style from "./Cards.module.css";
import NavbarComponent from "../navbar/Navbar";
import Footer from "../footer/Footer"

function CardExample() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const categorias = ["pães", "bebidas", "frios", "doces"]

  useEffect(() => {

    Promise.all(
      categorias.map((categoria) =>
        axios
          .get(
            `https://back-end-u0qf.onrender.com/produto/find_categoria?categoria=${categoria}`
          )
          .then((response) => ({
            categoria,
            produtos: response.data,
          }))
          .catch((error) => {
            console.error(`Erro ao buscar produtos para ${categoria}:`, error);
            return { categoria, produtos: [] }
          })
      )
    )
      .then((resultados) => {
        // Atualiza o estado com os produtos de cada categoria
        setProdutos(resultados);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  return (
    <>
      <NavbarComponent />
      <br />
      <br />
      <>
        {produtos.map((categoria) => (
          <div key={categoria.categoria} className={style.container}>
            <h2>{categoria.categoria.charAt(0).toUpperCase() + categoria.categoria.slice(1)}</h2>
            {categoria.produtos.length > 0 ? (
              <div className={style.cardSection}>
                {categoria.produtos.map((produto) => (
                  <Card
                    key={produto.id}
                    style={{ width: "18rem", margin: "10px", border: "none", display: "flex" }}
                  >
                    <Card.Img
                      variant="top"
                      src={produto.imagem || "https://via.placeholder.com/150"}
                      id={style.imagem}
                    />
                    <Card.Body id={style.divPrinc}>
                      <Card.Title>{produto.nome}</Card.Title>
                      <Card.Text id={style.descricao}>{produto.descricao}</Card.Text>
                      <Button variant="primary" id={style.btn}>
                        Adicionar ao carrinho
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            ) : (
              <p>Nenhum produto encontrado para {categoria.categoria}.</p>
            )}
          </div>
        ))}
      </>

      <br />
      <br />

      <Footer />
    </>
  );
}

export default CardExample;
