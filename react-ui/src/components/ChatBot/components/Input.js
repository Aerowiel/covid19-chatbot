import React from "react";

import {makeStyles} from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  input: {
    border: 0,
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
    autoComplete,
    value,
    options,
    onChange,
    inputLabel,
    onSubmit,
    ...other
  } = props;

  const classes = useStyles({color, hasButton})

  // React.useEffect(() => {
  //   const input = document.getElementById("input");
  //
  //   input.addEventListener('beforeinput', checkIfEnterKeyHasBeenPressed);
  // }, [])
  //
  // const checkIfEnterKeyHasBeenPressed = (ev) => {
  //   const code = ev.keyCode || ev.which;
  //   if(code !== 13) return;
  //   onSubmit();
  // }

  return (

    options ? (
      <Autocomplete
        freeSolo
        disableClearable
        options={options}
        onChange={(event, newValue) => onChange({target: {value: newValue}})}
        renderInput={(params) => (
          <TextField
            {...params}
            id="input"
            label={inputLabel}
            variant="filled"
            onChange={onChange}
          />
        )}
      />
    ) : (
      <TextField
        fullWidth
        id="input"
        label={inputLabel}
        variant="filled"
        value={value}
        onChange={onChange}

      />
    )


  )
}

export default ChatBotInput;
