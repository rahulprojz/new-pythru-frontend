import { api, endpoints, Alert } from "../../../utils";
import { routesConstant } from "../../../constants";
import { AppDispatch } from "../../../app/store";
import { updateGlobalLoader } from "../../../components/backdrop/backdropSlice";

export const resetPassword = (
  values: any,
  setSubmitting: any,
  navigate: any,
  token: any
) => {
  return (dispatch: AppDispatch, getState: any) => {
    dispatch(updateGlobalLoader(true));
    // const { token } = getState().forgotPasswordSlice;
    const { password, confirmPassword } = values;
    const dataToSend = {
      token: token,
      password,
      confirmPassword,
    };
    api.postApiCall(
      endpoints.resetPassword,
      dataToSend,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        Alert(1, respData?.data?.responseMsg);
        navigate(routesConstant.routeConstants.thanksResetPassword);
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
        setSubmitting(true);
      }
    );
  };
};
