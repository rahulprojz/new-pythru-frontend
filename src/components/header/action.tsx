import { api, endpoints, Alert } from "../../utils";
import { routesConstant } from "../../constants";
import { updateGlobalLoader } from "../backdrop/backdropSlice";
import { updatenotificationList } from "./notificationSlice";
import axios from "axios";
import { useCallback } from "react";

export const getNotificationList = () => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.notificationList,
      ``,
      (respData: any) => {
        dispatch(
          updatenotificationList({
            notificationList: respData.data.responseData.data,
          })
        );
        dispatch(notificationCountValue());
        dispatch(updateGlobalLoader(false));
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const clearNotification = () => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.putApiCall(
      endpoints.notificationDelete,
      {},
      (respData: any) => {
        dispatch(
          updatenotificationList({
            notificationList: [],
          })
        );
        dispatch(notificationCountValue());
        dispatch(updateGlobalLoader(false));
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const notificationCountValue = () => {
  return (dispatch: any, getState: any) => {
    api.getApiCall(
      endpoints.notificationCount,
      "",
      (respData: any) => {
        dispatch(
          updatenotificationList({
            notificationCount: respData.data.responseData.count,
          })
        );
      },
      (error: any) => {
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};
