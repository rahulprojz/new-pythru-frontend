import { api, endpoints, Alert } from "../../../utils";
import { routesConstant } from "../../../constants";
import { updateGlobalLoader } from "../../../components/backdrop/backdropSlice"

export const forgotPassword = (
  values: any,
  navigate: any,
  setSubmitting: any
) => {
  return (dispatch: any) => {
    const { email } = values;
    const dataToSend = {
      phoneNumberEmail: email,
    };
    dispatch(updateGlobalLoader(true))
    api.postApiCall(
      endpoints.userForgotPassword,
      dataToSend,
      (respData: any) => {
        dispatch(updateGlobalLoader(false))
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);
        navigate(routesConstant.routeConstants.resetPasswordOtpVerification);
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false))
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
        setSubmitting(false);
      }
    );
  };
};
