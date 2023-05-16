import { api, endpoints, Alert, downloadFile } from "../../utils";
import { updateGlobalLoader } from "../../components/backdrop/backdropSlice";
import { updateBanking } from "./bankingSlice";
import { fileFormat } from "../../constants";

const getBankingList = () => {
  return (dispatch: any, getState: any) => {
    const { list } = getState().bankingSlice;

    if (list.length > 0) return;
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getBankingList,
      ``,
      (respData: any) => {
        dispatch(
          updateBanking({
            list: respData.data.responseData.data,
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

const getAggrigatorWidget = (instLinkCode: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.postApiCall(
      endpoints.getAggrigatorWidget,
      { instLinkCode: String(instLinkCode) },
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateBanking({
            iframeUrl: respData.data.responseData.data.url,
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

const accountSummery = (transactionId: any, account: any, bankType: number) => {
  return (dispatch: any, getState: any) => {
    var { list } = getState().bankingSlice;
    dispatch(updateGlobalLoader(true));
    dispatch(updateBanking({ userBalanceLoader: true }));
    if (account == undefined) {
      account = "";
    }
    api.getApiCall(
      endpoints.userAccountSummery,
      `?transactionId=${transactionId}&account=${account}&addBankAccountType=${bankType}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateBanking({
            userBalance: "₹" + respData.data.responseData.data,
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

const getUserAccountList = () => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getUserAccountList,
      ``,
      (respData: any) => {
        dispatch(
          updateBanking({
            userAccountList: respData.data.responseData.data
              ? respData.data.responseData.data
              : [],
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

const getUserAccountTransactionsList = () => {
  return (dispatch: any, getState: any) => {
    const { fromDate, toDate, addBankAccountType, transactionId } =
      getState().bankingSlice;
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getUserAccountTransactionsList,
      `?transactionId=${transactionId}&addBankAccountType=${addBankAccountType}&fromDate=${fromDate}&toDate=${toDate}`,
      (respData: any) => {
        dispatch(
          updateBanking({
            userTransactionList: respData.data.responseData?.data,
            totalCount: respData.data.responseData?.data?.length,
            totalPage: 1,
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

const getUserBalanceAmount = (
  accUuid: any,
  account: any,
  bankAccountType: number
) => {
  return (dispatch: any, getState: any) => {
    var { list } = getState().bankingSlice;
    dispatch(updateGlobalLoader(true));
    dispatch(updateBanking({ userBalanceLoader: true }));

    if (account == undefined) {
      account = "";
    }
    api.getApiCall(
      endpoints.userAccountSummery,
      `?transactionId=${accUuid}&account=${account}&addBankAccountType=${bankAccountType}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateBanking({
            userNewBalance: "₹" + respData.data.responseData.data,
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
export const generatePdf = (type: number) => {
  return (dispatch: any, getState: any) => {
    const { fromDate, toDate, addBankAccountType, transactionId } =
      getState().bankingSlice;
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.downloadBankfile,
      `?transactionId=${transactionId}&addBankAccountType=${addBankAccountType}&fromDate=${fromDate}&toDate=${toDate}&downloadTransactions=1`,
      (respData: any) => {
        downloadFile(
          respData.data.responseData.data,
          fileFormat.pdf,
          type === 1 ? 13 : 14
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

export const generateExcel = (type: number) => {
  return (dispatch: any, getState: any) => {
    const { fromDate, toDate, addBankAccountType, transactionId } =
      getState().bankingSlice;
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.downloadBankfile,
      `?transactionId=${transactionId}&addBankAccountType=${addBankAccountType}&fromDate=${fromDate}&toDate=${toDate}&downloadTransactions=2`,
      (respData: any) => {
        downloadFile(
          respData.data.responseData.data,
          fileFormat.excel,
          type === 1 ? 13 : 14
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
const linkToIciciAccount = (values: any, setState: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.postApiCall(
      endpoints.linktoAccountapi,
      values,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        Alert(1, respData.data.responseMsg);
        setState(false);
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};
export {
  getBankingList,
  getAggrigatorWidget,
  getUserAccountList,
  accountSummery,
  getUserAccountTransactionsList,
  getUserBalanceAmount,
  linkToIciciAccount,
};
