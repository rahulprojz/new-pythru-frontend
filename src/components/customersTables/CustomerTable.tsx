import React, { useEffect, useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import { Box, Badge, Button, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Link, useNavigate } from "react-router-dom";
import { visuallyHidden } from "@mui/utils";
import SelectPerPage from "../select/paginationSelect";
import Pagination from "@mui/material/Pagination";
import { Navigate } from "react-router-dom";
import { FilterList, MoreHoriz } from "@material-ui/icons";
import { deepPurple } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import {
  getCustomerListing,
  deleteCustomerData,
  statesList,
  getAmountRange,
  generateExcel,
  generatePdf,
} from "../../screens/payments/customers/action";
import CustomerDetails from "./CustomerDetails";
import {
  getStatus,
  getStatusNumber,
  getStatusMessage,
} from "../../constants/constant";
import { getFormtedDate } from "../../utils";

import {
  resetCustomer,
  updateCustomer,
} from "../../screens/payments/customerListSlice";
import { useSelector } from "react-redux";
import SearchInput from "../inputs/searchInput";
import IconLabelButtons from "../buttons/buttonWithIcon";
import DeleteDialog from "../dialog/index";
import ChangeStatus from "../dialog/ChangeStatus";
import MenuBar from "../menu/index";
import { deleteIMG, profileIcon, blockIMG, NODATA_1 } from "../../constants";
import {
  addDefaultSrc,
  convertIntegerToDecimal,
  getListFormtedDate,
} from "../../utils/Common.Function";
import DownloadDropDownMenu from "../menu/downloadDropDownMenu";
import useDebounce from "../../hooks/use.debounce";

interface Data {
  userId: string;
  displayName: string;
  phoneNumber: string;
  email: string;
  isCustomerVendor: number;
  status: number;
  queryFor: string;
  SearchFor: string;
  action: any;
}

function createData(
  userId: string,
  displayName: string,
  phoneNumber: string,
  email: string,
  isCustomerVendor: number,
  status: number,
  queryFor: string,
  SearchFor: string,
  action: any
): Data {
  return {
    userId,
    displayName,
    phoneNumber,
    email,
    isCustomerVendor,
    status,
    queryFor,
    SearchFor,
    action,
  };
}
var rows = [];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
  sorting: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "displayName",
    numeric: false,
    disablePadding: true,
    label: "Name",
    sorting: true,
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
    sorting: true,
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: true,
    label: "Registered On",
    sorting: true,
  },
  {
    id: "",
    numeric: false,
    disablePadding: true,
    label: "Due Amount",
    sorting: false,
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "Status",
    sorting: false,
  },
  {
    id: "action",
    numeric: false,
    disablePadding: true,
    label: "Actions",
    sorting: false,
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
  rowCount: number;
  type: any;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, numSelected, rowCount, onRequestSort, type } = props;
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
              {type == 2 && headCell.label == "Due Amount"
                ? "Outstanding"
                : headCell.label}
              {orderBy === headCell.id ? (
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

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
          className="tableHeading"
        >
          Recent Invoices
        </Typography>
      )}
      {/* <Divider /> */}
    </Toolbar>
  );
};

