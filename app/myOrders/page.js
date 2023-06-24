'use client';

import { Button, Card, Container, Row, Col } from "react-bootstrap";
import './ordersStyles.css';
import { useEffect, useState } from "react";
import LibraryClientApi from "../services/LibraryClientApi";
import { useRouter } from "next/navigation";
import OrderModal from "./orderModal";
import OrdersList from "./orderList";

export default function ClientOrders(){
    const router = useRouter();

    const [clientOrders, setClientOrders] = useState([]);

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
            setClientOrders(response.data.data);

        }).catch( error => {
            console.log(error);
            if(error.response.status === 401){
                router.push('/login')
                
            }
        });
    }

    useEffect(()=>showOrders(),[]);

    return (
        <>
            <Container>
                <h1 className="text-center">Mis Pedidos</h1>
                <OrdersList clientOrders={clientOrders} showOrderPopup={handleShowModal}></OrdersList>
            </Container>
            <OrderModal order={modalOrder} show={showModal} handleClose={() => setShowModal(false)}></OrderModal>
        </>
    );
}