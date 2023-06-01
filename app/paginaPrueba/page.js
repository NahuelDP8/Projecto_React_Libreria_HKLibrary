'use client';
import { useState, useEffect } from "react";
import HKLibraryAPI from "../api/HKLibraryApi";

export default function PaginaPrueba(){

    const [data, setData] = useState(null);
    useEffect(() => {
        const api = new HKLibraryAPI();
        api.getBook(2)
            .then(data => console.log(data));

        console.log(data);
    }, [])

    return <h1>HOLLLLLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa</h1>
}