'use client';

import { Button, Container, Form, Card, Row, Col } from "react-bootstrap";
import './registerStyles.css';
import LibraryClientApi from "../services/LibraryClientApi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCookieManager from "../services/AuthCookieManager";

export default function RegisterForm(){

    const [formData, setFormData] = useState({
        "name":"",
        "lastname":"",
        "address":"",
        "email":"",
        "password":"",
        "password_confirmation":"",
    });

    const [errorMessages, setErrorMessages] = useState({});

    const router = useRouter();

    function updateFormData(e){
        setFormData(previousState => ({...previousState, [e.target.name]: e.target.value}));
    }

    function registerClient(){
        const authenticator = new LibraryClientApi();
        authenticator.registerClient(formData).then(response => {
            const client = response.data.data.client;
            const clientName = client.nombre +" "+ client.apellido;
            const cookieManager = new AuthCookieManager();
            cookieManager.setAuthCookie(clientName);

            router.push('/catalog');
        }).catch(error => {
            setErrorMessages(error.response.data.data);
        });
    }

    function ErrorMessageContainer({message}){
        return (
            <div className="text-danger">
                {message}
            </div>
        );
    }


    return (
        <Container fluid="md">
            <Card className="p-3 m-auto registerCard">
                <Card.Title className="text-center">Registrarse</Card.Title>
                <Card.Body>
                    <Form>
                        <Row>
                            <Form.Group as={Col} xs={12} sm={6}  controlId="formName" className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" name="name" onChange={e => updateFormData(e)}/>
                                <ErrorMessageContainer message={errorMessages.name} />
                            </Form.Group>
                            <Form.Group as={Col} xs={12} sm={6} controlId="formLastname" className="mb-3">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type="text" name="lastname" onChange={e => updateFormData(e)}/>
                                <ErrorMessageContainer message={errorMessages.lastname} />
                            </Form.Group>
                        </Row>
                        <Form.Group controlId="formAddress" className="mb-3">
                            <Form.Label>Direccion</Form.Label>
                            <Form.Control type="text" name="address" onChange={e => updateFormData(e)}/>
                            <ErrorMessageContainer message={errorMessages.address} />
                        </Form.Group>
                        <Form.Group controlId="formMail" className="mb-3">
                            <Form.Label>Mail</Form.Label>
                            <Form.Control type="email" placeholder="mail@example.com" name="email" onChange={e => updateFormData(e)}/>
                            <ErrorMessageContainer message={errorMessages.email} />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" name="password" onChange={e => updateFormData(e)}/>
                            <ErrorMessageContainer message={errorMessages.password} />
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword" className="mb-3">
                            <Form.Label>Confirmar Contraseña</Form.Label>
                            <Form.Control type="password" name="password_confirmation" onChange={e => updateFormData(e)}/>
                            <ErrorMessageContainer message={errorMessages.password} />
                        </Form.Group>
                        <Button onClick={registerClient}>Crear Cuenta</Button>
                        
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}