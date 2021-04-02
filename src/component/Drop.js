import React from "react";
import Dropzone from "react-dropzone";
import "./Drop.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Drop({ onFileAccept, attachedFiles }) {
  const onDrop = (acceptedFiles) => {
    onFileAccept(acceptedFiles);
  };
  // Validation function, called on individual files
  const validator = (file) => {
    console.log("inside validator function with: ");
    console.log(file);
  };
  const maxSize = 1048576;

  return (
    <Dropzone
      onDrop={onDrop}
      minSize={0}
      maxSize={maxSize}
      maxFiles={2}
      validator={validator}
      multiple
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        acceptedFiles,
      }) => {
        return (
          <div className="dropbox">
            <div {...getRootProps()} className="drop-div">
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a (.s) file to upload!"}
              {isDragActive && !isDragReject && "Drop it like it's 🔥!"}
            </div>
            <ul className="list-group mt-2">{attachedFiles}</ul>
          </div>
        );
      }}
    </Dropzone>
  );
}
