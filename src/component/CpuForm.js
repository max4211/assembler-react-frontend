import React from "react";
import "./CpuForm.css";
import MuiButton from "./MuiButton";
import MuiFileUpload from "./MuiFileUpload";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import MuiSelect from "./MuiSelect";

const validationError = 450;
const route = process.env.NODE_ENV.includes("dev")
  ? "http://localhost:8080/api/v1/assemble/"
  : "https://assembler.ece350.com/api/v1/assemble/";

export default function CpuForm() {
  const [state, setState] = React.useState({
    type: "Mem",
    base: "BIN",
    file: null,
    isa: null,
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setState({
      [name]: value,
    });
  };

  const isISAFile = (filename) => {
    const lower = filename.toLowerCase();
    return lower.includes(".xml");
  };

  const isAssemblyFile = (filename) => {
    const lower = filename.toLowerCase();
    return (
      lower.includes(".s") || lower.inclues(".txt") || lower.includes(".text")
    );
  };

  const onFileAccept = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      console.log(`file.name: ${file.name}`);
      if (isAssemblyFile(file.name)) {
        setState({
          ...state,
          file: file,
        });
      } else if (isISAFile(file.name)) {
        setState({
          ...state,
          isa: file,
        });
      }
    });
  };

  const handleSubmit = (event) => {
    const myURL = route.concat(state.type, "/", state.base);
    console.log(myURL);

    const formData = new FormData();
    formData.append("file", state.file);
    formData.append("isa", state.isa);
    axios({
      method: "POST",
      url: myURL,
      data: formData,
      responseType: "blob",
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        /* Log information for debug */
        console.log("token", response);
        console.log("headers", response.headers);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        const fileName = response.headers["pragma"];

        toast.success("Successfully assembled file!");

        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === validationError) {
          const url = window.URL.createObjectURL(
            new Blob([error.response.data])
          );
          const link = document.createElement("a");
          const fileName = error.response.headers["pragma"];

          toast.error("File failed validation, please address errors");

          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
        } else {
          toast.error(
            "Sorry, could not assemble file, please try again with properly formatted .s file"
          );
        }
      });
    event.preventDefault();
  };

  const fileTypeOptions = (
    <>
      <option value="Mem">Mem</option>
      <option value="Mif">Mif</option>
      <option value="Logism">Logism</option>
    </>
  );
  const baseOptions = (
    <>
      {/* <option value="HEX">16 (hex)</option> */}
      <option value="BIN">Binary (2)</option>
      {/* <option value="DEC">10 (decimal)</option> */}
    </>
  );
  const acceptMIPS = ".s, .txt, .text";
  const acceptISA = ".xml";
  const idMIPS = "mips-upload";
  const idISA = "isa-upload";
  const getFile = (id) => {
    const element = document.getElementById(id);
    if (element && element.files) {
      return element.files[0];
    }
    return null;
  };
  const checkMIPSFile = () => {
    console.log("Checking MIPS File");
    const file = getFile(idMIPS);
    console.log(file);
    setState({
      ...state,
      file: file,
    });
  };
  const checkISAFile = () => {
    console.log("Checking ISA File");
    const file = getFile(idISA);
    console.log(file);
    setState({
      ...state,
      isa: file,
    });
  };

  return (
    <>
      <ToastContainer />
      <Form>
        <MuiFileUpload
          accept={acceptMIPS}
          label="MIPS Code"
          id={idMIPS}
          handleChange={checkMIPSFile}
          file={state.file}
        />
        <MuiFileUpload
          accept={acceptISA}
          label="ISA Config"
          id={idISA}
          handleChange={checkISAFile}
          file={state.isa}
        />
        <div className="select-options">
          <MuiSelect
            options={fileTypeOptions}
            value={state.type}
            setValue={(value) => setState({ ...state, type: value })}
            label="File Type"
          />
          <MuiSelect
            options={baseOptions}
            value={state.base}
            setValue={(value) => setState({ ...state, base: value })}
            label="Base"
          />
        </div>
        <MuiButton onClick={handleSubmit} />
      </Form>
    </>
  );
}
