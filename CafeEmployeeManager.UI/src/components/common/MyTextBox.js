import React from "react";
import TextField from "@mui/material/TextField";

const MyTextBox = ({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  inputProps,
}) => (
  <TextField
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    error={!!error}
    helperText={helperText}
    inputProps={inputProps}
    fullWidth
    margin="normal"
  />
);

export default MyTextBox;
