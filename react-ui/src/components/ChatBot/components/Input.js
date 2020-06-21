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

  },
  inputRoot: {
    background: "#e5e1e1",
    border: "thin solid black",
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
    error,
    ...other
  } = props;

  const classes = useStyles({color, hasButton})

  return (

    options ? (
      <Autocomplete
        disableClearable
        openOnFocus
        freeSolo
        options={options}
        onChange={(event, newValue) => onChange({target: {value: newValue}})}
        renderInput={(params) => (
          <TextField
            {...params}
            onKeyPress={(e) => e.key === "Enter" && onSubmit()}
            label={inputLabel}
            variant="filled"
            onChange={onChange}
            error={error.length > 0 ? true : false}
            helperText={error}
          />
        )}
      />
    ) : (
      <TextField
        fullWidth
        onKeyPress={(e) => e.key === "Enter" && onSubmit()}
        label={inputLabel}
        variant="filled"
        value={value}
        onChange={onChange}
        error={error.length > 0 ? true : false}
        helperText={error}
        InputProps={{
          disableUnderline: true,
          classes: {
            root: classes.inputRoot,

          },
        }
      }
      />
    )


  )
}

export default ChatBotInput;
