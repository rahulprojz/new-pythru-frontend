import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContainer from "../../../components/Hoc/auth";
import NormalInput from "../../../components/inputs/normalInput";
import PasswordInput from "../../../components/inputs/passwordInput";
import { userEmailOrPhone } from "../phoneVerificationForSocialSignup/forgotPasswordSlice";
import {
  AUTHIMG,
  emailIMG,
  GoogleIMG,
  phoneRegExp,
  emailRegExp,
} from "../../../constants";

import { Formik, Form } from "formik";
import RoutesPaths, { routesConstant } from "../../../constants/RouteConstants";
import "./login.scss";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { login, socialLogin } from "./action";
import NormalButton from "../../../components/buttons/normalButton";
import { useDispatch } from "react-redux";
import { resetStateOfSignup } from "../signup/signupSlice";
import Schema from "../../../schema";
import Typography from "@mui/material/Typography";
function Login() {
  const Navigate = useNavigate();
  const dispatch: any = useDispatch();
  const [username, setEmail]: any = useState("");
  const [password, setPassword]: any = useState("");
  const [rememberMe, setrememberMe]: any = useState(false);
  const [usernameError, setUserNameError] = useState("");
  const initialValues = {
    email: username,
    password: password,
    rememberMe: rememberMe,
  };
  // console.log(Navigate.pathname, "navigate ");
  useEffect(() => {
    if (sessionStorage.getItem("rememberMe")) {
      setEmail(sessionStorage.getItem("email"));
      setPassword(sessionStorage.getItem("password"));
      setrememberMe(Boolean(sessionStorage.getItem("rememberMe")));
    }
    document.title = "Login | PyThru";
  }, []);
  // const clientId =
  //   "722402245044-ipvl871ieactsdtaftjnv7jt9klcaqo4.apps.googleusercontent.com";

  // console.log(initialValues,"initialValues")
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
    return () => {
      dispatch(resetStateOfSignup());
      dispatch(userEmailOrPhone(""));
    };
  }, []);
  /*******Google login on success */
  const responseGoogle = (res: any) => {
    if (res?.tokenId) dispatch(socialLogin(res, Navigate));
  };

  const validateUserName = (val: any) => {
    if (!val) {
      setUserNameError("Email/Mobile Number is required");
      return;
    }

    if (!(val.match(phoneRegExp) || val.match(emailRegExp))) {
      setUserNameError("Please enter valid Email/Mobile Number");
      return;
    }
    if (val.match(phoneRegExp) || val.match(emailRegExp)) {
      setUserNameError("");
      return;
    }
  };
  return (
    <AuthContainer
      authLtImg={AUTHIMG}
      txtBottom="Don’t have an account? "
      nvLinkBottom={routesConstant.routeConstants.signup}
      copyRight={true}
      nvTxtBottom="Create"
      headingTxt="Welcome Back!"
      authPara="We are your one-stop source for all-around business solutions including payments, banking, automated accounting, and much more. Get started now!"
    >
      <div className="authForm">
        <h1>Hello!</h1>
        <h2>Sign in or Register PyThru Account</h2>

        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Open alert dialog
        </Button> */}
        <div className={"insideWrap"}>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={Schema.LoginSchema}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(
                login(
                  values,
                  Navigate,
                  () => {
                    if (values.rememberMe) {
                      sessionStorage.setItem("email", values.email);
                      sessionStorage.setItem("password", values.password);
                      sessionStorage.setItem(
                        "rememberMe",
                        `${values.rememberMe}`
                      );
                    } else {
                      sessionStorage.removeItem("password");
                      sessionStorage.removeItem("rememberMe");
                    }
                  },
                  "/dashboard",
                  setSubmitting,
                  true
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
                  <NormalInput
                    className="onboarding-input"
                    name={"email"}
                    isRequired
                    isShrink
                    type={"text"}
                    focused={false}
                    inpImg={emailIMG}
                    sizeval="medium"
                    maxLength={60}
                    label="Email/Mobile Number"
                    values={values.email}
                    onChange={(e: any) => {
                      setFieldValue("email", e.target.value);
                      validateUserName(e.target.value);
                    }}
                    onBlur={() => validateUserName(values.email)}
                    error={Boolean(usernameError)}
                    touched={Boolean(usernameError)}
                    helperText={usernameError}
                  />
                </div>
                <div className="lg_inp m-b-0">
                  <PasswordInput
                    className="onboarding-input"
                    type="password"
                    label="Password"
                    id="password"
                    isRequired
                    focused={false}
                    maxLength={60}
                    sizeval="medium"
                    values={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </div>
                <div className="Dflex al-cnt sp-bt p-t-25 p-b-35">
                  <div className="lg_inp checkbox">
                    <FormControlLabel
                      name="rememberMe"
                      control={
                        <Checkbox
                          color="primary"
                          onChange={handleChange}
                          name="rememberMe"
                          checked={values.rememberMe}
                        // inputProps={{
                        //   "aria-label": "rememberMe",
                        // }}
                        />
                      }
                      label={"Remember me"}
                      labelPlacement="end"
                    />
                  </div>
                  <Link
                    to={RoutesPaths.routeConstants.forgotPassword}
                    className="text_nav themeBlack"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <NormalButton
                  type="submit"
                  variant="contained"
                  className="btn-onboarding"
                  disabled={
                    !values.email ||
                    (values.email && Boolean(usernameError)) ||
                    !values.password
                  }
                  buttonText="Sign In"
                />
                <div className="or">Or</div>
                {/* <Button variant="outlined" className="googleBtn"> */}

                <GoogleLogin
                  clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                  // buttonText="Login"
                  render={(renderProps: any) => (
                    <Button
                      onClick={renderProps.onClick}
                      variant="outlined"
                      className="googleBtn"
                    >
                      {" "}
                      <img src={GoogleIMG} /> Sign in with Google{" "}
                    </Button>
                  )}
                  onSuccess={(res: any) => responseGoogle(res)}
                  onFailure={responseGoogle}
                  // isSignedIn={true}
                  cookiePolicy="single_host_origin"
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
