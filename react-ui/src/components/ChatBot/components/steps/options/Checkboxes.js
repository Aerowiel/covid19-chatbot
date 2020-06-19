import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  options: {
    margin: 0,
    padding: 0,
  }
}));

const Checkboxes = (props) => {

  const {children} = props;

  const classes = useStyles();

  return (
    <ul className={classes.options}>{children}</ul>
  )
}

export default Checkboxes;
