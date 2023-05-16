import { api, endpoints, Alert, removeEmptyValues } from "../../utils";
import { routesConstant } from "../../constants";
import { updateGlobalLoader } from "../../components/backdrop/backdropSlice";
import { updateSettingsState } from "./settingSlice";
import axios from "axios";
import { updateCommonData } from "../../app/commonSlice";
import { StorefrontOutlined } from "@material-ui/icons";
// import { useCallback } from "react";

export const getProductAndServicesCategory = () => {
  return (dispatch: any, getState: any) => {
    const { type, limit, page, search, sort_type, sort_key, categories } =
      getState().settingSlice;
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.productCategorySettings,
      `?limit=${limit}&page=${page}&search=${search}&sort_key=${sort_key}&sort_type=${sort_type}&type=${
        categories?.length == 2 || !categories?.length ? "" : categories[0]
      }`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateSettingsState({
            productServicesCategory: respData.data.responseData.data,
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

export const addCategories = (values: any, callback: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    const { type } = getState().settingSlice;

    const { name, description } = values;
    const dataToSend = {
      categoryName: name,
      description: description,
      type: type,
    };
    api.postApiCall(
      endpoints.addCategories,
      dataToSend,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(getProductAndServicesCategory());
        console.log(respData.data);
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
export const deletCategory = (id: string) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.deleteApiCall(
      endpoints.deletCategory,
      `?productCategoryId=${id}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(getProductAndServicesCategory());
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const updateCategory = (values: any, id: any, callback: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    const { type } = getState().settingSlice;
    const { name, description } = values;
    const dataToSend = {
      type: type,
      categoryName: name,
      description,
      productCategoryId: id,
    };
    api.putApiCall(
      endpoints.updateCategorySetting,
      dataToSend,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(getProductAndServicesCategory());
        console.log(respData.data);
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
/**Change password */
export const changePassword = (values: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    const { type } = getState().settingSlice;
    const { name, description } = values;
    const dataToSend = values;
    api.postApiCall(
      endpoints.changePassword,
      dataToSend,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(updateSettingsState({ changePasswordDrawer: false }));
        // dispatch(updateSettingsState({}));
        // console.log(respData.data);
        // callback(respData.data);
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

/*****get organization detail */

export const getOrganizationDetail = () => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getOrganisationDetail,
      ``,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateSettingsState({
            organizationDeatil: respData.data.responseData.data,
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

/***Update organization Detail  */
export const updateOrganizationDetail = (values: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    const { type } = getState().settingSlice;
    const {
      companyName,
      website,
      email,
      contact,
      companyLogoUrl,
      pan,
      gst,
      aadhar,
      serviceTaxNo,
      addressLine1,
      addressLine2,
      townCity,
      state,
      zipCode,
    } = values;
    const dataToSend = {
      companyName,
      website,
      // email,
      companyLogoUrl: companyLogoUrl ? companyLogoUrl : "",
      documentInfo: {
        pan,
        gst,
        aadhar: `${aadhar}`,
        serviceTaxNo,
      },
      address: {
        addressLine1,
        addressLine2,
        townCity,
        state,
        zipCode,
      },
    };
    // removeEmptyValues(dataToSend);
    api.putApiCall(
      endpoints.getOrganisationDetail,
      dataToSend,
      (respData: any) => {
        // dispatch(updateGlobalLoader(false));
        // dispatch(updateSettingsState({ changePasswordDrawer: false }));
        // dispatch(updateSettingsState({}));
        // console.log(respData.data);
        // callback(respData.data);
        dispatch(
          updateSettingsState({
            organizationDeatil: respData.data.responseData.data,
          })
        );
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

/*****Get cities List */
export const getCitiesList = (code: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    // const { isoCode, type } = values;
    api.getApiCall(
      endpoints.getCitiesList + "?isoCode=" + code,
      "",
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateCommonData({
            citiesList: respData.data.responseData.citiesData,
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

/*****Get cities List */
export const getCitiesListOnChangeofState = (code: any) => {
  return (dispatch: any, getState: any) => {
    // dispatch(updateGlobalLoader(true));
    // const { isoCode, type } = values;
    api.getApiCall(
      endpoints.getCitiesList + "?isoCode=" + code,
      "",
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateCommonData({
            citiesList: respData.data.responseData.citiesData,
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

export const getPresignedurl = (
  key: string,
  extention: string,
  file: any,
  storefrontOutlined: any
) => {
  return (dispatch: any, getState: any) => {
    // dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.presignedurl,
      `?key=${key}.${extention}&fileType=image/${extention}`,
      (respData: any) => {
        axios.put(respData?.data?.result, file, {}).then(() => {
          storefrontOutlined(
            import.meta.env.VITE_IMAGE_URL + `${key}.${extention}`
          );
          // dispatch(
          //   updateProductAndServices({
          //     imageUrl: import.meta.env.VITE_IMAGE_URL + `${key}.${extention}`,
          //   })
          // );
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
