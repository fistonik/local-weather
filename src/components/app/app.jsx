import React from "react";
import {Container, Navbar} from "react-bootstrap";
import Weather from "../Weather/Weather";

const App = () => {
  return (
    <Container>
      <Navbar>
        UI Weather
      </Navbar>
      <Weather />
    </Container>
  )
};

export default App;
