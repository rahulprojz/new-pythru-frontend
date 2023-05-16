import { Box } from "@mui/material";
// import { InsuranceCompany } from '../../../types/insurance.company';
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
// import { getInsuranceCompany } from '../../../global-action/global.action';
// import showAlert from '../../../utils/alert';
import { useField, useFormikContext } from "formik";
import { useSelector, useDispatch } from "react-redux";
// import { ReducersModal } from '../../../modal';
// import ACTION_NAME from '../../../utils/action.name';
// import "./autocomplete.scss"
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

type AutocomWrapProps = {
  name: string;
  label: string;
};

function AutocomWrap(props: any) {
  const {
    name,
    label,
    onBlur,
    id,
    onChange,
    disabled,
    value,
    options,
    getOptionLabel,
    error,
    renderOption,
    helperText,
    isOptionEqualToValue,
    defaultValue,
    disableClearable = false,
    onInputChange,
    isRequired = false,
    required,
  } = props;
  const dispatch = useDispatch();
  // console.log(defaultValue, "defaultValue");
  // const [insurance, setInsurance] = useState([] as InsuranceCompany[]);
  // const [value, setValue] = useState({} as InsuranceCompany);
  // const [field, meta] = useField(name);
  // const { setFieldValue } = useFormikContext();
  // const { type, blockId, insuranceCompany, icd10 } = useSelector((state: ReducersModal) => state.addBlockReducer);
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    limit: 600,
    // stringify: (options: any) => options.hsnCode,
  });
  // console.log(defaultValue,"defaultValue")
  return (
    <Autocomplete
      selectOnFocus
      clearOnBlur
      freeSolo={true}
      disabled={disabled}
      // value={defaultValue}
      defaultValue={defaultValue}
      onChange={onChange}
      disableClearable={disableClearable}
      size="small"
      onBlur={onBlur}
      id={id}
      options={options}
      autoHighlight
      filterOptions={filterOptions}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      onInputChange={onInputChange}
      renderInput={(params) => (
        <TextField
          required={isRequired || required}
          name={name}
          value={value}
          defaultValue={value}
          error={error}
          helperText={helperText}
          className={value ? "" : "not-showing-close-icon"}
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: "off",
          }}
        />
      )}
    />
  );
}

export default AutocomWrap;
