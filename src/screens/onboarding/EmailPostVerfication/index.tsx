import Typography from "@material-ui/core/Typography";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getChangeEstimateStatus } from "./action";
import { GREEN_CHECK_CIRCULAR } from "../../../constants";
import "./emailVerification.scss";

const index = () => {
  const location = useLocation();
  const dispatch: any = useDispatch();

  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get("token");
  const id = urlParams.get("id");
  const status = urlParams.get("status");

  console.log(id, status, token);

  useEffect(() => {
    document.title = "Email verification| PyThru";
    dispatch(getChangeEstimateStatus(id, token, status));
  }, []);
  return (
    <div className="email-verification-page">
      <img src={GREEN_CHECK_CIRCULAR} />
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="primary"
        gutterBottom
      >
        Confirmation
      </Typography>
      <Typography variant="h5" align="center" paragraph>
        Your action has been successfully saved.
        {/* You have accepted the estimate successfully! */}
      </Typography>
    </div>
  );
};

export default index;
