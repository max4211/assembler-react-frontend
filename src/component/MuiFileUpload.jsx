import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default function MuiFileUpload({ accept, label, id, handleChange }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept={accept}
        className={classes.input}
        id={id}
        type="file"
        onChange={handleChange}
      />
      <label htmlFor={id}>
        <Button
          variant="contained"
          color="default"
          component="span"
          startIcon={<PublishIcon />}
        >
          {label}
        </Button>
      </label>
    </div>
  );
}
