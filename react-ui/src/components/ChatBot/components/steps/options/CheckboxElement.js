import React from "react";
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({

  checkbox: {

    width: "1em",
    height: "1em",
    margin: "0.4em",

    fontSize: "1em",

    background: "white",
    border: "thin solid black",
    color: "white",

    boxSizing: "border-box",

    "&:checked": {
      background: theme.palette.primary.main,
    },

    "&:focus": {
      outline: "none",
    }
  }
}))

const CheckboxElement = (props) => {

  const {checked, name, onChange} = props;

  const classes = useStyles();

  return (
    <input className={classes.checkbox} type="checkbox" name={name} checked={checked} onChange={onChange} />
  )
}

export default CheckboxElement;
