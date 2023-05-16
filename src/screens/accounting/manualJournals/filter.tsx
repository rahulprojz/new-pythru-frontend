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

import NormalButton from "../../../components/buttons/normalButton";
import { calenderIMG } from "../../../constants";
import { updateSalePurchase } from "../../../screens/saleandPurchase/salePurchaseSlice";
import "./manualJournal.scss";
import { updateManualJournal } from "./manualJournalSlice";
import { getManualJournalList } from "./action";
import { getParentChildCategory } from "../../../utils";

interface filterProps {
  categoryData: any;
  stateState: any;
}

const Filter = ({ categoryData, stateState }: any) => {
  var { fromDate, toDate, selectedDebitCategories, selectedCreditCategories } =
    useSelector((state: any) => state.manualJournalSlice);

  const dispatch: any = useDispatch();
  let formValues = {
    fromDate: fromDate,
    toDate: toDate,
  };
  const [values, setValues] = useState(formValues);
  var creditCategories: any = [];
  var debitCategories: any = [];
  const handleClearFilter = () => {
    const val = {
      fromDate: "",
      toDate: "",
      selectedDebitCategories: [],
      selectedCreditCategories: [],
      filterCount: 0,
    };
    setValues(val);
    dispatch(updateSalePurchase(val));
    dispatch(updateManualJournal(val));
    dispatch(getManualJournalList());
    stateState(false);
  };

  const handleFilterCount = (values: any) => {
    let count = 0;
    if (values.toDate || values.fromDate) {
      count = count + 1;
    }
    if (selectedDebitCategories.length > 0) {
      count = count + 1;
    }
    if (selectedCreditCategories.length > 0) {
      count = count + 1;
    }
    return count;
  };
  const onChangeDrop = (currentNode: any, selectedNodes: any) => {
    console.log("selectedNodes", selectedNodes);
    var selectedCat = selectedNodes.map((v: any) => v.row_id);
    setValues((prev) => ({
      ...prev,
      selectedDebitCategories: selectedCat,
    }));
    dispatch(
      updateManualJournal({
        selectedDebitCategories: selectedCat,
      })
    );
  };

  const onChangeCreditDrop = (currentNode: any, selectedNodes: any) => {
    setValues((prev) => ({
      ...prev,
      selectedCreditCategories: selectedNodes.map((v: any) => v.row_id),
    }));
    dispatch(
      updateManualJournal({
        selectedCreditCategories: selectedNodes.map((v: any) => v.row_id),
      })
    );
  };

  const handleFilter = () => {
    const val = {
      ...values,
      page: 1,
      filterCount: handleFilterCount(values),
    };
    dispatch(updateSalePurchase(val));
    dispatch(updateManualJournal(val));
    dispatch(getManualJournalList());
    stateState(false);
  };

  const debitMemo = useMemo(() => {
    const debitCategories = getParentChildCategory(
      categoryData,
      selectedDebitCategories
    );
    return (
      <DropdownTreeSelect
        onChange={onChangeDrop}
        data={debitCategories}
        className="mdl-demo"
        keepTreeOnSearch
        keepChildrenOnSearch
      />
    );
  }, [values]);

  const creditMemo = useMemo(() => {
    const creditCategories = getParentChildCategory(
      categoryData,
      selectedCreditCategories
    );
    return (
      <DropdownTreeSelect
        onChange={onChangeCreditDrop}
        data={creditCategories}
        keepTreeOnSearch
        keepChildrenOnSearch
      />
    );
  }, [values]);

  return (
    <>
      <h3 className="hd">Filter</h3>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          Transcation Date
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
                //maxDate={new Date()}
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
                minDate={values.fromDate}
                //maxDate={new Date()}
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
          Debit Category
        </AccordionSummary>
        <AccordionDetails>{debitMemo}</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          Credit Category
        </AccordionSummary>
        <AccordionDetails>{creditMemo}</AccordionDetails>
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
