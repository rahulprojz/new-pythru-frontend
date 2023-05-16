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
  calenderIMG,
  NODATA_6,
  DONUT_PLACEHOLDER,
} from "../../../constants";
import { getFilterFormtedDate, convertIntegerToDecimal } from "../../../utils";
import { BalanceAnalyticsOptions } from "./balanceSheetGraphData";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsVariable from "highcharts/modules/variable-pie";
import DatePicker from "react-datepicker";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import "react-datepicker/dist/react-datepicker.css";
import Typography from "@material-ui/core/Typography";
import { getBalanceSheetData } from "./action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
HighchartsVariable(Highcharts);

Highcharts.setOptions({
	lang: {
  	thousandsSep: ""
  }
})

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
  const [fromDate, setFromdate]: any = useState(null);

  //const [state, setState] = React.useState(false);
  useEffect(() => {
    document.title = "Balance Sheet | PyThru";
    const newDate = new Date();
    setFromdate(newDate);
    dispatch(
      updateProfitLoss({
        toDate: newDate ? moment(newDate).format("YYYY-MM-DD") : "",
      })
    );
    dispatch(getBalanceSheetData());
  }, []);
  const { profitLossList } = useSelector((state: any) => state.profitLossSlice);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <div className="page-profitLoss">
      <Breadcrumbs />
      <div className="stockContainer Dflex al-cnt m-b-20">
        <StockStatus
          stockImg={TOTAL_INCOME_ICON}
          text="Asset"
          stvalue={`${
            convertIntegerToDecimal(
              profitLossList.length &&
                Math.abs(profitLossList[0]?.debitMinusCredit)
            ) || 0
          }`}
          classname="flex-wrap paid square-icon-without-effect"
        />
        <StockStatus
          stockImg={EXPENSE_ICON}
          text="Liability"
          stvalue={`${
            convertIntegerToDecimal(
              profitLossList?.length &&
                Math.abs(profitLossList[1]?.creditMinusDebit)
            ) || 0
          }`}
          classname="flex-wrap due square-icon-without-effect"
        />
        <StockStatus
          stockImg={NET_CASH_FLOW_ICON}
          text="Equity"
          stvalue={`${
            convertIntegerToDecimal(
              profitLossList.length &&
                Math.abs(profitLossList[2]?.creditMinusDebit)
            ) || 0
          }`}
          classname="flex-wrap transactions square-icon-without-effect"
        />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="filterDate" style={{ width: 300, maxWidth: "100%" }}>
            <i>
              <img src={calenderIMG} alt="" />
            </i>
            <DatePicker
              dateFormat="dd-MM-yyyy"
              selected={fromDate}
              onChange={(date: any) => {
                setFromdate(date);
                dispatch(
                  updateProfitLoss({
                    toDate: date ? moment(date).format("YYYY-MM-DD") : "",
                  })
                );

                dispatch(getBalanceSheetData());
              }}
              placeholderText="From Date"
              maxDate={new Date()}
            />
          </div>
        </Grid>
        <Grid item sm={12} lg={6}>
          <div className="bg-white h-100">
            <Typography variant="body2" className="m-b-20 bold">
              Asset
            </Typography>
            <Grid container spacing={2}>
              {profitLossList?.length && profitLossList[0]?.listing.length ? (
                <Grid item xs={12} sm={6} lg={12} xl={7}>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={BalanceAnalyticsOptions(
                      profitLossList?.length && profitLossList[0]?.listing,
                      graphColor,
                      "Asset"
                    )}
                  />
                </Grid>
              ) : (
                <div className="no_data_fnd">
                  <img src={NODATA_6} className="pointer" />
                  <i>Oops!</i>
                  <p>There is nothing here yet!</p>
                </div>
              )}
              <Grid item xs={12} sm={6} lg={12} xl={5}>
                <ul>
                  {profitLossList?.length &&
                  profitLossList[0]?.listing?.length ? (
                    profitLossList[0]?.listing.map((data: any, i: number) => (
                      <li className={`${placeHplderColor[i]}`} key={i}>
                        <Typography variant="subtitle2">
                          {data?.parentCategoryName}
                        </Typography>
                        <Typography variant="subtitle2" className="semi-bold">
                          {convertIntegerToDecimal(
                            Math.abs(data?.debitMinusCredit)
                          )}
                          <> {data?.debitMinusCredit < 0 ? " CR" : " DR"}</>
                        </Typography>
                      </li>
                    ))
                  ) : (
                    <></>
                  )}
                </ul>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item sm={12} lg={6}>
          <div className="bg-white h-100">
            <Typography variant="body2" className="m-b-20 bold">
              Liability
            </Typography>
            <Grid container spacing={2}>
              {profitLossList?.length && profitLossList[1]?.listing.length ? (
                <Grid item xs={12} sm={6} lg={12} xl={7}>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={BalanceAnalyticsOptions(
                      profitLossList?.length && profitLossList[1]?.listing,
                      graphColor,
                      "Liability"
                    )}
                  />
                </Grid>
              ) : (
                <div className="no_data_fnd">
                  <img src={NODATA_6} className="pointer" />
                  <i>Oops!</i>
                  <p>There is nothing here yet!</p>
                </div>
              )}
              <Grid item xs={12} sm={6} lg={12} xl={5}>
                <ul>
                  {profitLossList?.length &&
                  profitLossList[1]?.listing?.length ? (
                    profitLossList[1]?.listing.map((data: any, i: number) => (
                      <li className={`${placeHplderColor[i]}`} key={i}>
                        <Typography variant="subtitle2">
                          {data?.parentCategoryName}
                        </Typography>
                        <Typography variant="subtitle2" className="semi-bold">
                          {convertIntegerToDecimal(
                            Math.abs(data?.creditMinusDebit)
                          )}
                          <>{data?.creditMinusDebit > 0 ? " CR" : " DR"}</>
                        </Typography>
                      </li>
                    ))
                  ) : (
                    <></>
                  )}
                </ul>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item sm={12} lg={6}>
          <div className="bg-white h-100">
            <Typography variant="body2" className="m-b-20 bold">
              Equity
            </Typography>
            <Grid container spacing={2}>
              {profitLossList?.length && profitLossList[2]?.listing?.length ? (
                <Grid item xs={12} sm={6} lg={12} xl={7}>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={BalanceAnalyticsOptions(
                      profitLossList?.length && profitLossList[2]?.listing,
                      graphColor,
                      "Equity"
                    )}
                  />
                </Grid>
              ) : (
                <div className="no_data_fnd">
                  <img src={NODATA_6} className="pointer" />
                  <i>Oops!</i>
                  <p>There is nothing here yet!</p>
                </div>
              )}
              <Grid item xs={12} sm={6} lg={12} xl={5}>
                <ul>
                  {profitLossList?.length &&
                  profitLossList[2]?.listing?.length ? (
                    profitLossList[2]?.listing.map((data: any, i: number) => (
                      <li className={`${placeHplderColor[i]}`} key={i}>
                        <Typography variant="subtitle2">
                          {data?.parentCategoryName}
                        </Typography>
                        <Typography variant="subtitle2" className="semi-bold">
                          {convertIntegerToDecimal(
                            Math.abs(data?.creditMinusDebit)
                          )}
                          <>{data?.creditMinusDebit > 0 ? " CR" : " DR"}</>
                        </Typography>
                      </li>
                    ))
                  ) : (
                    <></>
                  )}
                </ul>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
export default Index;
