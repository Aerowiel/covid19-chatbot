import React from "react";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  "@keyframes scale":{
    "100%": {
      transform: "scale(1)"
    }
  },
  bubble: {
    animation: `$scale 0.5s ease forwards`,
    background: props => {
      const {isUser} = props;
      return isUser ? "#b0e7c9" : "#6ca9ba"
    },
    margin: props => {
      const {isFirst, isUser} = props;
      return  `0 0 ${theme.spacing(1)}px ${!isFirst && !isUser ? "calc(16px + 2.7em)" : 0}`
    },
    borderRadius: props => {
      const {isFirst, isUser} = props
      return isFirst ? ( isUser ? "1em 1em 0 1em" : "1em 1em 1em 0" ) : (isUser ? "0em 1em 1em 1em" : "0 1em 1em 1em")
    },
    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.15)",
    color: "white",
    display: "inline-block",
    fontSize: "1em",
    maxWidth: "50%",
    overflow: "hidden",
    position: "relative",
    padding: "0.6em",
    transform: "scale(0)",
    transformOrigin: props => {

      const {isFirst, isUser} = props;
      if(isFirst) return isUser ? 'bottom right' : 'bottom left';
      return isUser ? "top right" : "top left";
    }
  }
}))

const TextBubble = (props) => {

  const {isFirst, showAvatar, isUser, children} = props;

  const classes = useStyles({isFirst, isUser});

  return (
    <div className={classes.bubble}>
      {children}
    </div>
  )
}

export default TextBubble;
