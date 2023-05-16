import React, { Dispatch, SetStateAction, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import { alpha, styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import Pagination from "@mui/material/Pagination";
import { FilterList } from "@material-ui/icons";
import Badge from "@mui/material/Badge";

import IconLabelButtons from "../../buttons/buttonWithIcon";

import SelectPerPage from "../../select/paginationSelect";
import SearchInput from "../../inputs/searchInput";
import DeleteDialog from "../../dialog/index";
import {
  AvatarIMG,
  deleteIMG,
  getDocumentType,
  getEstimateStatus,
  SalesInvoiceLabel,
  CreditNoteLabel,
  CashMemoLabel,
  BillLabel,
  DebitNoteLabel,
  ReceiptLabel,
  statusEnum,
  getEstimateStatusCss,
  NODATA_7,
  LIST_EDIT_ICON,
} from "../../../constants";

import {
  addDefaultSrc,
  convertIntegerToDecimal,
  getOverDueDays,
} from "../../../utils";
import { updateSalePurchase } from "../../../screens/saleandPurchase/salePurchaseSlice";
import {
  getSaleDashboardList,
  deleteSalePurchase,
  getSalePurchaseDetail,
  getSalePurchaseList,
} from "../../../screens/saleandPurchase/action";
import EstimateDetailDrawer from "../../drawer";
import Details from "../common/details";
import DownloadDropDownMenu from "../../menu/downloadDropDownMenu";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import {
  generateDashboardPdf,
  generateDashboardExcel,
} from "../../../screens/saleandPurchase/action";
import useDebounce from "../../../hooks/use.debounce";

type Order = "asc" | "desc";
type Data = any;
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  rowId: number;
}

const headCells: HeadCell[] = [
  {
    id: "documentNumber",
    numeric: false,
    disablePadding: true,
    label: "Order Number",
    rowId: 2,
  },
  {
    id: "customerVendorName",
    numeric: false,
    disablePadding: true,
    label: "Customer",
    rowId: 3,
  },
  {
    id: "referenceNumber",
    numeric: false,
    disablePadding: true,
    label: "Ref ID",
    rowId: 4,
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: true,
    label: "Creation Date",
    rowId: 5,
  },
  {
    id: "dueDate",
    numeric: false,
    disablePadding: true,
    label: "Due Date",
    rowId: 6,
  },

  {
    id: "totalPrice",
    numeric: false,
    disablePadding: true,
    label: "Amount",
    rowId: 7,
  },

  {
    id: "overDueDays",
    numeric: false,
    disablePadding: true,
    label: "Overdue Days",
    rowId: 8,
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
    rowId: 9,
  },

  {
    id: "action",
    numeric: false,
    disablePadding: true,
    label: "Actions",
    rowId: 10,
  },
];

interface EnhancedTableProps {
  dashboardType?: string;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  showActionTab?: boolean;
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
  //  Remove the action head cell for dashboard page
  let showHeadCells: HeadCell[] = props.showActionTab
    ? headCells.filter((iten) => iten.label !== "Actions")
    : headCells;

  return (
    <TableHead>
      <TableRow>
        {showHeadCells.map((headCell: HeadCell) => (
          <TableCell
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            key={headCell.rowId}
          >
            <TableSortLabel
              active={headCell.id == "action" ? false : orderBy === headCell.id}
              hideSortIcon={headCell.id == "action" ? true : false}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {props?.dashboardType === "purchase"
                ? headCell.label === "Customer"
                  ? "Vendor"
                  : headCell.label
                : headCell.label}
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
  filterPress?: () => void;
  setState?: Dispatch<SetStateAction<boolean>>;
  dashboardType?: any;
  dashboardHide?: boolean;
}
var serialNumber = 0;
export default function EnhancedTable(props: TableTpProps) {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { setState, filterPress, dashboardType } = props;
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("createdAt");
  const [rowDetails, setRowDetails] = useState<any>({});
  const [documentType, setDocumentType] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [dense, setDense] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [label, setLabel] = useState<any>({});
  const params: any = useParams();
  const location = useLocation();

  const showHeader = location.pathname === "/dashboard";

  var {
    limit,
    type,
    page,
    dashboardList,
    search,
    sort_key,
    totalCount,
    totalPage,
    filterCount,
  } = useSelector((state: any) => state.salePurchaseSlice);
  const debouncedSearch = useDebounce(search, 500);

  React.useEffect(() => {
    dispatch(updateSalePurchase());
    if (search) dispatch(getSaleDashboardList());
  }, [debouncedSearch]);

  const handleChangePerPage = (event: any, value: number) => {
    dispatch(updateSalePurchase({ limit: event.target.value, page: 1 }));
    dispatch(getSaleDashboardList());
  };

  const handleChange = (event: any, value: number) => {
    if (props?.dashboardHide) {
      let limit = 5;

      dispatch(updateSalePurchase({ page: value }));
      dispatch(getSaleDashboardList(limit));
    } else {
      dispatch(updateSalePurchase({ page: value }));
      dispatch(getSaleDashboardList());
    }

    serialNumber = value > 1 ? (value - 1) * limit : 0;
    dispatch(updateSalePurchase({ sequence: serialNumber }));
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

    if (props?.dashboardHide) {
      let limit = 5;
      dispatch(getSaleDashboardList(limit));
    } else {
      dispatch(getSaleDashboardList());
    }
    // dispatch(getSaleDashboardList());
  };

  const handleSearch = (event: any, value: string) => {
    dispatch(updateSalePurchase({ search: event.target.value }));
    if (!event.target.value) {
      dispatch(getSaleDashboardList());
    }
  };

  const handleSearchClear = () => {
    dispatch(updateSalePurchase({ search: "" }));
    dispatch(getSaleDashboardList());
  };

  const handleDelete = (id: string) => {
    setId(id);
    setOpen(true);
  };

  const handleConfirmDeletion = () => {
    if (id) {
      dispatch(deleteSalePurchase(id, true));
      setOpen(false);
      setId("");
    }
  };

  const handleRowClick = (id: string) => {
    setOpenDetail(true);
    var rowDetails = dashboardList.filter((v: any) => {
      return v._id == id;
    });
    setRowDetails(rowDetails[0]);
    setLabel(getLabelByDocumentType(rowDetails[0]?.documentType));
  };

  const getLabelByDocumentType = (docType: number) => {
    switch (docType) {
      case 3:
        return SalesInvoiceLabel;
      case 5:
        return CreditNoteLabel;
      case 9:
        return BillLabel;
      case 10:
        return DebitNoteLabel;
      case 11:
        return ReceiptLabel;
      default:
        return CashMemoLabel;
    }
  };

  const getEditStatusByDocumentType = (docType: number) => {
    switch (docType) {
      case 3:
      case 5:
      case 9:
        return [statusEnum.PAYMENT_DUE, statusEnum.NOT_SENT];
      case 10:
        return [statusEnum.PAYMENT_DUE, statusEnum.NOT_SENT, statusEnum.PAID];
      default:
        return [statusEnum.NOT_SENT];
    }
  };
  const { permissions } = useSelector((state: any) => state.commonSlice);

  return (
    <>
      <Box sx={{ width: "100%", mb: 0 }} className="tableContainer">
        {showHeader ? null : (
          <div className="table-filter-head">
            <Box id="tableTitle" className="paginationDropdown">
              <span className="p-r-10">Shows</span>{" "}
              <SelectPerPage handleChange={handleChangePerPage} page={limit} />
            </Box>
            <Box className="search_bar">
              <SearchInput
                value={search}
                placeholder="Search here..."
                handleSearch={handleSearch}
                clearSearch={handleSearchClear}
              />

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

              <DownloadDropDownMenu
                generateExcel={generateDashboardExcel}
                generatePdf={generateDashboardPdf}
                documentType={type}
              />
            </Box>
          </div>
        )}
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              dashboardType={dashboardType}
              order={order}
              orderBy={sort_key}
              onRequestSort={handleRequestSort}
              numSelected={0}
              showActionTab={showHeader ? true : false}
              onSelectAllClick={function (
                event: React.ChangeEvent<HTMLInputElement>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
            <TableBody>
              {dashboardList && dashboardList.length ? (
                dashboardList.map((row: any, index: number) => {
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
                        {row?.documentNumber || "N/A"}
                      </TableCell>

                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        key={row?._id}
                      >
                        <div className="Dflex al-cnt">
                          <figure className="pp_img">
                            <img
                              onError={(e) => addDefaultSrc(e, AvatarIMG)}
                              src={
                                row?.customerVendorDetails?.image || AvatarIMG
                              }
                              alt="profile-pic"
                              width="100"
                              height="100"
                            />
                          </figure>
                          <div>
                            <p className="color-purple">
                              {" "}
                              {row?.customerVendorDetails?.displayName || "N/A"}
                            </p>
                            <p className="color-label m-t-5">
                              {row?.customerVendorDetails?.primaryContactName ||
                                "N/A"}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell align="right">
                        {row?.referenceNumber || "N/A"}
                      </TableCell>

                      <TableCell align="right">
                        {row.createdAt
                          ? moment(row.createdAt).format("DD-MM-YYYY")
                          : "N/A"}
                      </TableCell>

                      <TableCell align="right">
                        {row.dueDate
                          ? moment(row.dueDate).format("DD-MM-YYYY")
                          : "N/A"}
                      </TableCell>

                      <TableCell align="right">
                        {convertIntegerToDecimal(row?.totalPrice)}
                        {/* {row?.totalPrice ? `₹${row?.totalPrice}` : "N/A"} */}
                      </TableCell>
                      <TableCell align="right">{getOverDueDays(row)}</TableCell>
                      <TableCell align="right">
                        <span
                          className={`${getEstimateStatusCss(
                            row.status
                          )} table-status-cell`}
                        >
                          {row?.status ? getEstimateStatus(row.status) : "N/A"}
                        </span>
                      </TableCell>
                      {showHeader ? null : (
                        <TableCell>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(
                                `/${dashboardType}/${getDocumentType(
                                  row?.documentType
                                )}/edit/${row._id}`,
                                getLabelByDocumentType(row?.documentType)
                              );
                            }}
                            className={
                              !((permissions && dashboardType === "purchase"
                                ? permissions && permissions["purchases"]?.edit
                                : permissions && permissions["sales"]?.edit) ||
                              !permissions
                                ? getEditStatusByDocumentType(
                                    row?.documentType
                                  ).includes(row.status)
                                : false)
                                ? "disabled"
                                : ""
                            }
                          >
                            <img src={LIST_EDIT_ICON} />
                          </a>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell className="no-record" colSpan={9}>
                    <div className="no_data_fnd">
                      <img src={NODATA_7} className="pointer" />
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
          {props?.dashboardHide ? (
            <Typography variant="subtitle2"></Typography>
          ) : (
            <Typography variant="subtitle2">
              Showing{" "}
              {dashboardList && dashboardList.length > 0
                ? page === 1
                  ? `1 - ${dashboardList.length}`
                  : `${limit * (page - 1) + 1}  - ${
                      limit * (page - 1) + dashboardList.length
                    } `
                : "0 - 0"}{" "}
              of {totalCount} items
            </Typography>
          )}
          <Pagination
            count={totalPage || 0}
            variant="outlined"
            onChange={handleChange}
          />
        </Box>
      </Box>

      <EstimateDetailDrawer state={openDetail} setState={setOpenDetail}>
        <Details
          detail={rowDetails}
          setOpenDetail={setOpenDetail}
          setState={setState}
          labels={label}
        />
      </EstimateDetailDrawer>

      <DeleteDialog
        dialogOpen={open}
        popimg={deleteIMG}
        dialogTitle="Remove Item"
        yesHandle={handleConfirmDeletion}
        handleDialogClose={handleDialogClose}
        dialogPara="Are you sure you want to delete?"
        nvCancel="Cancel"
        nvYes="Yes"
      />
    </>
  );
}
