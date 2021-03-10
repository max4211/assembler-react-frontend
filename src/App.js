import React from "react";
import Header from "./component/Header";
import Assembler from "./component/Assembler";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Assembler />
    </div>
  );
}

export default App;
