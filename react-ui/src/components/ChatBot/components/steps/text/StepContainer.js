import React from "react";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: props => props.isUser ? "flex-end" : "flex-start",
    alignItems: "center",

  }
}))

const TextStepContainer = (props) => {

  const {isUser, isFirst, children} = props;

  const classes = useStyles({isUser, isFirst})

  return (
    <div className={classes.container}>
      {children}
    </div>
  )
}

export default TextStepContainer;
