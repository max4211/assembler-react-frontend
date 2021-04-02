import React from "react";
import MuiButton from "./MuiButton";
import MuiFileUpload from "./MuiFileUpload";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Form from "react-bootstrap/Form";
import MuiSelect from "./MuiSelect";
import Logger from "./Logger";
import SettingsIcon from "@material-ui/icons/Settings";
import GetAppIcon from "@material-ui/icons/GetApp";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const validationError = 450;
const route = process.env.NODE_ENV.includes("dev")
  ? "http://localhost:8080/api/v1/assemble/"
  : "https://assembler.ece350.com/api/v1/assemble/";

export default function CpuForm() {
  const logger = new Logger();
  const [state, setState] = React.useState({
    type: "Mem",
    base: "BIN",
    file: null,
    isa: null,
  });
  const [loading, setLoading] = React.useState(false);

  const isType = (filename, extension) =>
    filename.toLowerCase().includes(extension);
  // TODO: Frontend xml schema validation
  const isValidXML = (file) => {
    return true;
  };
  const isValidISAFile = (file) => {
    const filename = file.name;
    return isType(filename, ".xml") && isValidXML(file);
  };
  const isValidMIPSFile = (file) => {
    const filename = file.name;
    return (
      isType(filename, ".s") ||
      isType(filename, ".txt") ||
      isType(filename, ".text")
    );
  };

  const downloadFile = (data, filename) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  };

  const handleSubmit = (event) => {
    if (state.file == null) {
      toast.error("Please select a file to assemble");
      return;
    }
    setLoading(true);
    const myURL = route.concat(state.type, "/", state.base);

    // TODO: Refactor file download
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
        setLoading(false);
        /* Log information for debug */
        const data = response.data;
        const filename = response.headers["pragma"];
        downloadFile(data, filename);
        toast.success("Successfully assembled file!");
      })
      .catch((error) => {
        setLoading(false);
        logger.log("error: ");
        logger.log(error);
        if (error.response) {
          logger.log("error response: ");
          logger.log(error.response);
        }
        if (error.response && error.response.status) {
          logger.log(`error.response.status: ${error.response.status}`);
        }

        if (
          error.response &&
          error.response.status &&
          error.response.status === validationError
        ) {
          const response = error.response;
          const data = response.data;
          const filename = response.headers["pragma"];
          downloadFile(data, filename);
          toast.error("File failed validation, please address errors");
        } else if (!error.response) {
          toast.error("Sorry our server is down please try again later.");
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
    logger.log("Checking MIPS File");
    const file = getFile(idMIPS);
    logger.log(file);
    if (file && file.name) {
      if (isValidMIPSFile(file)) {
        setState({
          ...state,
          file: file,
        });
      }
    }
  };
  const checkISAFile = () => {
    logger.log("Checking ISA File");
    const file = getFile(idISA);
    logger.log(file);
    if (file) {
      if (isValidISAFile(file)) {
        setState({
          ...state,
          isa: file,
        });
      }
    }
  };
  const classes = useStyles();

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
        <span>
          <MuiFileUpload
            accept={acceptISA}
            label="ISA Config"
            id={idISA}
            handleChange={checkISAFile}
            file={state.isa}
          />
          <Button
            variant="contained"
            color="secondary"
            download
            target="_blank"
            href="/files/templateISA.xml"
            className={classes.button}
            startIcon={<GetAppIcon />}
          >
            ISA Template
          </Button>
        </span>
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
        {loading ? (
          <CircularProgress />
        ) : (
          <MuiButton
            onClick={handleSubmit}
            icon={<SettingsIcon />}
            label="Assemble"
          />
        )}
      </Form>
    </>
  );
}
