'use client';

import { useEffect,useState } from "react";
import HKLibraryAPI from "@/app/services/HKLibraryApi";
import { Container, Spinner } from "react-bootstrap";
import BookCardGrid, { BOOKS_NOT_FOUND } from "../components/bookCardGrid/bookCardGrid";
import SearchBarCatalog from "../components/searchBar/searchBarCatalog";

export default function Catalog(){
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [criteria,setCriteria] = useState("Titulo");
    const [searchText,setSearchText] = useState("");
    

    const updateCriteria = (changeCriteria) => {
        setCriteria(changeCriteria);
      };

    const updateSearchText = (changeSearchText) => {
        setSearchText(changeSearchText);
    };

    function placeBooksInGrid(fetchedBooks){
        if(fetchedBooks.length>0){
            setBooks(fetchedBooks);
        }else{
            setBooks(BOOKS_NOT_FOUND);
        }
    }

    const updateBooks = () => {
        if(searchText!=""){
            const api = new HKLibraryAPI();
            switch(criteria){
                case "Titulo":{
                    api.getBooksByTitle(searchText) 
                    .then(data =>{
                        placeBooksInGrid(data);
                        setLoading(false);
                    });
                    setLoading(true);
                    break
                }
                case "Autor":{
                    api.getBooksByAuthor(searchText) 
                    .then(data =>{
                        placeBooksInGrid(data);
                        setLoading(false);
                    });
                    setLoading(true);
                    break
                }
                case "Genero":{
                    api.getBooksByGenre(searchText) 
                    .then(data =>{
                        placeBooksInGrid(data);
                        setLoading(false);
                    });
                    setLoading(true);
                    break
                }
                
                default:
                    showBooks();

            }
        }
        
        
        
    };

    function showBooks(){
        setLoading(true);
        const api = new HKLibraryAPI();
        api.getBooks() 
            .then(data =>{
                setBooks(data);
                setLoading(false);
            });
    }

    useEffect(() => showBooks(),[]);
    return( 
        <Container className="text-center">
            <h1>CATALOGO</h1>
            <SearchBarCatalog updateBooks={updateBooks} searchText={updateSearchText} updateCriteria={updateCriteria} titleCriteria={criteria} />
            {(loading)?(
                <Spinner animation="border" variant="light" />
            ):(
                <BookCardGrid books={books} />
            )}
        </Container>
    )
}
