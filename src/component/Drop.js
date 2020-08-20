import React, { useCallback } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import './Drop.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Drop extends React.Component {

    onDrop = (acceptedFiles) => {
      this.props.onFileAccept(acceptedFiles)
    }
    
    render() {

    const maxSize = 1048576;

    return (
        
          <Dropzone
            onDrop={this.onDrop}
            minSize={0}
            maxSize={maxSize}
            accept=".s"
            multiple
          >
            {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles, acceptedFiles}) => {
              return (
                <div className="dropbox">
                  <div {...getRootProps()} className="drop-div">
                    <input {...getInputProps()} />
                    {!isDragActive && 'Click here or drop a file to upload!'}
                    {isDragActive && !isDragReject && "Drop it like it's 🔥!"}
                    {isDragReject && "File type not accepted, sorry!"}
                  </div>
                  <ul className="list-group mt-2">
                    {acceptedFiles.length > 0 && acceptedFiles.map(acceptedFile => (
                      <li className="list-group-item list-group-item-success">
                        {acceptedFile.name}
                      </li>
                    ))}
                   </ul>
                </div>
              )}
            }
          </Dropzone>
       
    );
          }
  };

export default Drop;