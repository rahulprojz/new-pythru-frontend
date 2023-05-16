import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../../components/breadcrumb";
import "../general.scss";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
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
import { generateGeneralLedgerPdf, getGeneralLedgerList } from "../action";
import { convertIntegerToDecimal, getFormtedDate } from "../../../../utils";
import Filter from "./filter";
import { DOWNLOAD_ICON, NODATA_6 } from "../../../../constants";
import { Box } from "@mui/system";
import DownloadDropDownMenu from "../../../../components/menu/downloadDropDownMenu";

interface Props {
  dashboardHide?: boolean;
}

const General = ({ dashboardHide }: Props) => {
  const params = useParams();
  const dispatch: any = useDispatch();
  const [state, setState] = useState(false);
  const [filterState, setfilterState] = useState<boolean>(false);

  useEffect(() => {
    document.title = "General Ledger | PyThru";
    dispatch(resetGeneralAndTrail());
    dispatch(getGeneralLedgerList());
  }, [params]);

  const { generalAndTrailList, filterCount } = useSelector(
    (state: any) => state.generalAndTrail
  );

  const { chartOfAccountMasterData } = useSelector(
    (state: any) => state.commonSlice
  );
  const categoryies = chartOfAccountMasterData.map((v: any) => v.categories);
  const generalCategory = categoryies.flat();

  const handleDownload = () => {
    dispatch(generateGeneralLedgerPdf());
  };

  const calBalanceChange = (startBalance: any, endBalance: any) => {
    try {
      const start =
        startBalance?.credit > startBalance?.debit
          ? startBalance?.credit - startBalance?.debit
          : startBalance?.debit - startBalance?.credit;
      const startUnit =
        startBalance?.credit > startBalance?.debit ? "CR" : "DR";
      const end =
        endBalance?.credit > endBalance?.debit
          ? endBalance?.credit - endBalance?.debit
          : endBalance?.debit - endBalance?.credit;
      const endUnit = endBalance?.credit > endBalance?.debit ? "CR" : "DR";
      const result = start > end ? start - end : end - start;
      const unit = end > start ? endUnit : startUnit;
      return `${convertIntegerToDecimal(result)} ${result > 0 ? unit : ""}`;
    } catch (error) {
      return "₹0.00";
    }
  };

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

  const calculateSubTotal = (arr: any, type: string) => {
    const result = arr
      .map((item: any) => item[type])
      .reduce((prev: any, next: any) => prev + next);
    return convertIntegerToDecimal(result);
  };
  return (
    <>
      {!dashboardHide && <Breadcrumbs />}
      <div className="page-report page-general-ledger">
        {!dashboardHide && (
          <div className="table-filter-head">
            <div className="Dflex fl-end al-cnt m-b-10">
              <Badge
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                badgeContent={filterCount}
                color="primary"
              >
                <IconLabelButtons
                  ButtonIcon={<FilterList />}
                  onPress={() => setfilterState(true)}
                  className="filterNv"
                />
              </Badge>

              <Badge
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                color="primary"
                title="Download pdf"
              >
                <IconLabelButtons
                  ButtonIcon={<img src={DOWNLOAD_ICON} />}
                  onPress={handleDownload}
                  className="filterNv"
                />
              </Badge>
            </div>
          </div>
        )}
        <div className="table-cover">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th colSpan={3}>Description</th>
                <th colSpan={2}>Credit</th>
                <th
                  className={`${
                    generalAndTrailList &&
                    generalAndTrailList.length &&
                    generalAndTrailList.length > 0
                      ? ""
                      : "left"
                  }`}
                >
                  Debit
                </th>
              </tr>
            </thead>
            <tbody>
              {generalAndTrailList &&
              generalAndTrailList.length &&
              generalAndTrailList.length > 0 ? (
                generalAndTrailList.map((item: any, index: any) => (
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
                              {`${item?.parentCategoryName}-${item?.name}`}
                            </Typography>
                          </div>

                          <div className="Dflex sp-bt al-cnt">
                            <Typography variant="subtitle1" className="bold">
                              {`Starting Balance : ${calculateVal(item, 1)}`}
                            </Typography>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="table-cover nested m-b-10">
                            <table>
                              {item?.transactionDetail &&
                              item?.transactionDetail?.length &&
                              item?.transactionDetail?.length > 0 ? (
                                item.transactionDetail.map(
                                  (val: any, index: any) => (
                                    <>
                                      <tr key={`${val?._id}_${index}`}>
                                        <td>
                                          {" "}
                                          {getFormtedDate(
                                            val?.transactionDate,
                                            "DD-MM-YYYY"
                                          )}
                                        </td>
                                        <td colSpan={3}>{val?.description}</td>
                                        <td colSpan={2}>
                                          {convertIntegerToDecimal(val?.credit)}
                                        </td>
                                        <td>
                                          {convertIntegerToDecimal(val?.debit)}
                                        </td>
                                      </tr>
                                    </>
                                  )
                                )
                              ) : (
                                <tr>
                                  <td colSpan={8}>
                                    <div className="no_data_fnd">
                                      <img src={NODATA_6} className="pointer" />
                                      <i>Oops!</i>
                                      <p>There is nothing here yet!</p>
                                    </div>
                                  </td>
                                </tr>
                              )}
                              <tr className="subtotal-row">
                                <td className="bold" colSpan={4}>
                                  Sub Total
                                </td>
                                <td className="bold" colSpan={2}>
                                  {item?.transactionDetail &&
                                  item?.transactionDetail?.length &&
                                  item?.transactionDetail?.length > 0
                                    ? calculateSubTotal(
                                        item?.transactionDetail,
                                        "credit"
                                      )
                                    : "₹0.00"}
                                </td>
                                <td className="bold">
                                  {item?.transactionDetail &&
                                  item?.transactionDetail?.length &&
                                  item?.transactionDetail?.length > 0
                                    ? calculateSubTotal(
                                        item?.transactionDetail,
                                        "debit"
                                      )
                                    : "₹0.00"}
                                </td>
                              </tr>

                              <tr>
                                <td className="bold" colSpan={4}>
                                  Balance Change :{" "}
                                  {calBalanceChange(
                                    item?.startingBalance,
                                    item?.endingBalance
                                  )}
                                </td>
                                <td
                                  className="bold"
                                  colSpan={3}
                                  style={{ textAlign: "right" }}
                                >
                                  {`Ending Balance : ${calculateVal(item, 2)}`}
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

        <AddFilterDrawer
          state={filterState}
          setState={setfilterState}
          className="filterDrawer"
        >
          <Filter categoryData={generalCategory} stateState={setfilterState} />
        </AddFilterDrawer>
      </div>
    </>
  );
};
export default General;
