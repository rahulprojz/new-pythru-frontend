import React, { useCallback, useEffect, useReducer, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import Box from "@mui/material/Box";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import {
  InputLabel,
  MenuItem,
  Button,
  Select,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  CUSTOMER_ICON,
  VENDOR_ICON,
  PRODUCT_ICON,
  SERVICES_ICON,
  PURCHASE_DUE_ICON,
  SALES_AMOUNT_ICON,
  CREATE_INVOICE_ICON,
  CREATE_BILL_ICON,
  CREATE_ESTIMATE_ICON,
  PURCHASE_ORDER_ICON,
  SALES_ORDER_ICON,
  CREATE_CUSTOMER_ICON,
  CREATE_VENDOR_ICON,
  CREATE_PRODUCT_ICON,
  CREATE_SERVICES_ICON,
  CREATE_ASSET_ICON,
  CREATE_INCOME_ICON,
  EXPENSES_ICON,
  dashboardFiltersLabels,
  dashboardChartStatic,
  SalesInvoiceLabel,
  BillLabel,
  EstimateLabel,
  DONUT_PLACEHOLDER,
  DONUT_PART_PLACEHOLDER,
  NO_DATA_FOUND,
  profitLossLabels,
  NODATA_6,
} from "../../constants";
import "./dashboard.scss";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import DashboardTable from "../../components/sales/dashboard/table";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import InvoiceAnalytics from "./Charts/InvoiceAnalytics";
import BIllAnalytics from "./Charts/BIllAnalytics";
import { getSaleDashboardList } from "../saleandPurchase/action";
import { updateSalePurchase } from "../saleandPurchase/salePurchaseSlice";
import General from "../reports/trailAndgeneral/general/general";
import ProfitLoseBarGraph from "./Charts/ProfitLoseGrraph";
import { FormControl } from "@material-ui/core";
import {
  getCustomerVendorData,
  getProductServicesData,
  getSalePurchaseDueAmountData,
  // getDasboardPieChartData,
  getProfitLosseData,
  getDasboardPieInvoiceChartData,
} from "./dashboardAction";
import Journal from "../accounting/manualJournals/index";
import { dataa } from "./Charts/ChartOptions";
import { getAuthTokenFromLS } from "../../utils";

function Dashboard({ setType }: any) {
  const navigate = useNavigate();
  const params = useParams();
  const [value, setValue] = React.useState("1");
  const [open, setOpen] = React.useState({
    invoice: false,
    profit: false,
    bill: false,
  });
  const [selectedValue, setSelectedValue] = React.useState({
    invoice: "All",
    profit: "Last 12 month",
    bill: "All",
  });

  let limit = 5;
  const dispatch: any = useDispatch();

  const [chartValue, setChartValue] = React.useState("");
  const {
    invoiceChartData,
    billChartData,
    invoiceFooterData,
    profitLosseData,
    billFooterData,
    profitLossDataFooter,
    reloadDashboard,
  } = useSelector((state: any) => state.dashboardSlice);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("body")?.click();
    }, 1000);
  }, [reloadDashboard]);

  useEffect(() => {
    return () => {
      window.addEventListener(
        "popstate",
        (event) => {
          if (event.state) {
            if (getAuthTokenFromLS()) {
              window.onpopstate = () => {
                document.title = "Dashboard | PyThru";
                navigate("/dashboard");
              };
            } else {
              navigate("/login");
            }
          }
        },
        false
      );
    };
  }, []);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    // dispatch(updateSalePurchase())

    if (newValue == 1) {
      dispatch(updateSalePurchase({ type: newValue, page: 1 }));
      dispatch(getSaleDashboardList(limit));
    } else if (newValue == 2) {
      dispatch(updateSalePurchase({ type: newValue, page: 1 }));
      dispatch(getSaleDashboardList(limit));
    }
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));
  const { permissions } = useSelector((state: any) => state.commonSlice);
  useEffect(() => {
    document.title = "Dashboard | PyThru";
    // if ((permissions && permissions["sales"]?.view) || !permissions) {
    dispatch(updateSalePurchase({ type: 1, page: 1 }));
    dispatch(getSaleDashboardList(limit));
    // }
    // if ((permissions && permissions["reports"]?.view) || !permissions)
    dispatch(getProfitLosseData(3));
    // if (permissions && permissions["reports"]?.view)
    dispatch(getDasboardPieInvoiceChartData({ documentType: 3, type: 1 }));

    dispatch(getCustomerVendorData());
    dispatch(getProductServicesData());
    dispatch(getSalePurchaseDueAmountData());
    dispatch(getDasboardPieInvoiceChartData({ documentType: 9, type: 1 }));
  }, [params]);

  const dashboardlistData = useSelector(
    (state: any) => state.dashboardListSlice
  );

  const getProfitOrLoss = (current: number, last: number) => {
    let toReturn = "";
    if (current < last) {
      toReturn = "loss";
    }
    return toReturn;
  };

  const {
    customerdata,
    vendordata,
    productdata,
    servicesdata,
    purchasedue,
    salesdue,
  } = dashboardlistData;

  const handleClose = (value: number, chartType: string) => {
    if (chartType === "invoice") {
      dispatch(
        getDasboardPieInvoiceChartData({ documentType: 3, type: value })
      );
    } else if (chartType === "bill") {
      dispatch(
        getDasboardPieInvoiceChartData({ documentType: 9, type: value })
      );
    } else if (chartType === "profit") {
      dispatch(getProfitLosseData(value));
    }

    if (chartType === "profit") {
      setSelectedValue({
        ...selectedValue,
        [chartType]: profitLossLabels[value],
      });
    } else {
      setSelectedValue({
        ...selectedValue,
        [chartType]: dashboardFiltersLabels[value],
      });
    }

    setOpen({
      ...open,
      [chartType]: false,
    });
  };
  const handleClick = (type: string) => {
    setOpen({
      ...open,
      [type]: true,
    });
  };
  const handleClickAway = (type: string) => {
    setOpen({
      ...open,
      [type]: false,
    });
  };

  return (
    <div className="page-dashboard">
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12}>
          <Grid
            container
            rowSpacing={{ xs: 1, sm: 2 }}
            columnSpacing={{ xs: 1, sm: 2 }}
          >
            <Grid item xs={6} sm={6} lg={4} xl={2}>
              <div className="counter-card">
                <div className="Dflex al-cnt">
                  <figure>
                    <img src={CUSTOMER_ICON} alt="" />
                  </figure>
                  <div>
                    <Typography variant="subtitle2">{"Customer"}</Typography>
                    <Typography variant="h6">
                      {customerdata?.count || 0}
                    </Typography>
                  </div>
                </div>
                <BorderLinearProgress
                  className="customerBar"
                  variant="determinate"
                  value={100}
                />
                <Typography variant="subtitle2" className="color-label">
                  <span
                    className={`trade ${getProfitOrLoss(
                      customerdata?.currentWeek || 0,
                      customerdata?.lastWeek || 0
                    )}`}
                  >
                    <ArrowUpwardOutlinedIcon />
                    {`${Math.abs(customerdata?.percent).toFixed(2) || 0}% `}
                  </span>
                  {` since last week`}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6} sm={6} lg={4} xl={2}>
              <div className="counter-card">
                <div className="Dflex al-cnt">
                  <figure>
                    <img src={VENDOR_ICON} alt="" />
                  </figure>
                  <div>
                    <Typography variant="subtitle2">{"Vendor"}</Typography>
                    <Typography variant="h6">
                      {vendordata?.count || 0}
                    </Typography>
                  </div>
                </div>
                <BorderLinearProgress
                  className="vendorBar"
                  variant="determinate"
                  value={100}
                />
                <Typography variant="subtitle2" className="color-label">
                  <span
                    className={`trade ${getProfitOrLoss(
                      vendordata?.currentWeek || 0,
                      vendordata?.lastWeek || 0
                    )}`}
                  >
                    <ArrowUpwardOutlinedIcon />
                    {`${Math.abs(vendordata?.percent).toFixed(2) || 0}% `}
                  </span>
                  {` since last week`}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6} sm={6} lg={4} xl={2}>
              <div className="counter-card">
                <div className="Dflex al-cnt">
                  <figure>
                    <img src={PRODUCT_ICON} alt="" />
                  </figure>
                  <div>
                    <Typography variant="subtitle2">Product</Typography>
                    <Typography variant="h6">
                      {productdata?.count || 0}
                    </Typography>
                  </div>
                </div>
                <BorderLinearProgress
                  className="productBar"
                  variant="determinate"
                  value={100}
                />
                <Typography variant="subtitle2" className="color-label">
                  {/* <span className="trade">
                    <ArrowUpwardOutlinedIcon /> 1.15%{" "}
                  </span>{" "} */}
                  <span
                    className={`trade ${getProfitOrLoss(
                      productdata?.currentWeek || 0,
                      productdata?.lastWeek || 0
                    )}`}
                  >
                    <ArrowUpwardOutlinedIcon />
                    {`${Math.abs(productdata?.percent).toFixed(2) || 0}% `}
                  </span>
                  {" since last week"}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6} sm={6} lg={4} xl={2}>
              <div className="counter-card">
                <div className="Dflex al-cnt">
                  <figure>
                    <img src={SERVICES_ICON} alt="" />
                  </figure>
                  <div>
                    <Typography variant="subtitle2">Services</Typography>
                    <Typography variant="h6">
                      {servicesdata?.count || 0}
                    </Typography>
                  </div>
                </div>
                <BorderLinearProgress
                  className="servicesBar"
                  variant="determinate"
                  value={100}
                />
                <Typography variant="subtitle2" className="color-label">
                  {/* <span className="trade">
                    <ArrowUpwardOutlinedIcon /> 1.15%{" "}
                  </span>{" "} */}
                  <span
                    className={`trade ${getProfitOrLoss(
                      servicesdata?.currentWeek || 0,
                      servicesdata?.lastWeek || 0
                    )}`}
                  >
                    <ArrowUpwardOutlinedIcon />
                    {`${Math.abs(servicesdata?.percent).toFixed(2) || 0}% `}
                  </span>
                  {"since last week"}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6} sm={6} lg={4} xl={2}>
              <div className="counter-card">
                <div className="Dflex al-cnt">
                  <figure>
                    <img src={PURCHASE_DUE_ICON} alt="" />
                  </figure>
                  <div>
                    <Typography variant="subtitle2">
                      Purchase Due Amount
                    </Typography>
                    <Typography variant="h6">
                      {purchasedue?.totalAmountDue?.toFixed(2) || 0}
                    </Typography>
                  </div>
                </div>
                <BorderLinearProgress
                  className="purchaseDueBar"
                  variant="determinate"
                  value={100}
                />
                <Typography variant="subtitle2" className="color-label">
                  {/* <span className="trade">
                    <ArrowUpwardOutlinedIcon /> 1.15%{" "}
                  </span>{" "} */}
                  <span
                    className={`trade ${getProfitOrLoss(
                      purchasedue?.currentWeek || 0,
                      purchasedue?.lastWeek || 0
                    )}`}
                  >
                    <ArrowUpwardOutlinedIcon />
                    {`${Math.abs(purchasedue?.percent).toFixed(2) || 0}% `}
                  </span>
                  {"since last week"}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6} sm={6} lg={4} xl={2}>
              <div className="counter-card">
                <div className="Dflex al-cnt">
                  <figure>
                    <img src={SALES_AMOUNT_ICON} alt="" />
                  </figure>
                  <div>
                    <Typography variant="subtitle2">
                      Sales Due Amount
                    </Typography>
                    <Typography variant="h6">
                      {salesdue?.totalAmountDue?.toFixed(2) || 0}
                    </Typography>
                  </div>
                </div>
                <BorderLinearProgress
                  className="salesDueBar"
                  variant="determinate"
                  value={100}
                />
                <Typography variant="subtitle2" className="color-label">
                  {/* <span className="trade">
                    <ArrowUpwardOutlinedIcon /> 1.15%{" "}
                  </span>{" "} */}
                  <span
                    className={`trade ${getProfitOrLoss(
                      salesdue?.currentWeek || 0,
                      salesdue?.lastWeek || 0
                    )}`}
                  >
                    <ArrowUpwardOutlinedIcon />
                    {`${Math.abs(salesdue?.percent).toFixed(2) || 0}% `}
                  </span>
                  {"since last week"}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ul className="anchor-list">
            {(permissions && permissions["sales"]?.view) || !permissions ? (
              <li>
                <div
                  className="link-card"
                  onClick={() =>
                    navigate("/sales/invoice/add", SalesInvoiceLabel)
                  }
                >
                  <figure>
                    <img src={CREATE_INVOICE_ICON} alt="" />
                  </figure>
                  <Typography variant="subtitle2">Create Invoice</Typography>
                </div>
              </li>
            ) : (
              <></>
            )}
            {(permissions && permissions["purchases"]?.view) || !permissions ? (
              <li>
                <div
                  className="link-card"
                  onClick={() => navigate("/purchase/bills/add", BillLabel)}
                >
                  <figure>
                    <img src={CREATE_BILL_ICON} alt="" />
                  </figure>
                  <Typography variant="subtitle2">Create Bill</Typography>
                </div>
              </li>
            ) : (
              <></>
            )}
            {(permissions && permissions["sales"]?.view) || !permissions ? (
              <li>
                <div
                  className="link-card"
                  onClick={() => navigate("/sales/estimate/add", EstimateLabel)}
                >
                  <figure>
                    <img src={CREATE_ESTIMATE_ICON} alt="" />
                  </figure>
                  <Typography variant="subtitle2">Create Estimate</Typography>
                </div>
              </li>
            ) : (
              <></>
            )}
            {(permissions && permissions["purchases"]?.view) || !permissions ? (
              <li>
                <div
                  className="link-card"
                  onClick={() => navigate("/purchase/purchase-order")}
                >
                  <figure>
                    <img src={PURCHASE_ORDER_ICON} alt="" />
                  </figure>
                  <Typography variant="subtitle2">Purchase Order</Typography>
                </div>
              </li>
            ) : (
              <></>
            )}
            {(permissions && permissions["sales"]?.view) || !permissions ? (
              <li>
                <div
                  className="link-card"
                  onClick={() => navigate("/sales/order")}
                >
                  <figure>
                    <img src={SALES_ORDER_ICON} alt="" />
                  </figure>
                  <Typography variant="subtitle2">Sales Order</Typography>
                </div>
              </li>
            ) : (
              <></>
            )}
            {(permissions && permissions["sales"]?.view) || !permissions ? (
              <li>
                <div
                  className="link-card"
                  onClick={() => navigate("/sales/customers/add")}
                >
                  <figure>
                    <img src={CREATE_CUSTOMER_ICON} alt="" />
                  </figure>
                  <Typography variant="subtitle2">Create Customer</Typography>
                </div>
              </li>
            ) : (
              <></>
            )}
            {(permissions && permissions["purchases"]?.view) || !permissions ? (
              <li>
                <div
                  className="link-card"
                  onClick={() => navigate("/purchase/vendor/add")}
                >
                  <figure>
                    <img src={CREATE_VENDOR_ICON} alt="" />
                  </figure>
                  <Typography variant="subtitle2">Create Vendor</Typography>
                </div>
              </li>
            ) : (
              <></>
            )}
            {(permissions && permissions["productAndServices"]?.view) ||
            !permissions ? (
              <li>
                <div
                  className="link-card"
                  onClick={() =>
                    navigate("/products-&-services/products", {
                      state: { open: true },
                    })
                  }
                >
                  <figure>
                    <img src={CREATE_PRODUCT_ICON} alt="" />
                  </figure>
                  <Typography variant="subtitle2">Create Product</Typography>
                </div>
              </li>
            ) : (
              <></>
            )}
            {(permissions && permissions["productAndServices"]?.view) ||
            !permissions ? (
              <li>
                <div
                  className="link-card"
                  onClick={() =>
                    navigate("/products-&-services/services", {
                      state: { open: true },
                    })
                  }
                >
                  <figure>
                    <img src={CREATE_SERVICES_ICON} alt="" />
                  </figure>
                  <Typography variant="subtitle2">Create Services</Typography>
                </div>
              </li>
            ) : (
              <></>
            )}
            {/* {(permissions && permissions["accounting"].view) || !permissions ? (
              <li>
                <div
                  className='link-card'
                  onClick={() => navigate("/assets", { state: { open: true } })}
                >
                  <figure>
                    <img src={CREATE_ASSET_ICON} alt='' />
                  </figure>
                  <Typography variant="subtitle2">Create Asset</Typography>
                </div>
              </li>
            ) : (
              <></>
            )} */}
            {/* {(permissions && permissions["accounting"].view) || !permissions ? (
              <li>
                <div
                  className="link-card"
                  //onClick={() => navigate("/sales/invoice")}
                >
                  <figure>
                    <img src={CREATE_INCOME_ICON} alt="" />
                  </figure>
                  <Typography variant="subtitle2">Create Income</Typography>
                </div>
              </li>
            ) : (
              <></>
            )} */}
            {/* {(permissions && permissions["accounting"].view) || !permissions ? (
              <li>
                <div
                  className='link-card'
                  onClick={() => navigate("/expenses")}
                >
                  <figure>
                    <img src={EXPENSES_ICON} alt='' />
                  </figure>
                  <Typography variant="subtitle2">Expenses</Typography>
                </div>
              </li>
            ) : (
              <></>
            )} */}
          </ul>
        </Grid>
      </Grid>
      <div className="dashboard-row">
        <div className="left-content">
          <TabContext value={value}>
            {/* {(permissions &&
              (permissions["sales"]?.view ||
                permissions["purchases"]?.view ||
                permissions["reports"]?.view)) ||
            !permissions ? ( */}
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Sales" value="1" className="btn" />
              <Tab label="Purchase" value="2" className="btn" />
              <Tab label="Transactions" value="3" className="btn" />
              {/* {(permissions && permissions["sales"]?.view) || !permissions ? (
                  <Tab label="Sales" value="1" className="btn" />
                ) : (
                  <></>
                )}
                {(permissions && permissions["purchases"]?.view) ||
                !permissions ? (
                  <Tab label="Purchase" value="2" className="btn" />
                ) : (
                  <></>
                )}
                {(permissions && permissions["reports"]?.view) ||
                !permissions ? (
                  <Tab label="Transactions" value="3" className="btn" />
                ) : (
                  <></>
                )} */}
            </TabList>
            {/* ) : (
              <></>
            )} */}
            {/* {(permissions && permissions["sales"]?.view) || !permissions ? ( */}
            <TabPanel value="1">
              <DashboardTable dashboardType="sales" dashboardHide={true} />
            </TabPanel>
            {/* ) : (
              <></>
            )} */}
            {/* {(permissions && permissions["purchases"]?.view) || !permissions ? ( */}
            <TabPanel value="2">
              <DashboardTable dashboardType="purchase" dashboardHide={true} />
            </TabPanel>
            {/* ) : (
              <></>
            )} */}
            {/* {(permissions && permissions["reports"]?.view) || !permissions ? ( */}
            <TabPanel value="3">
              <Journal dashboardHide={true} />
            </TabPanel>
            {/* ) : (
              <></>
            )} */}
          </TabContext>
        </div>
        <div className="right-content">
          {/* {(permissions && permissions["sales"].view) || !permissions ? ( */}
          <div className="donut-chart-cover bg-white">
            <div className="Dflex al-cnt sp-bt donut-head">
              <Typography variant="body2" className="bold">
                Invoice Analytics
              </Typography>
              <ClickAwayListener onClickAway={() => handleClickAway("invoice")}>
                <Box className="custom-dropdown">
                  <Button
                    id="fade-button"
                    onClick={() => handleClick("invoice")}
                    className="buttonWithIcon drop-btn"
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    {selectedValue.invoice}
                  </Button>
                  {open.invoice ? (
                    <div className="drop-list">
                      <MenuItem onClick={() => handleClose(3, "invoice")}>
                        This Week
                      </MenuItem>
                      <MenuItem onClick={() => handleClose(2, "invoice")}>
                        This Month
                      </MenuItem>
                      <MenuItem onClick={() => handleClose(4, "invoice")}>
                        Today
                      </MenuItem>
                      <MenuItem onClick={() => handleClose(1, "invoice")}>
                        All
                      </MenuItem>
                    </div>
                  ) : null}
                </Box>
              </ClickAwayListener>
            </div>

            <div
              className={`donut-content ${
                invoiceChartData?.length > 0 ? "" : "for-no-data"
              }`}
            >
              {invoiceChartData?.length > 0 ? (
                <>
                  <InvoiceAnalytics invoiceChartData={invoiceChartData} />
                  <Grid container rowSpacing={3} columnSpacing={2}>
                    {invoiceChartData?.length > 0
                      ? invoiceChartData?.map((item: any, index: number) => {
                          return (
                            <Grid item lg={6} key={index}>
                              <Typography
                                variant="caption"
                                className={`color-label ${item.color}`}
                              >
                                {item?.label}
                              </Typography>
                              <div className="Dflex al-cnt">
                                <Typography
                                  variant="subtitle1"
                                  className="extra-bold nowrap"
                                >
                                  ₹{item?.data?.toFixed(2)}
                                </Typography>
                                <div
                                  className={`show-percent Dlex al-cnt js-cnt ${item.color}`}
                                >
                                  {Math.round(
                                    item?.percentageValue?.toFixed(2)
                                  ) + "%"}
                                </div>
                              </div>
                            </Grid>
                          );
                        })
                      : null}
                  </Grid>
                </>
              ) : (
                <div className="no_data_fnd">
                  <img src={NODATA_6} className="pointer" />
                  <i>Oops!</i>
                  <p>There is nothing here yet!</p>
                </div>
              )}

              {/* <Grid container rowSpacing={3} columnSpacing={2}>
                  {invoiceChartData?.data?.length > 0
                    ? invoiceChartData?.data?.map(
                        (item: any, index: number) => {
                          return (
                            <Grid item xs={6} key={index}>
                              <Typography
                                variant="caption"
                                className={`color-label ${item?.className}`}
                              >
                                {item?.name}
                              </Typography>
                              <div className="Dflex al-cnt">
                                <Typography
                                  variant="subtitle1"
                                  className="extra-bold nowrap"
                                >
                                  ₹{item?.value}
                                </Typography>
                                <div
                                  className={`show-percent Dlex al-cnt js-cnt ${item?.className}`}
                                >
                                  {Math.round(item?.percentage) + "%"}
                                </div>
                              </div>
                            </Grid>
                          );
                        }
                      )
                    : null}
                </Grid> */}
            </div>
          </div>
          {/* ) : (
            <></>
          )} */}
        </div>
      </div>
      <div className="dashboard-row">
        <div className="left-content">
          <div className="donut-chart-cover bg-white">
            <div className="Dflex al-cnt sp-bt donut-head">
              <Typography variant="body2" className="bold">
                Profit & Loss
              </Typography>
              <ClickAwayListener onClickAway={() => handleClickAway("profit")}>
                <Box className="custom-dropdown">
                  <Button
                    id="fade-button"
                    onClick={() => handleClick("profit")}
                    className="drop-btn profit-loss"
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    {selectedValue.profit}
                  </Button>
                  {open.profit ? (
                    <div className="drop-list">
                      <MenuItem onClick={() => handleClose(3, "profit")}>
                        Last 12 month
                      </MenuItem>
                      <MenuItem onClick={() => handleClose(1, "profit")}>
                        Current Financial year
                      </MenuItem>
                      <MenuItem onClick={() => handleClose(2, "profit")}>
                        Previous Financial year
                      </MenuItem>
                    </div>
                  ) : null}
                </Box>
              </ClickAwayListener>
            </div>
            <div className="donut-content">
              <ProfitLoseBarGraph profitLosseData={profitLosseData} />
              <div className="profit-loss-info">
                <ul className="Dflex al-cnt">
                  {profitLossDataFooter?.map((item: any, index: number) => {
                    return (
                      <li key={index}>
                        <Typography variant="subtitle2">
                          {item?.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          className={`bold m-t-5 ${item?.color?.substring(1)}`}
                        >
                          ₹{item?.value}
                        </Typography>
                      </li>
                    );
                  })}
                  {/* <li>
                  <Typography variant="subtitle2">Total Expense</Typography>
                  <Typography
                    variant="body2"
                    className="bold m-t-5 total-expense"
                  >
                    ₹0.00
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2">Total Profit</Typography>
                  <Typography
                    variant="body2"
                    className="bold m-t-5 total-profit"
                  >
                    ₹0.00
                  </Typography>
                </li> */}
                </ul>
                {/* <ul className="Dflex al-cnt">
                <li>
                  <Typography variant="subtitle2" className="profits">
                    Profits
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2" className="incomes">
                    Incomes
                  </Typography>
                </li>
                <li>
                  <Typography variant="subtitle2" className="expenses">
                    Expenses
                  </Typography>
                </li>
              </ul> */}
              </div>
            </div>
          </div>
        </div>
        {/* {(permissions && permissions["purchases"].view) || !permissions ? ( */}
        <div className="right-content">
          <div className="donut-chart-cover bg-white half-donut">
            <div className="Dflex al-cnt sp-bt donut-head">
              <Typography variant="body2" className="bold">
                Bill Analytics
              </Typography>
              <ClickAwayListener onClickAway={() => handleClickAway("bill")}>
                <Box className="custom-dropdown">
                  <Button
                    id="fade-button"
                    onClick={() => handleClick("bill")}
                    className="drop-btn"
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    {selectedValue?.bill}
                  </Button>
                  {open.bill ? (
                    <div className="drop-list">
                      <MenuItem onClick={() => handleClose(3, "bill")}>
                        This Week
                      </MenuItem>
                      <MenuItem onClick={() => handleClose(2, "bill")}>
                        This Month
                      </MenuItem>
                      <MenuItem onClick={() => handleClose(4, "bill")}>
                        Today
                      </MenuItem>
                      <MenuItem onClick={() => handleClose(1, "bill")}>
                        All
                      </MenuItem>
                    </div>
                  ) : null}
                </Box>
              </ClickAwayListener>
            </div>
            <div
              className={`donut-content ${
                billChartData?.length > 0 ? "" : "for-no-data"
              }`}
            >
              {billChartData?.length > 0 ? (
                <>
                  <BIllAnalytics billChartData={billChartData} />
                  <Grid container rowSpacing={3} columnSpacing={2}>
                    {billChartData?.length > 0
                      ? billChartData?.map((item: any, index: number) => {
                          return (
                            <Grid item lg={6} key={index}>
                              <Typography
                                variant="caption"
                                className={`color-label ${item.color}`}
                              >
                                {item?.label}
                              </Typography>
                              <div className="Dflex al-cnt">
                                <Typography
                                  variant="subtitle1"
                                  className="extra-bold nowrap"
                                >
                                  ₹{item?.data?.toFixed(2)}
                                </Typography>
                                <div
                                  className={`show-percent Dlex al-cnt js-cnt ${item.color}`}
                                >
                                  {Math.round(
                                    item?.percentageValue?.toFixed(2)
                                  ) + "%"}
                                </div>
                              </div>
                            </Grid>
                          );
                        })
                      : null}
                  </Grid>
                </>
              ) : (
                <div className="no_data_fnd">
                  <img src={NODATA_6} className="pointer" />
                  <i>Oops!</i>
                  <p>There is nothing here yet!</p>
                </div>
              )}

              {/* <Grid container rowSpacing={3} columnSpacing={2}>
                  {billChartData?.data?.length > 0
                    ? billChartData?.data?.map((item: any, index: number) => {
                        return (
                          <Grid item xs={6} key={index}>
                            <Typography
                              variant="caption"
                              className={`color-label ${item?.className}`}
                            >
                              {item?.name}
                            </Typography>
                            <div className="Dflex al-cnt">
                              <Typography
                                variant="subtitle1"
                                className="extra-bold nowrap"
                              >
                                ₹{item?.value}
                              </Typography>
                              <div
                                className={`show-percent Dlex al-cnt js-cnt  ${item?.className}`}
                              >
                                {Math.round(item.percentage) + "%"}
                              </div>
                            </div>
                          </Grid>
                        );
                      })
                    : null}
                </Grid> */}
            </div>
          </div>
        </div>
        {/* ) : (
          <></>
        )} */}
      </div>
      <div className="bg-white">
        <Typography variant="subtitle1" className="semi-bold center">Copyright &copy; 2023, All Rights Reserved.</Typography>
      </div>
    </div>
  );
}

export default Dashboard;
