'use client';

export function AuthrosList({authors}){
    return (
        <div className='d-flex flex-wrap text-center align-items-center gap-1 mb-2'>
            {authors.map( author => (
                <div key={author.id} className='tag bg-authors badge'>{author.nombre}, {author.apellido}</div>
            ))}
        </div>
    );
}

export function GenresList({genres}){
    return (
        <div className='d-flex flex-wrap text-center align-items-center gap-1 mb-2'>
            {genres.map( genre => (
                <div key={genre.id} className='tag bg-genres badge'>{genre.nombre_genero}</div>
            ))}
        </div>
    );
}