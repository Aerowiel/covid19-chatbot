import React from "react";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    margin: 0,
    fontSize: 16,
    cursor: "default"
  }
}))

const ChatBotHeaderTitle = (props) => {

  const {children} = props;

  const classes = useStyles();

  return (
    <h2 className={classes.title}>
      {children}
    </h2>
  )
}

export default ChatBotHeaderTitle;
