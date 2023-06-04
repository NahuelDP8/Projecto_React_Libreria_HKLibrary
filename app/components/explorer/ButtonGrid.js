'use client';

import { Button, Container } from "react-bootstrap";

export default function ButtonExplorer({infoButtons, onShowBookGrid}){
    return(
        <div className="d-flex flex-wrap justify-content-between gap-3">
                {infoButtons.map( info => 
                    <Button key={info.id} onClick={() => onShowBookGrid(info.id)} variant="dark border border-light">
                        {info.display}
                    </Button>) }
        </div>
    );
}