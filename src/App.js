import React from "react";
import Header from "./component/Header";
import Assembler from "./component/Assembler";
import Converter from "./component/Converter";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Assembler />
      <Converter />
    </div>
  );
}

export default App;
