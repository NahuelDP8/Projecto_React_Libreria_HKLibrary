'use client';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {ShoppingCart} from "phosphor-react";
import Link from 'next/link';
import './navbarStyles.css'
import { useEffect, useState } from 'react';
import AuthCookieManager from '@/app/services/AuthCookieManager';
import LibraryClientApi from '@/app/services/LibraryClientApi';

export default function NavbarApp(){

	const [isClientAuth, setIsClientAuth] = useState(true);
	const [clientName, setClientName] = useState("");

	function checkClientAuthenticated(){
		const cookieManager = new AuthCookieManager();
		if(cookieManager.isAuthCookiesSet()){
			setIsClientAuth(true);
			setClientName(cookieManager.getCookieClientName());
		}else{
			setIsClientAuth(false);
		}
	}

	function logoutClient(){
		const cookieManager = new AuthCookieManager();
		const clientApi = new LibraryClientApi();
		
		clientApi.logoutClient().then( response => {
			console.log(response);
			cookieManager.deleteAuthCookie();
			setIsClientAuth(false);
		}).catch( error => {
			console.log(error);
		});
	}

	useEffect(() => checkClientAuthenticated(),[]);

	function MyProfileOptions({clientAuthenticated}){
		if(clientAuthenticated){
			return (
				<>
					<div className='fw-bolder'>{clientName}</div>
					<Link href="myOrders" className='nav-link'>Mis Pedidos</Link>
					<Link href="#" className='nav-link' onClick={logoutClient}>Cerrar Sesión</Link>
				</>
			);
		}else{
			return (
				<>
					<Link href="login" className='nav-link'>Ingresar</Link>
					<Link href="register" className='nav-link'> Registrarse</Link>
				</>
			);
		}
	}

    return (
        <Navbar collapseOnSelect sticky="top" expand="lg" bg="dark" variant="dark" className='mb-3 p-0'>
        	<Container fluid className='px-4 my-2 p-0 m-0'>
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
                            <Link href="genres" className='nav-link'>Generos</Link>
                            <Link href="authors" className='nav-link'> Autores</Link>
                        </NavDropdown>
                        <Link  href="cart" className='nav-link'><ShoppingCart/></Link>
						<NavDropdown menuVariant="dark" title="Mi Perfil" id="collasible-nav-dropdown" onClick={checkClientAuthenticated}>
							<MyProfileOptions clientAuthenticated={isClientAuth} />
                        </NavDropdown>
                	</Nav>
              	</Navbar.Collapse>
          	</Container>
      	</Navbar>
   );
}