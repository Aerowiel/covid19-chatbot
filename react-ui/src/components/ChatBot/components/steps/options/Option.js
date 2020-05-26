import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  "@keyframes scale":{
    "100%": {
      transform: "scale(1)"
    }
  },
  option: {
    animation: "$scale 0.3s ease forwards",
    display: "inline-block",
    margin: 2,
    transform: "scale(0)",
  }
}));

const Option = (props) => {

  const {children} = props;

  const classes = useStyles();

  return (
    <li className={classes.option}>
      {children}
    </li>
  )
}

export default Option;
