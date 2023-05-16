import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContainer from "../../../components/Hoc/auth";
import { OTPIMAGE } from "../../../constants";
import OtpInput from "react-otp-input";
import { routesConstant } from "../../../constants";
import SubmitButton from "../../../components/buttons/normalButton";
import Timmer from "../../../components/timmer";
import "../otp/otp.scss";
import { verifyOtp } from "./action";
import { useDispatch } from "react-redux";
import { resendOtp } from "../otp/action";
import { useSelector } from "react-redux";
function Login() {
  const Navigate = useNavigate();
  document.title = "OTP | PyThru";
  const dispatch: any = useDispatch();
  const [otp, setOtp] = useState("");
  const [timmer, setTimmer] = useState({ minute: 0, second: 45 });
  const [isResendOtp, setIsResendOtp] = useState(true);
  const handleChange = (otp: any) => setOtp(otp);
  const location = useLocation();
  const resendOtpHandle = () => {
    // setTimeout(() => setIsResendOtp(false), 100)
    setTimmer({ minute: 0, second: 45 });
    dispatch(
      resendOtp(() => {
        setIsResendOtp(false);
        setTimeout(() => setIsResendOtp(true), 5000);
      }, location?.state?.accessToken)
    );
  };
  const { email } = useSelector((state: any) => state.forgotPasswordSlice);
  useEffect(() => {
    if (!email) {
      Navigate(routesConstant.routeConstants.login);
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
        <h2>We have sent an OTP on your mobile number</h2>
        <div className="topLink">
          Update mobile number?{" "}
          <Link
            to={""}
            onClick={(e: any) => {
              e.preventDefault();
              Navigate(routesConstant.routeConstants.phoneVerification, {
                state: {
                  accessToken: location?.state?.accessToken,
                },
              });
            }}
            className="text_nav themeBlack"
          >
            Change
          </Link>
        </div>

        <div className="insideWrap">
          <p className="phoneNoText">+91 {email}</p>
          <OtpInput
            isInputNum
            value={otp}
            onChange={handleChange}
            numInputs={6}
            className="otp"
          />
          <Timmer
            setTimmer={setTimmer}
            isResendOtp={isResendOtp}
            initialMinute={timmer.minute}
            initialSeconds={timmer.second}
            onTimmerClose={() => setIsResendOtp(true)}
          />
          <div className="bottomLink m-b-20">
            Didn’t Recive the code?{" "}
            {!(timmer.minute || timmer.second) ? (
              <span
                onClick={() => resendOtpHandle()}
                className="text_nav themeBlue recendOtp"
              >
                {" "}
                Resend Code
              </span>
            ) : (
              <span className="disableResendOtp"> Resend Code</span>
            )}
          </div>
          <SubmitButton
            onPress={() =>
              dispatch(verifyOtp(otp, Navigate, location?.state?.accessToken))
            }
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
