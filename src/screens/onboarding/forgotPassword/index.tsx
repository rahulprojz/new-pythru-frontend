import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../../../components/Hoc/auth";
import NormalInput from "../../../components/inputs/normalInput";
import {
  OTPIMAGE,
  emailIMG,
  phoneRegExp,
  emailRegExp,
} from "../../../constants";
import { Formik, Form } from "formik";
import RoutesPaths, { routesConstant } from "../../../constants/RouteConstants";
import "../login/login.scss";
import {  useDispatch } from "react-redux";
import { userEmailOrPhone } from "./forgotPasswordSlice";

import NormalButton from "../../../components/buttons/normalButton";
import { forgotPassword } from "./action";
function Login() {
  const Navigate = useNavigate();
  document.title = "Forgot Password | PyThru";
  const dispatch: any = useDispatch();
  const [usernameError, setUserNameError] = useState("");

  const initialValues = {
    email: "",
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
      authLtImg={OTPIMAGE}
      txtBottom="Don’t have an account? "
      nvLinkBottom={routesConstant.routeConstants.login}
      nvTxtBottom="Sign In"
      headingTxt="Forgot Password?"
      authPara="We are here to help you to recover your password"
    >
      <div className="authForm">
        <h1>Don’t Worry</h1>
        <h2>Enter your email/mobile number below, and we’ll send the OTP</h2>
        <div className={"insideWrap"}>
          <Formik
            initialValues={initialValues}
            // validationSchema={Schema.forgotPasswordSchema}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(forgotPassword(values, Navigate, setSubmitting));
              dispatch(userEmailOrPhone(values.email));
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
                    type={"text"}
                    focused={false}
                    inpImg={emailIMG}
                    maxLength={60}
                    sizeval="medium"
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

                <NormalButton
                  type="submit"
                  className="btn-onboarding"
                  variant="contained"
                  disabled={
                    !values.email || (values.email && Boolean(usernameError))
                  }
                  buttonText="SEND OTP"
                  // disabled={!(isValid && dirty) || isSubmitting}
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
