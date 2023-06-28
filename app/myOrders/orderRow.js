'use client';

import { Button, Card, Row, Col } from "react-bootstrap";

export default function Order({orderData, showOrderPopup}){
    return (
        <Card className="mb-3">
            <Card.Body>
                <Row>
                    <Col xs={12} md={6} className="text-center text-md-start">
                        <Card.Title>Nro. Pedido: {orderData.id}</Card.Title>
                        <Card.Text>Fecha: {orderData.fecha}</Card.Text>
                    </Col>
                    <Col xs={12} md={6} className="text-center text-md-end">
                        <Card.Text>Precio Total: ${orderData.precio_total}</Card.Text>
                        <Button as={Col} onClick={() => showOrderPopup(orderData)}>Ver Detalles</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}