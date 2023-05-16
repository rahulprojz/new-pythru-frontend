import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContainer from "../../../components/Hoc/auth";
import PhoneNumberField from "../../../components/inputs/phoneNumberField/";
import { OTPIMAGE, phoneRegExp, phonePreventText } from "../../../constants";
import { Formik, Form } from "formik";
import { PHONEIMG } from "../../../constants";
import { routesConstant } from "../../../constants/RouteConstants";
import "../login/login.scss";
import { useDispatch } from "react-redux";
import { validatePhone } from "../signup/action";
import NormalButton from "../../../components/buttons/normalButton";
import { forgotPassword } from "./action";
import { userEmailOrPhone } from "./forgotPasswordSlice";
import { useSelector } from "react-redux";
function Login() {
  const Navigate = useNavigate();
  const location = useLocation();
  const dispatch: any = useDispatch();
  const [mobileNumber, setMobileNumber]: any = useState("");
  const [phoneError, setPhoneError] = useState("");

  const { email } = useSelector((state: any) => state.forgotPasswordSlice);

  const initialValues = {
    phoneNumber: email ? email : "",
    countryCode: "+91",
  };

  useEffect(() => {
    document.title = "Phone Verification | PyThru";
    setMobileNumber(sessionStorage.getItem("slPhoneVerification"));
    // return () => {
    //   sessionStorage.removeItem("slPhoneVerification");
    // };
  }, []);
  const handleChangePhoneValidation = (val: any) => {
    if (!val) {
      setPhoneError("Mobile Number is required");
      return;
    }
    if (val?.charAt(0) == "0") {
      setPhoneError("Please enter valid Mobile Number");
      return;
    }
    if (val?.length < 10) {
      setPhoneError("Please enter valid Mobile Number");
      return;
    }
    if (!val.match(phoneRegExp)) {
      setPhoneError("Please enter valid Mobile Number");
      return;
    }
    if (val.match(phoneRegExp)) {
      setPhoneError("");
    }
    if (val.length === 10) {
      dispatch(
        validatePhone(val, (res: any) => {
          if (res?.data?.success) {
            setPhoneError("");
            return;
          } else setPhoneError("Mobile Number alredy exist");
        })
      );
    }
  };
  // const handleBlurPhoneValidation = (val: any) => {
  //   if (!val) {
  //     setPhoneError("Phone No is required");
  //     return;
  //   }
  //   if (val?.length < 9) {
  //     setPhoneError("Please enter valid phone No");
  //     return;
  //   }
  //   if (!val.match(phoneRegExp)) {
  //     setPhoneError("Please enter valid Phone No");
  //     return;
  //   }
  //   if (val.length === 10) {
  //     dispatch(
  //       validatePhone(val, (res: any) => {
  //         if (res?.data?.success) {
  //           setPhoneError("");
  //           return;
  //         } else setPhoneError("Phone No alredy exist");
  //       })
  //     );
  //   }
  // };
  return (
    <AuthContainer
      authLtImg={OTPIMAGE}
      txtBottom="Back to  "
      nvLinkBottom={routesConstant.routeConstants.login}
      nvTxtBottom="Sign In"
      headingTxt="Verify Mobile Number"
    >
      <div className="authForm">
        <h1>Enter Mobile Number</h1>
        <h2>Enter your Mobile number below, and we’ll send you OTP</h2>
        <div className={"insideWrap"}>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={(values, { setSubmitting }) => {
              dispatch(
                forgotPassword(
                  values,
                  Navigate,
                  setSubmitting,
                  location?.state?.accessToken
                )
              );
              dispatch(userEmailOrPhone(values.phoneNumber));
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
              setFieldTouched,
            }) => (
              <Form>
                <div className="lg_inp m-b-30">
                  <PhoneNumberField
                    className="onboarding-input"
                    name={"phoneNumber"}
                    isRequired
                    type={"number"}
                    inpImg={PHONEIMG}
                    maxLength={10}
                    focused={false}
                    sizeval="medium"
                    placeholder="Mobile Number"
                    values={values.phoneNumber}
                    onKeyDown={(e: any) =>
                      phonePreventText.includes(e.key) && e.preventDefault()
                    }
                    onChange={(e: any) => {
                      if (e.target.value.length === 11) return;
                      setFieldValue("phoneNumber", e.target.value);
                      handleChangePhoneValidation(e.target.value);
                    }}
                    onBlur={handleBlur}
                    error={Boolean(phoneError)}
                    touched={Boolean(phoneError)}
                    helperText={phoneError}
                    handleChangeCountryCode={(e: any) =>
                      setFieldValue("countryCode", e.target.value)
                    }
                    countryCode={values.countryCode}
                  />
                </div>

                <NormalButton
                  type="submit"
                  disabled={!values.phoneNumber || Boolean(phoneError)}
                  className="btn-onboarding"
                  variant="contained"
                  buttonText="SEND OTP"
                  // disabled={!isValid || isSubmitting}
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
