import React from "react";
import "./CpuForm.css";
import Drop from "./Drop";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import AcceptedFile from "./AcceptedFile";

const validationError = 450;
const route = process.env.NODE_ENV.includes("dev")
  ? "http://localhost:8080/api/v1/assemble/"
  : "https://assembler.ece350.com/api/v1/assemble/";

// TODO: Upload second file
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
    // alert('Updated input element with name: ' + name + ' and value: ' + value);
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
    // console.log("accepted files in cpu form: ");
    console.log(acceptedFiles);
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

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <Drop onFileAccept={onFileAccept} />
        <div className="select-options">
          <select
            className="selectpicker m-2"
            name="type"
            value={state.type}
            onChange={handleInputChange}
          >
            <option value="Mem">Mem</option>
            <option value="Mif">Mif</option>
            <option value="Logism">Logism</option>
            {/* <option value="Txt">Text</option> */}
          </select>
          <select
            className="selectpicker"
            name="base"
            value={state.base}
            onChange={handleInputChange}
          >
            {/* <option value="HEX">16 (hex)</option> */}
            <option value="BIN">2 (binary)</option>
            {/* <option value="DEC">10 (decimal)</option> */}
          </select>
        </div>
        <input
          type="submit"
          value="Assemble"
          id="translate-tag"
          className="submit-btn"
        ></input>
      </form>
    </>
  );
}
