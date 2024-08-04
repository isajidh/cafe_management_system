import React from "react";
import TextField from "@mui/material/TextField";

const MyTextBox = ({
  label,
  name,
  value,
  type,
  onChange,
  error,
  helperText,
  inputProps,
  required,
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
    type
    required
  />
);

export default MyTextBox;
