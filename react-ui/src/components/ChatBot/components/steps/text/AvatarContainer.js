import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  avatarContainer: {
    display: "inline-block",
    padding: `0 ${theme.spacing(1)}px`,
    order: props => props.isUser ? 1 : 0,
  }
}))

const AvatarContainer = (props) => {

  const {children, isUser} = props;

  const classes = useStyles({isUser});

  return <div className={classes.avatarContainer}>{children}</div>
}

export default AvatarContainer;
