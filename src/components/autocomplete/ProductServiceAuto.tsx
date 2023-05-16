import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import "../dialog/dialog.scss";
import { updateProductAndServices } from "../../screens/productandServices/productServiceSlice";
import { useDispatch } from "react-redux";
import { getProductAndServicesCategory } from "../../screens/productandServices/action";
import { ADD_BTN, TYPE } from "../../constants";

const filter = createFilterOptions<ProductService>();

interface ProductService {
  inputValue?: string;
  name: any;
  isProduct: boolean;
  _id?: string;
  description?: string;
  displayType?: string;
}

export default function ProductServiceAuto(props: any) {
  const {
    id,
    displayType,
    name,
    label,
    defaultValue,
    index,
    disabled,
    required,
    options,
    values,
    error,
    renderOption,
    helperText,
    handleChange,
    handleChnageProduct,
    setFieldValue,
    setProductState,
    setServiceState,
    setAdd,
    type,
    onBlur,
  } = props;

  const dispatch: any = useDispatch();
  const categoriesList: readonly ProductService[] = options;

  const reinitialize = () => {
    handleChange({
      target: {
        name: `productDetails.${index}.rate`,
        value: "",
      },
    });
    handleChange({
      target: {
        name: `productDetails.${index}.amount`,
        value: "",
      },
    });
    handleChange({
      target: {
        name: `productDetails.${index}.quantity`,
        value: 1,
      },
    });
    handleChange({
      target: {
        name: `productDetails.${index}.discount`,
        value: 0,
      },
    });
    handleChange({
      target: {
        name: `productDetails.${index}.productUnit`,
        value: "",
      },
    });
  };
  return (
    <React.Fragment>
      <Autocomplete
        disableClearable
        
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={(_e: any, newValue: any) => {
          if (newValue && newValue.inputValue) {
            if (newValue.isProduct) {
              dispatch(updateProductAndServices({ type: "1" }));
              dispatch(getProductAndServicesCategory());
              setProductState(true);
            } else {
              dispatch(updateProductAndServices({ type: "2" }));
              dispatch(getProductAndServicesCategory());
              setServiceState(true);
            }
            setAdd();
            newValue.inputValue = "";
            newValue.name = "";
            reinitialize();
          } else {
            handleChange({
              target: {
                name: `productDetails.${index}.productId`,
                value: newValue._id,
              },
            });
            handleChange({
              target: {
                name: `productDetails.${index}.productName`,
                value: newValue.name,
              },
            });

            handleChange({
              target: {
                name: `productDetails.${index}.rate`,
                value:
                  type === TYPE.SALES
                    ? Number(newValue.salePrice).toFixed(2)
                    : Number(newValue.purchasePrice).toFixed(2),
              },
            });

            handleChange({
              target: {
                name: `productDetails.${index}.productUnit`,
                value: newValue.salesUnitId || "QTY",
              },
            });

            handleChange({
              target: {
                name: `productDetails.${index}.amount`,
                value:
                  type === TYPE.SALES
                    ? Number(newValue.salePrice).toFixed(2)
                    : Number(newValue.purchasePrice).toFixed(2),
              },
            });
            handleChange({
              target: {
                name: `productDetails.${index}.quantity`,
                value: 1,
              },
            });
            handleChange({
              target: {
                name: `productDetails.${index}.discount`,
                value: 0,
              },
            });

            handleChnageProduct(
              newValue,
              setFieldValue,
              index,
              values.placeOfSupply
            );
            // handleChnageProduct(newValue, setFieldValue, index);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          const isExisting = options.some(
            (option) => inputValue === option.name
          );

          if (inputValue !== "" && !isExisting) {
            if (displayType) {
              if (displayType === "1") {
                filtered.push({
                  name: (
                    <div className="Dflex al-cnt">
                      <img src={ADD_BTN} alt="btn" style={{ width: "25px" }} /> &nbsp;&nbsp;
                      <p style={{fontFamily: 'Poppins'}}>Add new product</p>
                    </div>
                  ),
                  inputValue,
                  isProduct: true,
                });
              } else {
                filtered.push({
                  name: (
                    <div className="Dflex al-cnt">
                      <img src={ADD_BTN} alt="btn" style={{ width: "25px" }} /> &nbsp;&nbsp;
                      <p style={{fontFamily: 'Poppins'}}>Add new service</p>
                    </div>
                  ),
                  inputValue,
                  isProduct: false,
                });
              }
            }
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        onBlur={onBlur}
        handleHomeEndKeys
        id={id}
        options={options}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        renderOption={renderOption}
        sx={{ width: "100%" }}
        freeSolo
        renderInput={(params) => {
          return (
            <TextField
              required={required}
              name={name}
              onChange={(_e: any) => {
                if (!_e.target.value) {
                  handleChange({
                    target: {
                      name: `productDetails.${index}.productId`,
                      value: "",
                    },
                  });
                  handleChange({
                    target: {
                      name: `productDetails.${index}.productName`,
                      value: "",
                    },
                  });

                  reinitialize();
                }
              }}
              error={error}
              helperText={helperText}
              {...params}
              label={label}
            />
          );
        }}
      />
    </React.Fragment>
  );
}
