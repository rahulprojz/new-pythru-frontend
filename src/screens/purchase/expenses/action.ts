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
import { updateExpense } from "../expenseListSlice";
import axios from "axios";
import { useCallback } from "react";

export const getExpensesListing = () => {
  return (dispatch: any, getState: any) => {
    const {
      limit,
      page,
      search,
      fromDate,
      toDate,
      sort_type,
      sort_key,
      fromAmount,
      toAmount,
      categories,
      status,
      transFromDate,
      transEndDate,
    } = getState().expenseListSlice;
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getExpensesList,
      `?limit=${limit}&page=${page}&search=${search}&fromDate=${fromDate}&toDate=${toDate}&sort_key=${sort_key}&sort_type=${sort_type}&categories=${categories}&fromAmount=${fromAmount}&toAmount=${toAmount}&fromTransactionDate=${transFromDate}&toTransactionDate=${transEndDate}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateExpense({
            expensesList: respData.data.responseData.data,
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

export const getProductAndServicesCategory = () => {
  return (dispatch: any, getState: any) => {
    const { type, limit, page, search, fromDate, toDate, sort_type, sort_key } =
      getState().productServicesSlice;
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.productCategory,
      "",
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateExpense({
            productServicesCategory:
              respData.data.responseData.productcategories,
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

export const checkDetailExist = (
  queryFor: string,
  SearchFor: any,
  callback: any
) => {
  return (dispatch: any, getState: any) => {
    // dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.checkCustDetailExist,
      `?type=1&queryFor=${queryFor}&search=${SearchFor}`,
      (respData: any) => {
        callback(respData);
        // dispatch(updateGlobalLoader(false));
        // callback(respData.data)
        // dispatch(
        //   updateExpense({
        //     productServicesCategory:
        //       respData.data.responseData.productcategories,
        //   })
        // );
      },
      (error: any) => {
        // dispatch(updateGlobalLoader(false));
        // callback(respData.data)
        let { data } = error;
        callback(data);
        // Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const getAmountRage = () => {
  return (dispatch: any, getState: any) => {
    api.getApiCall(
      endpoints.getExpenseAmountRange,
      ``,
      (respData: any) => {
        dispatch(
          updateExpense({
            expensePriceMin: respData.data.responseData.amountRange.min,
            expensePriceMax: respData.data.responseData.amountRange.max,
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

export const getCustomerlist = () => {
  return (dispatch: any, getState: any) => {
    // const { search, type } = props;
    //dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.customerSearch,
      ``,
      (respData: any) => {
        dispatch(
          updateExpense({
            customerList: respData.data.responseData.customer,
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

export const addExpenses = (values: any, state: any) => {
  return (dispatch: any, getState: any) => {
    const { customerList } = getState().expenseListSlice;
    const { chartOfAccountMasterData } = getState().commonSlice;
    values.expenseCategory = getChildCategoryId({
      id: values.expenseCategoryId,
      list: chartOfAccountMasterData[1].categories,
    });
    var custDetails = customerList.filter(
      (v: any) => v._id == values.customerVendor
    );

    values.customerVendorDetails = {
      customerVendorId: values.customerVendor,
      displayName: custDetails[0].displayName,
      primaryContactName: custDetails[0].primaryContactName,
      image: custDetails[0].image,
    };

    const {
      amount,
      description,
      referenceId,
      transactionDate,
      expenseCategory,
      expensesId,
      type,
      customerVendorDetails,
    } = values;

    const dataToSend = {
      amount: amount,
      customerVendorDetails: customerVendorDetails,
      description: description,
      expenseCategory: expenseCategory,
      referenceId: referenceId,
      transactionDate: transactionDate,
      expensesId: expensesId,
      type: type,
    };
    //removeEmptyValues(dataToSend);

    if (expensesId) {
      dataToSend.expensesId = expensesId;
      api.putApiCall(
        endpoints.updateExpense,
        dataToSend,
        (respData: any) => {
          dispatch(updateGlobalLoader(false));
          dispatch(getExpensesListing());
          state(false);
          Alert(1, respData?.data?.message || respData?.data?.responseMsg);
        },
        (error: any) => {
          dispatch(updateGlobalLoader(false));
          let { data } = error;
          Alert(2, data?.message || data?.responseMsg);
        }
      );
      return;
    }

    api.postApiCall(
      endpoints.addExpense,
      dataToSend,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(getExpensesListing());
        state(false);
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const deleteExpenseData = (id: string) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.deleteApiCall(
      endpoints.deleteExpense,
      `?expensesId=${id}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(getExpensesListing());
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

const downloadExpenseExcel = (props: any) => {
  return (dispatch: any, getState: any) => {
    console.log("type", props);
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.downloadExpenseExcel,
      "",
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        downloadFile(respData.data.responseData.file, fileFormat.excel, 12);
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};
const downloadExpensePdf = (props: any) => {
  return (dispatch: any, getState: any) => {
    // const { documentType } = getState().salePurchaseSlice;

    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.downloadExpensePdf,
      "",
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        downloadFile(respData.data.responseData.file, fileFormat.pdf, 12);
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};
export { downloadExpenseExcel, downloadExpensePdf };
