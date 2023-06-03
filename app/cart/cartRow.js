'use client';

import { Container, Card, Button, Row, Col, Form, FormControl } from "react-bootstrap";
import "./cartStyles.css";

export default function CartRow({book, addOneBook, removeOneBook, onChangeAmount, onRemoveBook}){
    function calculateSubtotal(){
        const sum = book.cantidad*book.precio;
        return sum.toFixed(2);
    }

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
                        <Button className="minusBtn" onClick={removeOneBook}>-</Button>
                        <Form>
                            <Form.Control 
                                type="number"
                                min="0"
                                pattern="[0-9]"
                                className="my-auto px-2 rounded rounded-0" 
                                onChange={(e) => onChangeAmount(book.id, e.target.value)} 
                                value={book.cantidad}
                            />
                        </Form>
                        <Button className="plusBtn" onClick={addOneBook}>+</Button>
                    </Col>
                    <Col xs={12} sm={6} md={2} className="d-flex flex-column justify-content-center">
                        <Card.Text className="m-0 text-center text-sm-end">Subtotal</Card.Text>
                        <Card.Text className="text-center text-sm-end">${calculateSubtotal()}</Card.Text>
                    </Col>
                    <Col xs={12} md={2} className="p-1 d-flex justify-content-center align-items-md-center">
                        <Button variant="danger" onClick={onRemoveBook}>Quitar</Button>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}
