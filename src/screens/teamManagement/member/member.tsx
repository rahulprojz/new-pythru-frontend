import React, { useEffect, useState } from "react";
// import Grid from "@mui/material/Grid";

import { useNavigate } from "react-router-dom";

import AddRole from "../../../components/buttons/buttonWithIcon";

import AddRoleDrawer from "../../../components/drawer/";

import RoleFilterDrawer from "../../../components/drawer";
import Breadcrumbs from "../../../components/breadcrumb";

import NormalButton from "../../../components/buttons/normalButton";
import "../role/role.scss";
import {
  updateTeamManagement,
  resetTeamManagement,
} from "../teamManagementSlice";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import MemberFilter from "./filter";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import "react-datepicker/dist/react-datepicker.css";

import { useDispatch } from "react-redux";
import NormalSelect from "../../../components/select/normalSelect";
import { useSelector } from "react-redux";

import { elementFromArray } from "../../../utils/Common.Function";
import AddMember from "./AddMember";
import MemberTable from "../../../components/tables/MemberTable";
import { getMemberDetail, getroles } from "../teamManagemnetAction";

function Index() {
  const Navigate = useNavigate();

  const [addMember, setAddMember] = useState(false);
  const [editMemberStatus, setEditMemberStatus] = useState(false);
  const dispatch: any = useDispatch();

  // const [incomeCategory, setincomeCategory] = useState("");
  // const [expenseCategory, setexpenseCategory] = useState("");
  const [filterState, setfilterState] = React.useState(false);
  const [category, setCategory]: any = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState("");
  const [filterCount, setFilterCount] = useState<number>(0);
  // const [values, setValues] = useState(formValues1);

  const {
    productServicesCategory,

    salesPriceMin,
    salesPriceMax,
  } = useSelector((state: any) => state.productServicesSlice);
  const productCategory =
    productServicesCategory &&
    productServicesCategory.length > 0 &&
    productServicesCategory.filter((cat: any) => cat.type === 1);

  const [price, setPrice]: any = useState<number[]>(
    salesPriceMin && salesPriceMax ? [salesPriceMin, salesPriceMax] : [0, 1000]
  );

  const [openfilterDrop, setopenfilterDrop] = useState(false);
  const filterhandleClick = () => {
    setopenfilterDrop((prev: any) => !prev);
  };

  const handleCategoryChange = (e: any) => {
    if (e.target.checked) {
      setCategory([...category, e.target.name]);
    } else {
      setCategory(elementFromArray(category, e.target.name));
    }
  };

  const handleAllCategoryChange = (e: any) => {
    if (e.target.checked) {
      if (productCategory && productCategory.length > 0) {
        let ids = productCategory.map(({ _id }: any) => _id);
        setCategory(ids);
      }
    } else {
      setCategory([]);
    }
  };

  React.useEffect(() => {
    dispatch(getroles());
    // dispatch(resetTeamManagement())
    return () => dispatch(resetTeamManagement());
  }, []);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue);
  };

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };
  const openFilter = () => {
    setfilterState(true);
  };
  const handleStartDate = (date: any) => {
    setStartDate(date);
    setEndDate(null);
  };

  const handleEdit = (row: any) => {
    dispatch(getMemberDetail(row._id, setEditMemberStatus));
  };
  return (
    <>
        <AddRole
          text="+ New Team Member"
          className="btn-purple"
          onPress={() => {
            setAddMember(true);
          }}
        />
      <MemberTable
        filterPress={() => dispatch(updateTeamManagement({ roleFilter: true }))}
        setEditMemberStatus={setEditMemberStatus}
        handleEdit={handleEdit}
        setAddMember={setAddMember}
      />

      {/* FOR ADD MEMBER**** */}
      <AddRoleDrawer state={addMember} setState={setAddMember}>
        {addMember && <AddMember setMemberState={setAddMember} type="new" />}
      </AddRoleDrawer>

      {/* FOR EDIT MEMBER**** */}
      <AddRoleDrawer state={editMemberStatus} setState={setEditMemberStatus}>
        {editMemberStatus && (
          <AddMember setMemberState={setEditMemberStatus} type="edit" />
        )}
      </AddRoleDrawer>

      <MemberFilter />
    </>
  );
}

export default Index;