interface TableTpProps {
  filterPress?: any;
  type?: number;
  handleAddItem?: () => void;
}
export default function CustomerTable(props: TableTpProps) {
  const { filterPress, type, handleAddItem } = props;

  const Navigate = useNavigate();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof any>("displayName");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch: any = useDispatch();
  const [statusOpen, setStatusOpen] = React.useState(false);

  const [custDetailState, setcustDetailState] = React.useState(false);
  const [getCustDetail, setcustDetail] = React.useState([]);

  const pathname = window.location.pathname;

  const vendorType = `${pathname}/edit`;

  const [getCustomerStatus, setCustomerStatus] = React.useState({
    id: "",
    status: "",
  });

  const { limit, page, search, sort_key, totalCount, totalPages } = useSelector(
    (state: any) => state.customerListSlice
  );

  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    if (search) dispatch(getCustomerListing());
  }, [debouncedSearch]);

  useEffect(() => {
    dispatch(resetCustomer({}));
  }, [pathname]);

  useEffect(() => {
    dispatch(updateCustomer({ type: type }));
    dispatch(getCustomerListing());
    dispatch(statesList());
    dispatch(getAmountRange());
  }, [type, pathname]);

  const handleChangePerPage = (event: any, value: number) => {
    dispatch(updateCustomer({ limit: event.target.value, page: 1 }));
    dispatch(getCustomerListing());
  };

  const handleChange = (event: any, value: number) => {
    dispatch(updateCustomer({ page: value }));
    dispatch(getCustomerListing());
  };

  const handleDialogClose = () => {
    setOpen(false);
    setStatusOpen(false);
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
      updateCustomer({
        sort_type: isAsc ? "+1" : "-1",
        sort_key: property,
      })
    );
    dispatch(getCustomerListing());
  };

  const handleSearch = (event: any, value: string) => {
    dispatch(updateCustomer({ search: event.target.value }));
    if (!event.target.value) {
      dispatch(getCustomerListing());
    }
  };

  const handleSearchClear = () => {
    dispatch(updateCustomer({ search: "" }));
    dispatch(getCustomerListing());
  };

  const handleDelete = (id: string) => {
    setId(id);
    setOpen(true);
  };

  const handleConfirmDeletion = () => {
    if (id) {
      dispatch(deleteCustomerData(id));
      setOpen(false);
      setId("");
    }
  };

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {};

  const isSelected = (Pname: any) => selected.indexOf(Pname) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const { customersList, filterCount } = useSelector(
    (state: any) => state.customerListSlice
  );
  const { permissions } = useSelector((state: any) => state.commonSlice);
  return (
    <>
      <Box className="tableContainer">
        <div className="table-filter-head">
          <Box id="tableTitle" className="paginationDropdown">
            <span className="p-r-10">Show</span>
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
              //badgeContent={4}
              color="primary"
            >
              <IconLabelButtons
                ButtonIcon={<FilterList />}
                onPress={filterPress}
                className="filterNv"
              />
            </Badge>

            <DownloadDropDownMenu
              generateExcel={generateExcel}
              generatePdf={generatePdf}
              documentType={type}
            />
          </Box>
        </div>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              // numSelected={selected.length}
              order={order}
              orderBy={sort_key}
              //onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              numSelected={0}
              onSelectAllClick={function (
                event: React.ChangeEvent<HTMLInputElement>
              ): void {
                throw new Error("Function not implemented.");
              }}
              type={type}
            />
            <TableBody>
              {customersList.length > 0 ? (
                customersList.map((row: any, index: number) => {
                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row?._id}
                      // selected={isItemSelected}
                    >
                      <TableCell
                        onClick={() => {
                          setcustDetail(
                            customersList.filter(
                              (data: any) => data._id == row._id
                            )[0]
                          );
                          setcustDetailState(true);
                        }}
                        component="th"
                        scope="row"
                        padding="none"
                      >
                        <div className="Dflex al-cnt">
                          <figure className="pp_img">
                            <img
                              src={row.image ? row.image : profileIcon}
                              alt="profile-pic"
                              width="50"
                              height="50"
                            />
                          </figure>

                          <div>
                            <p
                              className="color-purple td_para"
                              title={
                                row?.displayName?.length > 20
                                  ? `${row?.displayName}`
                                  : ""
                              }
                            >
                              {row?.displayName || "N/A"}
                            </p>
                            <p
                              className="color-label m-t-5 td_para"
                              title={
                                row?.primaryContactName?.length > 20
                                  ? `${row?.primaryContactName}`
                                  : ""
                              }
                            >
                              {row?.primaryContactName || "N/A"}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell align="right">
                        <p className="td_para">{row.email}</p>
                      </TableCell>
                      <TableCell align="right">
                        {getFormtedDate(row.createdAt, "DD-MM-YYYY")}
                      </TableCell>
                      <TableCell align="right">
                        {convertIntegerToDecimal(row.dueAmount)}
                      </TableCell>
                      <TableCell align="right">
                        <span
                          className={`table-status-cell ${getStatus(
                            row.status
                          ).toLowerCase()}`}
                        >
                          {getStatus(row.status)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {
                          <div className={"iconsContainer"}>
                            <MenuBar
                              id={row._id}
                              handleDelete={handleDelete}
                              pageEdit={true}
                              redirectLink={vendorType}
                              handleStatus={() => {
                                setStatusOpen(true);
                                setCustomerStatus({
                                  id: row._id,
                                  status: getStatusNumber(row.status),
                                });
                              }}
                              status={row.status}
                              type="productservice"
                              changeStatus={true}
                              isDelete={false}
                              isEdit={
                                (permissions &&
                                  permissions[
                                    pathname.includes("payment")
                                      ? "payments"
                                      : pathname.includes("sales")
                                      ? "sales"
                                      : "purchases"
                                  ].block) ||
                                !permissions
                                  ? true
                                  : false
                              }
                            />
                          </div>
                        }
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell className="no-record" colSpan={6}>
                    <div className="no_data_fnd">
                      <img
                        src={NODATA_1}
                        className="pointer"
                        onClick={handleAddItem}
                      />
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
            {customersList && customersList.length > 0
              ? page === 1
                ? `1 - ${customersList.length}`
                : `${limit * (page - 1) + 1}  - ${
                    limit * (page - 1) + customersList.length
                  } `
              : "0 - 0"}{" "}
            of {totalCount} items
          </Typography>
          <Pagination
            count={totalPages || 0}
            variant="outlined"
            onChange={handleChange}
          />
        </Box>
      </Box>
      <DeleteDialog
        dialogOpen={open}
        popimg={deleteIMG}
        dialogTitle="Remove Customer"
        yesHandle={handleConfirmDeletion}
        handleDialogClose={handleDialogClose}
        dialogPara="Are you sure you want to Remove this Customer?"
        nvCancel="Cancel"
        nvYes="Yes"
      />
      <CustomerDetails
        initialState={custDetailState}
        custDetailState={setcustDetailState}
        details={getCustDetail}
        filterPress={filterPress}
      />
      <ChangeStatus
        dialogOpen={statusOpen}
        popimg={deleteIMG}
        dialogTitle={
          getCustomerStatus.status == "1"
            ? "Active Customer"
            : "Inactive Customer"
        }
        id={getCustomerStatus.id}
        status={getCustomerStatus.status}
        type={"customer"}
        handleDialogClose={(e: any, status: any) => {
          setStatusOpen(false);
        }}
        dialogPara={getStatusMessage(getCustomerStatus.status, "Customer")}
        nvCancel="Cancel"
        nvYes="Yes"
      />
    </>
  );
}
