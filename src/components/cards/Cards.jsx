import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import style from "./Cards.module.css";
import NavbarComponent from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "swiper/css";
import "swiper/css/navigation";

function CardExample() {
  const [produtos, setProdutos] = useState([]);
  const [produtosContadores, setProdutosContadores] = useState({});
  const [loading, setLoading] = useState(true);

  const categorias = ["pães", "bebidas", "frios", "doces"];


  function adicionarAoCarrinho(produtoId, produtoNome, produtoPreco, contador) {
    const email = localStorage.getItem("id"); // Pega o ID do usuário salvo
  
    if (!email) {
      alert("Você precisa estar logado para adicionar itens ao carrinho.");
      return;
    }
  
    // Garante que contador é válido
    const produtoValor = produtoPreco * quantidade;
  
    const requestBody = {
      produto_id: produtoId,
      produto_nome: produtoNome,
      produto_valor: produtoValor,
    };
  
    console.log("Enviando para API:", requestBody);
  
    axios
      .put(
        `https://back-end-u0qf.onrender.com/user/insert_produto?user_id=${email}`,
        requestBody,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log("Sucesso:", response.data);
        alert("Produto adicionado ao carrinho com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao adicionar produto ao carrinho:", error.response?.data || error);
        alert(`Erro ao adicionar produto: ${error.response?.data?.message || "Erro desconhecido"}`);
      });
  }  

  // Carregar produtos com base nas categorias
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
            return { categoria, produtos: [] };
          })
      )
    )
      .then((resultados) => {
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
            <h2>
              {categoria.categoria.charAt(0).toUpperCase() +
                categoria.categoria.slice(1)}
            </h2>
            {categoria.produtos.length > 0 ? (
              <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={7}
                slidesPerView={4}
                className={style.carousel}
              >
                {categoria.produtos.map((produto) => (
                  <SwiperSlide key={produto.id}>
                    <Card
                      style={{
                        width: "15rem",
                        marginLeft: "65px",
                        border: "none",
                        display: "flex",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={
                          produto.imagem ||
                          "https://placehold.co/600x400/000000/FFFFFF/png"
                        }
                        id={style.imagem}
                      />
                      <Card.Body id={style.divPrinc}>
                        <Card.Title>{produto.nome}</Card.Title>
                        <Card.Text id={style.descricao}>
                          {produto.descricao}
                        </Card.Text>
                        <Card.Text id={style.preco}>
                          <strong>R$ {produto.preco.toFixed(2).replace(".", ",")}</strong>
                        </Card.Text>
                        <Button
                          variant="primary"
                          id={style.btn}
                          onClick={() => {
                            setProdutosContadores((prevContadores) => {
                              const novoContador = (prevContadores[produto.id] || 0) + 1;
                              
                              adicionarAoCarrinho(produto.id, produto.nome, produto.preco, novoContador);
                              
                              return { ...prevContadores, [produto.id]: novoContador };
                            });
                          }}
                        >
                          Adicionar ao carrinho
                        </Button>
                      </Card.Body>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
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
