import { Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Slider,
} from "@mui/material";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Box } from "@mui/system";

import NormalButton from "../../../components/buttons/normalButton";
import { calenderIMG } from "../../../constants";

interface filterProps {
  fromDate: Date | null;
  toDate: Date | null;
  purchaseFromDate: Date | null;
  purchaseToDate: Date | null;
  setToDate: Dispatch<SetStateAction<Date | null>>;
  setPurchaseToDate: any;
  amount: number[];
  handleFromDate: (date: any) => void;
  handlePurchaseFromDate: (date: any) => void;
  minAmount: number;
  maxAmount: number;
  handleAmountChange: (event: Event, newValue: number | number[]) => void;
  handleClearFilter: () => void;
  handleFilter: () => void;
}

const Filter = (props: filterProps) => {
  const {
    amount,
    minAmount,
    maxAmount,
    fromDate,
    toDate,
    purchaseFromDate,
    purchaseToDate,
    setToDate,
    setPurchaseToDate,
    handleFromDate,
    handlePurchaseFromDate,
    handleAmountChange,
    handleClearFilter,
    handleFilter,
  } = props;
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
                selected={fromDate}
                onChange={(date) => handleFromDate(date)}
                placeholderText="From"
              />
            </div>
            <div className="filterDate">
              <i>
                <img src={calenderIMG} alt="" />
              </i>
              <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={toDate}
                onChange={(date: any) => setToDate(date)}
                minDate={fromDate || new Date()}
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
          Purshased Date
        </AccordionSummary>
        <AccordionDetails>
          <div className="filter-range-picker">
            <div className="filterDate m-b-20">
              <i>
                <img src={calenderIMG} alt="" />
              </i>
              <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={purchaseFromDate}
                onChange={(date) => handlePurchaseFromDate(date)}
                placeholderText="From"
              />
            </div>
            <div className="filterDate">
              <i>
                <img src={calenderIMG} alt="" />
              </i>
              <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={purchaseToDate}
                onChange={(date: any) => setPurchaseToDate(date)}
                minDate={purchaseFromDate || new Date()}
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
          Amount
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ ml: 1, mr: 1 }}>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={amount}
              onChange={handleAmountChange}
              valueLabelDisplay="auto"
              //  getAriaValueText={valuetext}
              min={minAmount || 0}
              max={maxAmount || 1000}
              className="filterSlider"
            />
          </Box>
          <Box sx={{ width: "100%" }} className="Dflex sp-bt sliderValue">
            <i>₹{amount[0]}</i> <i>₹{amount[1]}</i>
          </Box>
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
