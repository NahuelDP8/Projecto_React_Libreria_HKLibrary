'use client';

import { Button, Container, Form, Card, Row, Col } from "react-bootstrap";
import './loginStyles.css';

export default function loginForm(){
    return (
        <Container fluid="md">
            <Card className="p-3 m-auto loginCard">
                <Card.Title className="text-center">Ingresar</Card.Title>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="formMail" className="mb-3">
                            <Form.Label>Mail</Form.Label>
                            <Form.Control type="email" placeholder="mail@example.com"/>
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password"/>
                        </Form.Group>
                        <Button>Ingresar</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}