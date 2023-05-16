import TextField from "@mui/material/TextField";
import "./phoneNumber.scss";
// import InputAdornment from "@mui/material/InputAdornment";
// import React from "react";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import { ValidField, InvalidField } from "../../../constants";
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
  isRequired?: boolean;
  inpImg?: any;
  isDisabled?: boolean;
  focused: boolean;
  sizeval?: any | string;
  className?: any | string;
  maxLength?: undefined | number;
  handleChangeCountryCode?: any;
  countryCode?: any;
  touched?: any;
  onKeyDown?: any;
  errors?: any;
}

export default function NormalInput({
  label,
  placeholder,
  id,
  name,
  type,
  onBlur,
  inpImg,
  values,
  onChange,
  style,
  helperText,
  isRequired,
  error,
  focused,
  sizeval,
  className,
  isDisabled,
  maxLength = undefined,
  handleChangeCountryCode,
  countryCode = 91,
  touched,
  errors,
  onKeyDown,
}: Props) {
  const { setFieldValue, isValid } = useFormikContext();

  return (
    <TextField
      autoFocus={focused}
      variant="outlined"
      autoComplete="off"
      onBlur={onBlur}
      id={id}
      // inputmode="numeric"
      value={values ? values : ""}
      onChange={onChange}
      placeholder={placeholder}
      helperText={helperText}
      error={error}
      name={name}
      required={isRequired}
      type={type}
      onKeyDown={onKeyDown}
      label={label}
      size={sizeval}
      fullWidth
      disabled={isDisabled ? isDisabled : false}
      inputProps={{
        autoComplete: "new-password",
        form: {
          autoComplete: "off",
        },
        maxLength: maxLength,
      }}
      onFocus={(e) => {
        e.target.addEventListener(
          "wheel",
          function (e) {
            e.preventDefault();
          },
          { passive: false }
        );
      }}
      InputProps={{
        startAdornment: (
          <>
            <img src={inpImg} alt="" /> <span className="ph_code">+91</span>
          </>
        ),
      }}
      className={`TextField ${className}`}
      sx={style}
    />
  );
}
