import React from "react";
import {Navbar} from "react-bootstrap";
import Weather from "../Weather/Weather";

const App = () => {
  return (
    <main>
      <Navbar>
        UI Weather
      </Navbar>
      <Weather />
    </main>
  )
};

export default App;
