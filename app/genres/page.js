'use client';

import { Content } from "next/font/google";
import ButtonExplorer from "../components/explorer/explorer";
import { GENRES } from "../data/dummyGenres";
import { Container } from "react-bootstrap";

export default function Genres(){
    const authorsWithFullName = GENRES.map(genre => {
        return {
          id: genre.id,
          display: `${genre.nombre_genero}`
        };
    });
    
    console.log(authorsWithFullName);

    return (
        <Container className="text-center">
            <h1>Generos</h1>
            <ButtonExplorer infoButtons={authorsWithFullName}/>
        </Container>
    );
}