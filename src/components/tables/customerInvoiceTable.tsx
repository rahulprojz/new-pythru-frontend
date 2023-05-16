import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tab } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import Pagination from "@mui/material/Pagination";
import { FilterList } from "@material-ui/icons";
import Badge from "@mui/material/Badge";

import SelectPerPage from "../select/paginationSelect";
import SearchInput from "../inputs/searchInput";
import DeleteDialog from "../dialog/index";
import MenuBar from "../menu/index";
import {
  NODATA_1,
  deleteIMG,
  DOCUMENT_TYPE,
  getEstimateStatus,
  getEstimateStatusCss,
  SalesInvoiceLabel,
  statusEnum,
  NO_DATA_FOUND,
  TOTAL_AMOUNT_PAID,
  TOTAL_AMOUNT_DUE,
  TOTAL_TRANSACTIONS,
} from "../../constants";
import {
  addDefaultSrc,
  convertIntegerToDecimal,
  getFormtedDate,
  getSentDate,
} from "../../utils";
import { updateSalePurchase } from "../../screens/saleandPurchase/salePurchaseSlice";
import {
  getCustomerTransactionDetail,
  deleteCustomerSaleInvoice,
} from "../../screens/saleandPurchase/action";

import IconLabelButtons from "../buttons/buttonWithIcon";
import useDebounce from "../../hooks/use.debounce";
import { useLocation } from "react-router-dom";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import StockStatus from "../stock/index";

