import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../../../components/breadcrumb";
import "../general.scss";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  Button,
} from "@mui/material";
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
import { NODATA_6 } from "../../../../constants";
// import Filter from "./filter";

const General = ({ type, L1Name, accountData }: any) => {
  const params = useParams();
  const dispatch: any = useDispatch();
  const [state, setState] = useState(false);
  const [filterState, setfilterState] = useState<boolean>(false);
  // const [subTotalCredit, setSubTotalCredit] = useState(0);
  // const [subTotalDebit, setSubTotalDebit] = useState(0);
  const calculateVal = (item: any, type: number) => {
    try {
      let credit = item?.startingBalance?.credit;
      let debit = item?.startingBalance?.debit;
      if (type === 2) {
        credit = item?.endingBalance?.credit;
        debit = item?.endingBalance?.debit;
      }
      const unit = credit > debit ? "CR" : "DR";
      const result = credit > debit ? credit - debit : debit - credit;
      return `${convertIntegerToDecimal(result)} ${result > 0 ? unit : ""}`;
    } catch (error) {
      return "₹0.00";
    }
  };
  // useEffect(() => {
  //   dispatch(resetGeneralAndTrail());
  //   dispatch(getTrailBalanceData());
  // }, [params]);

  const { generalAndTrailList } = useSelector(
    (state: any) => state.generalAndTrail
  );

  const { chartOfAccountMasterData } = useSelector(
    (state: any) => state.commonSlice
  );
  const categoryies = chartOfAccountMasterData.map((v: any) => v.categories);

  return (
    <>
      <div className="page-report">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: 0,
            padding: "10px",
            borderRadius: "0.625rem",
            background: "#ffffff",
            border: "#EAEAEA",
          }}
        >
          <div className="Dflex sp-bt al-cnt">
            {/* <ArrowDropDownOutlinedIcon /> */}
            <Typography variant="subtitle1" className="bold">
              {L1Name}
            </Typography>
          </div>
          <div className="Dflex sp-bt al-cnt">
            <Typography variant="subtitle1" className="bold">
              {accountData && accountData.length ? (
                <>
                  {`Total ${L1Name} :${convertIntegerToDecimal(
                    Math.abs(
                      Math.abs(accountData[0]?.debit) -
                        Math.abs(accountData[0]?.credit)
                    )
                  )}`}
                </>
              ) : (
                <>Total {L1Name} :0.00</>
              )}
            </Typography>
          </div>
        </div>
        <div className="table-cover">
          <table style={{ marginLeft: "20px", width: "calc(100% - 20px)" }}>
            <thead>
              <tr>
                <th>Accounts</th>
                <th></th>
                <th></th>
                <th>Debit</th>
                <th>Credit</th>
              </tr>
            </thead>
            <tbody>
              {console.log(accountData, "accountData")}
              {accountData && accountData.length && accountData.length > 0 ? (
                accountData[0].listing?.map((item: any, index: any) => (
                  <tr key={`${item?._id}_${index}`}>
                    <td colSpan={7}>
                      <Accordion>
                        <AccordionSummary
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <div className="Dflex sp-bt al-cnt">
                            <ArrowDropDownOutlinedIcon />
                            <Typography variant="subtitle1" className="bold">
                              {item?.parentCategoryName}
                            </Typography>
                          </div>

                          {/* <div className="Dflex al-cnt">
                          <Typography
                            variant="subtitle1"
                            className="bold"
                            style={{ minWidth: "145px" }}
                          >
                            {convertIntegerToDecimal(item?.debit)}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            className="bold"
                            style={{ minWidth: "125px" }}
                          >
                            {convertIntegerToDecimal(item?.credit)}
                          </Typography>
                        </div> */}
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="table-cover nested m-b-20">
                            <table>
                              {item?.listing &&
                                item?.listing?.length &&
                                item?.listing?.length > 0 &&
                                item.listing.map((val: any, index: any) => (
                                  <>
                                    {console.log(val, "val?")}
                                    <tr key={`${val?._id}_${index}`}>
                                      <td colSpan={3}>{val?.name}</td>
                                      <td>
                                        {convertIntegerToDecimal(val?.debit)}
                                      </td>
                                      <td>
                                        {convertIntegerToDecimal(val?.credit)}
                                      </td>
                                    </tr>
                                  </>
                                ))}
                              <tr className="subtotal-row">
                                <td className="bold">Sub Total</td>
                                <td></td>
                                <td></td>
                                <td className="bold nowrap">
                                  {convertIntegerToDecimal(item?.debit)}
                                </td>
                                <td className="bold nowrap">
                                  {convertIntegerToDecimal(item?.credit)}
                                </td>
                              </tr>
                            </table>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="no-record" colSpan={7}>
                    <div className="no_data_fnd">
                      <img src={NODATA_6} className="pointer" />
                      <i>Oops!</i>
                      <p>There is nothing here yet!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default General;
