import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './Navbar.module.css'

function NavbarComponent() {
  return (
    <Navbar expand="lg" className={styles.customNavbar}>
      <Container className={styles.container}>
        <Navbar.Brand href="#home" className={styles.titleNav}>
          <img src='src\assets\images\logo_tres_contrario.png'></img>
          <p>Panificadora Três Irmãos</p>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" id={styles.botaoMenu}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="#produtos" className={styles.links}>Produtos</Nav.Link>
            <Nav.Link href="#perfil" className={styles.links}>Perfil</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;