import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/breadcrumb";
import "./profitLoss.scss";
import moment from "moment";
import { updateProfitLoss } from "./profitLossSlice";
import StockStatus from "../../../components/stock/index";
import {
  NET_CASH_FLOW_ICON,
  EXPENSE_ICON,
  TOTAL_INCOME_ICON,
  DONUT_PLACEHOLDER,
  NODATA_6,
  calenderIMG,
} from "../../../constants";
import { getFilterFormtedDate, convertIntegerToDecimal } from "../../../utils";
import { IncomeAnalyticsOptions } from "./chartOptions";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsVariable from "highcharts/modules/variable-pie";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import "react-datepicker/dist/react-datepicker.css";
import Typography from "@material-ui/core/Typography";
import { getProfitLoss } from "./action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
HighchartsVariable(Highcharts);

Highcharts.setOptions({
  lang: {
    thousandsSep: "",
  },
});

const graphColor = [
  "#3C00F2",
  "#64B3F4",
  "#FF9913",
  "#96C93D",
  "#F0142F",
  "#00B09B",
  "#CAC531",
  "#B5B5B5",
  "#EC38BC",
  "#135058",
  "#B06AB3",
  "#91EAE4",
  "#E8CBC0",
  "#CB356B",
  "#9CECFB",
  "#FFE47A",
  "#26A0DA",
];
const placeHplderColor = [
  "sales",
  "other-income",
  "commission",
  "interest",
  "uncategorized-income",
  "refunds",
  "bank-interest",
  "profit-on-sale",
  "fuel",
  "accounting-fee",
  "bank-charges",
  "cost-of-goods-sold",
  "travel-lodging",
  "uncategorized-expense",
  "miscellaneous-expenses",
  "depreciation",
  "accounting-fee1",
];
function Index() {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  //const [state, setState] = React.useState(false);
  useEffect(() => {
    document.title = "Profit Loss | PyThru";
    const newDate = new Date();
    var firstDay = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    dispatch(
      updateProfitLoss({
        fromDate: getFilterFormtedDate(firstDay),
        toDate: getFilterFormtedDate(newDate),
      })
    );
    setDateRange([firstDay, newDate]);

    dispatch(getProfitLoss());
  }, []);
  const { profitLossList } = useSelector((state: any) => state.profitLossSlice);
  const [dateRange, setDateRange]: any = useState([null, null]);
  const [startDate, endDate] = dateRange;
  // const [startDate, setStartDate]: any = useState(new Date());
  // const [isOpen, setIsOpen] = useState(false);
  // const handleChange = (e: any) => {
  //   setIsOpen(!isOpen);
  //   setStartDate(e);
  // };
  // const handleClick = (e: any) => {
  //   e.preventDefault();
  //   setIsOpen(!isOpen);
  // };
  return (
    <div className="page-profitLoss">
      <Breadcrumbs />
      <div className="stockContainer Dflex al-cnt m-b-20">
        <StockStatus
          stockImg={TOTAL_INCOME_ICON}
          text="Income"
          stvalue={`${
            convertIntegerToDecimal(profitLossList?.totalIncome) || 0
          }`}
          classname="flex-wrap paid square-icon-without-effect"
        />
        <StockStatus
          stockImg={EXPENSE_ICON}
          text="Expense"
          stvalue={`${
            convertIntegerToDecimal(profitLossList?.totalExpense) || 0
          }`}
          classname="flex-wrap due square-icon-without-effect"
        />
        <StockStatus
          stockImg={NET_CASH_FLOW_ICON}
          text={
            profitLossList?.totalIncome - profitLossList?.totalExpense >= 0
              ? "Net Profit"
              : "Net loss"
          }
          stvalue={`${
            convertIntegerToDecimal(
              Math.abs(
                profitLossList?.totalIncome - profitLossList?.totalExpense
              )
            ) || 0
          }`}
          classname={`flex-wrap ${
            profitLossList?.totalIncome - profitLossList?.totalExpense >= 0
              ? "paid"
              : "due"
          } square-icon-without-effect`}
        />

        {/* <div>
          <button className="example-custom-input" onClick={handleClick}>
            {moment(startDate).format("dd-MM-yyyy")}
          </button>
          <div>
            {isOpen && (
              <DatePicker
                selected={startDate}
                onChange={handleChange}
                inline
                selectsRange={true}
              />
            )}
          </div>
        </div> */}
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={5} lg={3.5} xl={2.5}>
              <div className="filterDate">
                <i>
                  <img src={calenderIMG} alt="" />
                </i>
                <DatePicker
                  dateFormat="dd-MM-yyyy"
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select Date Range"
                  onChange={(update: any) => {
                    setDateRange(update);
                    if (!update.includes(null)) {
                      dispatch(
                        updateProfitLoss({
                          fromDate: getFilterFormtedDate(update[0]),
                          toDate: getFilterFormtedDate(update[1]),
                        })
                      );
                      dispatch(getProfitLoss());
                    } else if (!update[0] && !update[1]) {
                      dispatch(
                        updateProfitLoss({
                          fromDate: "",
                          toDate: "",
                        })
                      );
                      dispatch(getProfitLoss());
                    }
                  }}
                  isClearable={true}
                  maxDate={new Date()}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="bg-white h-100">
            <Typography variant="body2" className="m-b-20 bold">
              Income
            </Typography>
            {profitLossList?.incomeData?.length &&
            profitLossList?.incomeData[0]?.amount ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={12} xl={7}>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={IncomeAnalyticsOptions(
                      profitLossList?.incomeData,
                      graphColor,
                      "Income"
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={12} xl={5}>
                  <ul>
                    {profitLossList?.incomeData.map((data: any, i: number) => (
                      <li className={`${placeHplderColor[i]}`} key={i}>
                        <Typography variant="subtitle2">
                          {data?.category}
                        </Typography>

                        <Typography variant="subtitle2" className="semi-bold">
                          {`${
                            convertIntegerToDecimal(Math.abs(data?.amount)) || 0
                          } ${data?.amount >= 0 ? "CR" : "DR"}`}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Grid>
              </Grid>
            ) : (
              <div className="no_data_fnd">
                <img src={NODATA_6} className="pointer" />
                <i>Oops!</i>
                <p>There is nothing here yet!</p>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="bg-white h-100">
            <Typography variant="body2" className="m-b-20 bold">
              Expense
            </Typography>
            {profitLossList?.expanseData?.length &&
            profitLossList?.expanseData[0]?.amount ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={12} xl={7}>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={IncomeAnalyticsOptions(
                      profitLossList?.expanseData,
                      graphColor,
                      "Expense"
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={12} xl={5}>
                  <ul>
                    {profitLossList?.expanseData.map((data: any, i: number) => (
                      <li className={`${placeHplderColor[i]}`} key={i}>
                        <Typography variant="subtitle2">
                          {data?.category}
                        </Typography>
                        <Typography variant="subtitle2" className="semi-bold">
                          {`${
                            convertIntegerToDecimal(Math.abs(data?.amount)) || 0
                          } ${data?.amount >= 0 ? "DR" : "CR"}`}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Grid>
              </Grid>
            ) : (
              <div className="no_data_fnd">
                <img src={NODATA_6} className="pointer" />
                <i>Oops!</i>
                <p>There is nothing here yet!</p>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
export default Index;
