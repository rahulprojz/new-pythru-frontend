import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContainer from "../../../components/Hoc/auth";
import { AUTHIMG } from "../../../constants";
import OtpInput from "react-otp-input";
import { routesConstant } from "../../../constants";
import SubmitButton from "../../../components/buttons/normalButton";
import Timmer from "../../../components/timmer";
import "./otp.scss";
import { verifyOtp, resendOtp } from "./action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
function Login() {
  const Navigate = useNavigate();
  document.title = "Enter OTP | PyThru";
  const location: any = useLocation();
  console.log(location, "locationlocationlocation");
  const dispatch: any = useDispatch();
  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [timmer, setTimmer] = useState({ minute: 0, second: 45 });
  const [isResendOtp, setIsResendOtp] = useState(true);
  // console.log(timmer, "isResendOtp");
  const handleChange = (otp: string) => setEmailOtp(otp);
  const handleChangeMobileOtp = (otp: string) => setMobileOtp(otp);
  const resendOtpHandle = () => {
    setTimmer({ minute: 0, second: 45 });
    dispatch(
      resendOtp(() => {
        setIsResendOtp(false);
        // setTimeout(() => setIsResendOtp(true), 5000);
      }, location?.state?.accessToken)
    );
  };
  const { mobileNumber, email } = useSelector(
    (state: RootState) => state.signupSlice
  );
  useEffect(() => {
    if (!mobileNumber) {
      Navigate(routesConstant.routeConstants.signup);
    }
  }, []);
  return (
    <AuthContainer
      authLtImg={AUTHIMG}
      nvLinkBottom={routesConstant.routeConstants.login}
      headingTxt="Enter OTP"
      authPara="We are your one-stop source for all-around business solutions including payments, banking, automated accounting, and much more. Get started now!"
    >
      <div className="authForm">
        <h1>Enter OTP</h1>
        <h2>We have sent an OTP on your mobile number & Email ID</h2>
        <div className="topLink">
          Update mobile number or email?{" "}
          <Link
            to={routesConstant.routeConstants.signup}
            className="text_nav themeBlack"
          >
            Change
          </Link>
        </div>
        <div className="insideWrap">
          <div>
            <p className="phoneNoText">+91 {mobileNumber}</p>
            <OtpInput
              isInputNum
              onChange={handleChangeMobileOtp}
              value={mobileOtp}
              numInputs={6}
              className="otp"
            />
          </div>
          <div>
            <p className="phoneNoText">{email}</p>
            <OtpInput
              numInputs={6}
              isInputNum
              className="otp"
              value={emailOtp}
              onChange={handleChange}
            />
          </div>
          <Timmer
            isResendOtp={isResendOtp}
            setIsResendOtp={setIsResendOtp}
            setTimmer={setTimmer}
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
            disabled={!(emailOtp.length === 6 && mobileOtp.length === 6)}
            variant="contained"
            className="btn-onboarding"
            onPress={() =>
              dispatch(
                verifyOtp(
                  mobileOtp,
                  emailOtp,
                  Navigate,
                  location?.state?.accessToken
                )
              )
            }
            buttonText="Submit"
          />
        </div>
      </div>
    </AuthContainer>
  );
}

export default Login;
