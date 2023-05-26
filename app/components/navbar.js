'use client';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
export default function NavbarApp(){
    return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="home">HK Library</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="catalog">Libros</Nav.Link>
          <Nav.Link href="genres" >Generos</Nav.Link>
          <Nav.Link href="authors" >Autores</Nav.Link>
          <Nav.Link href="#carrito">carrito</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
   );
}