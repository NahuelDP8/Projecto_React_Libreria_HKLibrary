'use client';
import { Container } from "react-bootstrap";
import BookCardGrid from "../components/bookCardGrid/bookCardGrid";
import { BOOKS } from "../data/dummyData";

export default function Catalog(){

    //Manejar estado y realizar pedidos correspondientes a la API

    return <Container className="text-center">
        <h1>CATALOGO</h1>
        <h2>Search bar</h2>
        <BookCardGrid books={BOOKS} />
    </Container>
}