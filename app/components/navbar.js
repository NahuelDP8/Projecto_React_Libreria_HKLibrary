'use client';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {ShoppingCart} from "phosphor-react";

export default function NavbarApp(){
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container className='ps-4 p-0 m-0'>
        <Navbar.Brand href="home">
              <img
                src="images\logoBookShop.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Hk logo"
              />
        </Navbar.Brand>
        <Navbar.Brand href="home">HK Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="catalog">Libros</Nav.Link>
            <NavDropdown title="Explorar" id="collasible-nav-dropdown">
              <NavDropdown.Item href="genres">Generos</NavDropdown.Item>
              <NavDropdown.Item href="authors">
                Autores
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link  href="cart"><ShoppingCart/></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   );
}