import {
  api,
  endpoints,
  Alert,
  removeEmptyValues,
  getChildCategoryId,
  downloadFile,
} from "../../../utils";
import { fileFormat, routesConstant } from "../../../constants";
import { updateGlobalLoader } from "../../../components/backdrop/backdropSlice";
import { updateAged } from "./agedSlice";
import axios from "axios";
import { useCallback } from "react";

export const getAgedData = () => {
  return (dispatch: any, getState: any) => {
    const { limit, page, search, documentType, transEndDate } =
      getState().agedReciableSlice;
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.agedPayableAndReciables,
      `?limit=${limit}&page=${page}&search=${search}&documentType=${documentType}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateAged({
            tableList: respData.data.responseData.data,
            totalCount: respData.data.responseData.totalCount,
            totalPages: respData.data.responseData.totalPages,
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

export const generatePdf = (documentType: number) => {
  
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.payableReciablePdf,
      `?documentType=${documentType}`,
      (respData: any) => {
        downloadFile(
          respData.data.responseData.file,
          fileFormat.pdf,
          documentType === 3 ? 17 : 16
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

export const generateExcel = (documentType: number) => {
  return (dispatch: any, getState: any) => {
    // const { documentType } = getState().salePurchaseSlice;
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.payableReciableExcel,
      `?documentType=${documentType}`,
      (respData: any) => {
        downloadFile(
          respData.data.responseData.file,
          fileFormat.excel,
          documentType === 3 ? 17 : 16
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
