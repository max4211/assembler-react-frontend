import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function MuiButton({ onClick }) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      className={classes.button}
      startIcon={<SettingsIcon />}
      onClick={onClick}
    >
      Assemble
    </Button>
  );
}
