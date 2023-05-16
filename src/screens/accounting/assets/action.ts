import moment from "moment";
import {
  api,
  endpoints,
  Alert,
  updateArrayObject,
  updateDeleteObject,
} from "../../../utils";
import { updateGlobalLoader } from "../../../components/backdrop/backdropSlice";
import { updateAsset } from "./assetSlice";

const getAssets = () => {
  return (dispatch: any, getState: any) => {
    const {
      limit,
      page,
      sort_key,
      sort_type,
      search,
      fromAmount,
      toAmount,
      fromDate,
      toDate,
      purchaseFromDate,
      purchaseToDate,
    } = getState().assetSlice;
    dispatch(updateGlobalLoader(true));

    api.getApiCall(
      endpoints.getAsset,
      `?limit=${limit}&page=${page}&sort_key=${sort_key}&sort_type=${sort_type}&search=${search}&fromAmount=${fromAmount}&toAmount=${toAmount}&fromDate=${fromDate}&toDate=${toDate}&purchaseFromDate=${purchaseFromDate}&purchaseToDate=${purchaseToDate}`,
      (respData: any) => {
        dispatch(
          updateAsset({
            assetList: respData.data.responseData.data,
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

const deleteAsset = (assetId: string) => {
  return (dispatch: any, getState: any) => {
    //const { assetList, totalCount } = getState().assetSlice;
    dispatch(updateGlobalLoader(true));
    api.deleteApiCall(
      endpoints.deleteAsset,
      `?assetId=${assetId}`,
      (respData: any) => {
        // const updatedAssetList = updateDeleteObject(assetList, assetId);
        // if (assetList.length !== 1) {
        //   dispatch(
        //     updateAsset({
        //       assetList: updatedAssetList,
        //       totalCount: totalCount - 1,
        //     })
        //   );
        // } else {
        //   dispatch(
        //     updateAsset({
        //       assetList: updatedAssetList,
        //       totalCount: 0,
        //       totalPage: 0,
        //     })
        //   );
        // }
        dispatch(getAssets());
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

const getAssetdetail = (id: any, setState: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.assetDetail,
      `?assetId=${id}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateAsset({
            assetDetail: respData.data.responseData.detail,
            editAsset: true,
          })
        );
        setState(true);
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

const addAsset = (values: any, closePopup: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    const { name, amount, purchasedDate, supportedDate, description } = values;
    let body: any = {
      name,
      amount,
      purchasedDate: purchasedDate
        ? moment(purchasedDate).format("YYYY-MM-DD")
        : "",
      supportedDate: supportedDate
        ? moment(supportedDate).format("YYYY-MM-DD")
        : "",
      description,
    };

    api.postApiCall(
      endpoints.addAsset,
      body,
      (respData: any) => {
        dispatch(getAssets());
        // dispatch(updateGlobalLoader(false));
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);
        closePopup();
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

const updateAssetDetail = (values: any, id: string, closePopup: any) => {
  return (dispatch: any, getState: any) => {
    const { assetList } = getState().assetSlice;
    dispatch(updateGlobalLoader(true));
    const { name, amount, purchasedDate, supportedDate, description } = values;
    let body: any = {
      assetId: id,
      name,
      amount,
      purchasedDate: purchasedDate
        ? moment(purchasedDate).format("YYYY-MM-DD")
        : "",
      supportedDate: supportedDate
        ? moment(supportedDate).format("YYYY-MM-DD")
        : "",
      description,
    };

    api.putApiCall(
      endpoints.updateAsset,
      body,
      (respData: any) => {
        const {
          _id,
          name,
          amount,
          purchasedDate,
          supportedDate,
          description,
          createdAt,
        } = respData?.data.responseData.assetDetails;
        const updatedValue = {
          _id,
          name,
          amount,
          purchasedDate,
          supportedDate,
          description,
          createdAt,
        };
        const updatedAssetList = updateArrayObject(assetList, updatedValue, id);
        dispatch(
          updateAsset({
            assetList: updatedAssetList,
          })
        );
        dispatch(updateGlobalLoader(false));
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);
        closePopup();
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

const getAmountRange = () => {
  return (dispatch: any, getState: any) => {
    const { type } = getState().productServicesSlice;
    api.getApiCall(
      endpoints.getAmountRange,
      ``,
      (respData: any) => {
        dispatch(
          updateAsset({
            minAmount: respData.data.responseData.amountRange.min,
            maxAmount: respData.data.responseData.amountRange.max,
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

export {
  getAssets,
  deleteAsset,
  getAssetdetail,
  addAsset,
  updateAssetDetail,
  getAmountRange,
};
