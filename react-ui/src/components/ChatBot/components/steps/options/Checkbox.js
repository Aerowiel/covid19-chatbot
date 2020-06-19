import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import FormControlLabel from "@material-ui/core/FormControlLabel";

import CheckboxElement from "./CheckboxElement";

const useStyles = makeStyles(theme => ({
  "@keyframes scale":{
    "0%": {
      transform: "scale(0)"
    },
    "100%": {
      transform: "scale(1)"
    }
  },
  container: {
    animation: `$scale 0.5s`,
    display: "flex",
    alignItems: "center",
  },
  label: {
    fontSize: "1em"
  }
}))

const Checkbox = (props) => {

  const {checked, name, label, onChange} = props;

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CheckboxElement name={name} checked={checked} onChange={onChange} />
      <label className={classes.label}>{label}</label>
    </div>
  )
}

export default Checkbox;
