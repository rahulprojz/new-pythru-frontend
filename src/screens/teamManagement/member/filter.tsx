import React, { useEffect, useState } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import AddProductDrawer from "../../../components/drawer";
import Button from "../../../components/buttons/normalButton";
import { statusListRole } from "../../../constants";
import { getFilterFormtedDate } from "../../../utils";
import "../role/role.scss";
import { getMembers } from "../teamManagemnetAction";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// import NormalButton from "../../buttons/normalButton";
import { calenderIMG, overDueDays } from "../../../constants";

import { Checkbox, FormGroup } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import {
  resetTeamManagement,
  updateTeamManagement,
} from "../teamManagementSlice";

import { elementFromArray } from "../../../utils/Common.Function";
import { combineReducers } from "redux";

function Index() {
  const dispatch: any = useDispatch();
  const [status, setCategory] = useState<any>([]);

  const [roleFilterId, setRollFilter] = useState<any>([]);

  let {
    roleFilter,
    memberFilterCount,
    rollFilterCount,
    roleList,
    fromDate,
    toDate,
  } = useSelector((state: any) => state.teamManagementSlice);
  const handleCategoryChange = (e: any) => {
    if (e.target.checked) {
      setCategory([...status, +e.target.name]);
    } else {
      setCategory(elementFromArray(status, +e.target.name));
    }
  };
  const handleRoleChange = (e: any) => {
    if (e.target.checked) {
      setRollFilter([...roleFilterId, e.target.name]);
    } else {
      setRollFilter(elementFromArray(roleFilterId, e.target.name));
    }
  };
  const handleCategoryChangeAll = (e: any) => {
    if (e.target.checked) {
      if (statusListRole && statusListRole.length > 0) {
        let ids = statusListRole.map(({ id }: any) => id);
        setCategory([...ids]);
      }
    } else {
      setCategory([]);
    }
  };

  const handleChangeRoleAll = (e: any) => {
    if (e.target.checked) {
      if (roleList && roleList.length > 0) {
        let ids = roleList.map(({ _id }: any) => _id);
        setRollFilter([...ids]);
      }
    } else {
      setRollFilter([]);
    }
  };
  const handleClearFilter = () => {
    dispatch(
      updateTeamManagement({
        toDate: "",
        fromDate: "",
        rollFilterCount: 0,
        roleFilter: false,
        status: "",
        roleId: "",
      })
    );
    dispatch(getMembers());
    setCategory([]);
    setMemberValues({ fromDate: "", toDate: "" });
    setRollFilter([]);

    // dispatch(getProductAndServicesCategory());
  };

  const [memberValues, setMemberValues] = useState({
    fromDate: fromDate,
    toDate: toDate,
  });

  //
  const handleFilterCount = (memberValues: any) => {
    let count = 0;
    if (memberValues?.toDate && memberValues.fromDate) {
      count = count + 1;
    }
    if (status.length) {
      count = count + 1;
    }
    if (roleFilterId?.length) {
      count = count + 1;
    }
    return count;
  };
  useEffect(() => {
    setMemberValues({ fromDate: "", toDate: "" });
  }, []);
  const handleFilter = () => {
    const val = {
      toDate: memberValues.toDate
        ? getFilterFormtedDate(memberValues.toDate)
        : "",
      fromDate: memberValues.fromDate
        ? getFilterFormtedDate(memberValues.fromDate)
        : "",
      rollFilterCount: handleFilterCount(memberValues),
      status: status.length === statusListRole.length ? "" : status.join(""),
      roleId:
        roleFilterId.length === roleList.length ? "" : roleFilterId.join(","),
    };
    dispatch(updateTeamManagement({ roleFilter: false, ...val }));
    dispatch(getMembers());
  };
  return (
    <>
      <AddProductDrawer
        state={roleFilter}
        togalDrawrr={() => {
          dispatch(updateTeamManagement({ roleFilter: !roleFilter }));
        }}
        className="filterDrawer"
      >
        <>
          <h3 className="hd">Filter</h3>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              Creation On
            </AccordionSummary>
            <AccordionDetails>
              <div className="filter-range-picker">
                <div className="filterDate m-b-20">
                  <i>
                    <img src={calenderIMG} alt="" />
                  </i>
                  <DatePicker
                    dateFormat="dd-MM-yyyy"
                    selected={memberValues?.fromDate}
                    onChange={(date) => {
                      setMemberValues((prev: any) => ({
                        ...prev,
                        fromDate: date,
                        toDate: "",
                      }));
                    }}
                    placeholderText="From"
                    maxDate={new Date()}
                  />
                </div>
                <div className="filterDate">
                  <i>
                    <img src={calenderIMG} alt="" />
                  </i>
                  <DatePicker
                    dateFormat="dd-MM-yyyy"
                    selected={memberValues?.toDate}
                    onChange={(date) => {
                      setMemberValues((prev: any) => ({
                        ...prev,
                        toDate: date,
                      }));
                    }}
                    selectsEnd
                    maxDate={new Date()}
                    minDate={memberValues.fromDate || new Date()}
                    // minDate={memberValues.fromDate||  new Date()}
                    // maxDate={}
                    placeholderText="To"
                  />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              Status
            </AccordionSummary>
            <AccordionDetails></AccordionDetails>
            <AccordionDetails>
              <Paper elevation={3} className="categoryList">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={"0"}
                        onChange={handleCategoryChangeAll}
                        checked={status.length === statusListRole.length}
                      />
                    }
                    label={"All"}
                    labelPlacement="start"
                    key={"0"}
                  />
                  {statusListRole &&
                    statusListRole.length > 0 &&
                    statusListRole.map((item: any) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={item?.id}
                            onChange={handleCategoryChange}
                            checked={status.includes(+item?.id)}
                          />
                        }
                        label={item?.title}
                        labelPlacement="start"
                        key={item?.id}
                      />
                    ))}
                </FormGroup>
              </Paper>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              Role Type
            </AccordionSummary>

            <AccordionDetails>
              <Paper elevation={3} className="categoryList">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // name={"0"}
                        onChange={handleChangeRoleAll}
                        checked={roleFilterId.length === roleList.length}
                      />
                    }
                    label={"All"}
                    labelPlacement="start"
                    key={"0"}
                  />
                  {roleList &&
                    roleList.length > 0 &&
                    roleList.map((item: any) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={item?._id}
                            onChange={handleRoleChange}
                            checked={roleFilterId.includes(item?._id)}
                          />
                        }
                        label={item?.name}
                        labelPlacement="start"
                        key={item?._id}
                      />
                    ))}
                </FormGroup>
              </Paper>
            </AccordionDetails>
          </Accordion>

          <Grid container rowSpacing={3} columnSpacing={2}>
            <Grid item xs={6}>
              <Button
                className="btn btn-simple w-100 m-t-20"
                buttonText="Clear"
                onPress={handleClearFilter}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                className="btn btn-purple w-100 m-t-20"
                buttonText="Apply"
                onPress={handleFilter}
              />
            </Grid>
          </Grid>
        </>
      </AddProductDrawer>
    </>
  );
}

export default Index;
