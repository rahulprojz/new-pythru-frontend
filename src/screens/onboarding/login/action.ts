import {
  api,
  endpoints,
  Alert,
  setAccessTokenInLS,
  setPhoneInLS,
  setEmailInLS,
  setNameInSession,
  setIdInLS,
  setPermissionsInLS,
  setStateInSession,
  getEmailInSession,
  setImageInSession,
} from "../../../utils";
import { updateGlobalLoader } from "../../../components/backdrop/backdropSlice";
import {
  EstimateLabel,
  getNaigationPath,
  routesConstant,
} from "../../../constants";
import { updateCommonData } from "../../../app/commonSlice";
import axios from "axios";
export const login = (
  values: any,
  navigate: any,
  callback: any,
  path: string,
  setSubmitting?: any,
  fromLoginPage?: any
) => {
  return (dispatch: any, getState: any) => {
    const { email, password } = values;
    const { ipAddress } = getState().commonSlice;
    const dataToSend = {
      phoneNumberEmail: email,
      password,
    };
    dispatch(updateGlobalLoader(true));
    api.postApiCallForLogin(
      endpoints.login,
      dataToSend,
      (respData: any) => {
        callback();
        setAccessTokenInLS(respData.data?.responseData?.token);
        setPhoneInLS(respData.data?.responseData?.user?.phoneNumber);
        setEmailInLS(respData.data?.responseData?.user?.email);
        setIdInLS(respData.data?.responseData?.user?._id);
        setStateInSession(respData.data?.responseData?.user?.address?.state);
        setNameInSession(respData.data?.responseData?.user?.fullName);
        setImageInSession(respData.data?.responseData?.user?.companyLogoUrl);
        sessionStorage.setItem(
          "ipAddress",
          respData.data?.responseData?.lastSession?.ipAddress
        );
        sessionStorage.setItem(
          "lastLogin",
          respData.data?.responseData?.lastSession?.createdAt
        );
        console.log(respData, "respDatarespData");
        if (respData.data?.responseData?.user?.permission)
          setPermissionsInLS(respData.data?.responseData?.user?.permission);
        dispatch(
          updateCommonData({
            permissions: respData.data?.responseData?.user?.permission,
          })
        );

        if (path) {
          getNaigationPath(path, navigate);
          if (!fromLoginPage) window.location.reload();
        }
        dispatch(updateGlobalLoader(false));
      },
      (error: any) => {
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
        dispatch(updateGlobalLoader(false));
        if (setSubmitting) {
          setSubmitting(false);
        }
        // setSubmitting(true);
      },
      ipAddress
    );
  };
};
//
/****Social Login */
export const socialLogin = (
  values: any,
  navigate: any,
  path?: string,
  handleClose?: any
) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    const { ipAddress } = getState().commonSlice;
    // const { fullName, mobileNumber, password, email } = values;
    const dataToSend = {
      googleToken: values?.tokenId,
    };

    api.postApiCallForLogin(
      endpoints.socialLogin,
      dataToSend,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        setAccessTokenInLS(respData.data?.responseData?.token);
        setPhoneInLS(respData.data?.responseData?.user?.phoneNumber);

        setIdInLS(respData.data?.responseData?.user?._id);
        setNameInSession(respData.data?.responseData?.user?.fullName);
        sessionStorage.setItem("id", respData?.data?.responseData?.user?._id);

        if (path) {
          if (!respData?.data?.responseData?.user?.isPhoneNumberVerified) {
            sessionStorage.clear();
            sessionStorage.setItem("isSocialLogin", "true");
            navigate(routesConstant.routeConstants.phoneVerification, {
              state: {
                accessToken: respData.data?.responseData?.token,
              },
            });
            return;
          }
          handleClose();
          if (
            respData.data?.responseData?.user?.email === getEmailInSession()
          ) {
            getNaigationPath(path, navigate);
            window.location.reload();
          } else {
            navigate("/dashboard");
          }
        } else {
          if (respData?.data?.responseData?.user?.isPhoneNumberVerified) {
            navigate(routesConstant.routeConstants.dashboard);
          } else {
            sessionStorage.clear();
            sessionStorage.setItem("isSocialLogin", "true");
            navigate(routesConstant.routeConstants.phoneVerification, {
              state: {
                accessToken: respData.data?.responseData?.token,
              },
            });
          }
        }
        setEmailInLS(respData.data?.responseData?.user?.email);
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
        // setSubmitting(true);
      },
      ipAddress
    );
  };
};

export const logout = (navigate: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.logout,
      ``,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        if (sessionStorage.getItem("rememberMe")) {
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("phone");
          sessionStorage.removeItem("id");
          sessionStorage.removeItem("permissions");

          sessionStorage.removeItem("userName");

          navigate("/");
          // setTimeout(() => , 100);
        } else {
          sessionStorage.clear();
          navigate("/");
        }
        Alert(1, respData?.data?.result?.responseMsg || "");
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const getIpAddress = () => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    // const { ipAddress } = getState().commonSlice;
    // const { fullName, mobileNumber, password, email } = values;
    axios
      .get("https://geolocation-db.com/json/")
      .then((response) => {
        console.log(response, "response");
        dispatch(
          updateCommonData({
            ipAddress: response?.data?.IPv4,
          })
        );
        dispatch(updateGlobalLoader(false));
      })
      .catch((error) => {
        dispatch(updateGlobalLoader(false));
      });
  };
};
