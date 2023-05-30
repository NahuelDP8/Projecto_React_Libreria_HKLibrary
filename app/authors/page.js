'use client';

import { Container } from "react-bootstrap";
import ButtonExplorer from "../components/explorer/explorer";
import { AUTHOR } from "../data/dummyAuthors";

export default function Authors(){
    const authorsWithFullName = AUTHOR.map(author => {
        return {
          id: author.id,
          display: `${author.nombre} ${author.apellido}`
        };
    });
    
    console.log(authorsWithFullName);

    return (
        <Container className="text-center">
            <h1>Autores</h1>
            <ButtonExplorer infoButtons={authorsWithFullName}/>
        </Container>
    );
}