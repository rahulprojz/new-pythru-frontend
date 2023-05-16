import { Button, Dialog, Typography } from "@mui/material";
import React, { useState } from "react";
import NormalButton from "../../buttons/normalButton";
import PasswordInput from "../../inputs/passwordInput";
import GoogleLogin from "react-google-login";
import { EstimateLabel, GoogleIMG } from "../../../constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  login,
  logout,
  socialLogin,
} from "../../../screens/onboarding/login/action";
import "./login.scss";
import {
  addDefaultSrc,
  Alert,
  getEmailInSession,
  getImageInSession,
  getNamefromSession,
  valideWhiteSpace,
} from "../../../utils";
import { useSelector } from "react-redux";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
}

const profilePic =
  "https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg";
const Login = (props: DialogProps) => {
  const { open, handleClose } = props;
  const Navigate = useNavigate();
  const dispatch: any = useDispatch();
  const pathname = useLocation().pathname;
  const { organizationDeatil } = useSelector(
    (state: any) => state.settingSlice
  );
  const [password, setPassword] = useState<string>("");
  const email = getEmailInSession();
  /*******Google login on success */
  const responseGoogle = (res: any) => {
    if (res?.tokenId) {
      dispatch(socialLogin(res, Navigate, pathname, handleClose));
    }
    // if (res?.error) {
    //   Alert(
    //     2,
    //     "Googgle Initilization failed for this current browser google Account, Please  by different accoiunt"
    //   );
    // }
  };

  const handleLogin = () => {
    const values = {
      email: email,
      password: password,
    };
    dispatch(login(values, Navigate, handleClose, pathname));
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    if (!valideWhiteSpace(value)) {
      setPassword(value);
    }
  };

  const handleLogOut = () => {
    handleClose();
    dispatch(logout(Navigate));
  };
  return (
    <>
      <Dialog
        open={open}
        className="lg_dialog_frm dark_backdrop"
        //  onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="loginForm">
          <Typography variant="subtitle1" className="bold m-b-30">
            Hey There!
            <br />
            Ready to get back to login?
          </Typography>

          <figure className="user_img">
            <img
              onError={(e) => addDefaultSrc(e, profilePic)}
              src={organizationDeatil?.companyLogoUrl || profilePic}
              alt="profile-pic"
              width="100"
              height="100"
            />
          </figure>
          <p className="email">{getEmailInSession()}</p>

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
              values={password}
              onChange={handleChange}
            />
          </div>
          <Typography
            variant="subtitle2"
            className="lg_pop_trm color-label m-t-15"
          >
            {/* Protected by reCAPTCHA. Google{" "} */}
            <a
              href="https://www.pythru.com/privacy-policy"
              target="_blank"
              className="bold color-purple"
            >
              Privacy Policy
            </a>{" "}
            &{" "}
            <a
              href=" https://www.pythru.com/terms-of-use"
              target="_blank"
              className="bold color-purple"
            >
              Terms of Services
            </a>{" "}
            applied.
          </Typography>
          <NormalButton
            disabled={!email || !password}
            variant="contained"
            buttonText="Login"
            className="btn btn-onboarding login_btn m-t-30"
            onPress={handleLogin}
          />
          <div className="or">Or</div>
          <GoogleLogin
            clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            // buttonText="Login"
            render={(renderProps: any) => (
              <Button
                onClick={renderProps.onClick}
                variant="outlined"
                className="googleBtn"
              >
                <img src={GoogleIMG} /> &nbsp;&nbsp; Sign in with Google
              </Button>
            )}
            onSuccess={(res: any) => responseGoogle(res)}
            onFailure={responseGoogle}
            // isSignedIn={true}
            cookiePolicy="single_host_origin"
          />
          <Link
            to=""
            onClick={(e: any) => {
              e?.preventDefault();
              handleLogOut();
            }}
            className="text_nav themeBlack"
          >
            Login to a different account
          </Link>
        </div>
      </Dialog>
    </>
  );
};
export default Login;
