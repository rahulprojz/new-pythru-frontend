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
  isShrink?: boolean;
  focused: boolean;
  sizeval?: any | string;
  maxLength?: undefined | number;
  touched?: any;
  errors?: any;
  isEndAdornment?: boolean;
  onKeyDown?: any;
  readOnly?: boolean;
}

export default function NormalInput({
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
  isShrink,
  multiline,
  rows,
  error,
  touched,
  focused,
  sizeval,
  isDisabled,
  errors,
  maxLength = undefined,
  isEndAdornment = false,
  onKeyDown,
  readOnly,
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
      variant="outlined"
      autoComplete="off"
      onBlur={onBlur}
      id={id}
      value={values}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      helperText={helperText}
      error={error}
      name={name}
      required={isRequired}
      type={type}
      label={label}
      // size={sizeval}
      size="small"
      fullWidth
      multiline={false}
      rows={"1"}
      onFocus={(e) => {
        if (type == "number")
          e.target.addEventListener(
            "wheel",
            function (e) {
              e.preventDefault();
            },
            { passive: false }
          );
      }}
      disabled={isDisabled ? isDisabled : false}
      inputProps={{
        autoComplete: "new-password",
        form: {
          autoComplete: "off",
        },
        maxLength: maxLength,
      }}
      InputProps={{
        readOnly: readOnly ? true : false,
        startAdornment: (
          <>
            <img src={inpImg} alt="" />
          </>
        ),
        endAdornment:
          error && touched && isEndAdornment ? (
            <img
              style={{ cursor: "pointer" }}
              onClick={() => setFieldValue(name, "")}
              src={InvalidField}
              alt={name}
            />
          ) : (!error && touched && isEndAdornment) ||
            (!errors && values && isEndAdornment) ? (
            <img src={ValidField} alt={name} />
          ) : (
            <React.Fragment></React.Fragment>
          ),
      }}
      className={className}
      InputLabelProps={{ shrink: isShrink ? true : false }}
      sx={style}
    />
  );
}
