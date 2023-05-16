import React, { useEffect, useState, useRef, useCallback } from "react";
import Breadcrumbs from "../../../components/breadcrumb";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import NormalInput from "../../../components/inputs/normalInput";
import { Formik, Form } from "formik";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import { Checkbox } from "@mui/material";
import UploadImage from "../../../components/uploadImage";
import NormalButton from "../../../components/buttons/normalButton";
import Autocomplete from "../../../components/autocomplete";
import { Box } from "@mui/system";
import DeleteDialog from "../../../components/dialog";

import { phonePreventText, profileIcon } from "../../../constants";
import "./customer.scss";
import Schema from "../../../schema";
import { useDispatch, useSelector } from "react-redux";
import {
  statesList,
  getPresignedurl,
  checkDetailExist,
  addAddCustomer,
  getCitiesList,
  getCustomerDetail,
} from "./action";
//import { ConstructionOutlined, OneKPlusOutlined } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { resetCustomer, updateCustomer } from "../customerListSlice";

const CustomerAdd = (data: any) => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const type = pathname.includes("vendor") ? "vendor" : "customers";
  const redirect = pathname.substring(0, pathname.lastIndexOf("/"));

  const dispatch: any = useDispatch();
  const params: any = useParams();
  const isEditMode = params?.id;

  const [errorEmail, setEmailError] = useState({ status: false, msg: "" });
  const [errorDisplayName, setDisplayName] = useState({
    status: false,
    msg: "",
  });

  const [formData, setFormData] = useState({});

  const [billingAddress, setBillingAddress] = useState(true);

  const [submitModal, setSubmitModal] = useState(false);

  const [cancelModal, setCancelModal] = useState(false);

  const [cityData, setCityData] = useState(false);

  const {
    imageUrl,
    citiesList,
    shippingCitiesList,
    customerDetails,
    selectedState,
    customersList,
  } = useSelector((state: any) => state.customerListSlice);
  const { state: stateList } = useSelector((state: any) => state.commonSlice);
  useEffect(() => {
    dispatch(updateCustomer({ customerDetails: {} }));
    if (isEditMode != undefined) {
      dispatch(getCustomerDetail(params.id));
    } else {
      dispatch(
        updateCustomer({
          citiesList: [],
          shippingCitiesList: [],
        })
      );
    }
  }, [isEditMode, params.id]);

  const getInitialValues = useCallback(() => {
    return {
      displayName: customerDetails ? customerDetails?.displayName : "",
      primaryContactName: customerDetails
        ? customerDetails?.primaryContactName
        : "",
      email: customerDetails ? customerDetails?.email : "",
      phoneNumber: customerDetails ? customerDetails?.phoneNumber : "",
      website: customerDetails ? customerDetails?.website : "",
      image: customerDetails ? customerDetails?.image : "",
      accountNumber: customerDetails
        ? customerDetails?.bankDetails?.accountNumber
        : "",
      ifscCode: customerDetails ? customerDetails?.bankDetails?.ifscCode : "",
      bankName: customerDetails ? customerDetails?.bankDetails?.bankName : "",
      branchName: customerDetails
        ? customerDetails?.bankDetails?.branchName
        : "",
      panCard: customerDetails ? customerDetails?.gstDetails?.panCard : "",
      gstin: customerDetails ? customerDetails?.gstDetails?.gstNumber : "",
      addressLine1: customerDetails
        ? customerDetails?.billingAddress?.addressLine1
        : "",
      addressLine2: customerDetails
        ? customerDetails?.billingAddress?.addressLine2
        : "",
      townCity: isEditMode ? customerDetails?.billingAddress?.townCity : "",
      zip: customerDetails ? customerDetails?.billingAddress?.zipCode : "",
      state: isEditMode ? customerDetails?.billingAddress?.state : "",
      shippingAddress1: customerDetails
        ? customerDetails?.shippingAddress?.addressLine1
        : "",
      shippingAddressLine2: customerDetails
        ? customerDetails?.shippingAddress?.addressLine2
        : "",
      shippingTownCity: customerDetails
        ? customerDetails?.shippingAddress?.townCity
        : "",
      shippingState: customerDetails
        ? customerDetails?.shippingAddress?.state
        : "",
      shippingZipCode: customerDetails
        ? customerDetails?.shippingAddress?.zipCode
        : "",
      isBillingAndShippingAddressSame: isEditMode
        ? customerDetails?.isBillingAndShippingAddressSame
        : true,
      isCustomerVendor: isEditMode
        ? customerDetails.isCustomerVendor == 3
          ? true
          : false
        : false,
      isEditMode: "",
      customerVendorId: "",
      type: type,
    };
  }, [customerDetails]);

  const goToCustomerList = () => {
    if (!isEditMode) {
      navigate(redirect);
    } else {
      const route = redirect.substring(0, redirect.lastIndexOf("/"));
      navigate(route);
    }
  };

  /* Custom validation for check the email exist in database*/

  const checkEmailExist = (value: string) => {
    dispatch(
      checkDetailExist("email", value, (res: any) => {
        if (res?.data?.responseCode == 200) {
          setEmailError({ status: true, msg: "" });
        } else {
          setEmailError({ status: false, msg: res.responseMsg });
        }
      })
    );
  };

  const checkdisplayNameExist = (value: string) => {
    if (!value) {
      setDisplayName({ status: false, msg: "Please provide a Display name!" });
      return;
    }
    dispatch(
      checkDetailExist("displayName", value, (res: any) => {
        if (res?.data?.responseCode === 200) {
          setDisplayName({ status: true, msg: "" });
        } else {
          setDisplayName({ status: false, msg: res.responseMsg });
        }
      })
    );
  };
  useEffect(() => {
    if (customerDetails.billingAddress) {
      let getisoCode = stateList?.filter((v: any) => {
        return v.name == customerDetails?.billingAddress?.state;
      })[0];
      dispatch(getCitiesList({ isoCode: getisoCode.isoCode, type: "cities" }));

      let getShippingCity = stateList?.filter((v: any) => {
        return v.name == customerDetails?.shippingAddress?.state;
      })[0];

      dispatch(
        getCitiesList({
          isoCode: getShippingCity.isoCode,
          type: "shippingcities",
        })
      );

      setCityData(true);
      setBillingAddress(customerDetails?.isBillingAndShippingAddressSame);
    }
  }, [customerDetails]);
  return (
    <>
      <Breadcrumbs />

      {(isEditMode ? customerDetails?.billingAddress?.state : true) && (
        <Formik
          initialValues={getInitialValues()}
          enableReinitialize={true}
          validateOnChange={true}
          validationSchema={Schema.CustomerSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (!isEditMode) {
              if (!errorEmail.status) {
                setEmailError({
                  status: false,
                  msg: "",
                });
                return;
              }
            }
            values.isBillingAndShippingAddressSame = billingAddress;
            values.isEditMode = isEditMode;
            values.customerVendorId = isEditMode;
            if (!isEditMode) {
              dispatch(addAddCustomer(values, goToCustomerList));
            } else {
              setFormData(values);
              setSubmitModal(true);
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
            dirty,
          }) => {
            return (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                <div className="bg-white m-b-20">
                  {/*<div className="Dflex al-cnt sp-bt">
                    <Typography className="card-heading m-b-30" variant="h5">
                      Basic Info
                    </Typography>
                    <FormControlLabel
                      className="m-b-30"
                      control={
                        <Checkbox
                          name="isCustomerVendor"
                          onChange={(e: any) => {
                            setFieldValue("isCustomerVendor", e.target.checked);
                          }}
                          checked={values.isCustomerVendor}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label={
                        "Make " + (type == "vendor" ? "Customer" : "Vendor")
                      }
                    />
                    </div>*/}
                  <Grid container rowSpacing={3} columnSpacing={2}>
                    <Grid item md={3} lg={2}>
                      {
                        <UploadImage
                          file={imageUrl}
                          onDelete={() => {
                            handleChange({
                              target: {
                                name: "image",
                                value: "",
                              },
                            });
                            dispatch(
                              updateCustomer({
                                imageUrl: "",
                              })
                            );
                          }}
                          onChange={(e: any) => {
                            handleChange({
                              target: {
                                name: "image",
                                value: "",
                              },
                            });
                            dispatch(
                              getPresignedurl(
                                `${Math.floor(Date.now() / 1000)}`,
                                e.target.files[0].type.split("/")[1],
                                e.target.files[0]
                              )
                            );
                          }}
                          type="customer"
                        />
                      }
                    </Grid>
                    <Grid item md={9} lg={10}>
                      <Grid container rowSpacing={3} columnSpacing={2}>
                        <Grid item xs={12} md={6} lg={4}>
                          <NormalInput
                            name={"displayName"}
                            values={values.displayName}
                            isRequired
                            type={"text"}
                            focused={false}
                            sizeval="medium"
                            className="red-helper-cover"
                            label="Name"
                            onChange={(e: any) => {
                              setFieldValue("displayName", e.target.value);
                            }}
                            onBlur={(e: any) => {
                              checkdisplayNameExist(e.target.value);
                              handleBlur(e);
                            }}
                            error={Boolean(errorDisplayName.msg)}
                            helperText={errorDisplayName.msg}
                          />
                          {errors.displayName &&
                            errorDisplayName.msg == "" &&
                            touched.displayName && (
                              <p
                                className="filterDateError"
                                style={{ color: "#d32f2f" }}
                              >
                                {`${errors?.displayName}`}
                              </p>
                            )}
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                          <NormalInput
                            name={"primaryContactName"}
                            values={values.primaryContactName}
                            isRequired
                            type={"text"}
                            focused={false}
                            onBlur={handleBlur}
                            sizeval="medium"
                            label="Primary Contact Name"
                            onChange={(e: any) => {
                              setFieldValue(
                                "primaryContactName",
                                e.target.value
                              );
                            }}
                            error={
                              Boolean(touched.primaryContactName) &&
                              errors.primaryContactName
                            }
                            helperText={
                              touched.primaryContactName &&
                              errors.primaryContactName
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                          <NormalInput
                            name={"phoneNumber"}
                            values={values.phoneNumber}
                            isRequired
                            type={"number"}
                            focused={false}
                            onBlur={handleBlur}
                            sizeval="medium"
                            label="Phone Number"
                            onChange={(e: any) => {
                              setFieldValue("phoneNumber", e.target.value);
                            }}
                            error={
                              Boolean(touched.phoneNumber) && errors.phoneNumber
                            }
                            onKeyDown={(e: any) =>
                              phonePreventText.includes(e.key) &&
                              e.preventDefault()
                            }
                            helperText={
                              touched.phoneNumber && errors.phoneNumber
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                          <NormalInput
                            name={"email"}
                            values={values.email}
                            isRequired
                            type={"text"}
                            focused={false}
                            sizeval="medium"
                            className="red-helper-cover"
                            label="Email"
                            onChange={(e: any) => {
                              setFieldValue("email", e.target.value);
                            }}
                            onBlur={(e: any) => {
                              checkEmailExist(e.target.value);
                              handleBlur(e);
                            }}
                            //error={Boolean(errorEmail.status)}
                            helperText={errorEmail.msg}
                          />
                          {errors.email && touched.email && (
                            <p
                              className="filterDateError"
                              style={{ color: "#d32f2f" }}
                            >
                              {`${errors?.email}`}
                            </p>
                          )}
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                          <NormalInput
                            name={"website"}
                            values={values.website}
                            type={"text"}
                            focused={false}
                            onBlur={handleBlur}
                            sizeval="medium"
                            label="Website"
                            onChange={(e: any) => {
                              setFieldValue("website", e.target.value);
                            }}
                            error={Boolean(touched.website) && errors.website}
                            helperText={touched.website && errors.website}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
                <div className="bg-white m-b-20">
                  <Typography className="color-purple m-b-20" variant="h6">
                    Bank Account Details (Optional)
                  </Typography>
                  <Grid container rowSpacing={3} columnSpacing={2}>
                    <Grid item xs={12} md={6}>
                      <NormalInput
                        name={"accountNumber"}
                        type={"number"}
                        focused={false}
                        sizeval="medium"
                        label="Account Number"
                        onBlur={handleBlur}
                        values={values.accountNumber}
                        onChange={(e: any) => {
                          setFieldValue("accountNumber", e.target.value);
                        }}
                        onKeyDown={(e: any) =>
                          phonePreventText.includes(e.key) && e.preventDefault()
                        }
                        error={
                          Boolean(touched.accountNumber) && errors.accountNumber
                        }
                        helperText={
                          touched.accountNumber && errors.accountNumber
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <NormalInput
                        name={"ifscCode"}
                        type={"text"}
                        focused={false}
                        sizeval="medium"
                        label="IFSC Code"
                        onChange={(e: any) => {
                          setFieldValue("ifscCode", e.target.value);
                        }}
                        onBlur={handleBlur}
                        values={values.ifscCode}
                        error={Boolean(touched.ifscCode) && errors.ifscCode}
                        helperText={touched.ifscCode && errors.ifscCode}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <NormalInput
                        name={"bankName"}
                        type={"text"}
                        focused={false}
                        sizeval="medium"
                        label="Bank Name"
                        values={values.bankName}
                        onChange={(e: any) => {
                          setFieldValue("bankName", e.target.value);
                        }}
                        onBlur={handleBlur}
                        error={Boolean(touched.bankName) && errors.bankName}
                        helperText={touched.bankName && errors.bankName}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <NormalInput
                        name={"branchName"}
                        type={"text"}
                        focused={false}
                        sizeval="medium"
                        label="Branch Name"
                        values={values.branchName}
                        onChange={(e: any) => {
                          setFieldValue("branchName", e.target.value);
                        }}
                        onBlur={handleBlur}
                        error={Boolean(touched.branchName) && errors.branchName}
                        helperText={touched.branchName && errors.branchName}
                      />
                    </Grid>
                  </Grid>
                </div>

                <div className="bg-white m-b-20">
                  <div className="Dflex sp-bt al-cnt wrap">
                    <Typography className="color-purple m-b-20" variant="h6">
                      Billing Address
                    </Typography>
                    <FormControlLabel
                      onChange={(event: any) => {
                        setBillingAddress(event.target.checked);
                        handleChange({
                          target: {
                            name: "isBillingAndShippingAddressSame",
                            value: event.target.checked,
                          },
                        });
                      }}
                      className="m-b-20"
                      value={billingAddress}
                      control={
                        <Switch color="primary" checked={billingAddress} />
                      }
                      label="Billing and shipping address are the same"
                      labelPlacement="start"
                    />
                  </div>
                  <Grid container rowSpacing={3} columnSpacing={2}>
                    <Grid item xs={12} md={6}>
                      <NormalInput
                        name={"addressLine1"}
                        type={"text"}
                        isRequired
                        onBlur={handleBlur}
                        focused={false}
                        sizeval="medium"
                        label="Address Line 1"
                        onChange={(e: any) => {
                          setFieldValue("addressLine1", e.target.value);
                        }}
                        error={
                          Boolean(touched.addressLine1) && errors.addressLine1
                        }
                        helperText={touched.addressLine1 && errors.addressLine1}
                        values={values.addressLine1}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <NormalInput
                        name={"addressLine2"}
                        type={"text"}
                        focused={false}
                        sizeval="medium"
                        onBlur={handleBlur}
                        label="Address Line 2"
                        onChange={(e: any) => {
                          setFieldValue("addressLine2", e.target.value);
                        }}
                        values={values.addressLine2}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <Autocomplete
                        required={true}
                        values={values.state}
                        onBlur={handleBlur}
                        label={"State"}
                        onChange={(_e: any, newValue: any) => {
                          dispatch(
                            getCitiesList({
                              isoCode: newValue?.isoCode,
                              type: "cities",
                            })
                          );
                          setFieldValue("state", newValue?.name);
                          setFieldValue("townCity", "", false);
                        }}
                        disabled={!stateList.length}
                        defaultValue={() => {
                          const index = stateList.findIndex(
                            (x: any) => x.name == values.state
                          );
                          return stateList[index];
                        }}
                        disableClearable={true}
                        size="small"
                        name="state"
                        options={stateList && stateList.length > 0 && stateList}
                        isOptionEqualToValue={(option: any, value: any) => {
                          if (
                            value === "" ||
                            option === "" ||
                            value?.name === option?.name
                          )
                            return option;
                        }}
                        getOptionLabel={(option: any) => option.name}
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
                              {option.name}
                            </Box>
                          );
                        }}
                        error={Boolean(touched.state) && errors.state}
                        helperText={touched.state && errors.state}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <React.Fragment key={values.state}>
                        {(!isEditMode ? true : citiesList.length > 0) && (
                          <Autocomplete
                            required={true}
                            values={values.townCity}
                            label={"City"}
                            onChange={(_e: any, newValue: any) => {
                              setFieldValue("townCity", newValue?.name);
                            }}
                            disableClearable={true}
                            size="small"
                            onBlur={handleBlur}
                            name="townCity"
                            error={Boolean(touched.townCity) && errors.townCity}
                            helperText={touched.townCity && errors.townCity}
                            options={citiesList}
                            isOptionEqualToValue={(option: any, value: any) => {
                              if (
                                value === "" ||
                                option === "" ||
                                value?.name === option?.name
                              )
                                return option;
                            }}
                            disabled={!citiesList.length}
                            defaultValue={() => {
                              const index = citiesList?.findIndex(
                                (x: any) => x?.name == values.townCity
                              );
                              return citiesList[index];
                            }}
                            getOptionLabel={(option: any) => option.name || ""}
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
                                  {option.name}
                                </Box>
                              );
                            }}
                          />
                        )}
                      </React.Fragment>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <NormalInput
                        name={"zip"}
                        isRequired
                        type={"number"}
                        focused={false}
                        sizeval="medium"
                        label="Zip"
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          setFieldValue("zip", e.target.value);
                        }}
                        onKeyDown={(e: any) =>
                          phonePreventText.includes(e.key) && e.preventDefault()
                        }
                        error={Boolean(touched.zip) && errors.zip}
                        helperText={touched.zip && errors.zip}
                        values={values.zip}
                      />
                    </Grid>
                  </Grid>
                </div>

                {billingAddress == false && (
                  <div className="bg-white m-b-20">
                    <div className="Dflex sp-bt al-cnt">
                      <Typography className="color-purple m-b-20" variant="h5">
                        Shipping Address
                      </Typography>
                    </div>
                    <Grid container rowSpacing={3} columnSpacing={2}>
                      <Grid item xs={12} md={6}>
                        <NormalInput
                          isRequired={!billingAddress}
                          name={"shippingAddress1"}
                          type={"text"}
                          focused={false}
                          onBlur={handleBlur}
                          sizeval="medium"
                          label="Address Line 1"
                          onChange={(e: any) => {
                            setFieldValue("shippingAddress1", e.target.value);
                          }}
                          values={values.shippingAddress1}
                          error={
                            Boolean(touched.shippingAddress1) &&
                            errors.shippingAddress1
                          }
                          helperText={
                            touched.shippingAddress1 && errors.shippingAddress1
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <NormalInput
                          name={"shippingAddressLine2"}
                          type={"text"}
                          focused={false}
                          sizeval="medium"
                          onBlur={handleBlur}
                          label="Address Line 2"
                          onChange={(e: any) => {
                            setFieldValue(
                              "shippingAddressLine2",
                              e.target.value
                            );
                          }}
                          values={values.shippingAddressLine2}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <Autocomplete
                          required={!billingAddress}
                          disabled={!stateList.length}
                          disableClearable={true}
                          values={values.shippingState}
                          label={"State"}
                          onBlur={handleBlur}
                          onChange={(_e: any, newValue: any) => {
                            dispatch(
                              getCitiesList({
                                isoCode: newValue.isoCode,
                                type: "shippingCities",
                              })
                            );
                            setFieldValue("shippingState", newValue.name);
                            setFieldValue("shippingTownCity", "", false);
                          }}
                          defaultValue={() => {
                            const index = stateList.findIndex(
                              (x: any) => x.name == values.shippingState
                            );
                            return stateList[index];
                          }}
                          size="small"
                          name="shippingState"
                          options={stateList}
                          isOptionEqualToValue={(option: any, value: any) =>
                            value === undefined ||
                            value === "" ||
                            option.name === value.name
                          }
                          getOptionLabel={(option: any) => option.name || ""}
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
                                {option.name}
                              </Box>
                            );
                          }}
                          error={
                            Boolean(billingAddress) &&
                            Boolean(touched.shippingState) &&
                            errors.shippingState
                          }
                          helperText={
                            Boolean(billingAddress) &&
                            touched.shippingState &&
                            errors.shippingState
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <React.Fragment key={values.shippingTownCity}>
                          {(!isEditMode
                            ? true
                            : shippingCitiesList.length > 0) && (
                            <Autocomplete
                              required={!billingAddress}
                              disabled={!shippingCitiesList.length}
                              isRequired
                              disableClearable={true}
                              values={values.shippingTownCity}
                              label={"City"}
                              onBlur={handleBlur}
                              onChange={(_e: any, newValue: any) => {
                                if (newValue != "")
                                  setFieldValue(
                                    "shippingTownCity",
                                    newValue.name
                                  );
                              }}
                              size="small"
                              name="shippingTownCity"
                              error={
                                Boolean(touched.shippingTownCity) &&
                                errors.shippingTownCity
                              }
                              helperText={
                                touched.shippingTownCity &&
                                errors.shippingTownCity
                              }
                              defaultValue={() => {
                                const index = shippingCitiesList?.findIndex(
                                  (x: any) => x?.name == values.shippingTownCity
                                );
                                return shippingCitiesList[index];
                              }}
                              options={shippingCitiesList}
                              isOptionEqualToValue={(
                                option: any,
                                value: any
                              ) => {
                                if (
                                  value === "" ||
                                  option === "" ||
                                  value.name === option.name
                                )
                                  return option;
                              }}
                              getOptionLabel={(option: any) =>
                                option.name || ""
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
                                    {option.name}
                                  </Box>
                                );
                              }}
                            />
                          )}
                        </React.Fragment>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <NormalInput
                          name={"shippingZipCode"}
                          isRequired={!billingAddress}
                          type={"number"}
                          focused={false}
                          onBlur={handleBlur}
                          sizeval="medium"
                          label="Zip"
                          onChange={(e: any) => {
                            setFieldValue("shippingZipCode", e.target.value);
                          }}
                          values={values.shippingZipCode}
                          onKeyDown={(e: any) =>
                            phonePreventText.includes(e.key) &&
                            e.preventDefault()
                          }
                          error={
                            Boolean(touched.shippingZipCode) &&
                            errors.shippingZipCode
                          }
                          helperText={
                            touched.shippingZipCode && errors.shippingZipCode
                          }
                        />
                      </Grid>
                    </Grid>
                  </div>
                )}

                <div className="bg-white m-b-30">
                  <Typography className="color-purple m-b-20" variant="h6">
                    Tax & GST Details (Optional)
                  </Typography>
                  <Grid container rowSpacing={3} columnSpacing={2}>
                    <Grid item xs={12} md={6}>
                      <NormalInput
                        name={"panCard"}
                        type={"text"}
                        focused={false}
                        onBlur={handleBlur}
                        sizeval="medium"
                        label="PAN Card"
                        values={values.panCard}
                        onChange={(e: any) => {
                          setFieldValue("panCard", e.target.value);
                        }}
                        error={Boolean(touched.panCard) && errors.panCard}
                        helperText={touched.panCard && errors.panCard}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <NormalInput
                        name={"gstin"}
                        type={"text"}
                        focused={false}
                        onBlur={handleBlur}
                        sizeval="medium"
                        label="GSTIN"
                        onChange={(e: any) => {
                          setFieldValue("gstin", e.target.value);
                        }}
                        values={values.gstin}
                        error={Boolean(touched.gstin) && errors.gstin}
                        helperText={touched.gstin && errors.gstin}
                      />
                    </Grid>
                  </Grid>
                </div>
                <Grid container rowSpacing={3} columnSpacing={2}>
                  <Grid item xs={6} md={4} lg={3}>
                    <NormalButton
                      // type="button"
                      variant="contained"
                      buttonText="CANCEL"
                      className="btn-simple w-100"
                      onPress={() => {
                        setCancelModal(true);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={4} lg={3}>
                    <NormalButton
                      type="submit"
                      variant="contained"
                      buttonText="SAVE"
                      disabled={!(isValid && dirty)}
                      className="btn-purple w-100"
                    />
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      )}

      <DeleteDialog
        dialogOpen={submitModal}
        dialogTitle={type}
        yesHandle={() => {
          dispatch(addAddCustomer(formData, goToCustomerList));
          setSubmitModal(false);
        }}
        handleDialogClose={() => setSubmitModal(false)}
        dialogPara={`Are you sure you want to Edit this ${type}`}
        nvCancel="Cancel"
        nvYes="Yes"
      />
      <DeleteDialog
        dialogOpen={cancelModal}
        dialogTitle={"Close"}
        yesHandle={() => {
          goToCustomerList();
          setCancelModal(false);
        }}
        handleDialogClose={() => setCancelModal(false)}
        dialogPara={`Are you sure you want to Close this?`}
        nvCancel="Cancel"
        nvYes="Yes"
      />
    </>
  );
};

export default CustomerAdd;
