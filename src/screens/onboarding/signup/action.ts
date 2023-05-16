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
import { AppDispatch } from "../../../app/store";
import { updateGlobalLoader } from "../../../components/backdrop/backdropSlice";

export const signupSubmit = (values: any, navigate: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(updateGlobalLoader(true));
    const { fullName, mobileNumber, password, email } = values;
    const dataToSend = {
      fullName: fullName,
      countryCode: "+91",
      phoneNumber: mobileNumber,
      email,
      password,
    };
    api.postApiCall(
      endpoints.signup,
      dataToSend,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        navigate(routesConstant.routeConstants.otp, {
          state: {
            accessToken: respData?.data?.responseData?.token,
            id: respData?.data?.responseData?.user?._id,
          },
        });
        // sessionStorage.setItem(
        //   "accessToken",
        //   respData?.data?.responseData?.token
        // );
        sessionStorage.setItem("id", respData?.data?.responseData?.user?._id);
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
        // setSubmitting(true);
      }
    );
  };
};

/****Social Signup */

export const socialSignup = (values: any, navigate: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(updateGlobalLoader(true));
    // const { fullName, mobileNumber, password, email } = values;
    const dataToSend = {
      googleToken: values?.tokenId,
    };
    api.postApiCall(
      endpoints.socialSignup,
      dataToSend,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        if (respData?.data?.responseData?.user?.isPhoneNumberVerified) {
          sessionStorage.setItem(
            "accessToken",
            respData?.data?.responseData?.token
          );
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
        } else
          navigate(routesConstant.routeConstants.phoneVerification, {
            state: {
              accessToken: respData?.data?.responseData?.token,
            },
          });
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
        // setSubmitting(true);
      }
    );
  };
};

export const validateEmail = (email: string, callback: any) => {
  return (dispatch: AppDispatch) => {
    // dispatch(updateGlobalLoader(true));
    // const { email } = values;
    const dataToSend = {
      email,
    };
    api.postApiCall(
      endpoints.checkEmailAvailability,
      dataToSend,
      (respData: any) => {
        callback(respData);
      },
      (error: any) => {
        callback(error);
        let { data } = error;
      }
    );
  };
};

export const validatePhone = (phone: string, callback: any) => {
  return (dispatch: AppDispatch) => {
    const dataToSend = {
      phoneNumber: `${phone}`,
      countryCode: "+91",
    };

    api.postApiCall(
      endpoints.checkPhoneAvailability,
      dataToSend,
      (respData: any) => {
        callback(respData);
      },
      (error: any) => {
        callback(error);
        let { data } = error;
      }
    );
  };
};
