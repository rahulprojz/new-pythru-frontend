import request from "./axios.instance";
// import Utils from ".";
import { Alert, getAuthTokenFromLS } from ".";

// import { useTranslation } from "react-i18next";
// const { t } = useTranslation();
/**
 * function to check if code matches to user invalid.
 * @param data
 */

const checkUserValidation = (data: any) => {
  if (data) {
    // const { status } = data, {
    // 	sessionExpired,
    // 	unauthorized,
    // 	accessDenied,
    // 	maintenanceMode,
    // } = Utils.statusCode.ERROR
    // if (status) {
    // 	return (
    // 		status === sessionExpired ||
    // 		status === unauthorized ||
    // 		status === accessDenied ||
    // 		status === maintenanceMode
    // 	);
    // }
    return false;
  }
  return false;
};

/**
 *
 * @param endPoint api end point
 * @param params request data
 * @param successCallback function for handle success response
 * @param errorCallback  function for handle error response
 */
const postApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCallback: Function,
  token?: any
) => {
  request
    .post(endPoint, params, {
      headers: {
        "X-AUTH-TOKEN": getAuthTokenFromLS() || token || "",
        authorization: import.meta.env.VITE_AUTHORIZATION_KEY,
      },
    })
    .then((response: any) => {
      successCallback(response);
    })
    .catch((error: any) => {
      if (!navigator.onLine) {
        Alert(2, "No internet connection");
        return;
      }
      if (error.code === "ECONNABORTED") {
        let payload = {
          data: {
            statusCode: 408,
          },
        };
        errorCallback(payload);
      } else if (error.response) {
        let data = error.response.data;
        if (checkUserValidation(data)) {
          //if user session expired
          // Utils.showAlert(2, data.message);
          setTimeout(() => {
            // logOutApiCall();
          }, 1000);
        } else {
          errorCallback(error.response);
        }
      } else if (!error.response) {
        let payload = {
          data: {
            statusCode: "",
            message: "Please try again later",
          },
        };
        errorCallback(payload);
      }
    });
};

/**
 *
 * @param endPoint api end point
 * @param params api url parameter
 * @param successCallback function for handle success response
 * @param errorCallback function for handle error response
 */
const getApiCall = (
  endPoint: string,
  params: string = "",
  successCallback: Function,
  errorCallback: Function,
  token?: any
) => {
  request
    .get(endPoint + params, {
      headers: {
        "X-AUTH-TOKEN": getAuthTokenFromLS() || token || "",
        authorization: import.meta.env.VITE_AUTHORIZATION_KEY,
      },
    })
    .then((response: any) => {
      successCallback(response);
    })
    .catch((error: any) => {
      if (!navigator.onLine) {
        Alert(4, "No internet connection");
        return;
      }
      if (error.code === "ECONNABORTED") {
        let payload = {
          data: {
            statusCode: 408,
          },
        };
        errorCallback(payload);
      } else if (error.response) {
        let data = error.response.data;
        if (checkUserValidation(data)) {
          //if user session expired
          // Utils.showAlert(2, data.message);
          setTimeout(() => {
            // logOutApiCall();
          }, 1000);
        } else {
          errorCallback(error.response);
        }
      } else if (!error.response) {
        let payload = {
          data: {
            statusCode: "",
            message: "Please try again later",
          },
        };
        errorCallback(payload);
      }
    });
};

/**
 *
 * @param endPoint api end point
 * @param params api request data
 * @param successCallback function for handle success response
 * @param errorCallback function for handle error response
 */
const deleteApiCall = (
  endPoint: string,
  params: string = "",
  successCallback: Function,
  errorCallback: Function
) => {
  request
    .delete(endPoint + params, {})
    .then((response: any) => {
      successCallback(response);
    })
    .catch((error: any) => {
      if (!navigator.onLine) {
        Alert(4, "No internet connection");
        return;
      }
      if (error.code === "ECONNABORTED") {
        let payload = {
          data: {
            statusCode: 408,
          },
        };
        errorCallback(payload);
      } else if (error.response) {
        let data = error.response.data;
        if (checkUserValidation(data)) {
          //if user session expired
          // Utils.showAlert(2, data.message);
          setTimeout(() => {
            // logOutApiCall();
          }, 1000);
        } else {
          errorCallback(error.response);
        }
      } else if (!error.response) {
        let payload = {
          data: {
            statusCode: "",
            message: "Please try again later",
          },
        };
        errorCallback(payload);
      }
    });
};

/**
 *
 * @param endPoint api end point
 * @param params api request data
 * @param successCallback function for handle success response
 * @param errorCallback function for handle error response
 */

const patchApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCallback: Function
) => {
  request
    .patch(endPoint, params)
    .then((response: any) => {
      successCallback(response);
    })
    .catch((error: any) => {
      if (!navigator.onLine) {
        Alert(4, "No internet connection");
        return;
      }
      if (error.code === "ECONNABORTED") {
        let payload = {
          data: {
            statusCode: 408,
          },
        };
        errorCallback(payload);
      } else if (error.response) {
        let data = error.response.data;
        if (checkUserValidation(data)) {
          //if user session expired
          // Utils.showAlert(2, data.message);
          setTimeout(() => {
            // logOutApiCall();
          }, 1000);
        } else {
          errorCallback(error.response);
        }
      } else if (!error.response) {
        let payload = {
          data: {
            statusCode: "",
            message: "Please try again later",
          },
        };
        errorCallback(payload);
      }
    });
};
/**
 *
 * @param endPoint api end point
 * @param params request data
 * @param successCallback function for handle success response
 * @param errorCallback  function for handle error response
 */
const putApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCallback: Function
) => {
  request
    .put(endPoint, params)
    .then((response: any) => {
      successCallback(response);
    })
    .catch((error: any) => {
      if (!navigator.onLine) {
        Alert(4, "No internet connection");
        return;
      }
      if (error.code === "ECONNABORTED") {
        let payload = {
          data: {
            statusCode: 408,
          },
        };
        errorCallback(payload);
      } else if (error.response) {
        let data = error.response.data;
        if (checkUserValidation(data)) {
          //if user session expired
          // Utils.showAlert(2, data.message);
          setTimeout(() => {
            // logOutApiCall();
          }, 1000);
        } else {
          errorCallback(error.response);
        }
      } else if (!error.response) {
        let payload = {
          data: {
            statusCode: "",
            message: "Please try again later",
          },
        };
        errorCallback(payload);
      }
    });
};
/**
 * Logout API
 */
// const logOutApiCall = () => {
// 	if (!navigator.onLine) {
// 		//check if user is online or not
// 		Utils.showAlert(3, 'Please check your internet connection!');
// 		return;
// 	}

// 	request
// 		.patch(Utils.endPoints.logout, '')
// 		.then((response: any) => {
// 			constants.getAuthToken();
// 			constants.removeSession();
// 			window.location.href = window.location.origin;
// 		})
// 		.catch((error: any) => {
// 			constants.getAuthToken();
// 			constants.removeSession();
// 			window.location.href = window.location.origin;
// 		});
// };

// const getWidgetCall = (
// 	endPoint: string,
// 	params: string = '',
// 	successCallback: Function,
// 	errorCallback: Function
// ) => {
// 	request
// 		.get(endPoint + params, {})
// 		.then((response: any) => {
// 			successCallback(response);
// 		})
// 		.catch((error: any) => {
// 			if (error.code === 'ECONNABORTED') {
// 				let payload = {
// 					data: {
// 						statusCode: 408,
// 					},
// 				};
// 				errorCallback(payload);
// 			} else if (error.response) {
// 				let data = error.response.data;
// 				if (checkUserValidation(data)) {
// 					//if user session expired
// 					Utils.showAlert(2, data.message);
// 					setTimeout(() => {
// logOutApiCall();
// 					}, 1000);
// 				} else {
// 					errorCallback(error.response);
// 				}
// 			} else if (!error.response) {
// 				let payload = {
// 					data: {
// 						statusCode: '',
// 						message: 'Please try again later',
// 					},
// 				};
// 				errorCallback(payload);
// 			}
// 		});
// };

// const postApiInteracCall = (
// 	endPoint: string,
// 	params: object,
// 	successCallback: Function,
// 	errorCallback: Function
// ) => {
// 	request
// 		.post(endPoint + 'payments/interac/buy', params)
// 		.then((response: any) => {
// 			successCallback(response);
// 		})
// 		.catch((error: any) => {
// 			errorCallback(error);
// 		});
// };

const postApiCallForLogin = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCallback: Function,
  ip_address?: any
) => {
  request
    .post(endPoint, params, {
      headers: {
        "ip-address": ip_address,
        "X-AUTH-TOKEN": getAuthTokenFromLS() || "",
        authorization: import.meta.env.VITE_AUTHORIZATION_KEY,
      },
    })
    .then((response: any) => {
      successCallback(response);
    })
    .catch((error: any) => {
      if (!navigator.onLine) {
        Alert(2, "No internet connection");
        return;
      }
      if (error.code === "ECONNABORTED") {
        let payload = {
          data: {
            statusCode: 408,
          },
        };
        errorCallback(payload);
      } else if (error.response) {
        let data = error.response.data;
        if (checkUserValidation(data)) {
          //if user session expired
          // Utils.showAlert(2, data.message);
          setTimeout(() => {
            // logOutApiCall();
          }, 1000);
        } else {
          errorCallback(error.response);
        }
      } else if (!error.response) {
        let payload = {
          data: {
            statusCode: "",
            message: "Please try again later",
          },
        };
        errorCallback(payload);
      }
    });
};
/**
 * export all function
 */
export const api = {
  putApiCall,
  // getWidgetCall,
  getApiCall,
  postApiCall,
  patchApiCall,
  deleteApiCall,
  // logOutApiCall,
  postApiCallForLogin,
  checkUserValidation,
  // postApiInteracCall,
};
