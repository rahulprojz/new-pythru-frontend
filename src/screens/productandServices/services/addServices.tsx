import React, { useEffect, useState } from "react";
// import Grid from "@mui/material/Grid";
import Schema from "../../../schema";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
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
  checkDetailExist,
  addProductServices,
  updateProductServices,
} from "../action";
import Autocomplete from "../../../components/autocomplete";
import CategoryAutocomplete from "../../../components/autocomplete/CategoryAuto";
// import CategoryModal from "../../../components/modal/CategoryModal"
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
function Index({
  setState,
  openForAddEditProduct,
  setOpenForAddEditProduct,
  state,
}: any) {
  const Navigate = useNavigate();
  const dispatch: any = useDispatch();
  // const [state, setState] = useState(false);
  const [productError, setProductError] = useState("");
  const [skuError, setSkuError] = useState("");
  const [formData, setFormData] = useState({});
  const [open, setOpen]: any = useState(false);

  const {
    productServicesCategory,
    salesUnit,
    gstRate,
    productServiceDetail,
    sacCodeList,
    addCategories,
    incomeCategory,
    expenseCategory,
    imageUrl,
    editProductData,
  } = useSelector((state: any) => state.productServicesSlice);
  const initialValues = {
    productName: editProductData ? productServiceDetail?.name : "",
    itemCategory: editProductData
      ? productServiceDetail?.productCategoryId?._id
      : "",
    salesUnit: editProductData ? productServiceDetail?.salesUnitId : "",
    skuNumber: editProductData ? productServiceDetail?.skuNumber : "",
    purchasePrice: editProductData
      ? productServiceDetail?.purchasePrice || ""
      : "",
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
    // isDefaultIncomeCategory: editProductData
    //   ? productServiceDetail?.isDefaultIncomeCategory
    //   : true,
    // isDefaultExpenseCategory: editProductData
    //   ? productServiceDetail?.isDefaultExpenseCategory
    //   : true,
    // openingStock: editProductData ? productServiceDetail?.inventory?.openingStock : "",
    // lowstockAlert: editProductData ? productServiceDetail?.inventory?.lowStockAlert : "",
    // trackInventory: editProductData ? productServiceDetail?.trackInventory : true,
  };
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
  useEffect(() => {
    // return () => {
    //     dispatch(
    //         updateProductAndServices({
    //             editProductData: "",
    //             imageUrl: "",
    //         })
    //     );
    // }
  }, []);
  return (
    <Box>
      <h3 className="hd">
        {`${editProductData ? "Edit" : "Create New"}`} Service
      </h3>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={Schema.AddServiceSchema}
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
                }
              )
            );
            resetForm();
          } else {
            dispatch(
              addProductServices(values, (res: any) => {
                setState(false);
                setOpenForAddEditProduct(false);
                resetForm();
              })
            );
            dispatch(
              updateProductAndServices({
                editProductData: "",
                imageUrl: "",
              })
            );
          }
        }}
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
              handleSubmit();
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
                      itemCategories={values.itemCategory}
                      label={"Select Category"}
                      size="small"
                      name="itemCategory"
                      onBlur={handleBlur}
                      values={(data: any) => {
                        console.log("cat_id=>", data);
                        setFieldValue("itemCategory", data);
                      }}
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
                      // isRequired
                      type={"text"}
                      // isDisabled={editProductData}
                      focused={false}
                      sizeval="medium"
                      label="SKU Number"
                      maxLength={20}
                      values={values.skuNumber}
                      onChange={(e: any) => {
                        handleChange(e);
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
                      size="small"
                      name="salesUnit"
                      error={Boolean(touched.salesUnit && errors.salesUnit)}
                      helperText={touched.salesUnit && errors.salesUnit}
                      options={salesUnit}
                      onBlur={handleBlur}
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
                  // isRequired
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

              <Grid item md={12}>
                <div className="border-card">
                  <div className="Dflex sp-bt al-cnt">
                    <Typography variant="body2" className="bold">
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
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6} key={"hsnCode" + +state}>
                        <Autocomplete
                          disabled={false}
                          // isRequired
                          value={values.hsnCode}
                          label={"Select SAC Code"}
                          onChange={(_e: any, newValue: any) => {
                            setFieldValue("hsnCode", newValue?.hsnSac);
                          }}
                          defaultValue={() => {
                            const index = sacCodeList?.findIndex(
                              (x: any) => x?.hsnSac == values.hsnCode
                            );
                            return sacCodeList[index];
                          }}
                          size="small"
                          name="hsnCode"
                          onBlur={handleBlur}
                          error={Boolean(touched.hsnCode && errors.hsnCode)}
                          helperText={touched.hsnCode && errors.hsnCode}
                          options={sacCodeList}
                          getOptionLabel={(option: any) =>
                            ` ${option.hsnSac} | ${option?.description}`
                          }
                          // `${option.hsnSac} | ${option?.description}`
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
                          required
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
                          name={"taxability"}
                          error={touched.taxability && errors.taxability}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <NormalSelect
                          values={values.gstRate}
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
                                  >{`${item?.rate}%`}</MenuItem>
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
                          isDisabled={[2, 3, 4].includes(
                            values?.taxability ? values?.taxability : 0
                          )}
                          onKeyDown={(e: any) =>
                            phonePreventText.includes(e.key) &&
                            e.preventDefault()
                          }
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
                          onBlur={handleBlur}
                          error={Boolean(touched.cess && errors.cess)}
                          helperText={touched.cess && errors.cess}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Paper variant="outlined" sx={{ padding: "10px 20px" }}>
                          <div className="Dflex sp-bt al-cnt">
                            <Typography variant="body2" className="semi-bold">
                              RCM
                            </Typography>
                            {/* <FormControl> */}
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
                        <Paper variant="outlined" sx={{ padding: "10px 20px" }}>
                          <div className="Dflex sp-bt al-cnt">
                            <Typography variant="body2" className="semi-bold">
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
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                </div>
              </Grid>

              {/* <Grid item xs={12} md={6}>
                <SelectTreeIncomeCategory
                  value={values.incomeCategory}
                  data={incomeCategory}
                  name={"incomeCategory"}
                  label={"Income Category(Optional)"}
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
                  name={"expenseCategory"}
                  handleChangeTreeSelect={(res: any, isChild: any) => {
                    setFieldValue("expenseCategory", res);
                    if (isChild) {
                      setFieldValue("isDefaultExpenseCategory", false);
                    } else setFieldValue("isDefaultExpenseCategory", true);
                  }}
                  label={"Expense Category(Optional)"}
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
              dialogTitle="Service"
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
                          resetForm();
                          setOpenForAddEditProduct(false);
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
                        resetForm();
                        setOpenForAddEditProduct(false);
                      })
                    );
                    dispatch(
                      updateProductAndServices({
                        editProductData: "",
                        imageUrl: "",
                      })
                    );
                  }
                }
              }}
              handleDialogClose={() => setOpenForAddEditProduct(false)}
              dialogPara={`Are you sure you want to close without update/add this service?`}
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
