'use client';

import { Container, Card, Button, Row, Col, Form, FormControl } from "react-bootstrap";
import "./cartStyles.css"
import { useEffect, useState } from "react";
import LocalRepository from "../services/LocalRepository";
import CartRow from "./cartRow";
import PurchaseForm from "./buyForm";

export default function Cart(){
    const [booksCart, setBooksCart] = useState([]);
    const [formShow, setFormShow] = useState(false);
    const [client, setClient] = useState({
        nombre:"",
        apellido:"",
        mail:"",
        direccion:""
    });

    useEffect(()=>{
        const storage = new LocalRepository();
        const cart = storage.getCart();

        setBooksCart(cart);
    },[]);

    function changeOneBook(id, changeAmount){
        const bookIndex = booksCart.findIndex( currentBook => {
            return currentBook.id == id;
        });
        if(bookIndex>=0){
            const targetBook = booksCart[bookIndex]; 
            const modifiedCart = [
                ...booksCart.slice(0, bookIndex),
                {...targetBook, cantidad:changeAmount(targetBook.cantidad)},
                ...booksCart.slice(bookIndex+1)
            ];
    
            const storage = new LocalRepository();
            storage.storeCart(modifiedCart);

            setBooksCart(modifiedCart);
        }
    }

    const increment = (amount) => {return parseInt(amount)+1};
    const decrement = (amount) => {
        let result = amount;
        if(amount > 1){
            result = result-1;
        }
        return result;
    };


    function changeAmountBook(id, newAmount){
        const bookIndex = booksCart.findIndex( currentBook => {
            return currentBook.id == id;
        });
        if(bookIndex>=0 && newAmount>0){
            const targetBook = booksCart[bookIndex]; 
            const modifiedCart = [
                ...booksCart.slice(0, bookIndex),
                {...targetBook, cantidad:newAmount},
                ...booksCart.slice(bookIndex+1)
            ];
    
            const storage = new LocalRepository();
            storage.storeCart(modifiedCart);

            setBooksCart(modifiedCart);
        }
    }

    function calculateTotal(){
        const suma = booksCart.reduce( (counter, book) => {
            return counter + book.cantidad*book.precio;
        }, 0);

        return suma.toFixed(2);
    }

    function removeBook(id){
        const bookIndex = booksCart.findIndex( currentBook => {
            return currentBook.id == id;
        });

        if(bookIndex>=0){
            const targetBook = booksCart[bookIndex]; 
            const modifiedCart = [
                ...booksCart.slice(0, bookIndex),
                ...booksCart.slice(bookIndex+1)
            ];
    
            const storage = new LocalRepository();
            storage.storeCart(modifiedCart);

            setBooksCart(modifiedCart);
        }
    }

    function confirmPurchase(){
        console.log(client);
        console.log(booksCart);

        if(booksCart.length > 0){
            const formattedCart = booksCart.map( product => {
                return {
                    id:product.id,
                    cantidad:product.cantidad
                }
            });

            const purchaseData = {
                cliente:client,
                libros:formattedCart
            }

            console.log(purchaseData);

            //Llamar a la api con los datos
            //borrar pedido del local storage
            //esconder el modal
            //resetear el cliente
        }
    }

    return (
        <Container className="shopping-cart">
            <Card>
                <Card.Title className="text-center fs-1">Pedido</Card.Title>
                <Card.Body>
                    {booksCart.map(book => 
                        <CartRow 
                            key={book.id} 
                            book={book} 
                            addOneBook={() => changeOneBook(book.id, increment)}
                            removeOneBook={() => changeOneBook(book.id, decrement)}
                            onChangeAmount={changeAmountBook}
                            onRemoveBook={() => removeBook(book.id)}
                        />)}
                    <hr/>
                    <div className="d-flex justify-content-between align-items-center bg-warning p-2 rounded">
                        <div className="me-auto">TOTAL</div>
                        <div>${calculateTotal()}</div>
                        <Button variant="success" className="ms-1" onClick={() => setFormShow(true)} disabled={booksCart.length <= 0}>Comprar</Button>
                    </div>
                </Card.Body>
            </Card>
            <PurchaseForm
                show={formShow}
                onHide={() => setFormShow(false)}
                onConfirmPurchase={() => confirmPurchase()}
                clientData={client}
                updateClientData={setClient}
            >

            </PurchaseForm>
        </Container>
    );
}
