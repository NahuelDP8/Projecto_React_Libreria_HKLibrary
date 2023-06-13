'use client';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./bookCardStyles.css"
import Image from 'react-bootstrap/Image';
import { AuthrosList, GenresList } from './lists';
import LocalRepository from '@/app/services/LocalRepository';
import { Container, Row } from 'react-bootstrap';

export default function BookShow(props) {
  const BOOK_NOT_FOUND_MESSAGE = "No se ha podido recuperar la información del libro";
  const EMPTYBOOK={};

  function reduceBookInfo(book){
    return {
      "id":book.id,
      "titulo":book.titulo,
      "url_imagen":book.url_imagen,
      "precio":book.precio,
    }
  }

  function buyBook(bookBought){
    props.onHide();
    const cartBook = reduceBookInfo(bookBought);
    const storage = new LocalRepository();
    storage.addBookToCart(cartBook);
  }

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
            <div className='d-flex flex-column'>
              <div className='text-center'>
                <Image className='modalImg m-auto' src={props.book.url_imagen} />
              </div>
            
              <div className='descriptionContainer'>
                    {props.book.descripcion}
              </div>
              <div>Cantidad Paginas: {props.book.cantidad_paginas}</div>
              <div><GenresList genres={props.book.generos}/></div>
              <div><AuthrosList authors={props.book.autores}/></div>
            </div>
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-between'>
            <div className='text-start'>${props.book.precio}</div>
            <Button onClick={() => buyBook(props.book)}>Agregar al Carrito</Button>
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