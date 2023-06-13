'use client';

import {Container, Row, Col} from "react-bootstrap";
import ButtonExplorer from "./ButtonGrid";

export default function ExplorerButtonGrid({children, infoForButtons, searchBooks}){
    return(
        <Container className="text-center">
            <Row>
                {children}
            </Row>
            <Row>
                <ButtonExplorer infoButtons={infoForButtons} onShowBookGrid={searchBooks}/>
            </Row>
        </Container>
    )
}