type Order = "asc" | "desc";
type Data = any;
interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "documentNumber",
    numeric: false,
    disablePadding: true,
    label: "Transaction Details",
  },
  {
    id: "dueAmount",
    numeric: false,
    disablePadding: true,
    label: "Due",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
  },

  {
    id: "action",
    numeric: false,
    disablePadding: true,
    label: "Actions",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, numSelected, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      if (property == "action") {
        return;
      }
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={headCell.id == "action" ? false : orderBy === headCell.id}
              hideSortIcon={headCell.id == "action" ? true : false}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id && headCell.id !== "action" ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface TableTpProps {
  filterPress: () => void;
  setState: Dispatch<SetStateAction<boolean>>;
  details: any;
  getTabIndex: any;
}

export default function EnhancedTable(props: TableTpProps) {
  const dispatch: any = useDispatch();
  const location: any = useLocation();
  const { setState, filterPress, details, getTabIndex } = props;
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("createdAt");
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [dense, setDense] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [rowDetails, setRowDetails] = useState<any>({});

  let tabType =
    details?.isCustomerVendor == 1
      ? DOCUMENT_TYPE.INVOICE.toString()
      : DOCUMENT_TYPE.BILLS.toString();

  const [tabValue, setTabValue] = useState<string>(tabType);

  const {
    limit,
    page,
    search,
    sort_key,
    totalCount,
    totalPage,
    filterCount,
    customerTransactionDetail,
    customerTransactionType,
  } = useSelector((state: any) => state.salePurchaseSlice);

  const handleChangePerPage = (event: any, value: number) => {
    dispatch(updateSalePurchase({ limit: event.target.value, page: 1 }));
    dispatch(getCustomerTransactionDetail(details?._id, tabValue));
  };

  const { customerTransactionAmount } = useSelector(
    (state: any) => state.salePurchaseSlice
  );
  useEffect(() => {
    setTabValue(tabType);
  }, [details]);

  const handleChange = (event: any, value: number) => {
    dispatch(updateSalePurchase({ page: value }));
    dispatch(getCustomerTransactionDetail(details?._id, tabValue));
  };

  const handleDialogClose = () => {
    setOpen(false);
    setId("");
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    const propr = property;
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    dispatch(
      updateSalePurchase({
        sort_type: isAsc ? "+1" : "-1",
        sort_key: property,
      })
    );
    dispatch(getCustomerTransactionDetail(details._id, tabValue));
  };

  const handleDelete = (id: string) => {
    setId(id);
    setOpen(true);
  };

  const handleConfirmDeletion = () => {
    if (id) {
      dispatch(deleteCustomerSaleInvoice(id, details._id));
      setOpen(false);
      setId("");
    }
  };

  const handleRowClick = (id: string) => {
    setOpenDetail(true);
    var rowDetails = customerTransactionDetail.filter((v: any) => {
      return v._id == id;
    });
    setRowDetails(rowDetails[0]);
  };
  const { permissions } = useSelector((state: any) => state.commonSlice);
  const pathname = useLocation().pathname;

  useEffect(() => {
    const val = {
      fromDate: "",
      toDate: "",
      status: "",
      overDue: "",
    };
    dispatch(updateSalePurchase(val));
    dispatch(getCustomerTransactionDetail(details._id, tabValue));
    getTabIndex(tabValue);
  }, [tabValue, details?._id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <>
      <div
        className="stockContainer customerstock Dflex al-cnt fl-end"
        style={{ marginTop: "-20px" }}
      >
        <StockStatus
          stockImg={TOTAL_AMOUNT_PAID}
          text={details?.isCustomerVendor == 1 ? "Due Amount" : "Outstanding"}
          stvalue={convertIntegerToDecimal(details?.dueAmount)}
          classname="flex-wrap paid"
        />
      </div>
      <TabContext value={tabValue}>
        <div className="Dflex al-cnt sp-bt m-b-10">
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab
              label={details?.isCustomerVendor == 1 ? "Invoice" : "Bill"}
              value={
                details?.isCustomerVendor == 1
                  ? DOCUMENT_TYPE.INVOICE.toString()
                  : DOCUMENT_TYPE.BILLS.toString()
              }
              className="btn"
            />
            <Tab
              label={
                details?.isCustomerVendor == 1 ? "Credit note" : "Debit note"
              }
              value={
                details?.isCustomerVendor == 1
                  ? DOCUMENT_TYPE.CREDIT_NOTE.toString()
                  : DOCUMENT_TYPE.DEBIT_NOTE.toString()
              }
              className="btn"
            />
          </TabList>

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
              onPress={filterPress}
              className="filterNv"
            />
          </Badge>
        </div>
        <div className="stockContainer customerstock Dflex al-cnt">
          <StockStatus
            stockImg={TOTAL_AMOUNT_PAID}
            text="Total Amount Paid"
            stvalue={convertIntegerToDecimal(
              customerTransactionAmount?.totalPaidAmount
            )}
            classname="flex-wrap paid"
          />
          <StockStatus
            type="outOfStock"
            stockImg={TOTAL_AMOUNT_DUE}
            text={
              details?.isCustomerVendor == 2
                ? "Total Outstanding"
                : "Total Amount Due"
            }
            stvalue={convertIntegerToDecimal(
              customerTransactionAmount?.totalDueAmount
            )}
            classname="flex-wrap due"
          />
          <StockStatus
            type="outOfStock"
            stockImg={TOTAL_TRANSACTIONS}
            text="Total Transactions"
            stvalue={convertIntegerToDecimal(
              customerTransactionAmount?.totalAmount
            )}
            classname="flex-wrap transactions"
          />
        </div>

        <TabPanel value={tabValue}>
          {customerTransactionDetail && (
            <Box className="tableContainer">
              <TableContainer>
                <Table
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                >
                  <EnhancedTableHead
                    order={order}
                    orderBy={sort_key}
                    onRequestSort={handleRequestSort}
                    numSelected={0}
                    onSelectAllClick={function (
                      event: React.ChangeEvent<HTMLInputElement>
                    ): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                  <TableBody>
                    {customerTransactionDetail &&
                    customerTransactionDetail.length ? (
                      customerTransactionDetail.map(
                        (row: any, index: number) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row?._id}
                              className={"tableRow"}
                            >
                              <TableCell
                                className="pointer"
                                component="th"
                                scope="row"
                                padding="none"
                                onClick={() => handleRowClick(row?._id)}
                              >
                                {row.documentNumber || "N/A"}
                                <p>
                                  {getFormtedDate(row.createdAt, "DD-MM-YYYY")}
                                </p>
                              </TableCell>

                              <TableCell align="right">
                                {convertIntegerToDecimal(row.dueAmount)}
                                {","}
                                <p>
                                  Total :{" "}
                                  {convertIntegerToDecimal(row.totalPrice)}
                                </p>
                              </TableCell>

                              <TableCell align="right">
                                <span
                                  className={`${getEstimateStatusCss(
                                    row.status
                                  )} table-status-cell`}
                                >
                                  {row?.status
                                    ? getEstimateStatus(row.status)
                                    : "N/A"}
                                </span>
                              </TableCell>

                              <TableCell>
                                <div className={"iconsContainer"}>
                                  <MenuBar
                                    id={row._id}
                                    handleDelete={handleDelete}
                                    pageEdit={true}
                                    redirectLink={"/sales/invoice/edit"}
                                    data={SalesInvoiceLabel}
                                    isEdit={
                                      (permissions &&
                                      pathname.includes("payment")
                                        ? permissions &&
                                          permissions["payments"]?.edit
                                        : permissions &&
                                          permissions["sales"]?.edit) ||
                                      !permissions
                                        ? [
                                            statusEnum.PAYMENT_DUE,
                                            statusEnum.NOT_SENT,
                                          ].includes(row.status)
                                        : false
                                    }
                                    isDelete={
                                      (permissions &&
                                      pathname.includes("payment")
                                        ? permissions &&
                                          permissions["payments"]?.block
                                        : permissions &&
                                          permissions["sales"]?.block) ||
                                      !permissions
                                        ? true
                                        : false
                                    }
                                  />
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )
                    ) : (
                      <TableRow>
                        <TableCell className="no-record" colSpan={4}>
                          <div className="no_data_fnd">
                            <i>Oops!</i>
                            <p>There is nothing here yet!</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box className="pagination-cover">
                <Typography variant="subtitle2">
                  {" "}
                  Showing{" "}
                  {customerTransactionDetail &&
                  customerTransactionDetail.length > 0
                    ? page === 1
                      ? `1 - ${customerTransactionDetail.length}`
                      : `${limit * (page - 1) + 1}  - ${
                          limit * (page - 1) + customerTransactionDetail.length
                        } `
                    : "0 - 0"}{" "}
                  of {totalCount} items
                </Typography>
                <Pagination
                  count={totalPage || 0}
                  variant="outlined"
                  onChange={handleChange}
                />
              </Box>
            </Box>
          )}
        </TabPanel>
      </TabContext>

      <DeleteDialog
        dialogOpen={open}
        popimg={deleteIMG}
        dialogTitle={`Remove Invoice`}
        yesHandle={handleConfirmDeletion}
        handleDialogClose={handleDialogClose}
        dialogPara="Are you sure you want to delete?"
        nvCancel="Cancel"
        nvYes="Yes"
      />
    </>
  );
}
