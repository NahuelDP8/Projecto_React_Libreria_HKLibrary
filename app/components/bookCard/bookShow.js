'use client';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./bookCardStyles.css"
import Image from 'react-bootstrap/Image';
import { AuthrosList, GenresList } from './lists';
import { EMPTYBOOK } from '@/app/data/dummyBook';

export default function BookShow(props) {
  const BOOK_NOT_FOUND_MESSAGE = "No se ha podido recuperar la información del libro";

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      size="lg"
      fullscreen="sm-down"
      centered
    >
      {(props.book != EMPTYBOOK) ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {props.book.titulo}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <div className='text-center'><Image className='text-center' src={props.book.url_imagen} /></div>
            
              <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                    {props.book.descripcion}
              </div>
              <div>Cantidad Paginas: {props.book.cantidad_paginas}</div>
              <GenresList genres={props.book.generos}/>
              <AuthrosList authors={props.book.autores}/>
              
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-between'>
            <div className='text-start'>${props.book.precio}</div>
            <Button onClick={props.onHide}>Comprar</Button>
          </Modal.Footer>
        </>
      ) : (
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {BOOK_NOT_FOUND_MESSAGE}
          </Modal.Title>
        </Modal.Header>
      )}
    </Modal>
  );
}