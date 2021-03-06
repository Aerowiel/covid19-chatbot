import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: props => props.visible ? "block" : "none",
    margin: `0 0 ${theme.spacing(1)}px calc(12px + 2.7em)`,
  }
}))

const OptionsStepContainer = (props) => {

  const { visible } = props;
  const classes = useStyles({visible});

  return ( <div className={classes.container}>{props.children}</div> )
}

export default OptionsStepContainer;
