'use client';
import { Container } from "react-bootstrap";
import BookCardGrid from "../components/bookCardGrid/bookCardGrid";
import { BOOKS } from "../data/dummyData";
import SearchBarCatalog from "../components/searchBar/searchBarCatalog";

export default function Catalog(){

    //Manejar estado y realizar pedidos correspondientes a la API
    const libros = BOOKS;

    return <Container className="text-center">
        <h1>CATALOGO</h1>
        <SearchBarCatalog />
        <BookCardGrid books={libros} />
    </Container>
}