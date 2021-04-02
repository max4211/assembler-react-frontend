import React from "react";
import Dropzone from "react-dropzone";
import "./Drop.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Drop({ onFileAccept }) {
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
        isDragAccept,
        rejectedFiles,
        acceptedFiles,
      }) => {
        return (
          <div className="dropbox">
            <div {...getRootProps()} className="drop-div">
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a (.s) file to upload!"}
              {isDragActive && !isDragReject && "Drop it like it's 🔥!"}
              {isDragReject && "File type not accepted, sorry!"}
            </div>
            <ul className="list-group mt-2">
              {acceptedFiles.length > 0 &&
                acceptedFiles.map((acceptedFile, index) => (
                  <li
                    className="list-group-item list-group-item-success"
                    key={index}
                  >
                    {acceptedFile.name}
                  </li>
                ))}
            </ul>
          </div>
        );
      }}
    </Dropzone>
  );
}
