'use client';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './searchBarStyles.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function CriteriaDropdown(){

    const [criteria,setCriteria] = useState("Titulo");

    function handleItemClick(criteriaSelected){
        setCriteria(criteriaSelected);
    }

    return(
        <div className='bg-secondary rounded-right'>
            <div className='text-white'>Buscar por</div>
            <DropdownButton title={criteria} variant="secondary">
                <Dropdown.Item onClick={() => handleItemClick("Titulo")}>Titulo</Dropdown.Item>
                <Dropdown.Item onClick={() => handleItemClick("Autor")}>Autor</Dropdown.Item>
                <Dropdown.Item onClick={() => handleItemClick("Genero")}>Genero</Dropdown.Item>
            </DropdownButton>
        </div>
    );
}

export default function SearchBarCatalog(){

    function handleClick(){
        console.log("Se apreto Boton");
    }


    return(
        <Form className="d-flex mb-3 searchBar m-auto">
            <CriteriaDropdown/>
            <Form.Control
                type="search"
                placeholder="Buscar..."
                className="m-0 rounded-0"
                aria-label="Search"
            />
            <Button variant="secondary" className='searchButton' onClick={handleClick}>Buscar</Button>
        </Form>
    );
}