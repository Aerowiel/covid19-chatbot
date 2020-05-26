import React from "react";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  footer: {
    border: 0,
    borderRadius: "0 0 10px 10px",
    borderTop: "thin solid #eee",
    boxShadow: "none",
    boxSizing: "border-box",
    color: props => props.color || "#E53935",
    fontSize: 16,
    outline: "none",
    padding: props => props.hasButton ? "16px 52px 16px 10px" : "16px 10px",
    width: "100%",
    "-webkit-appearance": "none",

    "&:disabled": {
      background: "#fff",
    }

  }
}));

const ChatBotInput = (props) => {

  const {
    color,
    hasButton,
    ...other
  } = props;

  const classes = useStyles({color, hasButton})

  return (
    <input className={classes.footer} {...other}>

    </input>
  )
}

export default ChatBotInput;
