import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./select.scss";
import FormHelperText from "@mui/material/FormHelperText";

export default function BasicSelect({
  values,
  handleChange,
  label = "",
  options,
  name,
  error,
  disabled,
  defaultValue = 0,
  className,
  onBlur,
  required=false
}: any) {
  return (
    <FormControl
      fullWidth
      focused={false}
      className={className}
    >
      <InputLabel required={required}>{label}</InputLabel>
      <Select
        disabled={disabled}
        name={name}
        label={label}
        value={values}
        id={name}
        onChange={handleChange}
        defaultValue={defaultValue}
        onBlur={onBlur}
      >
        {options}
      </Select>
      <FormHelperText sx={{ color: "red" }}>
        {error ? error : ""}
      </FormHelperText>
    </FormControl>
  );
}
