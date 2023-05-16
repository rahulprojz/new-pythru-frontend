import {
  api,
  endpoints,
  Alert,
  downloadFile,
  cleanObj,
  removeEmptyValues,
} from "../../utils";
import { updateGlobalLoader } from "../../components/backdrop/backdropSlice";
import { updateSalePurchase } from "./salePurchaseSlice";
import { fileFormat } from "../../constants";
import moment from "moment";
import { getAmountToWords } from "../../utils/Common.Function";

const getSalePurchaseList = () => {
  return (dispatch: any, getState: any) => {
    const {
      documentType,
      limit,
      page,
      sort_key,
      sort_type,
      search,
      type,
      fromDate,
      toDate,
      status,
      overDue,
      filterFromDate,
      filterToDate,
      fromDueDate,
      toDueDate,
    } = getState().salePurchaseSlice;
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getSalePurchaseList,
      `?type=${type}&documentType=${documentType}&limit=${limit}&page=${page} &fromDate=${fromDate}&toDate=${toDate}&sort_key=${sort_key}&sort_type=${sort_type}&search=${search}&status=${status}&overDue=${overDue}&filterFromDate=${filterFromDate}&filterToDate=${filterToDate}&fromDueDate=${fromDueDate}&toDueDate=${toDueDate}`,
      (respData: any) => {
        dispatch(
          updateSalePurchase({
            salePurchaseList: respData.data.responseData.data,
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

const getRefList = (type: number) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getAllSalePurchaseList,
      `?documentType=${type}`,
      (respData: any) => {
        dispatch(
          updateSalePurchase({
            refList: respData.data.responseData.data || [],
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

const getSaleDashboardList = (dashboardLimit?: number) => {
  return (dispatch: any, getState: any) => {
    const {
      limit,
      page,
      sort_key,
      sort_type,
      search,
      type,
      fromDate,
      toDate,
      status,
      overDue,
    } = getState().salePurchaseSlice;
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.salePurchaseDashboard,
      `?type=${type}&limit=${
        dashboardLimit ? dashboardLimit : limit
      }&page=${page} &fromDate=${fromDate}&toDate=${toDate}&sort_key=${sort_key}&sort_type=${sort_type}&search=${search}&status=${status}&overDue=${overDue}`,
      (respData: any) => {
        dispatch(
          updateSalePurchase({
            dashboardList: respData.data.responseData.data,
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

const deleteSalePurchase = (id: string, isdasboard = false) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.deleteApiCall(
      endpoints.deleteSalePurchase,
      `?salesPurchaseId=${id}`,
      (respData: any) => {
        isdasboard
          ? dispatch(getSaleDashboardList())
          : dispatch(getSalePurchaseList());
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

const getSalePurchaseDetail = (id: any, setState: any, setRowDetails?: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getSalePurchase,
      `?salesPurchaseId=${id}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateSalePurchase({
            salePurchaseDetail: respData.data.responseData.data,
          })
        );
        if (setRowDetails !== true) {
          setRowDetails(respData.data.responseData.data);
        } else {
          dispatch(
            updateSalePurchase({
              isEdit: true,
            })
          );
        }
        if (setState !== true) {
          setState(true);
        }
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

const generatePdf = (documentType: number) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.salePurchasePdf,
      `?documentType=${documentType}`,
      (respData: any) => {
        downloadFile(
          respData.data.responseData.file,
          fileFormat.pdf,
          documentType
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

const generateExcel = (documentType: number) => {
  return (dispatch: any, getState: any) => {
    const { documentType } = getState().salePurchaseSlice;
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.salePurchaseExcel,
      `?documentType=${documentType}`,
      (respData: any) => {
        downloadFile(
          respData.data.responseData.file,
          fileFormat.excel,
          documentType
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

export const getCustomerlist = () => {
  return (dispatch: any, getState: any) => {
    const { type } = getState().salePurchaseSlice;
    //const customerType = type == 1 ? "customer" : "vendor";
    api.getApiCall(
      endpoints.customerSearch,
      `?type=${type}`,
      (respData: any) => {
        dispatch(
          updateSalePurchase({
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

const generateDocumentNumber = (isref: boolean) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));

    const { documentType } = getState().salePurchaseSlice;

    api.getApiCall(
      endpoints.salePurchaseGenerateDocumentNumber,
      `?documentType=${documentType}&generateReferenceNumber=${isref}`,
      (respData: any) => {
        dispatch(
          updateSalePurchase({
            documentNumber: respData.data.responseData.documentNumber,
            referenceNumber: respData.data.responseData.referenceNumber,
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

export const getProductServiceSearch = (
  set: boolean,
  setState?: any,
  obj?: any
) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.productServiceSearch,
      ``,
      (respData: any) => {
        dispatch(
          updateSalePurchase({
            productServiceList: respData.data.responseData.categories,
          })
        );

        if (set) {
          setState(obj);
        }
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

export const statesList = () => {
  return (dispatch: any, getState: any) => {
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
          updateSalePurchase({
            stateList: respData.data.responseData.statesData,
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

const addSalePurchase = (values: any, redirect: any) => {
  return (dispatch: any, getState: any) => {
    const { documentType, type } = getState().salePurchaseSlice;
    dispatch(updateGlobalLoader(true));
    const { organizationDeatil } = getState().settingSlice;

    let newProductObj: any = values?.productDetails.map((obj: any) => {
      if (organizationDeatil?.address?.state === values.placeOfSupply) {
        let sameStaeObj = {
          ...obj,
          cessValue: (obj.amount * obj.cessPercent) / 100,
          isInterStateTaxApplied: false,
          cGstPercent: obj.iGstPercent / 2,
          cGstValue: (obj.amount * obj.iGstPercent) / 200,
          sGstPercent: obj.iGstPercent / 2,
          sGstValue: (obj.amount * obj.iGstPercent) / 200,
        };
        delete sameStaeObj.iGstPercent;
        delete sameStaeObj.iGstValue;
        return sameStaeObj;
      } else {
        return {
          ...obj,
          cessValue: (obj.amount * obj.cessPercent) / 100,
          isInterStateTaxApplied: true,
          iGstValue: (obj.amount * obj.iGstPercent) / 100,
        };
      }
    });
    // removeEmptyValues(body.customerVendorDetails);

    const {
      customerVendor,
      placeOfSupply,
      productDetails,
      subTotal,
      discount,
      tax,
      totalPrice,
      description,
      fromDate,
      dueDate,
      daysLeft,
      documentNumber,
      referenceNumber,
      savingType,
      isDocumentConverted,
      convertedFrom,
      billingAddress,
      shippingAddress,
      customerVendorId,
      previousDocumentAmount,
      sendDocumentTo,
    } = values;

    let body: any = {
      type: type,
      documentType: documentType,
      customerVendorDetails: {
        customerVendorId: customerVendorId,
        primaryContactName: customerVendor.primaryContactName,
        displayName: customerVendor.displayName,
        image: customerVendor?.image,
        email: customerVendor.email,
        phoneNumber: customerVendor.phoneNumber,
        type: customerVendor?.isCustomerVendor || customerVendor?.type,
      },
      fromDate: fromDate,
      documentNumber: documentNumber,
      referenceNumber: referenceNumber,
      placeOfSupply: placeOfSupply,
      productDetails: newProductObj || [],
      subTotal: subTotal || 0,
      discount: discount || 0,
      tax: tax || 0,
      totalPrice: totalPrice || 0,
      totalAmountInWords: getAmountToWords(totalPrice),
      description: description,
      savingType: savingType,

      billingAddress: {
        addressLine1: billingAddress.addressLine1,
        addressLine2: billingAddress.addressLine2 || null,
        townCity: billingAddress.townCity,
        state: billingAddress.state,
        zipCode: billingAddress.zipCode,
      },
      shippingAddress: {
        addressLine1: shippingAddress.addressLine1,
        addressLine2: shippingAddress.addressLine2 || null,
        townCity: shippingAddress.townCity,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
      },

      isBillingAndShippingAddressSame:
        customerVendor.isBillingAndShippingAddressSame ? true : false,
      dueDate: dueDate,
      daysLeft: daysLeft,
      isDocumentConverted: isDocumentConverted ? isDocumentConverted : false,
      convertedFrom,
    };

    if (previousDocumentAmount) {
      body.previousDocumentAmount = previousDocumentAmount;
    }
    if (documentType == 2) body.sendDocumentTo = sendDocumentTo;

    removeEmptyValues(body.customerVendorDetails);
    api.postApiCall(
      endpoints.addSalePurchase,
      body,
      (respData: any) => {
        //dispatch(getAssets());
        dispatch(updateGlobalLoader(false));
        redirect();
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

const editSalePurchase = (values: any, redirect: any) => {
  return (dispatch: any, getState: any) => {
    const { documentType, type } = getState().salePurchaseSlice;
    dispatch(updateGlobalLoader(true));

    const {
      salesPurchaseId,
      customerVendor,
      placeOfSupply,
      productDetails,
      subTotal,
      discount,
      tax,
      totalPrice,
      description,
      fromDate,
      dueDate,
      daysLeft,
      documentNumber,
      referenceNumber,
      billingAddress,
      shippingAddress,
      isBillingAndShippingAddressSame,
    } = values;

    let newProductDetails = productDetails.map(
      ({ _id, ...rest }: { _id: any }) => rest
    );
    const { organizationDeatil } = getState().settingSlice;
    let newProductObj: any = newProductDetails.map((obj: any) => {
      if (organizationDeatil?.address?.state === values.placeOfSupply) {
        debugger;
        let sameStaeObj = {
          ...obj,
          cessValue: (obj.amount * obj.cessPercent) / 100,
          isInterStateTaxApplied: false,
          cGstPercent: obj.iGstPercent / 2 || obj?.cGstPercent,
          cGstValue: (obj.amount * obj.iGstPercent) / 200 || obj?.cGstValue,
          sGstPercent: obj.iGstPercent / 2 || obj.sGstPercent,
          sGstValue: (obj.amount * obj.iGstPercent) / 200 || obj?.sGstValue,
        };
        delete sameStaeObj.iGstPercent;
        delete sameStaeObj.iGstValue;
        return sameStaeObj;
      } else {
        return {
          ...obj,
          cessValue: (obj.amount * obj.cessPercent) / 100,
          isInterStateTaxApplied: true,
          iGstValue: (obj.amount * obj.iGstPercent) / 100,
        };
      }
    });
    let body: any = {
      type: type,
      documentType: documentType,
      customerVendorDetails: {
        customerVendorId: customerVendor.customerVendorId,
        primaryContactName: customerVendor.primaryContactName,
        displayName: customerVendor.displayName,
        image: customerVendor?.image,
        email: customerVendor.email,
        phoneNumber: customerVendor.phoneNumber,
        type: customerVendor?.isCustomerVendor || customerVendor?.type,
      },
      fromDate: fromDate,
      documentNumber: documentNumber,
      referenceNumber: referenceNumber,
      placeOfSupply: placeOfSupply,
      productDetails: newProductObj || [],
      subTotal: subTotal || 0,
      discount: discount || 0,
      tax: tax || 0,
      totalPrice: totalPrice || 0,
      totalAmountInWords: getAmountToWords(totalPrice),
      description: description,

      billingAddress: {
        addressLine1: billingAddress.addressLine1,
        addressLine2: billingAddress.addressLine2,
        townCity: billingAddress.townCity,
        state: billingAddress.state,
        zipCode: billingAddress.zipCode,
      },
      shippingAddress: {
        addressLine1: shippingAddress.addressLine1,
        addressLine2: shippingAddress.addressLine2,
        townCity: shippingAddress.townCity,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
      },

      isBillingAndShippingAddressSame: isBillingAndShippingAddressSame
        ? true
        : false,
      dueDate: dueDate,
      daysLeft: daysLeft,
    };

    if (salesPurchaseId) {
      body.salesPurchaseId = salesPurchaseId;
    }
    cleanObj(body);

    api.putApiCall(
      endpoints.updateSalePurchase,
      body,
      (respData: any) => {
        //dispatch(getAssets());
        dispatch(updateGlobalLoader(false));
        redirect();
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
const sendDoument = (id: any, sendDocumentTo?: any) => {
  return (dispatch: any, getState: any) => {
    const query = sendDocumentTo
      ? `?id=${id}&sendDocumentTo=${sendDocumentTo}`
      : `?id=${id}`;

    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.sendDocumentSalseAndPurchase,
      query,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);
        dispatch(getSalePurchaseList());
        dispatch(getSaleDashboardList());
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};
const downloadSalesandPurchaseDetail = (id: any) => {
  return (dispatch: any, getState: any) => {
    const { documentType } = getState().salePurchaseSlice;
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.downloadDocSalesPurchase,
      `?id=${id}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        downloadFile(
          respData.data.responseData.file,
          fileFormat.pdf,
          documentType
        );

        // dispatch(
        //   updateSalePurchase({
        //     stateList: respData.data.responseData.statesData,
        //   })
        // );
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

const updateAmountSalesAndPurchase = (data: any) => {
  return (dispatch: any, getState: any) => {
    const { documentType, type } = getState().salePurchaseSlice;
    dispatch(updateGlobalLoader(true));
    removeEmptyValues(data);
    api.putApiCall(
      endpoints.updateSalesPurchaseAmount,
      data,
      (respData: any) => {
        dispatch(getSalePurchaseList());
        dispatch(getSaleDashboardList());
        dispatch(updateGlobalLoader(false));
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

const generateDashboardPdf = (type: number) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.salePurchaseDashboardPdf,
      `?type=${type}`,
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
const markAsCancelSalesAndPurchase = (id: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.purchaseSaleMarkAsCancel,
      `?id=${id}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(getSalePurchaseList());
        dispatch(getSaleDashboardList());
        // dispatch(
        //   updateSalePurchase({
        //     stateList: respData.data.responseData.statesData,
        //   })
        // );
        Alert(1, respData?.data?.responseMsg);
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

const generateDashboardExcel = (type: number) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.salePurchaseDashboardExcel,
      `?type=${type}`,
      (respData: any) => {
        downloadFile(respData.data.responseData.file, fileFormat.excel, 0);
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

const getSalePurchaseSaleOrderEmail = () => {
  return (dispatch: any, getState: any) => {
    api.getApiCall(
      endpoints.salePurchaseSaleOrderEmail,
      ``,
      (respData: any) => {
        dispatch(
          updateSalePurchase({
            saleOrderEmail: respData.data.responseData.data,
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

const getCustomerTransactionDetail = (id: any, tabType: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    const {
      documentType,
      limit,
      page,
      sort_key,
      sort_type,
      search,
      type,
      fromDate,
      toDate,
      status,
      overDue,
    } = getState().salePurchaseSlice;
    api.getApiCall(
      endpoints.getCustomerTransactionDetail,
      `?customerVendorId=${id}&type=${type}&limit=${limit}&page=${page} &fromDate=${fromDate}&toDate=${toDate}&sort_key=${sort_key}&sort_type=${sort_type}&status=${status}&documentType=${tabType}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateSalePurchase({
            customerTransactionDetail: respData.data.responseData.data,
            totalCount: respData.data.responseData.totalCount,
            totalPage: respData.data.responseData.totalPages,
            customerTransactionAmount:
              respData.data.responseData.transactionAmount,
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

const deleteCustomerSaleInvoice = (id: string, customerVendorId: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.deleteApiCall(
      endpoints.deleteSalePurchase,
      `?salesPurchaseId=${id}`,
      (respData: any) => {
        dispatch(getCustomerTransactionDetail(customerVendorId, 0));
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
  getSalePurchaseList,
  getSaleDashboardList,
  deleteSalePurchase,
  getSalePurchaseDetail,
  generatePdf,
  generateExcel,
  generateDocumentNumber,
  addSalePurchase,
  editSalePurchase,
  sendDoument,
  downloadSalesandPurchaseDetail,
  updateAmountSalesAndPurchase,
  markAsCancelSalesAndPurchase,
  generateDashboardPdf,
  generateDashboardExcel,
  getRefList,
  getSalePurchaseSaleOrderEmail,
  getCustomerTransactionDetail,
  deleteCustomerSaleInvoice,
};
