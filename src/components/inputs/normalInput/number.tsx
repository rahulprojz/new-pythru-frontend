import { TextField } from "@mui/material";
import "../input.scss";
import React, { useEffect } from "react";
import { ValidField, InvalidField } from "../../../constants";
import { useFormikContext } from "formik";

interface Props {
  label?: string;
  placeholder?: string;
  id?: string;
  name?: string | any;
  type?: string;
  onBlur?: any;
  values?: any;
  onChange?: any;
  style?: any;
  helperText?: any;
  error?: any;
  inpImg?: any;
  multiline?: boolean;
  rows?: any;
  className?: any;
  isRequired?: boolean;
  isDisabled?: boolean;
  focused: boolean;
  sizeval?: any | string;
  maxLength?: undefined | number;
  touched?: any;
  errors?: any;
  isEndAdornment?: boolean;
  onKeyDown?: any;
  inputProps?: any;
  InputProps?: any;
}

export default function NumberInput({
  label,
  placeholder,
  id,
  name,
  type,
  onBlur,
  values,
  onChange,
  style,
  inpImg,
  className,
  helperText,
  isRequired,
  multiline,
  rows,
  error,
  touched,
  focused,
  sizeval,
  isDisabled,
  inputProps,
  InputProps,
  errors,
  maxLength = undefined,
  isEndAdornment = false,
  onKeyDown,
}: Props) {
  const {
    setFieldValue,
    isValid,
    handleBlur,
    values: val,
    errors: err,
  } = useFormikContext();

  return (
    <TextField
      autoFocus={focused}
      variant='outlined'
      autoComplete='off'
      onBlur={onBlur}
      id={id}
      value={values ? values : ""}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      helperText={helperText}
      error={error}
      name={name}
      required={isRequired}
      type={type}
      label={label}
      size={sizeval}
      fullWidth
      multiline={false}
      rows={"1"}
      disabled={isDisabled ? isDisabled : false}
      inputProps={inputProps}
      InputProps={InputProps}
      className={className}
      sx={style}
    />
  );
}
