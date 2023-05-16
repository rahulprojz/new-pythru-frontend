import { api, endpoints, Alert } from "../../../utils";
import { routesConstant } from "../../../constants";
import { updateGlobalLoader } from "../../../components/backdrop/backdropSlice";

export const forgotPassword = (
  values: any,
  navigate: any,
  setSubmitting: any,
  token?: any
) => {
  return (dispatch: any) => {
    const { phoneNumber } = values;
    const dataToSend = {
      phoneNumber: `${phoneNumber}`,
      countryCode: "+91",
    };
    dispatch(updateGlobalLoader(true));
    api.postApiCall(
      endpoints.sendPhoneOtp,
      dataToSend,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);
        navigate(routesConstant.routeConstants.phoneVerificationOtp, {
          state: {
            accessToken: token,
          },
        });
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
        setSubmitting(false);
      },
      token
    );
  };
};
