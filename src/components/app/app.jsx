import React from "react";
import {Col, Container, Navbar, Row} from "react-bootstrap";

import "bootstrap/scss/bootstrap.scss";


const App = () => {
  return (
    <main>
      <Navbar>
        UI Weather
      </Navbar>
      <Container>
        <Row>
          <Col className="text-center">
            <h1>Weather in $CITY</h1>
          </Col>
        </Row>
      </Container>
    </main>
  )
};

export default App;
