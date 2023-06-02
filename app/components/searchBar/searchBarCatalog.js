'use client';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './searchBarStyles.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function CriteriaDropdown({ updateCriteria,titleCriteria }){
    return(
        <div className='criteriaSelector border border-light p-1'>
            <div className='text-white text-nowrap'>Buscar por</div>
            <DropdownButton title={titleCriteria} variant="dark text-white border-0">
                <Dropdown.Item onClick={() => updateCriteria("Titulo")}>Titulo</Dropdown.Item>
                <Dropdown.Item onClick={() => updateCriteria("Autor")}>Autor</Dropdown.Item>
                <Dropdown.Item onClick={() => updateCriteria("Genero")}>Genero</Dropdown.Item>
            </DropdownButton>
        </div>
    );
}

export default function SearchBarCatalog({updateBooks,updateCriteria,titleCriteria, searchText}){

    function handleClickSearch(){
        updateBooks();
    }


    return(
        <Form className="d-flex mb-3 m-auto">
            <CriteriaDropdown updateCriteria={updateCriteria} titleCriteria={titleCriteria} />
            <Form.Control
                type="search"
                placeholder="Buscar..."
                className="m-0 rounded-0"
                aria-label="Search"
                onChange={(e)=> searchText(e.target.value)}
            />
            <Button variant="dark border border-light" className='searchButton' onClick={handleClickSearch}>Buscar</Button>
        </Form>
    );
}