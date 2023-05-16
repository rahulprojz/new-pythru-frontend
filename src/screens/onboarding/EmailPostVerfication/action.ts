import { updateGlobalLoader } from "../../../components/backdrop/backdropSlice";
import { api, endpoints, Alert, downloadFile } from "../../../utils";

export const getChangeEstimateStatus = (id: any , token: any , status: any) => {
    return (dispatch: any, getState: any) => {
   
      dispatch(updateGlobalLoader(true));
      api.getApiCall(
        endpoints.changeEstimateStatus,
        `?id=${id}&status=${status}&token=${token}`,
        (respData: any) => {
         // TODO : ADD DATA
         console.log(respData)
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
  