import React, { useEffect, useState } from "react";
import Schema from "../../../schema";

import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import NormalInput from "../../../components/inputs/normalInput";
import { Formik, Form } from "formik";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import NormalButton from "../../../components/buttons/normalButton";
import DeleteDialog from "../../../components/dialog";
import "react-datepicker/dist/react-datepicker.css";
import { updateProductAndServices } from "../productServiceSlice";

import { taxability, phonePreventText } from "../../../constants";
import UploadImage from "../../../components/uploadImage";
import { useDispatch } from "react-redux";
import NormalSelect from "../../../components/select/normalSelect";
import {
  getPresignedurl,
  addProductServices,
  checkDetailExist,
  updateProductServices,
} from "../action";
import Autocomplete from "../../../components/autocomplete";
import CategoryAutocomplete from "../../../components/autocomplete/CategoryAuto";
// import CategoryModal from "../../../components/modal/CategoryModal";
import { useSelector } from "react-redux";

import { Box } from "@mui/system";

function Index({
  setState,
  openForAddEditProduct,
  setOpenForAddEditProduct,
  state,
}: any) {
  const Navigate = useNavigate();
  // const [openForAddEditProduct, setOpenForAddEditProduct] = useState(false)
  const [formData, setFormData] = useState({});
  const [open, setOpen]: any = useState(false);

  // const [state, setState] = React.useState(false);
  const dispatch: any = useDispatch();
  const [productError, setProductError] = useState("");
  const [skuError, setSkuError] = useState("");

  const {
    productServicesCategory,
    salesUnit,
    productServiceDetail,
    hsnCodeList,
    addCategories,
    // incomeCategory,
    // expenseCategory,
    imageUrl,
    gstRate,
    editProductData,
    salesPriceMin,
    salesPriceMax,
  } = useSelector((state: any) => state.productServicesSlice);
  const productCategory =
    productServicesCategory &&
    productServicesCategory.length > 0 &&
    productServicesCategory.filter((cat: any) => cat.type === 1);

  const [price, setPrice]: any = useState<number[]>(
    salesPriceMin && salesPriceMax ? [salesPriceMin, salesPriceMax] : [0, 1000]
  );

  const initialValues = {
    productName: editProductData ? productServiceDetail?.name : "",
    itemCategory: editProductData
      ? productServiceDetail?.productCategoryId?._id
      : "",
    salesUnit: editProductData ? productServiceDetail?.salesUnitId : "",
    skuNumber: editProductData ? productServiceDetail?.skuNumber : "",
    purchasePrice: editProductData ? productServiceDetail?.purchasePrice : "",
    salePrice: editProductData ? productServiceDetail?.salePrice : "",
    cess: editProductData
      ? productServiceDetail?.gst?.cess
        ? productServiceDetail?.gst?.cess
        : ""
      : "",
    isGstApplicable: editProductData
      ? productServiceDetail?.isGstApplicable
        ? "yes"
        : "no"
      : "yes",
    isRCMEnabled: editProductData
      ? productServiceDetail?.isRCMEnabled
        ? "yes"
        : "no"
      : "no",
    isITCEnabled: editProductData
      ? productServiceDetail?.isITCEnabled
        ? "yes"
        : "no"
      : "yes",
    hsnCode: editProductData ? productServiceDetail?.gst?.hsnSacCode : "",
    taxability: editProductData
      ? productServiceDetail?.gst?.itemTaxability
      : "",
    gstRate: editProductData
      ? productServiceDetail?.gst?.gstRate
        ? productServiceDetail?.gst?.gstRate
        : ""
      : "",
    // incomeCategory: editProductData
    //   ? productServiceDetail?.incomeCategory?.id
    //   : "",
    // expenseCategory: editProductData
    //   ? productServiceDetail?.expenseCategory?.id
    //   : "",
    description: editProductData ? productServiceDetail?.description : "",
    openingStock: editProductData
      ? productServiceDetail?.inventory?.stockLeft
      : "",
    lowstockAlert: editProductData
      ? productServiceDetail?.inventory?.lowStockAlert
      : "",
    trackInventory: editProductData
      ? productServiceDetail?.trackInventory
      : true,
    // isDefaultIncomeCategory: editProductData
    //   ? productServiceDetail?.isDefaultIncomeCategory
    //   : true,
    // isDefaultExpenseCategory: editProductData
    //   ? productServiceDetail?.isDefaultExpenseCategory
    //   : true,
  };

  useEffect(() => {
    salesPriceMin && salesPriceMax
      ? setPrice([salesPriceMin, salesPriceMax])
      : setPrice([0, 1000]);
  }, [salesPriceMin, salesPriceMax]);

  //********Add Validation on ProductName*/
  const handleChangeProductName = (value: any) => {
    if (!value) {
      setProductError("Name is required");
      return;
    }
    if (editProductData && value === productServiceDetail?.name) {
      setProductError("");
      return;
    }
    if (value.length > 2)
      dispatch(
        checkDetailExist("name", value, (res: any) => {
          if (res?.data?.responseCode === 200) setProductError("");
          else setProductError(res.responseMsg);
        })
      );
  };
  const handleChangeSku = (value: any) => {
    if (editProductData && value === productServiceDetail?.skuNumber) {
      setSkuError("");
      return;
    }
    if (value.length > 2)
      dispatch(
        checkDetailExist("skuNumber", value, (res: any) => {
          if (res?.data?.responseCode === 200) setSkuError("");
          else setSkuError(res.responseMsg);
        })
      );
  };

  return (
    <Box>
      <h3 className="hd">
        {`${editProductData ? "Edit" : "Create New"}`} Product
      </h3>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={Schema.AddProductSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (editProductData) {
            dispatch(
              updateProductServices(
                values,
                productServiceDetail?._id,
                (res: any) => {
                  setState(false);
                  dispatch(
                    updateProductAndServices({
                      editProductData: "",
                      imageUrl: "",
                    })
                  );
                  setOpenForAddEditProduct(false);
                  resetForm();
                }
              )
            );
          } else {
            dispatch(
              addProductServices(values, (res: any) => {
                setState(false);
                setOpenForAddEditProduct(false);
                dispatch(
                  updateProductAndServices({
                    editProductData: "",
                    imageUrl: "",
                  })
                );
                resetForm();
              })
            );
          }
        }}
        // validateOnChange={true}
        // validateOnBlur={true}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          setFieldValue,
          isValid,
          resetForm,
        }) => (
          <Form
            onSubmit={(e) => {
              if (!values.productName?.trim()) {
                setProductError("Name is required");
              }
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item md={2}>
                <UploadImage
                  file={imageUrl}
                  onChange={(e: any) => {
                    dispatch(
                      getPresignedurl(
                        `${Math.floor(Date.now() / 1000)}`,
                        e.target.files[0].type.split("/")[1],
                        e.target.files[0]
                      )
                    );
                    e.target.value = null;
                  }}
                />
              </Grid>
              <Grid item md={10}>
                <Grid container rowSpacing={3} columnSpacing={2}>
                  <Grid item xs={12} md={6}>
                    <NormalInput
                      name={"productName"}
                      isRequired
                      type={"text"}
                      focused={false}
                      // isDisabled={editProductData}
                      sizeval="medium"
                      label="Name"
                      values={values.productName}
                      onChange={(e: any) => {
                        // handleChangeProductName(e.target.value);
                        handleChange(e);
                      }}
                      onBlur={() => {
                        handleChangeProductName(values.productName);
                      }}
                      error={Boolean(productError)}
                      helperText={productError}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} key={"itemCategory" + +state}>
                    <CategoryAutocomplete
                      disabled={false}
                      open={open}
                      setOpen={setOpen}
                      // toggleOpen={(val: any) => setOpen(val)}
                      itemCategories={values.itemCategory}
                      label={"Select Category"}
                      size="small"
                      name="itemCategory"
                      values={(data: any) => {
                        setFieldValue("itemCategory", data);
                      }}
                      onBlur={handleBlur}
                      defaultValue={() => {
                        const index = productServicesCategory?.findIndex(
                          (x: any) => x?._id == values.itemCategory
                        );
                        return productServicesCategory[index];
                      }}
                      error={Boolean(
                        touched.itemCategory && errors.itemCategory
                      )}
                      helperText={touched.itemCategory && errors.itemCategory}
                      options={productServicesCategory}
                      isOptionEqualToValue={(option: any, value: any) =>
                        option.categoryName === value.categoryName
                      }
                      getOptionLabel={(option: any) =>
                        option.categoryName || ""
                      }
                      renderOption={(props: any, option: any) => {
                        return (
                          <Box
                            component="li"
                            sx={{
                              "& > img": { mr: 2, flexShrink: 0 },
                              fontFamily: "Poppins",
                            }}
                            {...props}
                            key={option._id}
                          >
                            {option.categoryName}
                          </Box>
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <NormalInput
                      name={"skuNumber"}
                      maxLength={20}
                      // isRequired
                      // isDisabled={editProductData}
                      type={"text"}
                      focused={false}
                      sizeval="medium"
                      label="SKU Number"
                      values={values.skuNumber}
                      onChange={(e: any) => {
                        handleChange(e);
                        // handleChangeSku(e.target.value);
                      }}
                      onBlur={() => {
                        handleChangeSku(values.skuNumber);
                      }}
                      error={Boolean(skuError)}
                      helperText={skuError}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} key={"SalesUnit" + +state}>
                    <Autocomplete
                      // disabled={false}
                      value={values.salesUnit}
                      label={"Sales Unit"}
                      onChange={(_e: any, newValue: any) => {
                        setFieldValue("salesUnit", newValue?.salesUnit);
                      }}
                      defaultValue={() => {
                        const index = salesUnit?.findIndex(
                          (x: any) => x?.salesUnit == values.salesUnit
                        );
                        return salesUnit[index];
                      }}
                      onBlur={handleBlur}
                      size="small"
                      name="salesUnit"
                      error={Boolean(touched.salesUnit && errors.salesUnit)}
                      helperText={touched.salesUnit && errors.salesUnit}
                      options={salesUnit}
                      // isOptionEqualToValue={(option: any, value: any) => option.salesUnit === value?.salesUnit}
                      getOptionLabel={(option: any) => option.salesUnit || ""}
                      renderOption={(props: any, option: any) => {
                        return (
                          <Box
                            component="li"
                            sx={{
                              "& > img": { mr: 2, flexShrink: 0 },
                              fontFamily: "Poppins",
                            }}
                            {...props}
                            key={option._id}
                          >
                            {option.salesUnit}
                          </Box>
                        );
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <NormalInput
                  name={"purchasePrice"}
                  isRequired
                  type={"number"}
                  onKeyDown={(e: any) =>
                    phonePreventText.includes(e.key) && e.preventDefault()
                  }
                  focused={false}
                  sizeval="medium"
                  label="Purchase Price/Unit"
                  values={values.purchasePrice}
                  onChange={(e: any) => {
                    if (
                      e.target.value.split(".")?.length == 2 &&
                      e.target.value.split(".")[1].length > 2
                    )
                      return;
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  error={Boolean(touched.purchasePrice && errors.purchasePrice)}
                  helperText={touched.purchasePrice && errors.purchasePrice}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <NormalInput
                  name={"salePrice"}
                  isRequired
                  type={"number"}
                  onKeyDown={(e: any) =>
                    phonePreventText.includes(e.key) && e.preventDefault()
                  }
                  focused={false}
                  sizeval="medium"
                  label="Sale Price/Unit"
                  values={values.salePrice}
                  onChange={(e: any) => {
                    if (
                      e.target.value.split(".")?.length == 2 &&
                      e.target.value.split(".")[1].length > 2
                    )
                      return;
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  error={Boolean(touched.salePrice && errors.salePrice)}
                  helperText={touched.salePrice && errors.salePrice}
                />
              </Grid>

              <Grid item xs={12}>
                <div className="border-card">
                  <div className="Dflex sp-bt al-cnt">
                    <Typography className="semi-bold" variant="body2">
                      GST
                    </Typography>
                    {/* <FormControl> */}
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="isGstApplicable"
                      defaultValue="yes"
                      className="radio-buttons"
                      value={values.isGstApplicable}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                    {/* </FormControl> */}
                  </div>
                  {values.isGstApplicable === "yes" ? (
                    <div className="m-t-10">
                      <Grid container rowSpacing={3} columnSpacing={2}>
                        <Grid item xs={12} md={6} key={"hsnCode" + +state}>
                          <Autocomplete
                            disabled={false}
                            // isRequired
                            value={values.hsnCode}
                            label={"Select HSN Code"}
                            onBlur={handleBlur}
                            onChange={(_e: any, newValue: any) => {
                              // debugger;
                              setFieldValue("hsnCode", newValue?.hsnSac);
                            }}
                            defaultValue={() => {
                              const index = hsnCodeList?.findIndex(
                                (x: any) => x?.hsnSac == values.hsnCode
                              );
                              return hsnCodeList[index];
                            }}
                            size="small"
                            name="hsnCode"
                            error={Boolean(touched.hsnCode && errors.hsnCode)}
                            helperText={touched.hsnCode && errors.hsnCode}
                            options={hsnCodeList}
                            // .map((option:any) =>  option.customerIdentityNo + "," + option.customerName + "," option.customerSurname)}
                            // isOptionEqualToValue={(option: any, value: any) => option.hsnSac === value.hsnSac}
                            getOptionLabel={(option: any) =>
                              `${option.hsnSac} | ${option?.description}`
                            }
                            renderOption={(props: any, option: any) => {
                              return (
                                <Box
                                  component="li"
                                  sx={{
                                    "& > img": { mr: 2, flexShrink: 0 },
                                    fontFamily: "Poppins",
                                  }}
                                  {...props}
                                >
                                  <Typography
                                    className="three-dots"
                                    variant="subtitle2"
                                  >{`${option.hsnSac} | ${option?.description}`}</Typography>
                                </Box>
                              );
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <NormalSelect
                            values={values.taxability ? values.taxability : ""}
                            handleChange={(e: any) => {
                              handleChange(e);
                              if (+e.target.value !== 1) {
                                setFieldValue("cess", "");
                                setFieldValue("gstRate", "");
                              }
                            }}
                            label="Taxability of Item"
                            options={taxability.map((item: any) => (
                              <MenuItem value={item.id} key={item.id}>
                                {item.title}
                              </MenuItem>
                            ))}
                            required
                            name={"taxability"}
                            error={touched.taxability && errors.taxability}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <NormalSelect
                            values={values?.gstRate}
                            disabled={[2, 3, 4].includes(
                              values?.taxability ? values.taxability : 0
                            )}
                            handleChange={handleChange}
                            label="GST Rate"
                            options={
                              gstRate && gstRate?.length > 0
                                ? gstRate.map((item: any) => (
                                    <MenuItem
                                      value={item?.rate}
                                      key={`${item._id}-${item.rate}`}
                                    >
                                      {" "}
                                      {`${item?.rate}%`}
                                    </MenuItem>
                                  ))
                                : []
                            }
                            name={"gstRate"}
                            error={touched.gstRate && errors.gstRate}
                            // helperText={touched.hsnCode && errors.hsnCode}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <NormalInput
                            name={"cess"}
                            // isRequired
                            type={"number"}
                            onKeyDown={(e: any) =>
                              phonePreventText.includes(e.key) &&
                              e.preventDefault()
                            }
                            isDisabled={[2, 3, 4].includes(
                              values?.taxability ? values?.taxability : 0
                            )}
                            focused={false}
                            sizeval="medium"
                            label="Cess(%)"
                            values={values.cess}
                            onChange={(e: any) => {
                              if (
                                99 < +e.target.value ||
                                (e.target.value.split(".")?.length == 2 &&
                                  e.target.value.split(".")[1].length > 2)
                              )
                                return;
                              handleChange(e);
                            }}
                            // onChange ={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.cess && errors.cess)}
                            helperText={touched.cess && errors.cess}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Paper
                            variant="outlined"
                            sx={{ padding: "10px 20px" }}
                          >
                            <div className="Dflex sp-bt al-cnt">
                              <Typography className="semi-bold" variant="body2">
                                RCM
                              </Typography>
                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="isRCMEnabled"
                                defaultValue="yes"
                                className="radio-buttons"
                                value={values.isRCMEnabled}
                                onChange={handleChange}
                              >
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio />}
                                  label="Yes"
                                />
                                <FormControlLabel
                                  value="no"
                                  control={<Radio />}
                                  label="No"
                                />
                              </RadioGroup>
                              {/* </FormControl> */}
                            </div>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Paper
                            variant="outlined"
                            sx={{ padding: "10px 20px" }}
                          >
                            <div className="Dflex sp-bt al-cnt">
                              <Typography className="semi-bold" variant="body2">
                                ITC
                              </Typography>

                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="isITCEnabled"
                                defaultValue="yes"
                                className="radio-buttons"
                                value={values.isITCEnabled}
                                onChange={handleChange}
                              >
                                <FormControlLabel
                                  value="yes"
                                  control={<Radio />}
                                  label="Yes"
                                />
                                <FormControlLabel
                                  value="no"
                                  control={<Radio />}
                                  label="No"
                                />
                              </RadioGroup>
                            </div>
                          </Paper>
                        </Grid>
                      </Grid>
                    </div>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="border-card">
                  <div className="Dflex sp-bt al-cnt">
                    <Typography className="semi-bold" variant="body2">
                      Track this item in inventory
                    </Typography>
                    <Switch
                      checked={values?.trackInventory}
                      name="trackInventory"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setFieldValue("trackInventory", event.target.checked);
                        setFieldValue("openingStock", "");
                        setFieldValue("lowstockAlert", "");
                      }}
                      defaultChecked
                      color="primary"
                    />
                  </div>
                  {values.trackInventory ? (
                    <div className="m-t-20">
                      <Grid container rowSpacing={3} columnSpacing={2}>
                        <Grid item xs={12} sm={12} md={6}>
                          <NormalInput
                            name={"openingStock"}
                            isRequired
                            type={"number"}
                            onKeyDown={(e: any) =>
                              phonePreventText.includes(e.key) &&
                              e.preventDefault()
                            }
                            isDisabled={!values.trackInventory}
                            focused={false}
                            sizeval="medium"
                            label="Opening Stock"
                            values={values.openingStock}
                            onChange={(e: any) => {
                              if (
                                e.target.value.split(".")?.length == 2 &&
                                e.target.value.split(".")[1].length > 2
                              )
                                return;
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                            error={Boolean(
                              touched.openingStock && errors.openingStock
                            )}
                            helperText={
                              touched.openingStock && errors.openingStock
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <NormalInput
                            name={"lowstockAlert"}
                            isRequired
                            type={"number"}
                            onKeyDown={(e: any) =>
                              phonePreventText.includes(e.key) &&
                              e.preventDefault()
                            }
                            focused={false}
                            isDisabled={!values.trackInventory}
                            sizeval="medium"
                            label="Low Stock Alert"
                            values={values.lowstockAlert}
                            onChange={(e: any) => {
                              if (
                                e.target.value.split(".")?.length == 2 &&
                                e.target.value.split(".")[1].length > 2
                              )
                                return;
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                            error={Boolean(
                              touched.lowstockAlert && errors.lowstockAlert
                            )}
                            helperText={
                              touched.lowstockAlert && errors.lowstockAlert
                            }
                          />
                          {/* <FormControl fullWidth focused={false}>
                            <InputLabel id="demo-simple-select-label">
                              Low Stock Alert
                            </InputLabel>
                            <Select label="Low Stock Alert" id="low-stock-alert">
                              <MenuItem value={10}>Ten</MenuItem>
                              <MenuItem value={20}>Twenty</MenuItem>
                              <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                          </FormControl> */}
                        </Grid>
                      </Grid>
                    </div>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                </div>
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <SelectTreeIncomeCategory
                  value={values.incomeCategory}
                  name="incomeCategory"
                  label={"Income Category(Optional)"}
                  data={incomeCategory}
                  handleChangeTreeSelect={(res: any, isChild: any) => {
                    setFieldValue("incomeCategory", res);
                    if (isChild) {
                      setFieldValue("isDefaultIncomeCategory", false);
                    } else setFieldValue("isDefaultIncomeCategory", true);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectTreeIncomeCategory
                  value={values.expenseCategory}
                  data={expenseCategory}
                  name="expenseCategory"
                  label={"Expense Category(Optional)"}
                  handleChangeTreeSelect={(res: any) =>
                    setFieldValue("expenseCategory", res)
                  }
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name={"description"}
                  value={values.description}
                  id="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.description && errors.description)}
                  helperText={
                    touched.description &&
                    `${errors.description ? errors.description : ""}`
                  }
                  multiline
                  className="textarea-cover"
                  rows={2}
                />
              </Grid>

              <Grid item xs={12}>
                <Grid container rowSpacing={3} columnSpacing={2}>
                  <Grid item xs={6}>
                    <NormalButton
                      onPress={() => setOpenForAddEditProduct("cancel")}
                      variant="contained"
                      buttonText="Cancel"
                      className="btn-simple w-100"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <NormalButton
                      type="submit"
                      variant="contained"
                      buttonText="Submit"
                      // disabled={!isValid || !values.productName}
                      className="btn-purple w-100"
                      // disabled={
                      //   values.isGstApplicable === "yes" && !values.hsnCode
                      // }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <DeleteDialog
              dialogOpen={openForAddEditProduct}
              dialogTitle="Product"
              yesHandle={() => {
                if (openForAddEditProduct == "cancel") {
                  setState(false);
                  setOpenForAddEditProduct(false);

                  resetForm();
                  dispatch(
                    updateProductAndServices({
                      editProductData: "",
                      imageUrl: "",
                    })
                  );
                } else {
                  if (editProductData) {
                    dispatch(
                      updateProductServices(
                        formData,
                        productServiceDetail?._id,
                        (res: any) => {
                          setState(false);
                          setOpenForAddEditProduct(false);
                          resetForm();
                          dispatch(
                            updateProductAndServices({
                              editProductData: "",
                              imageUrl: "",
                            })
                          );
                        }
                      )
                    );
                  } else {
                    dispatch(
                      addProductServices(formData, (res: any) => {
                        setState(false);
                        setOpenForAddEditProduct(false);
                        resetForm();
                        dispatch(
                          updateProductAndServices({
                            editProductData: "",
                            imageUrl: "",
                          })
                        );
                      })
                    );
                  }
                }
              }}
              handleDialogClose={() => setOpenForAddEditProduct(false)}
              dialogPara={`Are you sure you want to close without update/add this product?`}
              nvCancel="Cancel"
              nvYes="Yes"
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default Index;
