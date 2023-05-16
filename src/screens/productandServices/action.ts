import { api, endpoints, Alert, downloadFile } from "../../utils";
import { fileFormat, routesConstant } from "../../constants";
import { updateGlobalLoader } from "../../components/backdrop/backdropSlice";
import { updateProductAndServices } from "./productServiceSlice";
import axios from "axios";
import { useCallback } from "react";
import { updateSalePurchase } from "../saleandPurchase/salePurchaseSlice";
import { getProductServiceSearch } from "../saleandPurchase/action";
export const getProductAndServicesListing = () => {
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
      fromSalePrice,
      toSalePrice,
      categories,
      lowStockFilter,
      outOfStockFilter,
      status,
    } = getState().productServicesSlice;
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.productServiceList,
      `?type=${type}&limit=${limit}&page=${page}&search=${search}&status=${status}&fromDate=${fromDate}&toDate=${toDate}&fromSalePrice=${fromSalePrice}&toSalePrice=${toSalePrice}&categories=${categories}&sort_key=${sort_key}&sort_type=${sort_type}&queryFor=${
        lowStockFilter && outOfStockFilter
          ? 3
          : outOfStockFilter
          ? outOfStockFilter
          : lowStockFilter
          ? lowStockFilter
          : ""
      }`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateProductAndServices({
            productServiceList: respData.data.responseData.data,
            totalCount: respData.data.responseData.totalCount,
            totalPages: respData.data.responseData.totalPages,
          })
        );
        dispatch(getSalesPriceValues());
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        //Alert(2, data?.message || data?.responseMsg);
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
      `?search=&type=${type}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateProductAndServices({
            productServicesCategory: respData.data.responseData.categories,
          })
        );
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        //Alert(2, data?.message || data?.responseMsg);
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
            updateProductAndServices({
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
    // dispatch(updateGlobalLoader(true));
    const { type } = getState().productServicesSlice;
    api.getApiCall(
      endpoints.checkDetailExist,
      `?type=${type}&queryFor=${queryFor}&search=${SearchFor}`,
      (respData: any) => {
        callback(respData);
        // dispatch(updateGlobalLoader(false));
        // callback(respData.data)
        // dispatch(
        //   updateProductAndServices({
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

// export const getHsnCodeList = () => {
//   return (dispatch: any, getState: any) => {
//     dispatch(updateGlobalLoader(true));
//     // const { type, queryFor, SearchFor } = getState().productServicesSlice;
//     api.getApiCall(
//       endpoints.getHSNCode,
//       ``,
//       (respData: any) => {
//         dispatch(updateGlobalLoader(false));
//         dispatch(
//           updateProductAndServices({
//             hsnCodeList: respData.data.responseData.HsnSacData,
//           })
//         );
//       },
//       (error: any) => {
//         dispatch(updateGlobalLoader(false));
//         let { data } = error;
//         Alert(2, data?.message || data?.responseMsg);
//       }
//     );
//   };
// };

// export const getSalesUnitList = () => {
//   return (dispatch: any, getState: any) => {
//     dispatch(updateGlobalLoader(true));
//     const { type, queryFor, SearchFor } = getState().productServicesSlice;
//     api.getApiCall(
//       endpoints.salesUnit,
//       ``,
//       (respData: any) => {
//         dispatch(updateGlobalLoader(false));
//         dispatch(
//           updateProductAndServices({
//             salesUnit: respData.data.responseData.salesUnitData,
//           })
//         );
//       },
//       (error: any) => {
//         dispatch(updateGlobalLoader(false));
//         let { data } = error;
//         Alert(2, data?.message || data?.responseMsg);
//       }
//     );
//   };
// };

export const getListManagement = (listType: number, type?: number) => {
  return (dispatch: any, getState: any) => {
    const { hsnCodeList, sacCodeList, gstRate } =
      getState().productServicesSlice;
    if (hsnCodeList?.length > 0 && listType === 1 && type === 1) return;
    if (sacCodeList?.length > 0 && listType === 1 && type === 2) return;
    if (gstRate?.length > 0 && listType === 3) return;
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getListManagement,
      `?listType=${listType}&type=${type}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        if (listType === 1) {
          if (type === 1)
            dispatch(
              updateProductAndServices({
                hsnCodeList: respData.data.responseData,
              })
            );
          else if (type === 2)
            dispatch(
              updateProductAndServices({
                sacCodeList: respData.data.responseData,
              })
            );
        } else if (listType === 2) {
          dispatch(
            updateProductAndServices({
              salesUnit: respData.data.responseData,
            })
          );
        } else {
          dispatch(
            updateProductAndServices({
              gstRate: respData.data.responseData,
            })
          );
        }
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        // Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const addProductServices = (values: any, closePopup: any) => {
  return (dispatch: any, getState: any) => {
    const { type, imageUrl } = getState().productServicesSlice;
    dispatch(updateGlobalLoader(true));
    console.log("values", values);
    const {
      productName,
      itemCategory,
      salesUnit,
      skuNumber,
      purchasePrice,
      salePrice,
      cess,
      isGstApplicable,
      isITCEnabled,
      isRCMEnabled,
      hsnCode,
      taxability,
      gstRate,
      // incomeCategory,
      // expenseCategory,
      description,
      openingStock,
      lowstockAlert,
      trackInventory,
      // isDefaultIncomeCategory,
      // isDefaultExpenseCategory,
    } = values;
    var dataToSend: any = {
      name: productName,
      description,
      image: imageUrl,
      type,
      productCategoryId: itemCategory,
      skuNumber,
      salesUnitId: salesUnit,
      purchasePrice: purchasePrice ? purchasePrice : 0,
      salePrice: +salePrice ? +salePrice : "",
      isGstApplicable: isGstApplicable === "yes" ? true : false,
      gst:
        isGstApplicable === "yes"
          ? {
              hsnSacCode: hsnCode ? hsnCode : "",
              itemTaxability: taxability ? taxability : 0,
              gstRate: gstRate ? gstRate : 0,
              cess: cess ? cess : 0,
              isITCEnabled: isITCEnabled === "yes" ? true : false,
              isRCMEnabled: isRCMEnabled === "yes" ? true : false,
            }
          : {
              hsnSacCode: hsnCode ? hsnCode : "",
              itemTaxability: 0,
              gstRate: 0,
              cess: 0,
              isITCEnabled: isITCEnabled === "yes" ? true : false,
              isRCMEnabled: isRCMEnabled === "yes" ? true : false,
            },
      trackInventory: trackInventory ? true : false,
      inventory: trackInventory
        ? {
            // openingStock: +openingStock ? openingStock : 0,
            stockLeft: +openingStock ? openingStock : 0,
            lowStockAlert: +lowstockAlert ? lowstockAlert : 0,
          }
        : {
            stockLeft: 0,
            lowStockAlert: 0,
          },
      // incomeCategory,
      // expenseCategory,
      // isDefaultIncomeCategory,
      // isDefaultExpenseCategory,
    };
    // if (!dataToSend.incomeCategory) {
    //   delete dataToSend.incomeCategory;
    // }
    // if (!dataToSend.expenseCategory) {
    //   delete dataToSend.expenseCategory;
    // }
    if (isGstApplicable === "no") {
      delete dataToSend.gst;
    }
    if (!dataToSend.image) {
      delete dataToSend.image;
    }
    if (!dataToSend.skuNumber) {
      delete dataToSend.skuNumber;
    }
    if (!dataToSend.description) {
      delete dataToSend.description;
    }
    if (!dataToSend.salesUnitId) {
      delete dataToSend.salesUnitId;
    }
    if (!dataToSend.productCategoryId) {
      delete dataToSend.productCategoryId;
    }
    api.postApiCall(
      endpoints.addProductServices,
      dataToSend,
      (respData: any) => {
        dispatch(getProductAndServicesListing());
        dispatch(
          updateSalePurchase({
            responseData: respData?.data?.responseData?.data,
          })
        );
        // dispatch(updateGlobalLoader(false));
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);
        closePopup();
        dispatch(
          updateProductAndServices({
            imageUrl: "",
          })
        );
        // dispatch(
        //   updateProductAndServices({
        //     salesUnit: respData.data.responseData.salesUnitData,
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

/*****Update product or servives */

export const updateProductServices = (
  values: any,
  id: any,
  closePopup: any
) => {
  return (dispatch: any, getState: any) => {
    const { type, imageUrl } = getState().productServicesSlice;
    dispatch(updateGlobalLoader(true));
    console.log("values", values);
    const {
      productName,
      itemCategory,
      salesUnit,
      skuNumber,
      purchasePrice,
      salePrice,
      cess,
      isGstApplicable,
      isITCEnabled,
      isRCMEnabled,
      hsnCode,
      taxability,
      gstRate,
      // incomeCategory,
      // expenseCategory,
      description,
      openingStock,
      lowstockAlert,
      trackInventory,
      //  isDefaultExpenseCategory,
      // isDefaultIncomeCategory,
    } = values;
    const dataToSend: any = {
      productServiceId: id,
      name: productName,
      description,
      image: imageUrl,
      type,
      productCategoryId: itemCategory,
      skuNumber,
      salesUnitId: salesUnit,
      purchasePrice: purchasePrice ? purchasePrice : 0,

      salePrice: +salePrice ? +salePrice : "",
      isGstApplicable: isGstApplicable === "yes" ? true : false,
      gst:
        isGstApplicable === "yes"
          ? {
              hsnSacCode: hsnCode ? hsnCode : "",
              itemTaxability: taxability ? taxability : 0,
              gstRate: gstRate ? gstRate : 0,
              cess: cess ? cess : 0,
              isITCEnabled: isITCEnabled === "yes" ? true : false,
              isRCMEnabled: isRCMEnabled === "yes" ? true : false,
            }
          : {
              hsnSacCode: "",
              itemTaxability: 0,
              gstRate: 0,
              cess: 0,
              isITCEnabled: isITCEnabled === "yes" ? true : false,
              isRCMEnabled: isRCMEnabled === "yes" ? true : false,
            },
      trackInventory: trackInventory ? true : false,
      inventory: {
        // openingStock: +openingStock ? openingStock : 0,
        stockLeft: +openingStock ? openingStock : 0,
        lowStockAlert: +lowstockAlert ? lowstockAlert : 0,
      },
      // incomeCategory: incomeCategory ? incomeCategory : null,
      // expenseCategory: expenseCategory ? expenseCategory : null,
      // isDefaultIncomeCategory,
      // isDefaultExpenseCategory,
    };
    // if (!dataToSend.incomeCategory) {
    //   delete dataToSend.incomeCategory;
    // }
    // if (!dataToSend.expenseCategory) {
    //   delete dataToSend.expenseCategory;
    // }
    // if (isGstApplicable === "no") {
    //   delete dataToSend.gst;
    // }
    if (!dataToSend.skuNumber) {
      delete dataToSend.skuNumber;
    }
    if (!dataToSend.description) {
      delete dataToSend.description;
    }
    if (!dataToSend.salesUnitId) {
      delete dataToSend.salesUnitId;
    }
    if (!dataToSend.productCategoryId) {
      delete dataToSend.productCategoryId;
    }
    if (!dataToSend.image) {
      delete dataToSend.image;
    }
    // if (!dataToSend.gst?.hsnSacCode) {
    //   delete dataToSend.gst?.hsnSacCode;
    // }
    api.putApiCall(
      endpoints.updateProductServices,
      dataToSend,
      (respData: any) => {
        dispatch(getProductAndServicesListing());
        dispatch(
          updateSalePurchase({
            responseData: respData?.data?.responseData?.data,
          })
        );
        // dispatch(updateGlobalLoader(false));
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);
        closePopup();

        dispatch(
          updateProductAndServices({
            editProductData: "",
            imageUrl: "",
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

export const addCategories = (values: any, callback: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    const { type, productServicesCategory } = getState().productServicesSlice;

    const { categoryName, description } = values;
    const dataToSend = {
      categoryName: categoryName,
      description: description,
      type: type,
    };
    api.postApiCall(
      endpoints.addCategories,
      dataToSend,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateProductAndServices({
            productServicesCategory: [
              ...productServicesCategory,
              respData.data.responseData.category,
            ],
          })
        );
        // dispatch(getProductAndServicesCategory());
        // console.log(respData.data);
        callback(respData.data);
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
export const deleteProductAndService = (productServiceId: string) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.deleteApiCall(
      endpoints.deleteProductService,
      `?productServiceId=${productServiceId}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(getProductAndServicesListing());
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const getSalesPriceValues = () => {
  return (dispatch: any, getState: any) => {
    const { type } = getState().productServicesSlice;
    api.getApiCall(
      endpoints.salesPriceValue,
      `?type=${type}`,
      (respData: any) => {
        dispatch(
          updateProductAndServices({
            salesPriceMin: respData.data.responseData.priceRange.min,
            salesPriceMax: respData.data.responseData.priceRange.max,
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
/***Get expese category */

export const getCOACategory = (type: any, COACategoryData: any) => {
  return (dispatch: any, getState: any) => {
    // dispatch(updateGlobalLoader(true));
    // const { type } = getState().productServicesSlice;
    api.getApiCall(
      endpoints.getChartOfAccount,
      `?type=${type}`,
      (respData: any) => {
        COACategoryData(respData);
      },
      (error: any) => {
        // dispatch(updateGlobalLoader(false));
        // callback(respData.data)
        let { data } = error;
        COACategoryData(data);
        // Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

/********Product  service Detail */
export const getProductServicedetail = (id: any, setState: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    // const { type } = getState().productServicesSlice;

    api.getApiCall(
      endpoints.productServicedetail,
      `?productServiceId=${id}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateProductAndServices({
            productServiceDetail: respData.data.responseData?.data,
            editProductData: true,
            imageUrl: respData.data?.responseData?.data?.image,
          })
        );
        setState(true);
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        // callback(respData.data)
        let { data } = error;
        // COACategoryData(data);
        // Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

/***Get stock count */

export const getStockCount = () => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.stockCount,
      `?type=1`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateProductAndServices({
            outOfStock: respData.data.responseData?.stockDetails?.outOfStock,
            lowStock: respData.data.responseData?.stockDetails?.lowStock,
          })
        );
        // dispatch(getProductAndServicesListing());
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const changeProductServiceStatus = (values: any) => {
  return (dispatch: any, getState: any) => {
    const { id, status } = values;
    dispatch(updateGlobalLoader(true));
    api.putApiCall(
      endpoints.changeStatusProductService,
      { status: status, productServiceId: id },
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(getProductAndServicesListing());
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};
export const downloadProductExcel = (type: any, fileType: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.dashboardProductExcel,
      `?type=${type}`,
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

export const bulkExcelUpload = (
  values: any,
  setDialogOpen: any,
  setErros: any
) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.postApiCall(
      endpoints.bulkProductExcel,
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
export const getProductAndServicesPresignedurl = (
  key: any,
  extention: any,
  file: any,
  callback: any
) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.presignedurl,
      `?key=${key}.${extention}&fileType=application/${extention}`,
      (respData: any) => {
        axios.put(respData?.data?.result, file, {}).then(() => {
          callback(import.meta.env.VITE_IMAGE_URL + `${key}.${extention}`);
          dispatch(
            updateProductAndServices({
              fileUrl: import.meta.env.VITE_IMAGE_URL + `${key}.${extention}`,
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
