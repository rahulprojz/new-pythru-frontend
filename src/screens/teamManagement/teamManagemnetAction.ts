import { updateGlobalLoader } from "../../components/backdrop/backdropSlice";
import { Alert, api, endpoints } from "../../utils";
import { updateTeamManagement } from "./teamManagementSlice";

export const getroles = () => {
  return (dispatch: any, getState: any) => {
    console.log("GetState>", getState().teamManagementSlice);
    const {
      limit,
      page,
      search,
      fromDate,
      toDate,
      sort_type,
      sort_key,
      roleList,
      status,
    } = getState().teamManagementSlice;

    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getRoles,
      `?limit=${limit}&page=${page}&search=${search}&status=${status}&fromDate=${fromDate}&toDate=${toDate}&sort_key=${sort_key}&sort_type=${sort_type}`,
      (respData: any) => {
        console.log(respData);
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateTeamManagement({
            roleList: respData.data.responseData.data,
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

// *****Role add Post API *******
export const addrole = (values: any, closePopup: any) => {
  return (dispatch: any, getState: any) => {
    let dataToSend = values;

    dispatch(updateGlobalLoader(true));

    api.postApiCall(
      endpoints.addrole,
      dataToSend,
      (respData: any) => {
        // dispatch(updateGlobalLoader(false));
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);
        closePopup();
        dispatch(getroles());
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

/******** Role Detail */
export const getRoleDetail = (id: any, setState: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    // const { type } = getState().productServicesSlice;

    api.getApiCall(
      endpoints.getRole,
      `?roleId=${id}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));

        let {
          name,
          _id: roleId,
          permission,
          status,
        } = respData.data.responseData;
        dispatch(
          updateTeamManagement({
            roleDetail: { name, roleId, permission, status },
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

// UPDATE ROLE API ********

export const updateRole = (values: any, closePopup: any) => {
  return (dispatch: any, getState: any) => {
    let { roleId, name, permission } = values;

    dispatch(updateGlobalLoader(true));

    api.putApiCall(
      endpoints.updateRole,
      { roleId, name, permission },
      (respData: any) => {
        // dispatch(updateGlobalLoader(false));
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);
        closePopup();
        dispatch(getroles());
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

// UPDATE STATUS OF ROLE *******

export const changeRoleStatus = (values: any) => {
  return (dispatch: any, getState: any) => {
    const { id, status } = values;
    dispatch(updateGlobalLoader(true));

    console.log("Come here ues");

    api.putApiCall(
      endpoints.updateRoleStatus,
      { status: status, roleId: id },
      (respData: any) => {
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);

        dispatch(updateGlobalLoader(false));
        dispatch(getroles());
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

// TEAM MEMBER API'S ****

export const getMembers = () => {
  return (dispatch: any, getState: any) => {
    // console.log("GetState>", getState().teamManagementSlice);

    const {
      limit,
      page,
      search,
      fromDate,
      toDate,
      sort_type,
      sort_key_member,
      status,
      roleId,
    } = getState().teamManagementSlice;
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getMembers,
      `?limit=${limit}&page=${page}&search=${search}&status=${status}&fromDate=${fromDate}&toDate=${toDate}&sort_key=${sort_key_member}&sort_type=${sort_type}&roleId=${roleId}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updateTeamManagement({
            membersList: respData.data.responseData.data,
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

// ADD MEMBER API *******

export const add_Member = (values: any, closePopup: any) => {
  return (dispatch: any, getState: any) => {
    let dataToSend = values;

    dispatch(updateGlobalLoader(true));

    api.postApiCall(
      endpoints.addMember,
      dataToSend,
      (respData: any) => {
        // dispatch(updateGlobalLoader(false));
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);
        closePopup();
        dispatch(getMembers());
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

// ADD MEMBER API *******

export const getMemberDetail = (id: any, setState: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    // const { type } = getState().productServicesSlice;

    api.getApiCall(
      endpoints.getMemberDetail,
      `?memberId=${id}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));

        // Only values need for update***

        const {
          fullName,
          email,
          phoneNumber,
          permission,
          _id: memberId,
          status,
          roleId,
        } = respData.data.responseData;

        dispatch(
          updateTeamManagement({
            memberDetail: {
              fullName,
              email,
              phoneNumber,
              permission,
              memberId,
              status,
              roleId,
            },
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

// UPDATE MEMBER API ******

export const updateMember = (values: any, closePopup: any) => {
  return (dispatch: any, getState: any) => {
    let dataToSend = values;
    console.log(values);

    dispatch(updateGlobalLoader(true));

    api.putApiCall(
      endpoints.updateMember,
      dataToSend,
      (respData: any) => {
        // dispatch(updateGlobalLoader(false));
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);
        closePopup();
        dispatch(getMembers());
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

// UPDATE STATUS OF Member *******

export const changeMemberStatus = (values: any) => {
  return (dispatch: any, getState: any) => {
    const { id, status } = values;
    dispatch(updateGlobalLoader(true));

    console.log("Come here ues");

    api.putApiCall(
      endpoints.updateMemberStatus,
      { status: status, memberId: id },
      (respData: any) => {
        Alert(1, respData?.data?.message || respData?.data?.responseMsg);

        dispatch(updateGlobalLoader(false));
        dispatch(getMembers());
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};
