import React, { useEffect, useState } from "react";
import NormalButton from "../../buttons/normalButton";
import AddProductDrawer from "../../drawer";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Slider,
} from "@mui/material";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box } from "@mui/system";
import { calenderIMG } from "../../../constants";
import {
  getFilterFormtedDate,
  gitCategoriesIds,
  getParentChildCategory,
} from "../../../utils";
import {
  resetExpense,
  updateExpense,
} from "../../../screens/purchase/expenseListSlice";
import { getExpensesListing } from "../../../screens/purchase/expenses/action";

//import { chartOfAccountMasterData } from "../../../app/commonSlice";

const Filter = (props: any) => {
  const { openModal, setStates } = props;
  const dispatch: any = useDispatch();
  const [filterState, setfilterState] = React.useState(openModal);

  const [startDate, setStartDate] = useState(null);

  const [transFromDate, setTransFromDate] = useState(null);
  const [transEndDate, setTransEndDate] = useState(null);

  const [endDate, setEndDate] = useState(null);

  let formValues = {
    fromDate: "",
    toDate: "",
    categories: "",
    fromAmount: "",
    toAmount: "",
    transFromDate: "",
    transEndDate: "",
  };
  const [value, setValue] = useState(formValues);

  const { expensePriceMin, expensePriceMax } = useSelector(
    (state: any) => state.expenseListSlice
  );

  const { chartOfAccountMasterData } = useSelector(
    (state: any) => state.commonSlice
  );
  const [price, setPrice]: any = useState<number[]>(
    expensePriceMin && expensePriceMax
      ? [expensePriceMin, expensePriceMax]
      : [0, 1000]
  );

  useEffect(() => {
    expensePriceMin && expensePriceMax
      ? setPrice([expensePriceMin, expensePriceMax])
      : setPrice([0, 1000]);
  }, [expensePriceMin, expensePriceMax]);

  const handleFilter = () => {
    const val = {
      ...value,
      filterCount: handleFilterCount(value),
    };
    dispatch(updateExpense(val));
    dispatch(getExpensesListing());
    setStates(false);
  };

  const handleFilterCount = (values: any) => {
    let count = 0;
    if (values.toDate || values.fromDate) {
      count = count + 1;
    }

    if (values.fromAmount && values.toAmount) {
      count = count + 1;
    }

    if (values.transFromDate || values.transEndDate) {
      count = count + 1;
    }

    if (values.categories) {
      count = count + 1;
    }
    return count;
  };

  const handleFilterClear = () => {
    dispatch(resetExpense({}));
    dispatch(getExpensesListing());
    setValue(formValues);
    setStartDate(null);
    setEndDate(null);
    setTransFromDate(null);
    setTransEndDate(null);
    setStates(false);
  };

  function valuetext(value: number) {
    return `${value}`;
  }
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue);
    setValue((pre: any) => ({
      ...pre,
      fromAmount: price[0],
      toAmount: price[1],
    }));
  };
  const data = getParentChildCategory(
    chartOfAccountMasterData[1]["categories"],
    []
  );
  const onChangeDrop = (currentNode: any, selectedNodes: any) => {
    var ids = gitCategoriesIds(selectedNodes).toString();
  };

  return (
    <AddProductDrawer
      state={openModal}
      setState={setStates}
      className="filterDrawer"
    >
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
                selected={startDate}
                onChange={(date: any) => {
                  setValue((prevState: any) => ({
                    ...prevState,
                    fromDate: getFilterFormtedDate(date),
                    toDate: "",
                  }));
                  setStartDate(date);
                  setEndDate(null);
                }}
                placeholderText="From"
              />
            </div>
            <div className="filterDate">
              <i>
                <img src={calenderIMG} alt="" />
              </i>
              <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={endDate}
                onChange={(date: any) => {
                  setValue((prevState: any) => ({
                    ...prevState,
                    toDate: getFilterFormtedDate(date),
                  }));
                  setEndDate(date);
                }}
                minDate={startDate || new Date()}
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
          Category
        </AccordionSummary>
        <AccordionDetails>
          <DropdownTreeSelect
            onChange={onChangeDrop}
            data={data}
            keepTreeOnSearch
          />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          Amount
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ ml: 1, mr: 1 }}>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={expensePriceMin || 0}
              max={expensePriceMax || 1000}
              className="filterSlider"
            />
          </Box>
          <Box sx={{ width: "100%" }} className="Dflex sp-bt sliderValue">
            <i>₹{price[0]}</i> <i>₹{price[1]}</i>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          Transaction Date Range
        </AccordionSummary>
        <AccordionDetails>
          <div className="filter-range-picker">
            <div className="filterDate m-b-20">
              <i>
                <img src={calenderIMG} alt="" />
              </i>
              <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={transFromDate}
                onChange={(date: any) => {
                  setValue((prevState: any) => ({
                    ...prevState,
                    transFromDate: getFilterFormtedDate(date),
                    transEndDate: "",
                  }));
                  setTransFromDate(date);
                  setTransEndDate(null);
                }}
                placeholderText="From"
              />
            </div>
            <div className="filterDate">
              <i>
                <img src={calenderIMG} alt="" />
              </i>
              <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={transEndDate}
                onChange={(date: any) => {
                  setValue((prevState: any) => ({
                    ...prevState,
                    transEndDate: getFilterFormtedDate(date),
                  }));
                  setTransEndDate(date);
                }}
                minDate={transFromDate || new Date()}
                placeholderText="To"
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Grid container rowSpacing={3} columnSpacing={2}>
        <Grid item xs={6}>
          <NormalButton
            className="btn-simple w-100 m-t-20"
            buttonText="Clear"
            onPress={handleFilterClear}
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
    </AddProductDrawer>
  );
};

export default Filter;
