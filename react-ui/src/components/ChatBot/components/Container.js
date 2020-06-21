import React from "react";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    background: props => props.background || "whitesmoke",
    borderRadius: props => props.borderRadius || "15px 15px 0 0",
    boxShadow: props => props.boxShadow || "0 12px 24px 0 rgba(0, 0, 0, 0.15)",
    // fontFamily: "",
    overflow: "hidden",
    position: "relative",
    width: props => props.width || "100%",
    height: props => props.height || "100%",
    zIndex: props => props.zIndex || 999,

  }
}));

const ChatBotContainer = (props) => {

  const {
    background,
    borderRadius,
    boxShadow,
    fontFamily,
    width,
    height,
    zIndex,
    children,
  } = props;

  const classes = useStyles({background, height, width, boxShadow, borderRadius, zIndex});

  return (
    <div className={classes.container}>
      {children}
    </div>
  )
}

export default ChatBotContainer;
