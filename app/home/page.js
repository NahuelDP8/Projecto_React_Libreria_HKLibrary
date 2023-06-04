'use client';

import { Container, Image, Row } from "react-bootstrap";
import './homeStyles.css';

export default function Home() {
  return (
    <Container className="homeContainer">
      <Row>
        <Image src="images/logoBookShop.png" className="logoHome"></Image>
      </Row>
      <Row>
        <Image src="images/HKLibrary.PNG" className="titleHome"></Image>
      </Row>
    </Container>
  );
}