import React from 'react';
import './CpuForm.css';
import Drop from './Drop';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

class CpuForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {type: 'mif',
                      base: 'hex'};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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

    handleSubmit(event) {
        alert('Form was submitted with \nType=' + this.state.type + '\nBase=' + this.state.base);
        event.preventDefault();
    }

    render() {

    
    return (
            <form onSubmit={this.handleSubmit}>
            <Drop />
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
            {/* TODO - axios get request function with appropriate parameters */}
            <input type="submit" value="Assemble" id="translate-tag" className="submit-btn"></input>
            </form>
    );
    }
}

export default CpuForm;
