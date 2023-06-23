'use client';

import { Card, Container } from "react-bootstrap";
import './ordersStyles.css';
import { useEffect, useState } from "react";
import LibraryClientApi from "../services/LibraryClientApi";
import { useRouter } from "next/navigation";

export default function ClientOrders(){
    const router = useRouter();

    const [clientOrders, setClientOrders] = useState([]);

    //Consulta a la api del usuario logueado.
    function showOrders(){
        const clientApi = new LibraryClientApi()
        clientApi.getClientOrders().then(response => {
            console.log(response);
        }).catch( error => {
            console.log(error);
            if(error.response.status === 401){
                router.push('/login')
                
            }
        });
    }

    useEffect(()=>showOrders(),[]);

    //Componentes
    function Order({orderData}){
        return (
            <Card>

            </Card>
        );
    }

    function OrdersList({clientOrders}){
        return(
            clientOrders.map( order => {
                <Order orderData={order}></Order>
            })
        );
    }

    return (
        <Container>
            <h1>Mis Pedidos</h1>
            <OrdersList clientOrders={clientOrders}></OrdersList>
        </Container>
    );
}