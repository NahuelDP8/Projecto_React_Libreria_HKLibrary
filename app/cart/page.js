'use client';

import { Container, Card, Button, Row, Col, Form, FormControl } from "react-bootstrap";
import { BOOKS_CART } from "../data/dummyCart";
import "./cartStyles.css"
import { useEffect, useState } from "react";
import LocalRepository from "../services/LocalRepository";
import HKLibraryAPI from "../services/HKLibraryApi";

function CartRow({book}){
    return(
        <Card className="mb-1 p-1">
            <Container>
                <Row className="">
                    <Col xs={12} md={2} className="text-center ">
                        <Card.Img variant="middle" className="img" src={book.url_imagen}/>
                    </Col>
                    <Col xs={12} md={3} lg={4}>
                        <Card.Text className="fs-5 fw-bold">{book.titulo}</Card.Text>
                        <Card.Text>Precio Unitario: ${book.precio}</Card.Text>
                    </Col>
                    <Col xs={12} sm={6} md={3} lg={2} className="d-flex flex-row justify-content-center align-items-center">
                        <Button className="minusBtn">-</Button>
                        <Form>
                            <Form.Control className="my-auto px-2 rounded rounded-0" defaultValue={6}/>
                        </Form>
                        <Button className="plusBtn">+</Button>
                    </Col>
                    <Col xs={12} sm={6} md={2} className="d-flex flex-column justify-content-center">
                        <Card.Text className="m-0 text-center text-sm-end">Subtotal</Card.Text>
                        <Card.Text className="text-center text-sm-end">9999.99</Card.Text>
                    </Col>
                    <Col xs={12} md={2} className="p-1 d-flex justify-content-center align-items-md-center">
                        <Button variant="danger">Quitar</Button>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}


export default function Cart(){

    //const init = [];
    const init = BOOKS_CART;
    const [booksCart, setBooksCart] = useState(init);

    useEffect(()=>{
        const storage = new LocalRepository();
        const api = new HKLibraryAPI();
        const cart = storage.getCart();

        setBooksCart(cart);
    },[]);

    // function calculateTotal(){
    //     const bookPriceAmount = booksCart.map(book => {
    //         return [book.]
    //     });
        
    // }


    return (
        <Container className="shopping-cart">
            <Card>
                <Card.Title className="text-center fs-1">Pedido</Card.Title>
                <Card.Body>
                    {booksCart.map(book => <CartRow key={book.id} book={book}/>)}
                    <hr/>
                    <div className="d-flex justify-content-between align-items-center bg-warning p-2 rounded">
                        <div className="me-auto">TOTAL</div>
                        <div>${99999.99}</div>
                        <Button variant="success" className="ms-1">Comprar</Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}
