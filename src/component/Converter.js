import React from "react";
import MuiSelect from "./MuiSelect";
import TextField from "@material-ui/core/TextField";
import Form from "react-bootstrap/Form";
import MuiButton from "./MuiButton";
import Logger from "./Logger";
import LoopIcon from "@material-ui/icons/Loop";

export default function Converter() {
  const logger = new Logger();
  const [state, setState] = React.useState({
    fromBase: 2,
    fromValue: "",
    toBase: 10,
    toValue: "",
  });
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");
  const regexMap = new Map();
  regexMap.set(2, /^[01]+$/);
  regexMap.set(10, /^\\d*$/);
  regexMap.set(10, /^[0123456789ABCDEF]+$/);
  const options = (
    <>
      <option value={2}>Binary</option>
      <option value={10}>Decimal</option>
      <option value={16}>Hex</option>
    </>
  );
  const validateInput = () => {
    const regex = regexMap.get(state.fromBase);
    if (!regex.test(state.fromValue)) {
      setError(true);
      setHelperText("Please enter valid number");
      return false;
    } else {
      setError(false);
      setHelperText("");
      return true;
    }
  };
  const handleSubmit = () => {
    if (validateInput()) {
      const from = parseInt(state.fromValue, state.fromBase);
      const to = from.toString(state.toBase);
      setState({
        ...state,
        toValue: to,
      });
    }
  };
  // options, value, setValue, label
  return (
    <>
      <div className="assembler-wrapper">
        <div className="form-div" id="translate-form">
          <Form>
            <div>
              <MuiSelect
                options={options}
                value={state.fromBase}
                setValue={(value) => setState({ ...state, fromBase: value })}
                label="From"
              />
              <TextField
                label="From"
                style={{ margin: "20px", width: "60%" }}
                type="text"
                value={state.fromValue}
                onChange={(e) => {
                  if (regexMap.get(10).test(e.target.value)) {
                    setState({ ...state, fromValue: e.target.value });
                  }
                }}
                error={error}
                helperText={helperText}
              />
            </div>
            <div>
              <MuiSelect
                options={options}
                value={state.toBase}
                setValue={(value) => setState({ ...state, toBase: value })}
                label="To"
              />
              <TextField
                style={{ margin: "20px", width: "60%" }}
                value={state.toValue}
                type="text"
              />
            </div>
            <MuiButton
              onClick={handleSubmit}
              icon={<LoopIcon />}
              label="Convert"
            />
          </Form>
        </div>
      </div>
    </>
  );
}
