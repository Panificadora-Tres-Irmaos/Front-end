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
  const [loading, setLoading] = useState(true);

  const categorias = ["pães", "bebidas", "frios", "doces"];

  function adicionarAoCarrinho(produtoId, produtoNome, produtoPreco) {
    const email = localStorage.getItem("id"); // Pega o ID do usuário salvo

    if (!email) {
      alert("Você precisa estar logado para adicionar itens ao carrinho.");
      return;
    }

    // Pega o valor do input de quantidade
    const inputElement = document.getElementById(`quantidade-${produtoId}`);
    const quantidade = inputElement ? parseInt(inputElement.value, 10) : 1;

    // Verifica se a quantidade é válida
    if (isNaN(quantidade) || quantidade < 1) {
      alert("Quantidade inválida!");
      return;
    }

    // Calcula o valor total do produto
    const requestBody = {
      id: produtoId,
      nome: produtoNome,
      quantidade: quantidade,
      valor: produtoPreco
    };

    console.log("Enviando para API:", requestBody);

    axios
      .put(
        `https://back-end-u0qf.onrender.com/user/insert_produto?user_email=${email}`,
        requestBody,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log("Sucesso:", response.data);
        if (quantidade > 1) {
          alert("Produtos adicionados ao carrinho com sucesso!")
        } else {
          alert("Produto adicionado ao carrinho com sucesso!")
        }
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
                        
                        <input
                          type="number"
                          min="1"
                          defaultValue="1"
                          id={`quantidade-${produto.id}`}
                          className={style.qntd}
                        />

                        <Button
                          variant="primary"
                          id={style.btn}
                          onClick={() => adicionarAoCarrinho(produto.id, produto.nome, produto.preco)}
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