'use client';

import BookCard from "../bookCard/bookCard";

export default function BookCardGrid({books}){
    return(
        <div className="d-flex flex-wrap justify-content-center gap-3">       
            {(books.length > 0) ? (
                books.map( book => <BookCard key={book.id} book={book} />)
            ) : (
                <h3>No se encontraron libros</h3>
            )}
        </div>
    );
}