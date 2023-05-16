import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addCategories } from "../../screens/productandServices/action";
import NormalButton from "../buttons/normalButton";
import "../dialog/dialog.scss";
import { useFormikContext } from "formik";
import { PlusIco } from "../../constants";

const filter = createFilterOptions<Categories>();

interface Categories {
  inputValue?: string;
  categoryName: string;
  _id?: string;
  description?: string;
}

export default function CategoryAuto(props: any) {
  const { setFieldValue, isValid, handleBlur } = useFormikContext();

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
    disableClearable,
    open,
    setOpen,
  } = props;

  const [val, setValue] = React.useState<Categories | null>(null);
  const dispatch: any = useDispatch();
  const [data, setData] = React.useState("");
  const [catKey, setCateKey] = React.useState<Categories | null | Boolean>(
    true
  );
  const [categoryNameError, setCategoryNameError]: any = React.useState("");
  const [dialogValue, setDialogValue] = React.useState({
    categoryName: "",
    description: "",
  });

  const [descBlur, setDescBlur] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setDescBlur(false);
  };

  const categoriesList: readonly Categories[] = options;

  const handleSubmit = () => {
    // event.preventDefault();

    setValue({
      categoryName: dialogValue.categoryName,
      description: dialogValue.description,
    });
    handleClose();
    setCateKey(false);
    dispatch(
      addCategories(dialogValue, (response: any) => {
        setFieldValue("itemCategory", response.responseData.category._id);
        setData(response.responseData.category._id);
        setCateKey(true);
      })
    );
    values(data);
    return false;
  };
  return (
    <React.Fragment key={`id+${catKey}`}>
      <Autocomplete
        key={`id+${catKey}`}
        disableClearable
        defaultValue={defaultValue}
        onChange={(_e: any, newValue: any) => {
          if (typeof newValue === "string") {
            if (newValue?.length < 3) {
              setCategoryNameError("Category name is minimum 3 characters");
            } else {
              setCategoryNameError("");
            }
            setTimeout(() => {
              setOpen(true);
              setDialogValue({
                categoryName: newValue,
                description: "",
              });
            });
            // setFieldValue("itemCategory", newValue._id)
          } else if (newValue && newValue.inputValue) {
            if (newValue.inputValue?.length < 3) {
              setCategoryNameError("Category name is minimum 3 characters");
            } else {
              setCategoryNameError("");
            }
            setOpen(true);
            setDialogValue({
              categoryName: newValue.inputValue,
              description: "",
            });
          } else {
            values(newValue?._id);
            setFieldValue("itemCategory", newValue?._id);
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting = options.some(
            (option) => inputValue === option.categoryName
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              categoryName: `+ Add ${inputValue}`,
              inputValue,
            });
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        onBlur={onBlur}
        handleHomeEndKeys
        id="category_id"
        options={categoriesList}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.categoryName;
        }}
        renderOption={(props, option) => (
          <li {...props} key={option._id} style={{ fontFamily: "Poppins" }}>
            {option.categoryName}
          </li>
        )}
        sx={{ width: "100%" }}
        freeSolo
        renderInput={(params) => (
          <TextField
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
      {/* ) : (
        <></>
      )} */}
      <Dialog
        open={open}
        onClose={handleClose}
        className="dialog_pop addcategory"
      >
        <div>
          <DialogTitle>Create Category</DialogTitle>
          <DialogContent>
            <TextField
              focused={false}
              id="name"
              // disabled
              inputProps={{ maxLength: 60 }}
              value={dialogValue.categoryName}
              onChange={(event) => {
                // setOnblurCate({ ...onBlurCate, nameBlur: true });
                if (event.target.value?.length < 3) {
                  setCategoryNameError("Category name is minimum 3 characters");
                } else {
                  setCategoryNameError("");
                }
                setDialogValue({
                  ...dialogValue,
                  categoryName: event.target.value,
                });
              }}
              label="Category Name"
              type="text"
              className="noshrink m-b-20"
              required={true}
              error={
                (!dialogValue.categoryName ? true : false) || categoryNameError
              }
              helperText={
                (!dialogValue.categoryName &&
                  "Please provide a category name") ||
                categoryNameError
              }
            />

            <TextField
              margin="dense"
              focused={false}
              id="Category description"
              label="Description"
              className="noshrink"
              value={dialogValue.description}
              onChange={(event) => {
                setDescBlur(true);
                setDialogValue({
                  ...dialogValue,
                  description: event.target.value,
                });
              }}
              type="description"
              required={true}
              rows={3}
              error={descBlur && !dialogValue.description ? true : false}
              helperText={
                descBlur &&
                !dialogValue.description &&
                "Please provide a description"
              }
            />
          </DialogContent>
          <DialogActions className="Dflex sp-ard">
            <NormalButton
              buttonText="Cancel"
              onPress={handleClose}
              className="btn-simple"
            />
            <NormalButton
              buttonText="Save"
              disabled={categoryNameError || !dialogValue.description}
              onPress={handleSubmit}
              className="btn-purple"
            />
          </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
