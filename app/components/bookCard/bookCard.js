'use client';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './bookCardStyles.css';

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

export default function BookCard({book}){
    return (
        <Card className='bookCardWidth bg-light' >
            <Card.Img variant="top" className='bg-white' src={book.url_imagen} />
            <Card.Body className='d-flex flex-column justify-content-between'>
                <Card.Title className='text-start fs-4'>{book.titulo}</Card.Title>

                <GenresList genres={book.generos}/>
                <AuthrosList authors={book.autores}/>
                
                <div className='d-flex justify-content-between align-items-center'>
                    <div>${book.precio}</div>
                    <Button variant="primary">Inspeccionar</Button>
                </div>
            </Card.Body>
        </Card>
    );
}