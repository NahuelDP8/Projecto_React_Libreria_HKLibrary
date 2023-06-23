'use client';

import { Button, Container, Form, Card, Row, Col } from "react-bootstrap";
import './loginStyles.css';
import { useState } from "react";
import { useRouter } from "next/navigation";
import ApiAuthenticator from "../services/ApiAuthenticator";

export default function loginForm(){

    const EMPTY_FORM = {
        "email":"",
        "password":"",
    }

    const [formData, setFormData] = useState(EMPTY_FORM);

    const [errorMessages, setErrorMessages] = useState("");

    const router = useRouter();

    function updateFormData(e){
        setFormData(previousState => ({...previousState, [e.target.name]: e.target.value}));
    }


    function ErrorMessageContainer({message}){
        return (
            <div className="text-danger">
                {message}
            </div>
        );
    }

    function loginClient(){
        const authenticator = new ApiAuthenticator();
        authenticator.loginClient(formData).then( response => {
            router.push('/catalog');
        }).catch( error => {
            setErrorMessages(error.response.data.message);
        });
    }


    return (
        <Container fluid="md">
            <Card className="p-3 m-auto loginCard">
                <Card.Title className="text-center">Ingresar</Card.Title>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="formMail" className="mb-3">
                            <Form.Label>Mail</Form.Label>
                            <Form.Control type="email" placeholder="mail@example.com" name="email" onChange={ event => updateFormData(event)}/>
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" name="password" onChange={ event => updateFormData(event)}/>
                        </Form.Group>
                        <ErrorMessageContainer message={errorMessages}/>
                        <Button onClick={loginClient}>Ingresar</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}