import React from "react"

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: "transparent",
    border: 0,
    borderBottomRightRadius: 10,
    boxShadow: "none",
    // fill: à déterminer
    outline: "none",
    padding: "14px 16px 12px 16px",
    "&:before":{
      content: "",
      position: "absolute",
      width: 23,
      height: 23,
      borderRadius: "50%",
    },
    "&:not(:disabled):hover":{
      opacity: 0.7,
    }
  }
}))

const ChatBotSubmitButton = (props) => {

  const {
    children,
    ...other
  } = props

  const classes = useStyles();

  return (
    <button className={classes.button} {...other}>
      {children}
    </button>
  )
}

export default ChatBotSubmitButton;
