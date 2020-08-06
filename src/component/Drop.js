import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './Drop.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Drop = () => {
  const maxSize = 1048576;

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, []);

  const { isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles } = useDropzone({
    onDrop,
    accept: '.s, .txt',
    minSize: 0,
    maxSize,
    multiple: true
  });
  
  return (
    <div className="dropbox">
      <div {...getRootProps()} className="drop-div">
        <input {...getInputProps()} />
        {!isDragActive && 'Click here or drop a file to upload!'}
        {isDragActive && !isDragReject && "Drop it like it's hot!"}
        {isDragReject && "File type not accepted, sorry!"}
      </div>
      <ul className="list-group mt-2 file-list">
  {acceptedFiles.length > 0 && acceptedFiles.map(acceptedFile => (
    <li className="list-group-item list-group-item-success">
      {acceptedFile.name}
    </li>
  ))}
</ul>
    </div>
  );
};

export default Drop;