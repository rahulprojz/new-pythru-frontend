import {
  api,
  endpoints,
  Alert,
  setPhoneInLS,
  setEmailInLS,
  setNameInSession,
  setImageInSession,
} from "../../../utils";
import { routesConstant } from "../../../constants";
import { updateToken } from "../forgotPassword/forgotPasswordSlice";
import { AppDispatch } from "../../../app/store";
import { updateGlobalLoader } from "../../../components/backdrop/backdropSlice";

export const verifyOtp = (otp: any, navigate: any, accessToken?: any) => {
  return (dispatch: AppDispatch, getState: any) => {
    
    const { email } = getState().forgotPasswordSlice;
    dispatch(updateGlobalLoader(true));
    const dataToSend = {
      mobileOtp: otp,
    };
    api.postApiCall(
      endpoints.verifyOtp,
      dataToSend,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        console.log(respData, "respDatarespDatarespData");
        // if (sessionStorage.getItem("isSocialLogin"))
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem(
          "isPhoneNumberVerified",
          respData?.data?.responseData?.user?.isPhoneNumberVerified
        );
        sessionStorage.setItem(
          "isEmailVerified",
          respData?.data?.responseData?.user?.isEmailVerified
        );
        sessionStorage.setItem("id", respData?.data?.responseData?.user?._id);
        setPhoneInLS(respData.data?.responseData?.user?.phoneNumber);
        setEmailInLS(respData.data?.responseData?.user?.email);
        setNameInSession(respData.data?.responseData?.user?.fullName);
        setImageInSession(respData.data?.responseData?.user?.avatarUrl);
        navigate(routesConstant.routeConstants.dashboard);
        // else navigate(routesConstant.routeConstants.thanksForRegister);
        // sessionStorage.removeItem("slPhoneVerification");
        // dispatch(updateToken(respData?.data?.responseData?.verificationToken));
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      },
      accessToken
    );
  };
};

// export const forgotPasswordResendOtp = (callback: any) => {
//   return (dispatch: any, getState: any) => {
//     dispatch(updateGlobalLoader(true));

//     const { email } = getState().forgotPasswordSlice;
//     const dataToSend = {
//       phoneNumberEmail: sessionStorage.getItem("slPhoneVerification"),
//     };
//     api.postApiCall(
//       endpoints.resendOtp,
//       dataToSend,
//       (respData: any) => {
//         callback();
//         dispatch(updateGlobalLoader(false));
//         Alert(1, respData?.data?.responseMsg);
//       },
//       (error: any) => {
//         dispatch(updateGlobalLoader(false));
//         let { data } = error;
//         Alert(2, data?.message || data?.responseMsg);
//       }
//     );
//   };
// };
