'use client';

import { Container, Card, Button } from "react-bootstrap";
import "./cartStyles.css"
import { useEffect, useState } from "react";
import LocalRepository from "../services/LocalRepository";
import CartRow from "./cartRow";
import { useRouter } from "next/navigation";
import LibraryClientApi from "../services/LibraryClientApi";
import AuthCookieManager from "../services/AuthCookieManager";
import { PaymentForm } from "../components/mercadoPago/mercadoPagoBrickCard";

export default function Cart(){
    const EMPTY_CLIENT = {
        nombre:"",
        apellido:"",
        mail:"",
        direccion:""
    }
    const EMPTY_CART = [];

    const router = useRouter();
    const [booksCart, setBooksCart] = useState(EMPTY_CART);
    const [errorMessage, setErrorMessage] = useState("");
    const [disableBuyButton, setDisableBuyButton] = useState(true);
    const [showMPModal, setShowMPModal]=useState(false);

    useEffect(()=>{
        const storage = new LocalRepository();
        const cart = storage.getCart();

        if(cart.length > 0){
            setDisableBuyButton(false);
        }
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

    function closeMPModal(){
        setShowMPModal(false);
        window.cardPaymentBrickController.unmount(); 
    }

    function resetCart(){
        const storage = new LocalRepository();
        storage.clearCart();
        setErrorMessage("");
        setBooksCart(EMPTY_CART);
    }

    function handle422Error(){
        setErrorMessage(error.response.data.message);
        setDisableBuyButton(false);
    }

    function handleAuthError(){
        const cookieManager = new AuthCookieManager();
        cookieManager.deleteAuthCookie();

        router.push('/login');
    }

    function handleOtherErrors(){
        setErrorMessage(error.response.data.message);
        setDisableBuyButton(false);
    }

    return (
        <Container className="shopping-cart">
            <Card>
                <Card.Title className="text-center fs-1 mt-3 mb-0">Pedido</Card.Title>
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
                    <div className="text-danger">{errorMessage}</div>
                    <div className="d-flex justify-content-between align-items-center bg-warning p-2 rounded">
                        <div className="me-auto">TOTAL</div>
                        <div>${calculateTotal()}</div>
                        <Button variant="success" className="ms-1" onClick={() => setShowMPModal(true)} disabled={disableBuyButton}>Comprar</Button>
                        <PaymentForm 
                            totalPrice = {calculateTotal()}
                            show={showMPModal}
                            handleClose={()=>closeMPModal()}
                            librosCompra={booksCart}
                            deleteCart={resetCart}
                        />
                    </div>
                    
                </Card.Body>
            </Card>
        </Container>
    );
}
