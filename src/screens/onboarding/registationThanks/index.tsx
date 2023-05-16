import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../../../components/Hoc/auth";
import { THANKSSMILE } from "../../../constants";
import  { routesConstant } from "../../../constants/RouteConstants";
import "../login/login.scss";
import Timmer from "../../../components/timmer";
import "./thanks.scss";

function Login() {
  const Navigate = useNavigate();
  document.title = "Thank you for registering | PyThru";
  const [password, setPassword] = useState("");
  const [rememberMe, setrememberMe] = useState("");

  const initialValues = {
    email: "",
    password: password,
    rememberMe: rememberMe,
  };

  return (
    <AuthContainer
      txtBottom="Rediraction to  "
      nvLinkBottom={routesConstant.routeConstants.login}
      nvTxtBottom="Home"
      isCardInCenter={true}
      thanksContainer={"thanksContaine"}
    >
      <div className="authForm">
        <div className="thanksSmile">
          <img src={THANKSSMILE} alt="smile" />
          <h2>Thank you for registering!</h2>
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
