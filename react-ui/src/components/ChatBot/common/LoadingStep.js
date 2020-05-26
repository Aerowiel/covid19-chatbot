import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  "@keyframes loading":{
    "0%": { opacity: .2 },
    "20%": { opacity: 1 },
    "100%": { opacity: .2 },
  },
  loadingStep: {
    animation: "$loading 1.4s infinite both",
    animationDelay: props => props.delay,
  }
}))

const LoadingStep = (props) => {

  const {delay, children} = props;

  const classes = useStyles({delay})

  return <span className={classes.loadingStep}>{children}</span>
}

export default LoadingStep;
