import { Box, Checkbox, FormControlLabel, Button } from "@mui/material";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthContainer from "../../components/Hoc/auth";
import NormalInput from "../../components/inputs/normalInput";
import PasswordInput from "../../components/inputs/passwordInput";
import { AUTHIMG, emailIMG, GoogleIMG } from "../../constants";
import { Formik, Form } from "formik";
import RoutesPaths, { routesConstant } from "../../constants/RouteConstants";
import "./login.scss";
import Schema from "../../schema";
import NormalButton from "../../components/buttons/normalButton";
function Login() {
  const Navigate = useNavigate();
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setrememberMe] = useState("");

  const initialValues = {
    email: "",
    password: password,
    rememberMe: rememberMe,
  };

  return (
    <AuthContainer
      authLtImg={AUTHIMG}
      txtBottom="Don’t have an account? "
      copyRight={true}
      nvLinkBottom={routesConstant.routeConstants.signup}
      nvTxtBottom="Create"
      headingTxt="Welcome Back!"
      authPara="We are your one-stop source for all-around business solutions including payments, banking, automated accounting, and much more. Get started now!"
    >
      <div className="authForm">
        <h1>Hello!</h1>
        <h2>Sign in or Register PyThru Account</h2>
        <div className={"insideWrap"}>
          <Formik
            initialValues={initialValues}
            validationSchema={Schema.LoginSchema}
            onSubmit={(values, { setSubmitting }) => {}}
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
              <Form>
                <div className="lg_inp m-b-30">
                  <NormalInput
                    name={"email"}
                    isRequired
                    type={"text"}
                    focused={false}
                    inpImg={emailIMG}
                    sizeval="medium"
                    placeholder="Email/Mobile Number"
                    values={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </div>
                <div className="lg_inp m-b-0">
                  <PasswordInput
                    type="password"
                    placeholder="Password"
                    id="password"
                    isRequired
                    maxLength={60}
                    focused={false}
                    sizeval="medium"
                    values={password}
                    onChange={(e: any) => setPassword(e.target.value)}
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
                          name="rememberMe"
                          value="checkedA"
                          inputProps={{
                            "aria-label": "rememberMe",
                          }}
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
                  buttonText="Sign In"
                  disabled={true}
                />
                <div className="or">Or</div>
                <Button variant="outlined" className="googleBtn">
                  <img src={GoogleIMG} /> Sign in with Google
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </AuthContainer>
  );
}

export default Login;
