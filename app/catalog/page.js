'use client';

import { useEffect,useState } from "react";
import HKLibraryAPI from "@/app/services/HKLibraryApi";
import { Container } from "react-bootstrap";
import BookCardGrid from "../components/bookCardGrid/bookCardGrid";
import SearchBarCatalog from "../components/searchBar/searchBarCatalog";
import { Autour_One } from "next/font/google";

export default function Catalog(){
    const [books, setBooks] = useState([]);
    const [criteria,setCriteria] = useState("Titulo");
    const [searchText,setSearchText] = useState("");

    const updateCriteria = (changeCriteria) => {
        setCriteria(changeCriteria);
      };

    const updateSearchText = (changeSearchText) => {
        setSearchText(changeSearchText);
    };

    const updateBooks = () => {
        const api = new HKLibraryAPI();
        switch(criteria){
            case "Titulo":{
                api.getBooksByTitle(searchText) 
                .then(data =>{
                    setBooks(data);
                });
                break
            }
            case "Autor":{
                api.getBooksByAuthor(searchText) 
                .then(data =>{
                    setBooks(data);
                });
                break
            }
            case "Genero":{
                api.getBooksByGenre(searchText) 
                .then(data =>{
                    setBooks(data);
                });
                break
            }
            
            default:
                showBooks();

        }
        
        
        
    };

    function showBooks(){
        const api = new HKLibraryAPI();
        api.getBooks() 
            .then(data =>{
                setBooks(data);
            });
    }

    useEffect(() => showBooks(),[]);
    return <Container className="text-center">
        <h1>CATALOGO</h1>
        <SearchBarCatalog updateBooks={updateBooks} searchText={updateSearchText} updateCriteria={updateCriteria} titleCriteria={criteria} />
        <BookCardGrid books={books} />
    </Container>
}
