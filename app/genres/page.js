'use client';

import { useEffect,useState } from "react";
import HKLibraryAPI from "@/app/api/HKLibraryApi";
import { Content } from "next/font/google";
import ButtonExplorer from "../components/explorer/explorer";
import { Container } from "react-bootstrap";

export default function Genres(){
    const [genres, setGenres] = useState([]);
    function showGenres(){
        const api = new HKLibraryAPI();
        api.getGenres() 
            .then(data => {
                console.log(data +" data");
                const genres = data.map(genre => {
                    return {
                      id: genre.id,
                      display: `${genre.nombre_genero}`
                    };
                });
                setGenres(genres);
            });
            
    }
    useEffect(() => showGenres(),[]);
    return (
        <Container className="text-center">
            <h1>Generos</h1>
            <ButtonExplorer infoButtons={genres}/>
        </Container>
    );
}