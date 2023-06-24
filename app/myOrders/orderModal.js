'use client';

import { Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

export default function OrderModal({order, show, handleClose}){
    console.log(order);

    return (
        <Modal show={show} onHide={handleClose} centered fullscreen="sm-down">
            <Modal.Header closeButton>
                <div>
                    <Modal.Title>Nro. Pedido: {order.id}</Modal.Title>
                    <p className='m-0'>{order.fecha}</p>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col className='fw-bold'>Libro</Col>
                    <Col className='fw-bold text-center'>Cantidad</Col>
                    <Col className='fw-bold text-end'>Precio Unitario</Col>
                </Row>
                {order.libros.map( libro =>
                    <Row>
                        <Col>{libro.titulo}</Col>
                        <Col className='text-center'>{libro.cantidad_unidades}</Col>
                        <Col className='text-end'>${libro.precio_unitario}</Col>
                    </Row>
                )}
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Col xs={12} sm="auto">Precio Total:</Col>
                <Col xs={12} sm="auto">${order.precio_total}</Col>
            </Modal.Footer>
            
        </Modal>
    );
}

