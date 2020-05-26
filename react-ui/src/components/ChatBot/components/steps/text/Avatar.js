import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  "@keyframes scale":{
    "100%": {
      transform: "scale(1)"
    }
  },
  avatar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: `$scale 0.5s ease forwards`,
    borderRadius: "50%",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 1px 2px 0px",
    height: "2.7em",
    width: "2.7em",

    transform: "scale(0)",
    transformOrigin: 'bottom right',
  }
}));

const Avatar = (props) => {

  const { avatar: Avatar } = props;

  const classes = useStyles();

  return (
    <div className={classes.avatar}>
      <Avatar style={{fontSize:"2em"}} />
    </div>
  )
}

export default Avatar;
