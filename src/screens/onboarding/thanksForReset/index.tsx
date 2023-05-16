import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../../../components/Hoc/auth";
import { THANKSSMILE } from "../../../constants";
import { routesConstant } from "../../../constants/RouteConstants";
import "../login/login.scss";
import Timmer from "../../../components/timmer";
import "./thanks.scss";

function Login() {
  const Navigate = useNavigate();
  document.title = "Reset Password successfully | PyThru";

  return (
    <AuthContainer
      txtBottom="Redirect to"
      nvLinkBottom={routesConstant.routeConstants.login}
      nvTxtBottom="Home"
      isCardInCenter={true}
    >
      <div className="authForm">
        <div className="thanksSmile">
          <img src={THANKSSMILE} alt="smile" />
          <h2>Your password has been reset successfully</h2>
          <p>
            We are your one-stop source for all-around business solutions
            including payments, banking, automated accounting, and much more.
            Get started now!
          </p>
          <Timmer
            initialMinute={0}
            initialSeconds={15}
            onTimmerClose={() => Navigate(routesConstant.routeConstants.login)}
            isThanksPopup={true}
          />
        </div>
      </div>
    </AuthContainer>
  );
}

export default Login;
