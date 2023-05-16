
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../../../components/Hoc/auth";
import NormalInput from "../../../components/inputs/normalInput";
import PasswordInput from "../../../components/inputs/passwordInput";
import {
  AUTHIMG,
  PHONEIMG,
  emailIMG,
  INFO,
  USERIMG,
  GoogleIMG,
  phoneRegExp,
  emailRegExp,
  phonePreventText,
} from "../../../constants";
import { Formik, Form } from "formik";
import "../login/login.scss";
import Schema from "../../../schema";
import { routesConstant } from "../../../constants";
import PhoneNumberField from "../../../components/inputs/phoneNumberField";
import NormalButton from "../../../components/buttons/normalButton";
import {
  signupSubmit,
  socialSignup,
  validateEmail,
  validatePhone,
} from "./action";
import { useDispatch } from "react-redux";
import { updateSignup } from "./signupSlice";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import GoogleLogin from "react-google-login";
import useDebounce from "../../../hooks/use.debounce";
// import { useField, useFormikContext } from 'formik';
import { gapi } from "gapi-script";
import Typography from "@material-ui/core/Typography";

function Login() {
  const Navigate = useNavigate();
  const dispatch: any = useDispatch();

  const [emailError, setEmailError] = useState("");

  const [open, setOpen] = React.useState(false);
  const [phoneError, setPhoneError] = useState("");
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  const {
    mobileNumber,
    email,
    fullName,
    password,
    confirmPassword,
    termAndCondition,
  } = useSelector((state: RootState) => state.signupSlice);

  const initialValues = {
    fullName,
    mobileNumber,
    email,
    password,
    confirmPassword,
    termAndCondition,
    countryCode: "91",
  };
  /****Google signup */
  // const clientId =
  //   "722402245044-ipvl871ieactsdtaftjnv7jt9klcaqo4.apps.googleusercontent.com";
  useEffect(() => {
    document.title = "Signup | PyThru";
    const initClient = () => {
      gapi.client.init({
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);
  const responseGoogle = (res: any) => {
    if (res?.tokenId) dispatch(socialSignup(res, Navigate));
  };

  const handleChangePhoneValidation = (val: any) => {
    if (!val) {
      setPhoneError("Mobile Number is required");
      return;
    }
    if (val?.length < 10) {
      setPhoneError("Please enter valid Mobile Number");
      return;
    }
    if (val?.charAt(0) == "0") {
      setPhoneError("Please enter valid Mobile Number");
      return;
    }
    if (!val.match(phoneRegExp)) {
      setPhoneError("Please enter valid Mobile Number");
      return;
    }
    if (val.match(phoneRegExp)) {
      setPhoneError("");
      return;
    }
  };
  const handleBlurPhoneValidation = (val: any) => {
    if (!val) {
      setPhoneError("Mobile Number is required");
      return;
    }
    if (val?.length < 9) {
      setPhoneError("Please enter valid Mobile Number");
      return;
    }
    if (val?.charAt(0) == "0") {
      setPhoneError("Please enter valid Mobile Number");
      return;
    }
    if (!val.match(phoneRegExp)) {
      setPhoneError("Please enter valid Mobile Number");
      return;
    }

    dispatch(
      validatePhone(val, (res: any) => {
        if (res?.data?.success) {
          setPhoneError("");
          return;
        } else setPhoneError("Mobile Number alredy exist");
      })
    );
  };
  const handleChanegEmail = (val: any) => {
    if (!val) {
      setEmailError("Email is required");
      return;
    }
    if (!val.match(emailRegExp)) {
      setEmailError("Please enter valid email");
      return;
    }
    if (val.match(emailRegExp)) {
      setEmailError("");
      return;
    }
  };
  const handleBlurEmail = (val: any) => {
    if (!val) {
      setEmailError("Email is required");
      return;
    }
    if (!val.match(emailRegExp)) {
      setEmailError("Please enter valid email");
      return;
    }
    dispatch(
      validateEmail(val, (res: any) => {
        if (res?.data?.success) {
          setEmailError("");
          return;
        } else setEmailError("Email alredy exist");
      })
    );
  };
  return (
    <AuthContainer
      authLtImg={AUTHIMG}
      txtBottom="Already have an account? "
      copyRight={true}
      nvLinkBottom={routesConstant.routeConstants.login}
      nvTxtBottom="Sign In"
      signupWp={"signupWrap"}
      headingTxt="Glad to see you"
      authPara="We are your one-stop source for all-around business solutions including payments, banking, automated accounting, and much more. Get started now!"
    >
      <div className="authForm">
        <h1>Hello, friend!</h1>
        <div className={"insideWrap"}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={Schema.SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(signupSubmit(values, Navigate));
              dispatch(updateSignup(values));
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
              setFieldError,
              dirty,
            }) => {
              const {
                fullName,
                mobileNumber,
                email,
                password,
                confirmPassword,
                termAndCondition,
              } = values;
              console.log(isValid, touched, "touched");
              return (
                <Form>
                  <div className="lg_inp m-b-30">
                    <NormalInput
                      className="onboarding-input"
                      name={"fullName"}
                      isRequired
                      type={"text"}
                      focused={false}
                      label="Full Name"
                      inpImg={USERIMG}
                      sizeval="medium"
                      values={fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.fullName && errors.fullName)}
                      touched={Boolean(touched.fullName)}
                      errors={Boolean(errors.fullName)}
                      helperText={touched.fullName && errors.fullName}
                    />
                  </div>
                  <div className="lg_inp mob-number m-b-30">
                    <PhoneNumberField
                      className="onboarding-input"
                      name={"mobileNumber"}
                      isRequired
                      type={"number"}
                      inpImg={PHONEIMG}
                      maxLength={10}
                      focused={false}
                      sizeval="medium"
                      label="Mobile Number"
                      values={mobileNumber}
                      onKeyDown={(e: any) =>
                        phonePreventText.includes(e.key) && e.preventDefault()
                      }
                      onChange={(e: any) => {
                        if (e.target.value.length === 11) return;
                        setFieldValue("mobileNumber", e.target.value);
                        handleChangePhoneValidation(e.target.value);
                      }}
                      onBlur={() => handleBlurPhoneValidation(mobileNumber)}
                      error={Boolean(phoneError)}
                      touched={Boolean(phoneError)}
                      helperText={phoneError}
                      handleChangeCountryCode={(e: any) =>
                        setFieldValue("countryCode", e.target.value)
                      }
                      countryCode={values.countryCode}
                      errors={Boolean(phoneError)}
                    />
                  </div>

                  <div className="lg_inp m-b-30">
                    <NormalInput
                      className="onboarding-input"
                      name={"email"}
                      isRequired
                      type={"text"}
                      inpImg={emailIMG}
                      maxLength={60}
                      label="E-mail"
                      focused={false}
                      sizeval="medium"
                      values={email}
                      onChange={(e: any) => {
                        const val = e.target.value;
                        setFieldValue("email", e.target.value);
                        handleChanegEmail(val);
                      }}
                      onBlur={() => handleBlurEmail(email)}
                      touched={Boolean(emailError)}
                      error={Boolean(emailError)}
                      helperText={emailError}
                      errors={Boolean(emailError)}
                    />
                  </div>
                  <div className="lg_inp m-b-30">
                    <PasswordInput
                      className="onboarding-input"
                      type="password"
                      label="Password"
                      id="password"
                      isRequired
                      focused={false}
                      maxLength={60}
                      sizeval="medium"
                      values={password}
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
                      id="confirmPassword"
                      label="Confirm Password"
                      isRequired
                      focused={false}
                      maxLength={60}
                      sizeval="medium"
                      values={confirmPassword}
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
                  <div className="passwordCriteria">
                    <ClickAwayListener onClickAway={handleClickAway}>
                      <Box sx={{ position: "relative" }}>
                        <Button variant="text" onClick={handleClick}>
                          <img src={INFO} alt="password Info" />
                        </Button>
                        {open ? (
                          <Box className="PsCriteria">
                            <Typography
                              variant="subtitle1"
                              className="semi-bold"
                            >
                              Password Must be
                            </Typography>
                            <ul>
                              <li>Min. 8 characters</li>
                              <li>Min. 1 uppercase letter (A,B,C,D…)</li>
                              <li>Min. 1 lowercase letter (a,b,c,d…)</li>
                              <li>Min. 1 number (1,2,3,4…)</li>
                              <li>
                                Min. 1 special characters ( @, %, &, %. *,
                                #....)
                              </li>
                            </ul>
                          </Box>
                        ) : null}
                      </Box>
                    </ClickAwayListener>
                    Password Criteria
                  </div>
                  <div className="Dflex al-cnt js-cnt fl-wp p-t-15 p-b-25">
                    <FormControlLabel
                      name="rememberMe"
                      sx={{ mr: 0 }}
                      control={
                        <Checkbox
                          color="primary"
                          onChange={handleChange}
                          name="termAndCondition"
                          checked={termAndCondition}
                          inputProps={{
                            "aria-label": "rememberMe",
                          }}
                        />
                      }
                      label={"I read and agree to"}
                      labelPlacement="end"
                    />
                    <Typography
                      variant="body1"
                      style={{ transform: "scale(0.9)", marginLeft: "-10px" }}
                    >
                      <a
                        href="https://www.pythru.com/terms-of-use"
                        target="_blank"
                        className="color-purple semi-bold m-b-10 m-t-10"
                      >
                        Terms & Conditions
                      </a>
                    </Typography>
                  </div>
                  <NormalButton
                    type="submit"
                    variant="contained"
                    buttonText="Create ACCOUNT"
                    className="btn-onboarding"
                    disabled={!isValid || !fullName}
                  />
                  <div className="or">Or</div>
                  <GoogleLogin
                    clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                    // buttonText="Login"
                    render={(renderProps: any) => (
                      <Button
                        variant="outlined"
                        className="googleBtn"
                        onClick={renderProps.onClick}
                      >
                        <img src={GoogleIMG} /> Sign up with Google
                      </Button>
                    )}
                    onSuccess={(res: any) => responseGoogle(res)}
                    onFailure={responseGoogle}
                    // isSignedIn={true}
                    cookiePolicy="single_host_origin"
                  />
                  {/* <GoogleLogin
                  clientId="722402245044-ipvl871ieactsdtaftjnv7jt9klcaqo4.apps.googleusercontent.com"
                  // buttonText="Login"
                  render={(renderProps: any) => (
                    <Button variant="outlined" className="googleBtn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      <img src={GoogleIMG} /> Sign in with Google
                    </Button>
                  )}
                  onSuccess={(res: any) => responseGoogle(res)}
                  onFailure={responseGoogle}
                  // isSignedIn={true}
                  cookiePolicy="single_host_origin"

                /> */}
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </AuthContainer>
  );
}

export default Login;
