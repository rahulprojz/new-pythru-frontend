import { useState } from "react";
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

import NormalButton from "../../buttons/normalButton";
import { calenderIMG, overDueDays } from "../../../constants";
import NormalSelect from "../../select/normalSelect";
import { getStatusDropDown } from "../../../utils";
import { updateSalePurchase } from "../../../screens/saleandPurchase/salePurchaseSlice";
import {
  getSalePurchaseList,
  getSaleDashboardList,
} from "../../../screens/saleandPurchase/action";
import React from "react";

interface filterProps {
  type: string;
  documentType?: number | undefined;
  stateState: any;
  label?: any;
}

const Filter = (props: filterProps) => {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { type, documentType, stateState, label } = props;

  const {
    fromDate,
    toDate,
    status,
    overDue,
    filterFromDate,
    filterToDate,
    fromDueDate,
    toDueDate,
  } = useSelector((state: any) => state.salePurchaseSlice);

  const dispatch: any = useDispatch();
  let formValues = {
    fromDate: fromDate,
    toDate: toDate,
    filterFromDate: filterFromDate,
    filterToDate: filterToDate,
    fromDueDate: fromDueDate,
    toDueDate: toDueDate,
    status: status,
    overDue: overDue,
    filterCount: 0,
    page: 1,
  };

  const [values, setValues] = useState(formValues);

  const handleFilter = () => {
    const val = {
      ...values,
      filterCount: handleFilterCount(values),
    };
    dispatch(updateSalePurchase(val));
    if (type === "dashboard" || type == "purchaseDashboard") {
      dispatch(getSaleDashboardList());
    } else {
      dispatch(getSalePurchaseList());
    }
    stateState(false);
  };

  const handleClearFilter = () => {
    const val = {
      fromDate: "",
      toDate: "",
      filterFromDate: "",
      filterToDate: "",
      fromDueDate: "",
      toDueDate: "",
      status: "",
      overDue: "",
      filterCount: 0,
      page: 1,
    };
    setValues(val);
    dispatch(updateSalePurchase(val));
    if (type === "dashboard" || type == "purchaseDashboard") {
      dispatch(getSaleDashboardList());
    } else {
      dispatch(getSalePurchaseList());
    }
    stateState(false);
  };

  const handleFilterCount = (values: any) => {
    let count = 0;
    if (values.toDate || values.fromDate) {
      count = count + 1;
    }
    if (values.filterFromDate || values.filterToDate) {
      count = count + 1;
    }
    if (values.fromDueDate || values.toDueDate) {
      count = count + 1;
    }
    if (values.status) {
      count = count + 1;
    }
    if (values.overDue) {
      count = count + 1;
    }
    return count;
  };

  return (
    <>
      <h3 className="hd">Filter</h3>

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          Creation Date
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
                    fromDate: date || "",
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
                    toDate: date || "",
                  }));
                }}
                minDate={values.fromDate || new Date()}
                maxDate={new Date()}
                placeholderText="To"
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      {!["dashboard", "purchaseDashboard"].includes(type) && (
        <>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {label?.salesOrderDate}
            </AccordionSummary>
            <AccordionDetails>
              <div className="filter-range-picker">
                <div className="filterDate m-b-20">
                  <i>
                    <img src={calenderIMG} alt="" />
                  </i>
                  <DatePicker
                    dateFormat="dd-MM-yyyy"
                    selected={values.filterFromDate}
                    onChange={(date) => {
                      setValues((prev: any) => ({
                        ...prev,
                        filterFromDate: date || "",
                        filterToDate: "",
                      }));
                    }}
                    placeholderText={"From"}
                    // maxDate={new Date()}
                  />
                </div>
                <div className="filterDate">
                  <i>
                    <img src={calenderIMG} alt="" />
                  </i>
                  <DatePicker
                    dateFormat="dd-MM-yyyy"
                    selected={values.filterToDate}
                    onChange={(date) => {
                      setValues((prev: any) => ({
                        ...prev,
                        filterToDate: date || "",
                      }));
                    }}
                    minDate={new Date(values.filterFromDate)}
                    //maxDate={new Date()}
                    placeholderText="To"
                  />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {label?.dueDate}
            </AccordionSummary>
            <AccordionDetails>
              <div className="filter-range-picker">
                <div className="filterDate m-b-20">
                  <i>
                    <img src={calenderIMG} alt="" />
                  </i>
                  <DatePicker
                    dateFormat="dd-MM-yyyy"
                    selected={values.fromDueDate}
                    onChange={(date) => {
                      setValues((prev: any) => ({
                        ...prev,
                        fromDueDate: date || "",
                        toDueDate: "",
                      }));
                    }}
                    placeholderText={"From"}
                    //maxDate={new Date()}
                  />
                </div>
                <div className="filterDate">
                  <i>
                    <img src={calenderIMG} alt="" />
                  </i>
                  <DatePicker
                    dateFormat="dd-MM-yyyy"
                    selected={values.toDueDate}
                    onChange={(date) => {
                      setValues((prev: any) => ({
                        ...prev,
                        toDueDate: date || "",
                      }));
                    }}
                    minDate={values.fromDueDate || new Date()}
                    //maxDate={new Date()}
                    placeholderText="To"
                  />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </>
      )}
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          Status
        </AccordionSummary>
        <AccordionDetails>
          <NormalSelect
            label="Status"
            values={`${values.status}`}
            handleChange={(e: any) => {
              setValues((prev: any) => ({
                ...prev,
                status: e.target.value,
              }));
            }}
            options={
              getStatusDropDown(type) &&
              getStatusDropDown(type).map((item: any) => (
                <MenuItem value={`${item.id}`} key={item.id}>
                  {item.name}
                </MenuItem>
              ))
            }
          />
        </AccordionDetails>
      </Accordion>
      {type !== "estimate" && (
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Overdue Days
          </AccordionSummary>
          <AccordionDetails>
            <NormalSelect
              label="Overdue Days"
              values={values.overDue}
              handleChange={(e: any) => {
                setValues((prev: any) => ({
                  ...prev,
                  overDue: e.target.value,
                }));
              }}
              options={
                overDueDays?.length &&
                overDueDays.map((item: any) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.name}
                  </MenuItem>
                ))
              }
            />
          </AccordionDetails>
        </Accordion>
      )}
      <Grid container rowSpacing={3} columnSpacing={2}>
        <Grid item xs={6}>
          <NormalButton
            className="btn-simple w-100 m-t-20"
            buttonText="Clear"
            onPress={handleClearFilter}
          />
        </Grid>
        <Grid item xs={6}>
            <NormalButton
              className="btn-purple w-100 m-t-20"
              buttonText="Apply"
              onPress={handleFilter}
            />
        </Grid>
      </Grid>
    </>
  );
};

export default Filter;
