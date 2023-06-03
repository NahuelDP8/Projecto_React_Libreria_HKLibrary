'use client';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

export default function PurchaseForm({show, onHide, onConfirmPurchase, clientData, updateClientData, errorMessage}) {

    function mailChange(mailValue){
        const newClientData = {...clientData, mail:mailValue};
        updateClientData(newClientData);
    }

    function nameChange(nameValue){
        const newClientData = {...clientData, nombre:nameValue};
        updateClientData(newClientData);
    }

    function lastnameChange(lastnameValue){
        const newClientData = {...clientData, apellido:lastnameValue};
        updateClientData(newClientData);
    }

    function addressChange(addressValue){
        const newClientData = {...clientData, direccion:addressValue};
        updateClientData(newClientData);
    }

    return (
        <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Confirmar Compra
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control type="email" placeholder="mail@ejemplo.com" onChange={(e) => mailChange(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control onChange={(e) => nameChange(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control onChange={(e) => lastnameChange(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control onChange={(e) => addressChange(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className='text-danger'>{errorMessage}</div>
                <Button onClick={onHide} variant="danger">Cancelar</Button>
                <Button onClick={onConfirmPurchase} variant="success">Confirmar</Button>
            </Modal.Footer>
        </Modal>
    );
}


