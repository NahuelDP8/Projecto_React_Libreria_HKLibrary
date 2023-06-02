'use client';

import { useEffect,useState } from "react";
import { Container } from "react-bootstrap";
import ButtonExplorer from "../components/explorer/explorer";
import HKLibraryAPI from "@/app/services/HKLibraryApi";

export default function Authors(){
    const [authors, setAuthors] = useState([]);
    function showAuthors(){
        const api = new HKLibraryAPI();
        api.getAuthors() 
            .then(data => {
                const authorsWithFullName = data.map(author => {
                    return {
                        id: author.id,
                        display: `${author.nombre} ${author.apellido}`
                    };
                });
                setAuthors(authorsWithFullName);
            });
            
    }
    useEffect(() => showAuthors(),[]);
    return (
        <Container className="text-center">
            <h1>Autores</h1>
            <ButtonExplorer infoButtons={authors}/>
        </Container>
    );
}