import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './Navbar.module.css'

function NavbarComponent() {
  return (
    <Navbar expand="lg" className={styles.customNavbar}>
      <Container className={styles.container}>
        <Navbar.Brand className={styles.titleNav}>
          <img src='src\assets\logo\logo_tres_contrario.png'></img>
          <p>Panificadora Três Irmãos</p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" id={styles.botaoMenu}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav id={styles.contLinks}>
            <Nav.Link href="#produtos" className={styles.links}>Produtos</Nav.Link>
            <Nav.Link href="#perfil" className={styles.links}>
              <img src="src\assets\images\carrinho-de-compras.png" alt="" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;