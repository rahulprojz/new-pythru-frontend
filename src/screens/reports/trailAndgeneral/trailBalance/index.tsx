import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../../../components/breadcrumb";
import "../general.scss";
import { calenderIMG } from "../../../../constants";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import "react-datepicker/dist/react-datepicker.css";
import Typography from "@material-ui/core/Typography";
import IconLabelButtons from "../../../../components/buttons/buttonWithIcon";
import AddFilterDrawer from "../../../../components/drawer";
import { FilterList } from "@material-ui/icons";
import DownnloanPdf from "../../../../components/buttons/buttonWithIcon";
import { useDispatch, useSelector } from "react-redux";
import { resetGeneralAndTrail } from "../trailAndgeneralSlice";
import { getGeneralLedgerList, getTrailBalanceData } from "../action";
import index from "../../../../components/dialog/index";
import { convertIntegerToDecimal, getFormtedDate } from "../../../../utils";
// import Filter from "./filter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateGeneralAndTrail } from "../trailAndgeneralSlice";
import TrailBalanceDetail from "./detail";
import moment from "moment";
const General = () => {
  const params = useParams();
  const dispatch: any = useDispatch();
  const [state, setState] = useState(false);
  const [fromDate, setFromdate]: any = useState(null);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);

  useEffect(() => {
    document.title = "Trial Balance | PyThru";
    dispatch(resetGeneralAndTrail());
    const newDate = new Date();
    setFromdate(newDate);
    dispatch(
      updateGeneralAndTrail({
        toDate: newDate ? moment(newDate).format("YYYY-MM-DD") : "",
      })
    );

    dispatch(getTrailBalanceData());
  }, [params]);

  const { generalAndTrailList } = useSelector(
    (state: any) => state.generalAndTrail
  );

  const { chartOfAccountMasterData } = useSelector(
    (state: any) => state.commonSlice
  );
  const categoryies = chartOfAccountMasterData.map((v: any) => v.categories);

  useEffect(() => {
    let debit = 0;
    let credit = 0;
    if (generalAndTrailList?.length) {
      generalAndTrailList.forEach((item: any) => {
        debit = +debit + Math.abs(+item.debit);
        credit = +credit + Math.abs(+item?.credit);
      });
      setTotalCredit(credit);
      setTotalDebit(debit);
    }
  }, [generalAndTrailList]);
  return (
    <>
      <Breadcrumbs />
      <div className="page-report">
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12}>
            <div
              className="filterDate m-b-20"
              style={{ width: 300, maxWidth: "100%" }}
            >
              <i>
                <img src={calenderIMG} alt="" />
              </i>
              <DatePicker
                dateFormat="dd-MM-yyyy"
                maxDate={new Date()}
                selected={fromDate}
                onChange={(date: any) => {
                  setFromdate(date);
                  dispatch(
                    updateGeneralAndTrail({
                      toDate: date ? moment(date).format("YYYY-MM-DD") : "",
                    })
                  );
                  setTotalCredit(0);
                  setTotalDebit(0);
                  dispatch(getTrailBalanceData());
                }}
                placeholderText="From Date"
              />
            </div>
          </Grid>
        </Grid>

        <div className="table-cover">
          <TrailBalanceDetail
            type={1}
            L1Name="Income"
            accountData={generalAndTrailList.filter(
              (item: any) => item.chartOfAccountType === 1
            )}
          />
          <TrailBalanceDetail
            type={2}
            L1Name="EXPENSE"
            accountData={generalAndTrailList.filter(
              (item: any) => item.chartOfAccountType === 2
            )}
          />
          <TrailBalanceDetail
            type={3}
            L1Name="ASSET"
            accountData={generalAndTrailList.filter(
              (item: any) => item.chartOfAccountType === 3
            )}
          />
          <TrailBalanceDetail
            type={4}
            L1Name="LIABILITY"
            accountData={generalAndTrailList.filter(
              (item: any) => item.chartOfAccountType === 4
            )}
          />
          <TrailBalanceDetail
            type={5}
            L1Name="EQUITY"
            accountData={generalAndTrailList.filter(
              (item: any) => item.chartOfAccountType === 5
            )}
          />

          <div
          className="total-for-all-acc">
            <div className="Dflex sp-bt al-cnt">
              <Typography variant="subtitle1" className="bold color-white nowrap m-r-20">
                Total for all accounts
              </Typography>
            </div>
            <div className="Dflex sp-bt al-cnt">
              <Typography variant="subtitle1" className="bold color-white nowrap">
                Debit:- {convertIntegerToDecimal(totalDebit)} &nbsp;&nbsp; Credit:-
                {convertIntegerToDecimal(totalCredit)}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default General;
