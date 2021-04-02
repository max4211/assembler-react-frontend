import React from "react";
import CpuForm from "./CpuForm";

function Assembler() {
  return (
    <div className="assembler-wrapper">
      <div className="form-div" id="translate-form">
        <CpuForm />
      </div>
    </div>
  );
}

export default Assembler;
