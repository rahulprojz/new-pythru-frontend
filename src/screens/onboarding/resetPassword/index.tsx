import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import AuthContainer from "../../../components/Hoc/auth";
import PasswordInput from "../../../components/inputs/passwordInput";
import { OTPIMAGE, INFO } from "../../../constants";
import { Formik, Form } from "formik";
import { routesConstant } from "../../../constants/RouteConstants";
import "../login/login.scss";
import Schema from "../../../schema";
import { resetPassword } from "./action";
import NormalButton from "../../../components/buttons/normalButton";
import { useDispatch } from "react-redux";

function Login() {
  const Navigate = useNavigate();
  document.title = "Reset Password | PyThru";
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get('device-token')); // 'name'

  const dispatch: any = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
  };

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  return (
    <AuthContainer
      authLtImg={OTPIMAGE}
      txtBottom="Back to "
      nvLinkBottom={routesConstant.routeConstants.login}
      nvTxtBottom="Sign in "
      headingTxt="Reset Password"
      authPara="We are your one-stop source for all-around business solutions including payments, banking, automated accounting, and much more. Get started now!"
    >
      <div className="authForm">
        <h1>Reset Password</h1>
        <div className={"insideWrap"}>
          <Formik
            initialValues={initialValues}
            validationSchema={Schema.ResetPasswordSchema}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(
                resetPassword(
                  values,
                  setSubmitting,
                  Navigate,
                  searchParams.get("device-token")
                )
              );
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
                <div className="lg_inp m-b-30">
                  <PasswordInput
                    className="onboarding-input"
                    type="password"
                    label="Password"
                    id="password"
                    name="password"
                    isRequired
                    maxLength={60}
                    focused={false}
                    sizeval="medium"
                    values={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </div>
                <div className="lg_inp m-b-0">
                  <PasswordInput
                    className="onboarding-input"
                    type="confirmPassword"
                    label="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    isRequired
                    focused={false}
                    maxLength={60}
                    sizeval="medium"
                    values={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                  />
                </div>
                <div className="passwordCriteria p-b-25">
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <Box sx={{ position: "relative" }}>
                      <Button variant="text" onClick={handleClick}>
                        <img src={INFO} alt="password Info" />
                      </Button>
                      {open ? (
                        <Box className="PsCriteria">
                          <div className="triangle up"></div>
                          <div className="triangle sec up"></div>
                          <h3>Password Must be</h3>
                          <ul>
                            <li>Min. 8 characters</li>
                            <li>Min. 1 uppercase letter (A,B,C,D…)</li>
                            <li>Min. 1 lowercase letter (a,b,c,d…)</li>
                            <li>Min. 1 number (1,2,3,4…)</li>
                            <li>
                              Min. 1 special characters ( @, %, &, %. *, #....)
                            </li>
                          </ul>
                        </Box>
                      ) : null}
                    </Box>
                  </ClickAwayListener>
                  Password Criteria
                </div>
                <NormalButton
                  type="submit"
                  variant="contained"
                  buttonText="Submit"
                  className="btn-onboarding"
                  disabled={!(isValid && dirty) || isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </AuthContainer>
  );
}

export default Login;
