'use client';

import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { BOOKS_CART } from "../data/dummyCart";
import "./cartStyles.css"

function CartRow({book}){
    return(
        <Card className="mb-1 p-1">
            <Container>
                <Row className="">
                    <Col xs={12} md={2} className="text-center ">
                        <Card.Img variant="middle" className="img" src={book.url_imagen}/>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card.Text>{book.titulo}</Card.Text>
                        <Card.Text>Precio Uniario: ${book.precio}</Card.Text>
                    </Col>
                    <Col xs={6} md={2} className="d-flex flex-row justify-content-center align-items-center">
                        <Button>-</Button>
                        <Card.Text className="my-auto px-2">{6}</Card.Text>
                        <Button>+</Button>
                    </Col>
                    <Col xs={6} md={2} className="d-flex flex-column justify-content-center">
                        <Card.Text className="m-0 text-end">Subtotal</Card.Text>
                        <Card.Text className="text-end">9999.99</Card.Text>
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
    
    const books = BOOKS_CART;

    return (
        <Container className="shopping-cart">
            <Card>
                <Card.Title className="text-center fs-1">Pedido</Card.Title>
                <Card.Body>
                    {books.map(book => <CartRow book={book}/>)}
                    <hr/>
                    <div className="d-flex justify-content-between bg-warning p-2 rounded">
                        <div>TOTAL</div>
                        <div>$99999.99</div>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}
