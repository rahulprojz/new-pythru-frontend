import { api, endpoints, Alert } from "../../../utils";
import { updateGlobalLoader } from "../../../components/backdrop/backdropSlice";
import { updateCommonData } from "../../../app/commonSlice";

export const getChartOfAccoutMasterData = () => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getChartOfAccount,
      ``,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        const newData = respData?.data?.responseData?.masterAccounts.sort(
          (a: any, b: any) => a.chartOfAccountType - b.chartOfAccountType
        );
        dispatch(
          updateCommonData({
            chartOfAccountMasterData: newData ? newData : [],
          })
        );
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const addChartOfAcc = (values: any, setState: any, resetForm: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    const datatoSend = values;
    if (!datatoSend.description) {
      delete datatoSend.description;
    }
    if (!datatoSend.chartOfAccountId) delete datatoSend.chartOfAccountId;
    api.postApiCall(
      endpoints.charOfAccountAdd,
      datatoSend,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);
        setState(false);
        resetForm();
        dispatch(getChartOfAccoutMasterData());
        // dispatch(
        //     updateChartOfAccountState({
        //         chartOfAccountMasterData: respData.data.responseData.masterAccounts,

        //   })
        // );
        // console.log(respData.data.responseData.data);
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        setState(false);
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const updateChartOfAcc = (
  values: any,
  setState: any,
  setEditData: any,
  resetForm: any
) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    const datatoSend = values;
    if (!datatoSend.description) {
      delete datatoSend.description;
    }
    api.putApiCall(
      endpoints.updateChartOfAccount,
      datatoSend,
      (respData: any) => {
        resetForm();
        dispatch(updateGlobalLoader(false));
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);
        setState(false);
        setEditData();
        dispatch(getChartOfAccoutMasterData());
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        setState(false);
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};
