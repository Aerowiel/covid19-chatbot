import React from "react";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(1)
  }
}))

const ChatBotHeaderIcon = (props) => {

  const {children} = props;

  const classes = useStyles()

  return (
    <a className={classes.icon}>
      {children}
    </a>
  )
}

export default ChatBotHeaderIcon;
