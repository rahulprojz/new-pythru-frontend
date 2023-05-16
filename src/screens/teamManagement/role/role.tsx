import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import AddRoleButton from "../../../components/buttons/buttonWithIcon";
import RoleManagement from "../../../components/tables/roleManagement";
import AddRole from "../../../components/drawer";
import EditRole from "../../../components/drawer";

import {
  updateTeamManagement,
  resetTeamManagement,
} from "../teamManagementSlice";
import "./role.scss";
import RollFilter from "./filter";

import Breadcrumbs from "../../../components/breadcrumb";

import AddEditRole from "./addRole";
import { getRoleDetail } from "../teamManagemnetAction";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Member from "../member/member";

const Index = () => {
  const dispatch: any = useDispatch();
  const [addState, setAddState] = useState(false);
  const [editRoleStatus, setEditRoleStatus] = useState(false);

  const [value, setValue] = useState("1");

  useEffect(() => {
    document.title = "Team Management | PyThru";
    dispatch(resetTeamManagement());
    return () => dispatch(resetTeamManagement());
  }, []);

  const handleEdit = (row: any) => {
    dispatch(getRoleDetail(row._id, setEditRoleStatus));
  };

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
      <Breadcrumbs />

      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Role" value="1" className="btn" />
          <Tab label="Team Member" value="2" className="btn" />
        </TabList>

        <TabPanel value="1">
          <AddRoleButton
            text="+ New Role"
            className="btn-purple"
            onPress={() => setAddState(true)}
          />

          <RoleManagement
            filterPress={() =>
              dispatch(updateTeamManagement({ roleFilter: true }))
            }
            setEditStatus={setEditRoleStatus}
            handleEdit={handleEdit}
            setAddState1={setAddState}
          />

          {/* ADD ROLE  */}
          <AddRole
            state={addState}
            setState={setAddState}
            className="addRoleDrawer"
          >
            {addState && <AddEditRole type="new" setAddState={setAddState} />}
          </AddRole>

          {/* EDIT ROLE  */}
          <EditRole
            state={editRoleStatus}
            setState={setEditRoleStatus}
            className="addRoleDrawer"
          >
            {editRoleStatus && (
              <AddEditRole type="edit" setAddState={setEditRoleStatus} />
            )}
          </EditRole>

          <RollFilter />
        </TabPanel>

        <TabPanel value="2">
          <Member />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default Index;
