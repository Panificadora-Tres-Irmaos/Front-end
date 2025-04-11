import { useEffect, useState } from "react";
import NavbarComponent from "../navbar/Navbar";
import axios from "axios";
import Button from "react-bootstrap/Button";
import style from "./Cart.module.css"
import Swal from 'sweetalert2';

function Cart() {
  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);


  const email = localStorage.getItem("id");

  useEffect(() => {
    if (!email) {
      console.warn("Nenhum email encontrado no localStorage.");
      setLoading(false);
      return;
    }

    setLoading(true);
  
    axios
      .get(`https://back-end-u0qf.onrender.com/user/list_carrinho_email?email=${email}`)
      .then((response) => {
        setCarrinho(response.data);

        const totalCalculado = response.data.reduce(
          (acc, produto) => acc + produto.valor * (produto.quantidade || 1),
          0
        );
        setTotal(totalCalculado);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos para dentro do carrinho:", error);
        setCarrinho([]);
      })
      .finally(() => {
        setLoading(false);
      });

      
  
  }, [email]);

  function finalizarPagamento(total) {

    axios
      .post(`https://back-end-u0qf.onrender.com/user/make_purchase?email=${email}&valor=${total}`)
      .then((response) => {
        if (response.status == 200) {
          Swal.fire({
            title: 'Compra realizada!',
            text: 'Sua compra foi feita com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          setCarrinho([]);
        } else if (response.status == 401) {
          Swal.fire({
            title: 'Erro!',
            text: 'Compra não autorizada.',
            icon: 'error',
            confirmButtonText: 'Tentar novamente'
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro ao processar seu pedido.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      })
  }
  
  return (
    <div>
        <NavbarComponent />
          <div id={style.carrinho}>
            <div className="carrinho">
              <div className="container">
                <div className="row">
                  <div className="coluna">
                    <div className="carrinho-table">
                      <table className="carrinho-table">
                        <thead className="carrinho-table">
                          <tr className="table-head">
                            <th className="product-name">Nome</th>
                            <th className="product-price">Preço</th>
                            <th className="product-quantity">Quantidade</th>
                            <th className="product-total">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                      {carrinho.length === 0 ? (
                        <tr>
                          <td colSpan="5">Seu carrinho está vazio.</td>
                        </tr>
                      ) : (
                        carrinho.map((produto) => (
                          <tr key={produto.id} className="table-body">
                            <td className="product-name">{produto.nome}</td>
                            <td className="product-price">R$ {produto.valor.toFixed(2).replace(".", ",")}</td>
                            <td className="product-quantity">{produto.quantidade || 1}</td>
                            <td className="product-total">R$ {(produto.valor * (produto.quantidade || 1)).toFixed(2).replace(".", ",")}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                    </div>
                  </div>
                  <div className="coluna-2">
                    <div className="total-secao">
                      <table className="total-secao">
                        <thead className="total-table-head">
                        </thead>
                        <tbody>
                          <tr className="total-data">
                          </tr>
                          <tr className="total-data">
                            <td>
                              <strong>Total: </strong>
                            </td>
                              {
                                carrinho.length === 0 ? (
                                  <td>R$ 0,00</td>
                                ) : (
                                  <td>
                                  R$ {total.toFixed(2).replace(".", ",")}
                                  </td>
                                )
                              }
                          </tr>
                        </tbody>
                      </table>
                      <Button
                        variant="primary"
                        id={style.comprarBt}
                        onClick={() => finalizarPagamento(total)}
                      >
                        Finalizar pagamento
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}

export default Cart;
