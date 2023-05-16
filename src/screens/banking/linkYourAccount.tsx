import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import { ICICI_CONNECTED_LOGO } from "../../constants";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import NormalButton from "../../components/buttons/normalButton";

import "./banking.scss";

import "react-datepicker/dist/react-datepicker.css";

import { Button, DialogContent, TextField } from "@mui/material";

import { Formik, Form, FieldArray, Field, FormikErrors, getIn } from "formik";
import Schema from "../../schema";
import NormalInput from "../../components/inputs/normalInput";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { linkToIciciAccount } from "./action";

interface account {
  openLinkYourAccount: boolean;
  setOpenLinkYourAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

function Index(props: account) {
  const { openLinkYourAccount, setOpenLinkYourAccount } = props;
  const dispatch: any = useDispatch();
  const initialvalue = {
    CORPID: "",
    USERID: "",
    ACCOUNTNO: "",
    IFSC: "",
    ACCOUNTHOLDERNAME: "",
    ALIASID: "",
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
  };
  return (
    <>
      <Modal
        open={openLinkYourAccount}
        onClose={() => setOpenLinkYourAccount(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="link-account-modal"
      >
        <Box sx={style}>
          <Button
            autoFocus
            variant="contained"
            className="close"
            color="error"
            onClick={() => setOpenLinkYourAccount(false)}
          >
            <CloseIcon />
          </Button>
          <div className="dialog-cover">
            <div className="img-cover">
              <img
                src={ICICI_CONNECTED_LOGO}
                style={{ margin: "auto", width: "auto", maxWidth: "80%" }}
              />
            </div>
            <Typography
              variant="body1"
              className="color-purple bold m-b-20 m-t-20"
            >
              Link Your ICICI Bank Account
            </Typography>

            <Formik
              initialValues={initialvalue}
              enableReinitialize={true}
              validateOnChange={true}
              validationSchema={Schema.LinkToAccountSchema}
              onSubmit={(values: any, { setSubmitting }) => {
                values.ACCOUNTNO = String(values.ACCOUNTNO);
                dispatch(linkToIciciAccount(values, setOpenLinkYourAccount));
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
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <NormalInput
                        name={"CORPID"}
                        values={values.CORPID}
                        isRequired
                        type="text"
                        focused={false}
                        onBlur={handleBlur}
                        sizeval="medium"
                        label="Corporate ID"
                        onChange={handleChange}
                        error={Boolean(touched.CORPID) && errors.CORPID}
                        helperText={touched.CORPID && errors.CORPID}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NormalInput
                        name={"USERID"}
                        values={values.USERID}
                        isRequired
                        type={"text"}
                        focused={false}
                        onBlur={handleBlur}
                        sizeval="medium"
                        label="Bank User ID"
                        onChange={handleChange}
                        error={Boolean(touched.USERID) && errors.USERID}
                        helperText={touched.USERID && errors.USERID}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NormalInput
                        name={"ALIASID"}
                        values={values.ALIASID}
                        type={"text"}
                        focused={false}
                        onBlur={handleBlur}
                        sizeval="medium"
                        label="Alias ID(Optional)"
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NormalInput
                        name={"ACCOUNTNO"}
                        values={values.ACCOUNTNO}
                        isRequired
                        type={"text"}
                        focused={false}
                        onBlur={handleBlur}
                        sizeval="medium"
                        label="Account Number"
                        onChange={handleChange}
                        error={Boolean(touched.ACCOUNTNO) && errors.ACCOUNTNO}
                        helperText={touched.ACCOUNTNO && errors.ACCOUNTNO}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NormalInput
                        name={"ACCOUNTHOLDERNAME"}
                        values={values.ACCOUNTHOLDERNAME}
                        isRequired
                        type={"text"}
                        focused={false}
                        onBlur={handleBlur}
                        sizeval="medium"
                        label="Account Holder Name"
                        onChange={handleChange}
                        error={
                          Boolean(touched.ACCOUNTHOLDERNAME) &&
                          errors.ACCOUNTHOLDERNAME
                        }
                        helperText={
                          touched.ACCOUNTHOLDERNAME && errors.ACCOUNTHOLDERNAME
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NormalInput
                        name={"IFSC"}
                        values={values.IFSC}
                        isRequired
                        type={"text"}
                        focused={false}
                        onBlur={handleBlur}
                        sizeval="medium"
                        label="IFSC Code"
                        onChange={handleChange}
                        error={Boolean(touched.IFSC) && errors.IFSC}
                        helperText={touched.IFSC && errors.IFSC}
                      />
                    </Grid>
                  </Grid>
                  <div className="Dflex al-cnt js-cnt">
                    <NormalButton
                      type="submit"
                      variant="contained"
                      buttonText="Link Account"
                      disabled={!(isValid && dirty)}
                      className="btn-purple m-t-30"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default Index;
