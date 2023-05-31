'use client';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {ShoppingCart} from "phosphor-react";
import Link from 'next/link';
import './navbarStyles.css'


//TODO borrar la pagina prueba
export default function NavbarApp(){
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        	<Container className='ps-4 p-0 m-0'>
              	<Navbar.Brand>
                    
                  	<Link className='link' href="home">
						<img
							src="images\logoBookShop.png"
							width="30"
							height="30"
							className="d-inline-block align-top"
							alt="Hk logo"
						/>
                  	</Link>
              	</Navbar.Brand>
              	<Navbar.Brand>
					<Link className='link' href="home">HK Library</Link>
				</Navbar.Brand>
              	<Navbar.Toggle aria-controls="responsive-navbar-nav" />
              	<Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link href="catalog" className='nav-link'>Libros</Link>
                        <NavDropdown menuVariant="dark" title="Explorar" id="collasible-nav-dropdown">
                            <NavDropdown.Item>
                                <Link href="genres" className='nav-link'>Generos</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link href="authors" className='nav-link'> Autores</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Link  href="cart" className='nav-link'><ShoppingCart/></Link>
                        <Link href="paginaPrueba" className='nav-link'>PRUEBA</Link>
                	</Nav>
              	</Navbar.Collapse>
          	</Container>
      	</Navbar>
   );
}