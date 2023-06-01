'use client';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import {SINGLEBOOK} from  '../data/dummyBook';
import "app/components/bookCard/bookCardStyles.css"
import Image from 'react-bootstrap/Image';

function AuthrosList({authors}){
  return (
      <div className='d-flex flex-wrap text-center align-items-center gap-1 mb-2'>
          {authors.map( author => (
              <div key={author.id} className='tag bg-authors badge'>{author.nombre}, {author.apellido}</div>
          ))}
      </div>
  );
}

function GenresList({genres}){
  return (
      <div className='d-flex flex-wrap text-center align-items-center gap-1 mb-2'>
          {genres.map( genre => (
              <div key={genre.id} className='tag bg-genres badge'>{genre.nombre_genero}</div>
          ))}
      </div>
  );
}

function BookShow(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      size="lg"
      fullscreen="sm-down"
      centered
    >
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
    </Modal>
  );
}

export default function Intento() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        LIBROOP
      </Button>

      <BookShow
        book={SINGLEBOOK}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}