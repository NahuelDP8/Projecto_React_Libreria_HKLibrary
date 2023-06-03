'use client';

import { Container, Card, Button, Row, Col, Form, FormControl } from "react-bootstrap";
import "./cartStyles.css"
import { useEffect, useState } from "react";
import LocalRepository from "../services/LocalRepository";
import CartRow from "./cartRow";
import PurchaseForm from "./buyForm";
import HKLibraryAPI from "../services/HKLibraryApi";

export default function Cart(){
    const EMPTY_CLIENT = {
        nombre:"",
        apellido:"",
        mail:"",
        direccion:""
    }
    const EMPTY_CART = [];

    const [booksCart, setBooksCart] = useState(EMPTY_CART);
    const [formShow, setFormShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [client, setClient] = useState(EMPTY_CLIENT);

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

            const api = new HKLibraryAPI();
            api.makePurchase(purchaseData)
                .then( data => {
                    if(data.message){
                        setErrorMessage(data.message);
                    }
                    if(data.data){
                        console.log(data.data);
                        const storage = new LocalRepository();
                        storage.clearCart();

                        setFormShow(false);
                        setClient(EMPTY_CLIENT);
                        setBooksCart(EMPTY_CART);
                    }

                });
            
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
                errorMessage={errorMessage}
            >

            </PurchaseForm>
        </Container>
    );
}
