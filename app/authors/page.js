'use client';

import { useEffect,useState } from "react";
import HKLibraryAPI from "@/app/services/HKLibraryApi";

import ExplorerBookGrid from "../components/explorer/ExplorerBookGrid";
import ExplorerButtonGrid from "../components/explorer/ExplorerButtonGrid";
import { BOOKS_NOT_FOUND } from "../components/bookCardGrid/bookCardGrid";
import { CustomH1 } from "../components/utils/utils";

export default function Authors(){
    const [authors, setAuthors] = useState([]);
    const [showBtnGrid, setShowBtnGrid] = useState(true);
    const [authorBooks, setAuthorBooks] = useState([]);
    const [authorName, setAuthorName] = useState("");

    function placeBooksInGrid(fetchedBooks){
        if(fetchedBooks.length>0){
            setAuthorBooks(fetchedBooks);
        }else{
            setAuthorBooks(BOOKS_NOT_FOUND);
        }
    }

    function searchBooksFromAuthor(id){
        const api = new HKLibraryAPI();
        api.getAuthor(id)
            .then( data => {
                placeBooksInGrid(data.libros);
                setAuthorName(data.nombre+" "+data.apellido);
            });
        setShowBtnGrid(false);
    }

    function backToBtnGrid(){
        setShowBtnGrid(true)
        setAuthorBooks([]);
        setAuthorName("");
    }
    
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
        <>
            {(showBtnGrid)?(
                <ExplorerButtonGrid infoForButtons={authors} searchBooks={searchBooksFromAuthor}>
                    <CustomH1>Autores</CustomH1>
                </ExplorerButtonGrid>
            ):(
                <ExplorerBookGrid books={authorBooks} onClickBackBtn={() => backToBtnGrid()}>
                    <CustomH1>Libros escritos por {authorName} </CustomH1>
                </ExplorerBookGrid>
            )}
        </>
    );
}