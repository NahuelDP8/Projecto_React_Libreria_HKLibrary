'use client';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {ShoppingCart} from "phosphor-react";
import Link from 'next/link';

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
            <Link href="catalog">Libros</Link>
            <NavDropdown title="Explorar" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Link href="genres">
                  Generos
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link href="authors">
                  Autores
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Link  href="cart"><ShoppingCart/></Link>
            <Link href="paginaPrueba">PRUEBA</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   );
}