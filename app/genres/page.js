'use client';

import { useEffect,useState } from "react";
import HKLibraryAPI from "@/app/services/HKLibraryApi";

import ExplorerBookGrid from "../components/explorer/ExplorerBookGrid";
import ExplorerButtonGrid from "../components/explorer/ExplorerButtonGrid";

export default function Genres(){
    const [genres, setGenres] = useState([]);
    const [showBtnGrid, setShowBtnGrid] = useState(true);
    const [genreBooks, setGenreBooks] = useState([]);
    const [genreName, setGenreName] = useState("");

    function searchBooksFromGenre(id){
        const api = new HKLibraryAPI();
        api.getGenre(id)
            .then( data => {
                setGenreBooks(data.libros);
                setGenreName(data.nombre_genero);
            });
            setShowBtnGrid(false)
    }

    function backToBtnGrid(){
        setShowBtnGrid(true)
        setGenreBooks([]);
        setGenreName("");
    }

    function showGenres(){
        const api = new HKLibraryAPI();
        api.getGenres() 
            .then(data => {
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
        <>
            {(showBtnGrid)?(
                <ExplorerButtonGrid infoForButtons={genres} searchBooks={searchBooksFromGenre}>
                    <h1>Generos</h1>
                </ExplorerButtonGrid>
            ):(
                <ExplorerBookGrid books={genreBooks} onClickBackBtn={() => backToBtnGrid()}>
                    <h1>Libros del género {genreName} </h1>
                </ExplorerBookGrid>
            )}
        </>
    );
}