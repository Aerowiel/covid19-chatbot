import React from "react";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
   content: {
     height: props => `calc(${props.height} - ${props.hideInput ? "56px" : "112px"})`,
     overflowY: "scroll",
     paddingTop: 6,
    "&::-webkit-scrollbar": {
      width: 2,
      height: 2
    },
    "&::-webkit-scrollbar-button": {
      width: 0,
      height: 0
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#666666",
      border: "0px none #ffffff",
      borderRadius: 50,
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#ffffff",
    },
    "&::-webkit-scrollbar-thumb:active": {
      background: "#000000",
    },
    "&::-webkit-scrollbar-track": {
      background: "#e1e1e1",
      border: "0px none #ffffff",
      borderRadius: 50,
    },
    "&::-webkit-scrollbar-track:hover": {
      background: "#e1e1e1",
    },
    "&::-webkit-scrollbar-track:active": {
      background: "#333333",
    },
    "&::-webkit-scrollbar-corner": {
      background: "transparent",
    },
   },
}))

const ChatBotContent = (props) => {

  const {
    id,
    height,
    hideInput,
    children
  } = props

  const classes = useStyles({height, hideInput});

  return (
    <div id={id} className={classes.content}>
      {children}
    </div>
  )
}

export default ChatBotContent;
