import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";
import "../dialog/dialog.scss";
import { useFormikContext } from "formik";
import { ADD_BTN, TYPE } from "../../constants";
import { useNavigate } from "react-router-dom";

const filter = createFilterOptions<Customers>();

interface Customers {
  inputValue?: string;
  displayName: any;
  isCustomer: boolean;
  _id?: string;
  description?: string;
}

export default function CustomerAuto(props: any) {
  const { setFieldValue, isValid, handleBlur } = useFormikContext();
  const navigate = useNavigate();

  const {
    name,
    label,
    onBlur,
    onChange,
    defaultValue,
    disabled,
    itemCategories,
    options,
    values,
    getOptionLabel,
    error,
    renderOption,
    helperText,
    noOptionsText,
    handleChange,
    required = false,
    readOnly,
    handleVendorCustomer,
    type = TYPE.SALES,
  } = props;
  const [val, setValue] = React.useState<Customers | null>(null);
  const [open, toggleOpen] = React.useState(false);
  const dispatch: any = useDispatch();
  const [data, setData] = React.useState("");

  const categoriesList: readonly Customers[] = options;

  return (
    <React.Fragment>
      <Autocomplete
        readOnly={readOnly}
        disableClearable
        defaultValue={defaultValue}
        disabled={disabled}
        onBlur={handleBlur}
        onChange={(_e: any, newValue: any) => {
          if (newValue && newValue.inputValue) {
            newValue.isCustomer
              ? navigate("/payments/collect/customers/add")
              : navigate("/payments/payouts/vendor/add");
          } else {
            handleVendorCustomer(handleChange, newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting = options.some(
            (option) =>
              inputValue.toLowerCase() === option.displayName.toLowerCase()
          );
          if (inputValue !== "" && !isExisting) {
            if (type == TYPE.SALES) {
              filtered.push({
                displayName: (
                  <>
                    <img src={ADD_BTN} alt="btn" style={{ width: "25px" }} />
                    <p style={{ paddingLeft: "8px", fontFamily: "Poppins" }}>
                      Add {inputValue} as Customer
                    </p>
                  </>
                ),
                inputValue,
                isCustomer: true,
              });
            } else {
              filtered.push({
                displayName: (
                  <>
                    <img src={ADD_BTN} alt="btn" style={{ width: "25px" }} />
                    <p style={{ paddingLeft: "8px", fontFamily: "Poppins" }}>
                      Add {inputValue} as Vendor
                    </p>
                  </>
                ),
                inputValue,
                isCustomer: false,
              });
            }
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="customer_id"
        options={categoriesList}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.displayName;
        }}
        renderOption={(props, option) => (
          <li {...props} key={option._id} style={{ fontFamily: "Poppins" }}>
            {option.displayName}
          </li>
        )}
        sx={{ width: "100%" }}
        freeSolo
        renderInput={(params) => (
          <TextField
            required={required}
            name={name}
            value={itemCategories}
            defaultValue={itemCategories}
            error={error}
            helperText={helperText}
            {...params}
            label={label}
          />
        )}
      />
    </React.Fragment>
  );
}
