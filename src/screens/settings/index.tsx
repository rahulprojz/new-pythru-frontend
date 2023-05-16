import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/breadcrumb";
import Grid from "@mui/material/Grid";
import Schema from "../../schema";
import NormalInput from "../../components/inputs/normalInput";
import { UPLOAD_IMG } from "../../constants";
import ChnagePassword from "./changePassword";
import { updateCommonData } from "../../app/commonSlice";
import UploadImage from "../../components/uploadImage";

//@ts-ignore
import { Formik, Form } from "formik";
import { ADD_CIRCULAR_ICON, MINUS_CIRCULAR_ICON } from "../../constants";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import AddProductDrawer from "../../components/drawer";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import CategoryListing from "./categoryListing";
import Autocomplete from "../../components/autocomplete";
// import {updateOrganizationDetail} from
import {
  getCitiesListOnChangeofState,
  getCitiesList,
  getOrganizationDetail,
  updateOrganizationDetail,
  getPresignedurl,
} from "./action";
import NormalButton from "../../components/buttons/normalButton";
import { updateSettingsState, resetSettings } from "./settingSlice";
import Link from "@material-ui/core/Link";
import { useDispatch, useSelector } from "react-redux";
import { phonePreventText } from "../../constants";
const Settings = (data: any) => {
  const [value, setValue] = React.useState("1");
  const dispatch: any = useDispatch();
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(getOrganizationDetail());
    // return () => {
    //   dispatch(resetSettings());
    // };
  }, []);

  let { organizationDeatil } = useSelector((state: any) => state.settingSlice);
  const [imageUrl, setImageUrl] = useState<string>();
  /**initial value */
  const initialValues = {
    companyName: organizationDeatil?.companyName,
    website: organizationDeatil?.website,
    email: organizationDeatil?.email,
    contact: organizationDeatil?.phoneNumber,
    companyLogoUrl: organizationDeatil?.companyLogoUrl,
    pan: organizationDeatil?.documentInfo?.pan,
    gst: organizationDeatil?.documentInfo?.gst,
    aadhar: organizationDeatil?.documentInfo?.aadhar,
    serviceTaxNo: organizationDeatil?.documentInfo?.serviceTaxNo,
    addressLine1: organizationDeatil?.address?.addressLine1,
    addressLine2: organizationDeatil?.address?.addressLine2,
    townCity: organizationDeatil?.address?.townCity,
    state: organizationDeatil?.address?.state,
    zipCode: organizationDeatil?.address?.zipCode,
  };
  const { state, citiesList } = useSelector((state: any) => state.commonSlice);
  useEffect(() => {
    document.title = "Settings | PyThru";
    if (organizationDeatil?.address?.state) {
      const stateObj = state?.filter(
        (ele: any) => ele.name === organizationDeatil?.address?.state
      );
      dispatch(getCitiesList(stateObj[0]?.isoCode));
    }
  }, [organizationDeatil]);
  const { permissions } = useSelector((state: any) => state.commonSlice);

  return (
    <>
      <Breadcrumbs />
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Organisation Profile" value="1" className="btn" />
          <Tab label="Categories" value="2" className="btn" />
        </TabList>
        <TabPanel value="1">
          {/* {!globalLoader ? ( */}
          <Formik
            initialValues={initialValues}
            validationSchema={Schema.organizationSchema}
            enableReinitialize
            onSubmit={(values) => {
              dispatch(updateOrganizationDetail(values));
              // setFormData(values);
              // setOpenForAddEditProduct(true);
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
            }) => (
              <Form>
                {/* {console.log(errors, "errors", values)} */}
                <div className="bg-white m-b-20">
                  <div className="Dflex al-cnt sp-bt wrap m-b-10">
                    <Typography className="color-purple m-b-20" variant="h6">
                      Business Information
                    </Typography>
                    <NormalButton
                      onPress={() =>
                        dispatch(
                          updateSettingsState({ changePasswordDrawer: true })
                        )
                      }
                      variant="contained"
                      buttonText="Change password"
                      className="btn-purple m-b-20"
                    />
                  </div>
                  <Grid container spacing={3}>
                    <Grid item sm={12} md={2}>
                      <UploadImage
                        placeholder={UPLOAD_IMG}
                        type="setting"
                        label="Logo"
                        onDelete={() => setFieldValue("companyLogoUrl", "")}
                        onEdit={() =>
                          document.getElementById("uploadImage")?.click()
                        }
                        file={values.companyLogoUrl}
                        onChange={(e: any) => {
                          dispatch(
                            getPresignedurl(
                              `${Math.floor(Date.now() / 1000)}`,
                              e.target.files[0].type.split("/")[1],
                              e.target.files[0],
                              (res: any) => {
                                setFieldValue("companyLogoUrl", res);
                                setImageUrl(res);
                              }
                            )
                          );
                        }}
                      />
                    </Grid>
                    <Grid item sm={12} md={10}>
                      <Grid container columnSpacing={2} rowSpacing={3}>
                        <Grid item xs={12} sm={6}>
                          <NormalInput
                            name={"companyName"}
                            isRequired
                            values={values.companyName}
                            type={"text"}
                            onChange={handleChange}
                            focused={false}
                            sizeval="medium"
                            label="Company Name"
                            onBlur={handleBlur}
                            error={Boolean(
                              touched.companyName && errors.companyName
                            )}
                            helperText={
                              touched.companyName && errors.companyName
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <NormalInput
                            name={"fullName"}
                            isRequired
                            values={organizationDeatil?.fullName}
                            type={"text"}
                            isDisabled
                            // onChange={handleChange}
                            focused={false}
                            sizeval="medium"
                            label="full Name"
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <NormalInput
                            name={"email"}
                            isRequired
                            isDisabled
                            values={values.email}
                            type={"text"}
                            onChange={handleChange}
                            focused={false}
                            sizeval="medium"
                            label="Email"
                            onBlur={handleBlur}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <NormalInput
                            name={"website"}
                            // isRequired
                            values={values.website}
                            type={"text"}
                            onChange={handleChange}
                            focused={false}
                            sizeval="medium"
                            label="Website"
                            onBlur={handleBlur}
                            error={Boolean(touched.website && errors.website)}
                            helperText={touched.website && errors.website}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <NormalInput
                            name={"contact"}
                            isRequired
                            isDisabled
                            values={values.contact}
                            type={"text"}
                            onChange={handleChange}
                            focused={false}
                            sizeval="medium"
                            onBlur={handleBlur}
                            label="Contact"
                            error={Boolean(touched.contact && errors.contact)}
                            helperText={touched.contact && errors.contact}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
                <div className="bg-white m-b-20">
                  <Typography className="color-purple m-b-20" variant="h6">
                    Documents
                  </Typography>
                  <Grid container columnSpacing={2} rowSpacing={3}>
                    <Grid item xs={12} sm={6}>
                      <NormalInput
                        name={"pan"}
                        isRequired
                        values={values.pan}
                        type={"text"}
                        onChange={handleChange}
                        focused={false}
                        sizeval="medium"
                        label="PAN No"
                        onBlur={handleBlur}
                        error={Boolean(touched.pan && errors.pan)}
                        helperText={touched.pan && errors.pan}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NormalInput
                        name={"gst"}
                        isRequired
                        values={values.gst}
                        type={"text"}
                        onChange={handleChange}
                        focused={false}
                        sizeval="medium"
                        label="GST No"
                        onBlur={handleBlur}
                        error={Boolean(touched.gst && errors.gst)}
                        helperText={touched.gst && errors.gst}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NormalInput
                        name={"aadhar"}
                        isRequired
                        values={values.aadhar}
                        type={"number"}
                        onKeyDown={(e: any) =>
                          phonePreventText.includes(e.key) && e.preventDefault()
                        }
                        maxLength={12}
                        onChange={handleChange}
                        focused={false}
                        sizeval="medium"
                        label="Aadhaar No"
                        onBlur={handleBlur}
                        error={Boolean(touched.aadhar && errors.aadhar)}
                        helperText={touched.aadhar && errors.aadhar}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NormalInput
                        name={"serviceTaxNo"}
                        isRequired
                        values={values.serviceTaxNo}
                        type={"text"}
                        onChange={handleChange}
                        focused={false}
                        sizeval="medium"
                        label="Service Tax No"
                        onBlur={handleBlur}
                        error={Boolean(
                          touched.serviceTaxNo && errors.serviceTaxNo
                        )}
                        helperText={touched.serviceTaxNo && errors.serviceTaxNo}
                      />
                    </Grid>
                  </Grid>
                </div>
                <div className="bg-white m-b-30">
                  <Typography className="color-purple m-b-20" variant="h6">
                    Address Info
                  </Typography>
                  <Grid container columnSpacing={2} rowSpacing={3}>
                    <Grid item xs={12} sm={6}>
                      <NormalInput
                        name={"addressLine1"}
                        isRequired
                        values={values.addressLine1}
                        type={"text"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        focused={false}
                        sizeval="medium"
                        label="Address Line 1"
                        error={Boolean(
                          touched.addressLine1 && errors.addressLine1
                        )}
                        helperText={touched.addressLine1 && errors.addressLine1}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NormalInput
                        name={"addressLine2"}
                        isRequired
                        values={values.addressLine2}
                        type={"text"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        focused={false}
                        sizeval="medium"
                        label="Address Line 2"
                        error={Boolean(
                          touched.addressLine2 && errors.addressLine2
                        )}
                        helperText={touched.addressLine2 && errors.addressLine2}
                      />
                    </Grid>
                    {/* {values.state ? ( */}
                    <Grid item xs={12} sm={6} md={4}>
                      <React.Fragment key={values.state}>
                        <Autocomplete
                          disabled={false}
                          isRequired
                          values={values.state || null}
                          label={"State"}
                          onBlur={handleBlur}
                          onChange={(_e: any, newValue: any) => {
                            setFieldValue(
                              "state",
                              newValue ? newValue.name : ""
                            );
                            setFieldValue("townCity", "");
                            if (newValue.name)
                              dispatch(
                                getCitiesListOnChangeofState(newValue?.isoCode)
                              );
                          }}
                          defaultValue={() => {
                            const index = state.findIndex(
                              (x: any) => x.name == values.state
                            );
                            return state[index];
                          }}
                          size="small"
                          name="state"
                          options={state}
                          isOptionEqualToValue={(option: any, value: any) => {
                            if (
                              value === "" ||
                              option === "" ||
                              value?.name === option?.name
                            )
                              return option;
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
                          error={Boolean(touched.state) && errors.state}
                          helperText={touched.state && errors.state}
                        />
                      </React.Fragment>
                    </Grid>
                    {/* ) : (
                        <></>
                      )} */}
                    {/* {citiesList.length && values.townCity ? ( */}
                    <Grid item xs={12} sm={6} md={4}>
                      <React.Fragment key={citiesList?.length}>
                        <Autocomplete
                          disabled={false}
                          id="city1"
                          isRequired
                          values={values.townCity}
                          label={"City"}
                          onBlur={handleBlur}
                          onChange={(_e: any, newValue: any) => {
                            if (newValue != "")
                              setFieldValue(
                                "townCity",
                                newValue?.name ? newValue?.name : ""
                              );
                          }}
                          size="small"
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
                          defaultValue={() => {
                            const index = citiesList.findIndex(
                              (x: any) => x.name == values.townCity
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
                      </React.Fragment>
                    </Grid>
                    {/* ) : (
                        <></>
                      )} */}
                    {/* <Grid item sm={12} md={4}>
                      State Dropdown
                    </Grid>
                    <Grid item sm={12} md={4}>
                      <NormalInput
                        name={"townCity"}
                        type={"text"}
                        focused={false}
                        sizeval="medium"
                        
                        label="Town/City"
                      />
                    </Grid> */}
                    <Grid item xs={12} sm={6} md={4}>
                      <NormalInput
                        name={"zipCode"}
                        isRequired
                        values={values.zipCode}
                        type={"number"}
                        onChange={handleChange}
                        focused={false}
                        onBlur={handleBlur}
                        sizeval="medium"
                        label="Zip Code"
                        onKeyDown={(e: any) =>
                          phonePreventText.includes(e.key) && e.preventDefault()
                        }
                        maxLength={6}
                        error={Boolean(touched.zipCode && errors.zipCode)}
                        helperText={touched.zipCode && errors.zipCode}
                      />
                    </Grid>
                  </Grid>
                </div>
                {(permissions && permissions["settings"].edit) ||
                !permissions ? (
                  <Stack
                    spacing={2}
                    direction="row"
                    className="DFlex al-cnt"
                    sx={{
                      width: 250,
                      margin: "0 auto",
                      "&>button": { width: "100%" },
                      "&>div": { width: "100%" },
                    }}
                  >
                    <NormalButton
                      type="submit"
                      variant="contained"
                      buttonText="SAVE"
                      className="btn-purple"
                      disabled={!(isValid && dirty)}
                    />
                  </Stack>
                ) : (
                  <></>
                )}
              </Form>
            )}
          </Formik>
          {/* ) : (
            <></>
          )} */}
        </TabPanel>
        <TabPanel value="2">
          <CategoryListing />
        </TabPanel>
      </TabContext>
      <ChnagePassword />
    </>
  );
};

export default Settings;
