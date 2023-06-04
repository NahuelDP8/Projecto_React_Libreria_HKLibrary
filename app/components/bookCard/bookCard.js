'use client';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './bookCardStyles.css';
import { AuthrosList, GenresList } from './lists';

export default function BookCard({book, onShow}){
    function buttonText(){
        let text = "Inspeccionar";
        if(!book.disponibilidad){
            text = "No disponible";
        }
        return text;
    }

    return (
        <Card onClick={onShow} className='bookCard' >
            <Card.Img variant="top" className='' src={book.url_imagen} />
            <Card.Body className='d-flex flex-column justify-content-between cardBody'>
                <Card.Title className='text-start text-white fs-4'>{book.titulo}</Card.Title>

                <GenresList genres={book.generos}/>
                <AuthrosList authors={book.autores}/>
                
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='text-white'>${book.precio}</div>
                    <Button 
                        href="#" 
                        variant="primary" 
                        disabled={!book.disponibilidad}
                        onClick={ e => {e.stopPropagation(), onShow()}}>
                            {buttonText()}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}