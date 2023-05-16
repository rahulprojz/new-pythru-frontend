import { api, endpoints, Alert } from "../../../utils";
import { updateGlobalLoader } from "../../../components/backdrop/backdropSlice";
import { updateProfitLoss } from "./profitLossSlice";
export const getProfitLoss = () => {
  return (dispatch: any, getState: any) => {
    const { fromDate, toDate } = getState().profitLossSlice;
    dispatch(updateGlobalLoader(true));

    api.getApiCall(
      endpoints.getProfitLoss,
      `?fromDate=${fromDate}&toDate=${toDate}`,
      (respData: any) => {
        dispatch(
          updateProfitLoss({
            profitLossList: respData.data.responseData,
          })
        );
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

export const getCashflowData = () => {
  return (dispatch: any, getState: any) => {
    const { fromDate, toDate } = getState().profitLossSlice;
    dispatch(updateGlobalLoader(true));

    api.getApiCall(
      endpoints.cashflow,
      `?fromDate=${fromDate}&toDate=${toDate}`,
      (respData: any) => {
        dispatch(
          updateProfitLoss({
            profitLossList: respData.data.responseData,
          })
        );
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

export const getBalanceSheetData = () => {
  return (dispatch: any, getState: any) => {
    const { fromDate, toDate } = getState().profitLossSlice;
    dispatch(updateGlobalLoader(true));

    api.getApiCall(
      endpoints.getBalanceSheet,
      `?toDate=${toDate}`,
      (respData: any) => {
        const newData = respData?.data?.responseData?.data
          ?.filter((item: any) => item.chartOfAccountType > 2)
          .sort(
            (a: any, b: any) => a.chartOfAccountType - b.chartOfAccountType
          );

        dispatch(
          updateProfitLoss({
            profitLossList: newData ? newData : [],
          })
        );
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
