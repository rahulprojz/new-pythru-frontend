import { Fragment } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { CloseIMG } from "../../../constants";
import "./searchinput.scss";
import "../input.scss";

interface Props {
  handleSearch?: any;
  value: String;
  clearSearch?: any;
  placeholder?: string | any;
  id?: string;
  name?: string;
  className?: string;
}

export default function SearchInput({
  handleSearch,
  value,
  clearSearch,
  placeholder,
  className,
  id,
  name,
}: Props) {
  return (
    <TextField
      value={value}
      size="small"
      variant="outlined"
      name={name}
      id={id}
      autoComplete="off"
      className={`searchInput ${className}`}
      placeholder={placeholder ? placeholder : "Search"}
      onChange={handleSearch}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {value !== "" ? (
              <img
                src={CloseIMG}
                alt="CLose"
                className={"closeIcon"}
                onClick={clearSearch}
              />
            ) : (
              <Fragment />
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}
