import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import style from "./Navbar.module.css";
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import logo from '../../assets/logo/logo_branca.png';
import carrinho_img from '../../assets/images/carrinho-de-compras.png'

function NavbarComponent() {
  const navigate = useNavigate();
  const [saldo, setSaldo] = useState('');

  useEffect(() => {
    const saldo = parseFloat(localStorage.getItem('saldo'));
    setSaldo(saldo || 0);
  }, []);

  const logout = () => {
    localStorage.removeItem('id');
    Swal.fire({
      icon: 'info',
      title: 'Desconectado!',
      text: 'Você foi desconectado!',
      confirmButtonColor: '#652A0E',
      confirmButtonText: 'OK'
    });
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
          <img src={logo} alt="Logo" />
          <p>Panificadora Três Irmãos</p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" id={style.botaoMenu} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav id={style.contLinks}>
            <Nav.Item className={style.links} id={style.saldo}>R$ {parseFloat(saldo).toFixed(2).replace('.', ',')}</Nav.Item>
            <Nav.Link className={style.links} onClick={goToProducts}>
              Produtos
            </Nav.Link>
            <Nav.Link className={style.links} onClick={goToCart}>
              <img
                src={carrinho_img}
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
