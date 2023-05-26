'use client';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './bookCardStyles.css';

export default function BookCard(){
    return (
        <Card className='bookCardWidth bg-light'>
            <Card.Img variant="top" src="https://i.ytimg.com/vi/R_LlSOm40is/maxresdefault.jpg" />
            <Card.Body>
                <Card.Title>Book Title</Card.Title>
                
                <div className='d-flex justify-content-between'>
                    <ul>
                        <li>Autor</li>
                        <li>Autor</li>
                        <li>Autor</li>
                    </ul>

                    <ul>
                        <li>Genero</li>
                        <li>Genero</li>
                        <li>Genero</li>
                    </ul>
                </div>

                <div className='d-flex justify-content-between align-items-center'>
                    <div>$9999.99</div>
                    <Button variant="primary">Add to Cart</Button>
                </div>
            </Card.Body>
        </Card>
    );
}