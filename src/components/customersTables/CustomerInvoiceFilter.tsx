import { useEffect, useState } from "react";
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

import NormalButton from "../buttons/normalButton";
import { calenderIMG, overDueDays } from "../../constants";
import NormalSelect from "../select/normalSelect";
import { getFilterFormtedDate, getStatusDropDown } from "../../utils";
import {
  resetSalePurchase,
  updateSalePurchase,
} from "../../screens/saleandPurchase/salePurchaseSlice";
import { getCustomerTransactionDetail } from "../../screens/saleandPurchase/action";

interface filterProps {
  stateState: any;
  id: string;
  documentNumber: any;
}

const Filter = (props: filterProps) => {
  const { id, stateState, documentNumber } = props;
  const { fromDate, toDate, status } = useSelector(
    (state: any) => state.salePurchaseSlice
  );

  const dispatch: any = useDispatch();
  let values = {
    fromDate: null,
    toDate: null,
    status: status,
    filterCount: 0,
    page: 1,
    totalCount: 0,
    totalPage: 0,
  };

  const [formValues, setFormValues] = useState(values);
  const handleFilter = () => {
    const val = {
      ...formValues,
      filterCount: handleFilterCount(formValues),
      fromDate: formValues.fromDate ? formValues.fromDate : "",
      toDate: formValues.toDate ? formValues.toDate : "",
    };
    dispatch(updateSalePurchase(val));
    dispatch(getCustomerTransactionDetail(id, documentNumber));
    stateState(false);
  };
  const val = {
    fromDate: null,
    toDate: null,
    status: "",
    filterCount: 0,
    page: 1,
    totalCount: 0,
    totalPage: 0,
  };
  const handleClearFilter = () => {
    setFormValues(val);

    const setval = {
      ...val,
      fromDate: "",
      toDate: "",
    };
    dispatch(updateSalePurchase(setval));
    dispatch(getCustomerTransactionDetail(id, documentNumber));
    stateState(false);
  };

  useEffect(() => {
    setFormValues(val);
    dispatch(resetSalePurchase({}));
  }, [documentNumber, id]);

  const handleFilterCount = (values: any) => {
    let count = 0;
    if (values.toDate || values.fromDate) {
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
                selected={formValues.fromDate}
                onChange={(date) => {
                  setFormValues((prev: any) => ({
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
                selected={formValues.toDate}
                onChange={(date) => {
                  setFormValues((prev: any) => ({
                    ...prev,
                    toDate: date || "",
                  }));
                }}
                minDate={formValues.fromDate || new Date()}
                maxDate={new Date()}
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
        <AccordionDetails>
          <NormalSelect
            label="Status"
            values={`${formValues.status}`}
            handleChange={(e: any) => {
              setFormValues((prev: any) => ({
                ...prev,
                status: e.target.value,
              }));
            }}
            options={
              getStatusDropDown("invoice") &&
              getStatusDropDown("invoice").map((item: any) => (
                <MenuItem value={`${item.id}`} key={item.id}>
                  {item.name}
                </MenuItem>
              ))
            }
          />
        </AccordionDetails>
      </Accordion>

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
