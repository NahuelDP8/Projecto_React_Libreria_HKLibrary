'use client';

import { Container, Card, Button } from "react-bootstrap";
import { BOOKS_CART } from "../data/dummyCart";
import "./cartStyles.css"
import { Table } from "phosphor-react";

function CartRow({book}){
    return(
        <Card>
            <Card.Img variant="left" className="img" src={book.url_imagen}/>
            <Card.Body>
                <div>
                    <Card.Text>{book.titulo}</Card.Text>
                    <Card.Text>${book.precio}</Card.Text>
                </div>
                <div>
                    <Button>+</Button>
                    <Card.Text>{6}</Card.Text>
                    <Button>-</Button>
                </div>
                <div>
                    <Card.Text></Card.Text>
                </div>
            </Card.Body>
        </Card>
    );
}


export default function Cart(){
    
    const books = BOOKS_CART;

    return (
        <Container className="shopping-cart">
            <Card>
                <Card.Title>Pedido Compra</Card.Title>
                <Card.Body>
                    <Table>
                        {books.map(book => <CartRow book={book}/>)}
                        <div>
                            <div>Total</div>
                            <div>$99999.99</div>
                        </div>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
}
