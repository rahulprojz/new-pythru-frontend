import {
  api,
  endpoints,
  Alert,
  removeEmptyValues,
  downloadFile,
} from "../../../utils";
import { fileFormat, routesConstant } from "../../../constants";
import { updateGlobalLoader } from "../../../components/backdrop/backdropSlice";
import { updateCustomer } from "../customerListSlice";
import axios from "axios";
import { updateCommonData } from "../../../app/commonSlice";
import { useCallback } from "react";

export const getCustomerListing = () => {
  return (dispatch: any, getState: any) => {
    const {
      type,
      limit,
      page,
      search,
      fromDate,
      toDate,
      sort_type,
      sort_key,
      status,
      fromAmount,
      toAmount,
    } = getState().customerListSlice;
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.customersList,
      `?type=${type}&limit=${limit}&page=${page}&search=${search}&fromDate=${fromDate}&toDate=${toDate}&sort_key=${sort_key}&sort_type=${sort_type}&status=${status}&fromAmount=${fromAmount}&toAmount=${toAmount}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateCustomer({
            customersList: respData.data.responseData.data,
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

export const getPresignedurl = (key: string, extention: string, file: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.presignedurl,
      `?key=${key}.${extention}&fileType=image/${extention}`,
      (respData: any) => {
        axios.put(respData?.data?.result, file, {}).then(() => {
          dispatch(
            updateCustomer({
              imageUrl: import.meta.env.VITE_IMAGE_URL + `${key}.${extention}`,
            })
          );
          dispatch(updateGlobalLoader(false));
        });
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
    api.getApiCall(
      endpoints.checkCustDetailExist,
      `?type=1&queryFor=${queryFor}&search=${SearchFor}`,
      (respData: any) => {
        callback(respData);
      },
      (error: any) => {
        let { data } = error;
        callback(data);
      }
    );
  };
};

export const statesList = () => {
  return (dispatch: any, getState: any) => {
    // const stateList = getState().customerListSlice;
    const { state } = getState().commonSlice;
    if (state?.length > 0) {
      return false;
    }

    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.statesList,
      ``,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateCustomer({
            stateList: respData.data.responseData.statesData,
          })
        );
        dispatch(
          updateCommonData({
            state: respData.data.responseData.statesData,
          })
        );
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        // Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const getCustomerDetail = (id: string) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getCustomerDetails + "?customerVendorId=" + id,
      ``,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateCustomer({
            customerDetails: respData.data.responseData.data,
            imageUrl: respData.data.responseData.data.image,
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

export const addAddCustomer = (values: any, redirect: any) => {
  return (dispatch: any, getState: any) => {
    const { imageUrl } = getState().customerListSlice;
    //dispatch(updateGlobalLoader(true));
    const {
      displayName,
      primaryContactName,
      email,
      phoneNumber,
      website,
      image,
      accountNumber,
      ifscCode,
      bankName,
      branchName,
      panCard,
      addressLine1,
      addressLine2,
      townCity,
      zip,
      gstin,
      state,
      shippingAddress1,
      shippingAddressLine2,
      shippingTownCity,
      shippingState,
      shippingZipCode,
      isBillingAndShippingAddressSame,
      isEditMode,
      isCustomerVendor,
      customerVendorId,
      type,
    } = values;
    const dataToSend = {
      displayName: displayName,
      primaryContactName: primaryContactName,
      image: imageUrl,
      email: email,
      phoneNumber: phoneNumber,
      website: website,
      bankDetails: {
        accountNumber: accountNumber,
        ifscCode: ifscCode,
        bankName: bankName,
        branchName: branchName,
      },
      gstDetails: {
        panCard: panCard,
        gstNumber: gstin,
      },
      billingAddress: {
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        townCity: townCity,
        state: state,
        zipCode: zip,
      },
      isCustomerVendor: isCustomerVendor ? 3 : type == "vendor" ? 2 : 1,
      shippingAddress: {
        addressLine1: isBillingAndShippingAddressSame
          ? addressLine1
          : shippingAddress1,
        addressLine2: isBillingAndShippingAddressSame
          ? addressLine2
          : shippingAddressLine2,
        townCity: isBillingAndShippingAddressSame ? townCity : shippingTownCity,
        state: isBillingAndShippingAddressSame ? state : shippingState,
        zipCode: isBillingAndShippingAddressSame ? zip : shippingZipCode,
      },
      isBillingAndShippingAddressSame: isBillingAndShippingAddressSame,
      customerVendorId: customerVendorId,
    };
    removeEmptyValues(dataToSend);
    dataToSend.isBillingAndShippingAddressSame =
      isBillingAndShippingAddressSame;

    if (isEditMode) {
      api.putApiCall(
        endpoints.updateCustomer,
        dataToSend,
        (respData: any) => {
          dispatch(updateGlobalLoader(false));
          dispatch(updateCustomer({ imageUrl: imageUrl }));
          Alert(1, respData?.data?.message || respData?.data?.responseMsg);
          redirect(-1);
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
      endpoints.AddCustomer,
      dataToSend,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);
        redirect();
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const getCitiesList = (values: any) => {
  return (dispatch: any, getState: any) => {
    const { isoCode, type } = values;
    api.getApiCall(
      endpoints.getCitiesList + "?isoCode=" + isoCode,
      "",
      (respData: any) => {
        if (type == "cities") {
          dispatch(
            updateCustomer({
              citiesList: respData.data.responseData.citiesData,
            })
          );
        } else {
          dispatch(
            updateCustomer({
              shippingCitiesList: respData.data.responseData.citiesData,
            })
          );
        }
      },
      (error: any) => {
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const deleteCustomerData = (id: string) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.deleteApiCall(
      endpoints.deleteCustomer,
      `?customerVendorId=${id}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(getCustomerListing());
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

export const changeCustomerStatus = (values: any) => {
  return (dispatch: any, getState: any) => {
    const { id, status } = values;
    dispatch(updateGlobalLoader(true));
    api.patchApiCall(
      endpoints.changeCustomerStatus,
      { status: status, customerVendorId: id },
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(getCustomerListing());
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const getAmountRange = () => {
  return (dispatch: any, getState: any) => {
    api.getApiCall(
      endpoints.customerDueAmountRange,
      ``,
      (respData: any) => {
        dispatch(
          updateCustomer({
            duePriceMin: respData.data.responseData.amountRange.min,
            duePriceMax: respData.data.responseData.amountRange.max,
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

export const generatePdf = (type: number) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getCustomerVendorPdf,
      `?type=${type}`,
      (respData: any) => {
        downloadFile(
          respData.data.responseData.file,
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
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getCustomerVendorExcel,
      `?type=${type}`,
      (respData: any) => {
        downloadFile(
          respData.data.responseData.file,
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
export const downloadTemplateExcels = (fileType: number) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.customerTemplateExcel,
      ``,
      (respData: any) => {
        downloadFile(
          respData.data.responseData.file,
          fileFormat.excel,
          fileType
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

export const bulkCustomerExcelUpload = (
  values: any,
  setDialogOpen: any,
  setErros: any
) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.postApiCall(
      endpoints.customerBulkExcelUpload,
      values,
      (respData: any) => {
        setDialogOpen(true);
        setErros(respData.data.responseData);
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
