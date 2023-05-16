import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../../../components/Hoc/auth";
import { OTPIMAGE } from "../../../constants";
import OtpInput from "react-otp-input";
import { routesConstant } from "../../../constants";
import SubmitButton from "../../../components/buttons/normalButton";
import Timmer from "../../../components/timmer";
import "../otp/otp.scss";
import { verifyOtp, forgotPasswordResendOtp } from "./action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
function Login() {
  const Navigate = useNavigate();
  document.title = "Reset Password OTP | PyThru";
  const dispatch: any = useDispatch();
  const [otp, setOtp] = useState("");
  const [timmer, setTimmer] = useState({ minute: 0, second: 45 });
  const [isResendOtp, setIsResendOtp] = useState(true);
  const handleChange = (otp: any) => setOtp(otp);

  const resendOtp = () => {
    // setTimeout(() => setIsResendOtp(false), 100)
    setTimmer({ minute: 0, second: 45 });
    dispatch(
      forgotPasswordResendOtp(() => {
        setIsResendOtp(false);
        setTimeout(() => setIsResendOtp(true), 5000);
      })
    );
  };
  const { email } = useSelector((state: any) => state.forgotPasswordSlice);
  useEffect(() => {
    if (!email) {
      Navigate(routesConstant.routeConstants.forgotPassword);
    }
  }, []);
  return (
    <AuthContainer
      authLtImg={OTPIMAGE}
      nvLinkBottom={routesConstant.routeConstants.login}
      headingTxt="Enter OTP"
      authPara="We are your one-stop source for all-around business solutions including payments, banking, automated accounting, and much more. Get started now!"
    >
      <div className="authForm">
        <h1>Enter OTP</h1>
        <h2>
          Please enter OTP which is sent to your registered mobile number or
          email Id.
        </h2>
        <div className="insideWrap">
          <div className="Dflex al-cnt js-cnt">
            <OtpInput
              isInputNum
              value={otp}
              onChange={handleChange}
              numInputs={6}
              className="otp"
            />
          </div>
          <Timmer
            setIsResendOtp={setIsResendOtp}
            isResendOtp={isResendOtp}
            setTimmer={setTimmer}
            initialMinute={timmer.minute}
            initialSeconds={timmer.second}
            onTimmerClose={() => setIsResendOtp(true)}
          />
          <div className="bottomLink m-b-20">
            Didn’t Recive the code?{" "}
            {!(timmer.minute || timmer.second) ? (
              <span
                onClick={() => resendOtp()}
                className="text_nav themeBlue recendOtp"
              >
                Resend Code
              </span>
            ) : (
              <span className="disableResendOtp"> Resend Code</span>
            )}
          </div>
          <SubmitButton
            onPress={() => dispatch(verifyOtp(otp, Navigate))}
            variant="contained"
            className="btn-onboarding"
            buttonText="Submit"
            disabled={!(otp.length === 6)}
          />
        </div>
      </div>
    </AuthContainer>
  );
}
export default Login;
