import React from "react";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  header: {
    alignItems: "center",
    background: props => props.background || "#48667e",
    color: props => props.color || "white",
    display: "flex",
    fill: props => props.fill || "black",
    height: props => props.height || 56,
    padding: props => props.padding || "0 10px"
  },
}));

const ChatBotHeader = (props) => {

  const {
    background,
    color,
    fill,
    height,
    padding,
    children
  } = props;

  const classes = useStyles({background, color, fill, height, padding});

  return (
    <div className={classes.header}>
      {children}
    </div>
  )
}

export default ChatBotHeader;
