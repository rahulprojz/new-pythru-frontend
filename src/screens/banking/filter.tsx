import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import DropdownTreeSelect from "react-dropdown-tree-select";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NormalSelect from "../../components/select/normalSelect";
import NormalButton from "../../components/buttons/normalButton";
import { bankingStatementDropDown, calenderIMG } from "../../constants";
import MenuItem from "@mui/material/MenuItem";
import { updateBanking } from "./bankingSlice";
import { getBankType, getTransId } from "../../utils";
import { getUserAccountTransactionsList } from "./action";
import moment from "moment";

interface filterProps {
  data: any;
  stateState: any;
}

const Filter = (filterProps: any) => {
  const { fromDate, toDate, addBankAccountType } = useSelector(
    (state: any) => state.bankingSlice
  );

  const { data, stateState } = filterProps;

  const [status, setStatus] = useState<any>("1");

  const [fromFilterDate, setFromFilterDate] = useState<any>("");
  const [toFilterDate, setToFilterDate] = useState<any>("");

  const dispatch: any = useDispatch();

  var date = new Date();

  let formValues = {
    fromDate: "",
    toDate: "",
  };
  const [values, setValues] = useState<any>(formValues);

  var bankAccType = getBankType(data);
  var tansId = getTransId(data);

  const handleClearFilter = () => {
    const val = {
      transactionId: tansId,
      addBankAccountType: data?.addBankAccountType,
      fromDate: "",
      toDate: "",
      filterCount: 0,
    };
    setValues(val);
    setStatus("");
    setFromFilterDate("");
    setToFilterDate("");
    dispatch(updateBanking(val));
    dispatch(getUserAccountTransactionsList());
    stateState(false);
  };

  const handleFilterCount = (values: any) => {
    let count = 0;
    if (fromFilterDate || toFilterDate) {
      count = count + 1;
    }
    console.log("status---->", status);
    if (status) {
      count = count + 1;
    }
    return count;
  };

  const handleFilter = () => {
    const val = {
      toDate: status == 4 ? toFilterDate || new Date() : values.toDate,
      fromDate: status == 4 ? fromFilterDate || new Date() : values.fromDate,
      transactionId: tansId,
      addBankAccountType: data?.addBankAccountType,
      filterCount: handleFilterCount(values),
    };
    dispatch(updateBanking(val));
    dispatch(getUserAccountTransactionsList());
    stateState(false);
  };
  const handleChangeStatement = (event: any) => {
    setStatus(event.target.value);
    if (event.target.value != 4) {
      var fromDate: any = "";
      if (event.target.value == 1) {
        fromDate = moment();
      } else if (event.target.value == 2) {
        fromDate = moment().subtract(3, "months");
      } else if (event.target.value == 3) {
        fromDate = moment().subtract(12, "months");
      }
      setValues((prev: any) => ({
        ...prev,
        fromDate: fromDate,
        toDate: moment(),
      }));
    } else {
      setFromFilterDate("");
      setToFilterDate("");
    }
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
          Statement
        </AccordionSummary>

        <AccordionDetails>
          <NormalSelect
            label="Statement"
            values={status}
            handleChange={handleChangeStatement}
            options={bankingStatementDropDown.map((item: any) => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          />
        </AccordionDetails>
      </Accordion>
      {status == 4 && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Custom Date
          </AccordionSummary>
          <AccordionDetails>
            <div className="filter-range-picker">
              <div className="filterDate m-b-20">
                <i>
                  <img src={calenderIMG} alt="" />
                </i>
                <DatePicker
                  dateFormat="dd-MM-yyyy"
                  selected={fromFilterDate}
                  onChange={(date) => {
                    setFromFilterDate(date);
                    setToFilterDate("");
                  }}
                  placeholderText="From Date"
                  maxDate={new Date()}
                />
              </div>
              <div className="filterDate">
                <i>
                  <img src={calenderIMG} alt="" />
                </i>
                <DatePicker
                  dateFormat="dd-MM-yyyy"
                  selected={toFilterDate}
                  onChange={(date) => {
                    setToFilterDate(date);
                  }}
                  minDate={fromFilterDate}
                  maxDate={new Date()}
                  placeholderText="To Date"
                />
              </div>
            </div>
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
