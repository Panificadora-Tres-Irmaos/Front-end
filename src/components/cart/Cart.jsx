import NavbarComponent from "../navbar/Navbar";

function Cart() {

  return (
    <div>
        <NavbarComponent />
        <div class="carrinho">
          <div class="container">
            <div class="row">
              <div class="coluna">
                <div class="carrinho-table">
                  <table class="carrinho-table">
                    <thead class="carrinho-table">
                      <tr class="table-head">
                        <th class="product-remove"></th>
                        <th class="product-image">Product Image</th>
                        <th class="product-name">Name</th>
                        <th class="product-price">Price</th>
                        <th class="product-quantity">Quantity</th>
                        <th class="product-total">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="table-body">
                        <td class="product-remove">
                          <a href="#">
                            <i class="far fa-window-close"></i>
                          </a>
                        </td>
                        <td class="product-image">
                          <img src="imagemTeste.jpg" alt="" />
                        </td>
                        <td class="product-name">Strawberry</td>
                        <td class="product-price">$85</td>
                        <td class="x'">
                          <input type="number" placeholder="0" />
                        </td>
                        <td class="product-total">1</td>
                      </tr>
                      <tr class="table-body">
                        <td class="product-remove">
                          <a href="#">
                            <i class="far fa-window-close"></i>
                          </a>
                        </td>
                        <td class="product-image">
                          <img src="imagemTeste.jpg" alt="" />
                        </td>
                        <td class="product-name">Berry</td>
                        <td class="product-price">$70</td>
                        <td class="product-quantity">
                          <input type="number" placeholder="0" />
                        </td>
                        <td class="product-total">1</td>
                      </tr>
                      <tr class="table-body">
                        <td class="product-remove">
                          <a href="#">
                            <i class="far fa-window-close"></i>
                          </a>
                        </td>
                        <td class="product-image">
                          <img src="imagemTeste.jpg" alt="" />
                        </td>
                        <td class="product-name">Lemon</td>
                        <td class="product-price">$35</td>
                        <td class="product-quantity">
                          <input type="number" placeholder="0" />
                        </td>
                        <td class="product-total">1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="coluna-2">
                <div class="total-secao">
                  <table class="total-secao">
                    <thead class="total-table-head">
                      <tr class="table-total-row">
                        <th>Total</th>
                        <th>Preço</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="total-data">
                        <td>
                          <strong>Subtotal: </strong>
                        </td>
                        <td>$500</td>
                      </tr>
                      <tr class="total-data">
                        <td>
                          <strong>Entrega: </strong>
                        </td>
                        <td>$45</td>
                      </tr>
                      <tr class="total-data">
                        <td>
                          <strong>Total: </strong>
                        </td>
                        <td>$545</td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="cart-buttons">
                    <a href="cart.html" class="boxed-btn">
                      Update Cart
                    </a>
                    <a href="checkout.html" class="boxed-btn black">
                      Check Out
                    </a>
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
