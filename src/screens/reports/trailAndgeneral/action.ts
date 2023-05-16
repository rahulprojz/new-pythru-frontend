import { api, endpoints, Alert, downloadFile } from "../../../utils";
import { updateGlobalLoader } from "../../../components/backdrop/backdropSlice";
import { updateGeneralAndTrail } from "./trailAndgeneralSlice";
import { fileFormat } from "../../../constants";
// import { updateProfitLoss } from "./profitLossSlice";
export const getProfitLoss = () => {
  return (dispatch: any, getState: any) => {
    const { fromDate, toDate } = getState().profitLossSlice;
    dispatch(updateGlobalLoader(true));

    api.getApiCall(
      endpoints.getProfitLoss,
      `?fromDate=${fromDate}&toDate=${toDate}`,
      (respData: any) => {
        // dispatch(
        //   updateProfitLoss({
        //     profitLossList: respData.data.responseData,
        //   })
        // );
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

export const getTrailBalanceData = () => {
  return (dispatch: any, getState: any) => {
    const { fromDate, toDate } = getState().generalAndTrail;
    dispatch(updateGlobalLoader(true));

    api.getApiCall(
      endpoints.trailBalance,
      `?toDate=${toDate}`,
      (respData: any) => {
        let newData = respData.data.responseData?.data
          // .filter((item: any) => item?.chartOfAccountType === 4)
          .map((item: any) => {
            item.credit = 0;
            item.debit = 0;
            item?.listing.map((val: any) => {
              val.credit = 0;
              val.debit = 0;
              val.listing.map((data: any) => {
                if (data.debit > data.credit) {
                  data.debit = Math.abs(data.debit - data.credit);
                  data.credit = 0;
                  val.debit = +val.debit + Math.abs(data.debit - data.credit);
                  item.debit = item.debit +  Math.abs(data.debit - data.credit);
                } else {
                  data.credit = Math.abs(data.debit - data.credit);
                  data.debit = 0;
                  val.credit = +val.credit + Math.abs(data.debit - data.credit);
                  item.credit =
                  item.credit + Math.abs(data.debit - data.credit);
                }
              });
            });
            return item;
          });
        dispatch(
          updateGeneralAndTrail({
            generalAndTrailList: newData,
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

export const getGeneralLedgerList = () => {
  return (dispatch: any, getState: any) => {
    const { fromDate, toDate, selectedCategories } = getState().generalAndTrail;
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getGeneralLedger,
      `?fromDate=${fromDate}&toDate=${toDate}&categoryId=${selectedCategories.toString()}`,
      (respData: any) => {
        dispatch(
          updateGeneralAndTrail({
            generalAndTrailList: respData.data.responseData.data,
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

export const generateGeneralLedgerPdf = () => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    const { fromDate, toDate, selectedCategories } = getState().generalAndTrail;
    api.getApiCall(
      endpoints.getGeneralLedgerPdf,
      `?fromDate=${fromDate}&toDate=${toDate}&categoryId=${selectedCategories.toString()}`,
      (respData: any) => {
        downloadFile(respData.data.responseData.file, fileFormat.pdf, 15);
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
