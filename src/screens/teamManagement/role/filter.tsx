import React, { useEffect, useState } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import AddProductDrawer from "../../../components/drawer";
import Button from "../../../components/buttons/normalButton";
import { statusListRole } from "../../../constants";
import { getFilterFormtedDate } from "../../../utils";
import "./role.scss";
import { getroles } from "../teamManagemnetAction";
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

function Index() {
  const dispatch: any = useDispatch();
  const [status, setCategory] = useState<any>([]);
  let { roleFilter, memberFilterCount, rollFilterCount, fromDate, toDate } =
    useSelector((state: any) => state.teamManagementSlice);
  const handleCategoryChange = (e: any) => {
    if (e.target.checked) {
      setCategory([...status, +e.target.name]);
    } else {
      setCategory(elementFromArray(status, +e.target.name));
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

  const handleClearFilter = () => {
    dispatch(
      updateTeamManagement({
        toDate: "",
        fromDate: "",
        status: "",
        roleFilter: false,
        rollFilterCount: 0,
      })
    );
    dispatch(getroles());
    setCategory([]);
    setValues({ fromDate: "", toDate: "" });
    // dispatch(getProductAndServicesCategory());
  };

  let formValues = {
    fromDate: fromDate,
    toDate: toDate,
  };

  const [values, setValues] = useState(formValues);
  const handleFilterCount = (values: any) => {
    let count = 0;
    if (values.toDate && values.fromDate) {
      count = count + 1;
    }
    if (status.length) {
      count = count + 1;
    }
    return count;
  };
  const handleFilter = () => {
    const val = {
      toDate: values?.toDate ? getFilterFormtedDate(values?.toDate) : "",
      fromDate: values?.fromDate ? getFilterFormtedDate(values?.fromDate) : "",
      rollFilterCount: handleFilterCount(values),
      status: status.length === statusListRole.length ? "" : status.join(""),
    };

    dispatch(updateTeamManagement({ roleFilter: false, ...val }));
    dispatch(getroles());
  };
  useEffect(() => {
    setValues({ fromDate: "", toDate: "" });
  }, []);
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
                    selected={values.fromDate}
                    onChange={(date) => {
                      setValues((prev: any) => ({
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
                    selected={values.toDate}
                    onChange={(date) => {
                      setValues((prev: any) => ({
                        ...prev,
                        toDate: date,
                      }));
                    }}
                    // minDate={values.fromDate || new Date()}
                    // maxDate={}
                    // minDate={startDate || new Date()}
                    minDate={values.fromDate || new Date()}
                    maxDate={new Date()}
                    selectsEnd
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
