import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./authContainer.scss";
import { LOGO } from "../../../constants";
// import { Box } from "@mui/material";
import GlobalLoader from "../../../components/backdrop";
import { getAuthTokenFromLS } from "../../../utils";
import { getIpAddress } from "../../../screens/onboarding/login/action";
import { useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";

interface AuthProps {
  children?: React.ReactNode;
  headingTxt?: string;
  authPara?: string;
  authLtImg?: any;
  copyRight?: boolean;
  txtBottom?: string;
  nvLinkBottom?: any;
  nvTxtBottom?: string;
  signupWp?: string;
  isCardInCenter?: Boolean;
  thanksContainer?: string;
}

function AuthContainer(props: AuthProps) {
  const {
    children,
    headingTxt,
    authPara,
    authLtImg,
    txtBottom,
    copyRight,
    nvLinkBottom,
    nvTxtBottom,
    isCardInCenter,
    signupWp,
    thanksContainer,
  } = props;
  const Navigate = useNavigate();
  const params = useParams();
  const dispatch: any = useDispatch();
  useEffect(() => {
    // setTimeout(() => {
    dispatch(getIpAddress());
    const user = getAuthTokenFromLS();

    if (user) {
      document.title = "";
      return Navigate("/dashboard");
    }
    // }, 1000);
  }, [params]);
  return (
    <>
      <GlobalLoader />
      <div className="onboarding_wrapper">
        <div className="auth_header logo-cover">
          <Link to="/">
            <img src={LOGO} />
          </Link>
        </div>
        <div className={`container ${thanksContainer ? thanksContainer : ""}`}>
          <div
            className={`${isCardInCenter ? "alignItemCenter" : ""} ${
              signupWp ? signupWp : ""
            } Dflex al-cnt sp-bt auth-ht-100`}
          >
            {isCardInCenter ? (
              <React.Fragment></React.Fragment>
            ) : (
              <div className="lt Dflex ">
                {authLtImg && (
                  <figure>
                    <img src={authLtImg} alt="" />
                  </figure>
                )}
                <div className="auth_para">
                  <h1>{headingTxt}</h1>
                  <p>{authPara}</p>
                </div>
              </div>
            )}
            <div className="rt">
              <div
                className={
                  isCardInCenter ? "confirmationCard authWrap" : "authWrap"
                }
              >
                {children}
                {txtBottom && (
                  <div className="bottomLink">
                    {txtBottom}{" "}
                    <Link to={nvLinkBottom} className="text_nav themeBlack">
                      {nvTxtBottom}
                    </Link>
                  </div>
                )}

                {copyRight && (
                  <Typography style={{color: 'var(--bs-gray-txt)', marginBottom:'-15px'}} variant="subtitle1" className="semi-bold center m-t-15">Copyright &copy; 2023, All Rights Reserved.</Typography>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AuthContainer;
