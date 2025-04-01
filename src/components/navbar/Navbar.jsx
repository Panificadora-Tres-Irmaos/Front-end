import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import style from "./Navbar.module.css";
import { useNavigate } from 'react-router-dom'

function NavbarComponent() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('id');
    alert('Você foi desconectado!');
    navigate('/');
  };

  const goToCart = () => {
    navigate('/cart')
  }

  const goToProducts = () => {
    navigate('/produtos')
  }

  return (
    <Navbar expand="lg" id={style.customNavbar}>
      <Container id={style.container}>
        <Navbar.Brand id={style.titleNav}>
          <img src="src/assets/logo/logo_branca.png" alt="Logo" />
          <p>Panificadora Três Irmãos</p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" id={style.botaoMenu} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav id={style.contLinks}>
            <Nav.Link className={style.links} onClick={goToProducts}>
              Produtos
            </Nav.Link>
            <Nav.Link className={style.links} onClick={goToCart}>
              <img
                src="src/assets/images/carrinho-de-compras.png"
                alt="Carrinho"
              />
            </Nav.Link>
            <NavDropdown
              title="Perfil"
              id={style.profileDropdown}
              className={style.links}
            >
              <NavDropdown.Item onClick={logout}>Sair</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
