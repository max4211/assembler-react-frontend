import React from "react";
import "./CpuForm.css";
import Drop from "./Drop";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";

const route = process.env.NODE_ENV.includes("dev")
  ? "http://localhost:8080/api/v1/assemble/"
  : "https://assembler.ece350.com/api/v1/assemble/";
class CpuForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { type: "Mem", base: "BIN", file: null };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onFileAccept = this.onFileAccept.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    // alert('Updated input element with name: ' + name + ' and value: ' + value);
    this.setState({
      [name]: value,
    });
  }

  onFileAccept = (acceptedFiles) => {
    console.log("accepted files in cpu form: ");
    console.log(acceptedFiles);
    console.log(acceptedFiles[0]);
    this.setState({
      file: acceptedFiles[0],
    });
  };

  // const myURL = "https://assembler.ece350.com/api/v1/assemble/".concat(
  //   this.state.type,
  //   "/",
  //   this.state.base
  // );
  // const myURL = "http://assembler350-env-1.us-east-1.elasticbeanstalk.com/api/v1/assemble/".concat(this.state.type, "/", this.state.base);
  // console.log("attempting axios post request on url", myURL);
  // const myURL = "http://localhost:8080/api/v1/assemble/".concat(this.state.type, "/", this.state.base);
  // const myURL = "https://localhost/api/v1/assemble/".concat(this.state.type, "/", this.state.base);

  handleSubmit(event) {
    const myURL = route.concat(this.state.type, "/", this.state.base);
    console.log(myURL);

    const formData = new FormData();
    formData.append("file", this.state.file);
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

        console.log("parsed filename from pragma: ", fileName);
        toast.success("Successfully assembled file!");

        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        toast.error(
          "Sorry, could not assemble file, please try again with properly formatted .s file"
        );
        console.log("error", error.response);
      });
    event.preventDefault();
  }

  render() {
    return (
      <>
        <ToastContainer />
        <form onSubmit={this.handleSubmit}>
          <Drop onFileAccept={this.onFileAccept} />
          <div className="select-options">
            <select
              className="selectpicker"
              name="type"
              value={this.state.type}
              onChange={this.handleInputChange}
            >
              <option value="Mem">Mem</option>
              <option value="Mif">Mif</option>
              <option value="Logism">Logism</option>
              {/* <option value="Txt">Text</option> */}
            </select>
            <select
              className="selectpicker"
              name="base"
              value={this.state.base}
              onChange={this.handleInputChange}
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
}

export default CpuForm;
