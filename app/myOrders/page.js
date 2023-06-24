'use client';

import { Button, Card, Container, Row, Col } from "react-bootstrap";
import './ordersStyles.css';
import { useEffect, useState } from "react";
import LibraryClientApi from "../services/LibraryClientApi";
import { useRouter } from "next/navigation";
import OrderModal from "./orderModal";
import OrdersList from "./orderList";
import AuthCookieManager from "../services/AuthCookieManager";

export default function ClientOrders(){
    const EMPTY_MESSAGE = "";
    const NO_ORDERS_FOUND_MESSAGE = "Todavía no ha realizado ningun pedido";

    const router = useRouter();

    const [clientOrders, setClientOrders] = useState([]);

    const [noOrdersMessage, setNoOrdersMessage] = useState(EMPTY_MESSAGE);
    const [modalOrder, setModalOrder] = useState({});
    const [showModal, setShowModal] = useState(false);

    function handleShowModal(order){
        setShowModal(true);
        setModalOrder(order);
    }

    //Consulta a la api del usuario logueado.
    function showOrders(){
        const clientApi = new LibraryClientApi()
        clientApi.getClientOrders().then(response => {
            const orders = response.data.data;
            setClientOrders(orders);
            if(orders.length == 0){
                setNoOrdersMessage(NO_ORDERS_FOUND_MESSAGE);
            }
        }).catch( error => {
            console.log(error);
            if(error.response.status === 401){
                const cookieManager = new AuthCookieManager();
                cookieManager.deleteAuthCookie();

                router.push('/login');
            }
        });
    }

    useEffect(()=>showOrders(),[]);

    
    return (
        <>
            <Container>
                <h1 className="text-center">Mis Pedidos</h1>
                <OrdersList clientOrders={clientOrders} showOrderPopup={handleShowModal}></OrdersList>
                {(noOrdersMessage == NO_ORDERS_FOUND_MESSAGE)?(
                    <h3 className="text-center">{NO_ORDERS_FOUND_MESSAGE}</h3>
                ):(
                    null
                )}
            </Container>
            <OrderModal order={modalOrder} show={showModal} handleClose={() => setShowModal(false)}></OrderModal>
        </>
    );
}