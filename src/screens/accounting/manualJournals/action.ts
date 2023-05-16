import {
  api,
  endpoints,
  Alert,
  removeEmptyValues,
  downloadFile,
} from "../../../utils";
import { updateGlobalLoader } from "../../../components/backdrop/backdropSlice";
import { updateManualJournal } from "./manualJournalSlice";
import { fileFormat } from "../../../constants";

const getManualJournalList = (dashboardLimit?: number) => {
  return (dispatch: any, getState: any) => {
    const {
      limit,
      page,
      sort_key,
      sort_type,
      search,
      fromDate,
      toDate,
      status,
      debitCategoryId,
      creditCategoryId,
      selectedDebitCategories,
      selectedCreditCategories,
    } = getState().manualJournalSlice;
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getManualJournalsList,
      `?limit=${
        dashboardLimit ? dashboardLimit : limit
      }&page=${page} &fromDate=${fromDate}&toDate=${toDate}&sort_key=${sort_key}&sort_type=${sort_type}&debitCategoryId=${selectedDebitCategories.toString()}&creditCategoryId=${selectedCreditCategories.toString()}`,
      (respData: any) => {
        dispatch(
          updateManualJournal({
            list: respData.data.responseData.data,
            totalCount: respData.data.responseData.totalCount,
            totalPage: respData.data.responseData.totalPages,
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

export const addManualJournal = (values: any, redirect: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    removeEmptyValues(values);
    api.postApiCall(
      endpoints.addManualJournals,
      values,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);
        dispatch(getManualJournalList());
        redirect(false);
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};
const updatedManualJournal = (values: any, redirect: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    removeEmptyValues(values);
    api.putApiCall(
      endpoints.updateManualJournals,
      values,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);
        dispatch(getManualJournalList());
        redirect(false);
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

const deleteManualJournal = (id: string, redirect: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.deleteApiCall(
      endpoints.deleteManualJournals,
      `?manualJournalId=${id}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(getManualJournalList());
        redirect(false);
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

const downloadPdf = (id: string) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.downloadManualJournal,
      `?manualJournalId=${id}`,
      (respData: any) => {
        downloadFile(respData.data.responseData.file, fileFormat.pdf, 0);
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
export {
  getManualJournalList,
  updatedManualJournal,
  deleteManualJournal,
  downloadPdf,
};
