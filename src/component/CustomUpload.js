import React from "react";

export default function CustomUpload({ label, validator, accepted, id }) {
  return (
    <>
      <input type="file" accept={accepted} id={id}>
        {label}
      </input>
      <label></label>
    </>
  );
}
