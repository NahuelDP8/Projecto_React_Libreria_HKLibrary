'use client';

import BookCard from "../bookCard/bookCard";
import BookShow from '../bookCard/bookShow';
import { useState } from 'react';
import HKLibraryAPI from "@/app/services/HKLibraryApi";

export const BOOKS_NOT_FOUND = "books_not_found";

export default function BookCardGrid({books}){
    const EMPTYBOOK={}
    const [showModal, setShowModal] = useState(false);
    const [bookShown, setBookShown] = useState(EMPTYBOOK);

    function showBookInfo(id){
        const api = new HKLibraryAPI();
        api.getBook(id)
            .then(data => {
                setBookShown(data);
                setShowModal(true);
            })    
        
    }

    return(
        <>
            <div className="d-flex flex-wrap justify-content-center gap-3">       
                {(books != BOOKS_NOT_FOUND) ? (
                    books.map( book => 
                        <BookCard 
                            key={book.id} 
                            book={book} 
                            onShow={()=>{
                                if(book.disponibilidad){
                                    showBookInfo(book.id)
                                }
                            }}>
                        </BookCard>
                    )
                ) : (
                    <h3>No se encontraron libros</h3>
                )}
            </div>
            <BookShow
                book={bookShown}
                show={showModal}
                onHide={() => setShowModal(false)}
            />
        </>
    );
}