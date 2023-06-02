'use client';

import BookCard from "../bookCard/bookCard";
import BookShow from '../bookCard/bookShow';
import { useState } from 'react';
import { EMPTYBOOK, INITIAL_BOOK } from '../../data/Models';
import HKLibraryAPI from "@/app/api/HKLibraryApi";

export default function BookCardGrid({books}){
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
                {(books.length > 0) ? (
                    books.map( book => <BookCard key={book.id} book={book} onShow={()=>showBookInfo(book.id)}/>)
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