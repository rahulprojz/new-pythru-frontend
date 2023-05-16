import { api, endpoints, Alert } from "../../../utils";
import { routesConstant } from "../../../constants";
import { updateToken } from "../forgotPassword/forgotPasswordSlice";
import { AppDispatch } from "../../../app/store";
import { updateGlobalLoader } from "../../../components/backdrop/backdropSlice";

export const verifyOtp = (otp: any, navigate: any) => {
  return (dispatch: AppDispatch, getState: any) => {
    const { email } = getState().forgotPasswordSlice;
    dispatch(updateGlobalLoader(true));
    const dataToSend = {
      phoneNumberEmail: email,
      otp: otp,
    };
    api.postApiCall(
      endpoints.forgotPasswordVerifyOtp,
      dataToSend,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        navigate(
          `${routesConstant.routeConstants.resetPassword}?device-token=${respData?.data?.responseData?.verificationToken}`
        );
        dispatch(updateToken(respData?.data?.responseData?.verificationToken));
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const forgotPasswordResendOtp = (callback: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    const { email } = getState().forgotPasswordSlice;
    const dataToSend = {
      phoneNumberEmail: email,
    };
    api.postApiCall(
      endpoints.userForgotPassword,
      dataToSend,
      (respData: any) => {
        callback();
        dispatch(updateGlobalLoader(false));
        Alert(1, respData?.data?.responseMsg);
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};
