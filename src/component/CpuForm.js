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
        this.setState({
            file: acceptedFiles
        })
    }

    handleSubmit(event) {
        // TODO - axios get request to get a file
        alert('Form was submitted with \nType=' + this.state.type + '\nBase=' + this.state.base);
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
