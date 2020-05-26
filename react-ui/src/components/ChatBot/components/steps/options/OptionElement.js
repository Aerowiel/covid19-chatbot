import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  "@keyframes scale":{
    "100%": {
      transform: "scale(1)"
    }
  },
  optionElement: {
    cursor: "pointer",
    background:  "#6ca9ba",
    border: "medium solid #1c6a80",
    borderRadius: "25%",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.15)",
    color: "white",
    display: "inline-block",
    fontSize: "1em",
    padding: `${theme.spacing(1)}px`,
    "&:hover": {
      opacity: 0.7,
    },
    "&:active": {
      outline:"none",
    },
    "&:hover:focus": {
      outline:"none",
    }
  }
}));

const OptionElement = (props) => {

  const {children, ...other} = props;

  const classes = useStyles();

  return (
    <button className={classes.optionElement} {...other}>{children}</button>
  )
}

export default OptionElement;
