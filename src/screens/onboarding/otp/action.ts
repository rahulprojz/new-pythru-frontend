import {
  api,
  endpoints,
  Alert,
  setPhoneInLS,
  setEmailInLS,
  setNameInSession,
  setImageInSession,
  setAccessTokenInLS,
} from "../../../utils";
import { routesConstant } from "../../../constants";
import { updateGlobalLoader } from "../../../components/backdrop/backdropSlice";
import { resetStateOfSignup } from "../signup/signupSlice";
export const verifyOtp = (
  mobileOtp: any,
  emailOtp: any,
  navigate: any,
  accessToken?: any
) => {
  return (dispatch: any) => {
    
    const dataToSend = {
      mobileOtp: +mobileOtp,
      emailOtp: +emailOtp,
    };
    dispatch(updateGlobalLoader(true));
    api.postApiCall(
      endpoints.verifyOtp,
      dataToSend,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        console.log(respData, "respDatarespDatarespData", accessToken);
        setPhoneInLS(respData.data?.responseData?.user?.phoneNumber);
        setEmailInLS(respData.data?.responseData?.user?.email);
        setNameInSession(respData.data?.responseData?.user?.fullName);
        setImageInSession(respData.data?.responseData?.user?.avatarUrl);
        setAccessTokenInLS(accessToken);

        navigate(routesConstant.routeConstants.dashboard);
        dispatch(resetStateOfSignup());
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
        // setSubmitting(true);
      },
      accessToken
    );
  };
};

export const resendOtp = (callback: any, token?: any) => {
  return (dispatch: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.resendOtp,
      "",
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        Alert(1, respData?.data.message);
        callback();
        // navigate(routesConstant.routeConstants.thanksForRegister);
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
        // setSubmitting(true);
      },
      token
    );
  };
};
