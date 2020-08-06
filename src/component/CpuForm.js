import React from 'react';
import './CpuForm.css';
import Drop from './Drop';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

class CpuForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {type: 'mif',
                      base: 'hex',
                      file: null};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onFileAccept = this.onFileAccept.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        alert('Updated input element with name: ' + name + ' and value: ' + value);
        this.setState({
            [name]: value,
        });
    }

    onFileAccept = (acceptedFiles) => {
        console.log('accepted files in cpu form: ');
        console.log(acceptedFiles);
        console.log(acceptedFiles[0]);
        this.setState({
            file: acceptedFiles[0]
        })
    }

    handleSubmit(event) {
        console.log("attempting axios post request");
        const myURL = "http://localhost:8080/api/v1/assemble/".concat(this.state.type, "/", this.state.base);
        const formData = new FormData();
        formData.append("file", this.state.file);
        axios({
            method: 'POST',
            url: myURL,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data' }
            }).then((response) => {
                console.log('token', response);
            })
            .catch((error) => console.log('error', error.response));
        event.preventDefault();
    }

    render() {
    
    return (
            <form onSubmit={this.handleSubmit}>
            <Drop onFileAccept={this.onFileAccept}/>
            <div className="select-options">
                <select className="selectpicker" name="type" value={this.state.type} onChange={this.handleInputChange}>
                    <option value="mif">Mif</option>
                    <option value="logism">Logism</option>
                    <option value="txt">Text</option>
                </select>
                <select className="selectpicker" name="base" value={this.state.base} onChange={this.handleInputChange}>
                    <option value="hex">16 (hex)</option>
                    <option value="bin">2 (binary)</option>
                    <option value="dec">10 (decimal)</option>
                </select>
            </div>
            <input type="submit" value="Assemble" id="translate-tag" className="submit-btn"></input>
            </form>
    );
    }
}

export default CpuForm;
