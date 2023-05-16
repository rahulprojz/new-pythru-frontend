import React, { useEffect, useState } from "react";
import NormalInput from "../inputs/normalInput";
import { Formik, Form } from "formik";
import Grid from "@mui/material/Grid";
import NormalButton from "../buttons/normalButton";
import Stack from "@mui/material/Stack";

const Filter = (data: any) => {
  const initialValues = {
    displayName: "",
    phoneNumber: "",
    email: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      //validationSchema={Schema.AddProductSchema}
      onSubmit={(values, { setSubmitting }) => {
        //dispatch(addProductServices(values))
      }}
      // validateOnChange={false}
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
      }) => (
        <Form
          onSubmit={(e) => {
            handleSubmit();
          }}
        >
          {/* {console.log(errors, values, "perror")} */}
          <Grid container rowSpacing={3} columnSpacing={2}>
            <Grid item md={10}>
              <Grid container rowSpacing={3} columnSpacing={2}>
                <Grid item sm={12} md={3}>
                  <NormalInput
                    name={"productName"}
                    isRequired
                    type={"text"}
                    focused={false}
                    sizeval="medium"
                    label="Name"
                    values={values.displayName}
                    onChange={(e: any) => {
                      //handleChangeProductName(e.target.value)
                      handleChange(e);
                    }}
                    onBlur={() => {
                      setFieldValue("checkNameExist", false);
                      setFieldValue("checkSkuExist", false);
                    }}
                    //error={Boolean(productError)}
                    //helperText={productError}
                  />
                </Grid>

                <Grid item sm={12} md={3}>
                  <NormalInput
                    name={"skuNumber"}
                    isRequired
                    type={"text"}
                    focused={false}
                    sizeval="medium"
                    label="Phone Number"
                    values={values.phoneNumber}
                    onChange={(e: any) => {
                      handleChange(e);
                      //handleChangeSku(e.target.value)
                    }}
                    onBlur={() => {
                      setFieldValue("checkNameExist", false);
                      setFieldValue("checkSkuExist", false);
                    }}
                    //error={Boolean(skuError)}
                    //helperText={skuError}
                  />
                </Grid>
                <Grid item sm={12} md={3}>
                  <NormalInput
                    name={"email"}
                    isRequired
                    type={"text"}
                    focused={false}
                    sizeval="medium"
                    label="Email"
                    values={values.email}
                    onChange={(e: any) => {
                      handleChange(e);
                      //handleChangeSku(e.target.value)
                    }}
                    onBlur={() => {
                      setFieldValue("checkNameExist", false);
                      setFieldValue("checkSkuExist", false);
                    }}
                    //error={Boolean(skuError)}
                    //helperText={skuError}
                  />
                </Grid>

                <Grid item sm={12} md={3}>
                  <NormalButton
                    type="submit"
                    variant="contained"
                    buttonText="Filter"
                    // disabled={true}
                    className="btn-purple large-radius"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default Filter;
