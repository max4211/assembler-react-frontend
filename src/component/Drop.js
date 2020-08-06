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


// function Drop () {
//   const maxSize = 1048576;

//   const onDrop = useCallback(acceptedFiles => {
//     // this.props.onFileAccept(acceptedFiles);
//     console.log('accepted files: ' + acceptedFiles);
//   }, []);

//     const { isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles } = useDropzone({
//       onDrop,
//       accept: '.s, .txt',
//       minSize: 0,
//       maxSize,
//       multiple: true
//     });
    
//     return (
//       <div className="dropbox">
//         <div {...getRootProps()} className="drop-div">
//           <input {...getInputProps()} />
//           {!isDragActive && 'Click here or drop a file to upload!'}
//           {isDragActive && !isDragReject && "Drop it like it's hot!"}
//           {isDragReject && "File type not accepted, sorry!"}
//         </div>
//         <ul className="list-group mt-2 file-list">
//     {acceptedFiles.length > 0 && acceptedFiles.map(acceptedFile => (
//       <li className="list-group-item list-group-item-success">
//         {acceptedFile.name}
//       </li>
//     ))}
//   </ul>
//       </div>
//     );
//   };

export default Drop;