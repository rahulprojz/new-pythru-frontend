import React, { useEffect } from "react";
import { alpha } from "@mui/material/styles";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { visuallyHidden } from "@mui/utils";
import "../../../components/tables/table.scss";
import SelectPerPage from "../../../components/select/paginationSelect";
import Pagination from "@mui/material/Pagination";
import { useDispatch } from "react-redux";
import useDebounce from "../../../hooks/use.debounce";

import { NODATA_6 } from "../../../constants";
import { convertIntegerToDecimal } from "../../../utils";
import DownloadDropDownMenu from "../../../components/menu/downloadDropDownMenu";
import { generateExcel, generatePdf, getAgedData } from "./action";

import { updateAged } from "./agedSlice";
import { useSelector } from "react-redux";
import SearchInput from "../../../components/inputs/searchInput";

import { profileIcon } from "../../../constants";

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const { documentType } = useSelector((state: any) => state.agedReciableSlice);
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      if (property == "action") {
        return;
      }
      onRequestSort(event, property);
    };
  const headCells: readonly HeadCell[] = [
    {
      id: documentType === 9 ? "Vendorname" : "CustomerName",
      numeric: false,
      disablePadding: true,
      label: documentType === 9 ? "Vendor Name" : "Customer Name",
      sorting: false,
    },
    {
      id: "email",
      numeric: false,
      disablePadding: true,
      label: "0-30 Days",
      sorting: false,
    },
    {
      id: "createdAt",
      numeric: false,
      disablePadding: true,
      label: "31-60 Days",
      sorting: false,
    },
    {
      id: "",
      numeric: false,
      disablePadding: true,
      label: "61-90 Days",
      sorting: false,
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: "90+ Days",
      sorting: false,
    },
    {
      id: "action",
      numeric: false,
      disablePadding: true,
      label: "Total Outstanding",
      sorting: false,
    },
  ];
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
            {headCell?.sorting ? (
              <TableSortLabel
                active={
                  headCell.id == "action" ? false : orderBy === headCell.id
                }
                hideSortIcon={headCell.id == "action" ? true : false}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
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
}
export default function CustomerTable(props: TableTpProps) {
  const { filterPress, type } = props;
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
  const vendorType = pathname == "/vendor" ? "/vendor/edit" : "/customers/edit";

  const [getCustomerStatus, setCustomerStatus] = React.useState({
    id: "",
    status: "",
  });

  const {
    limit,
    page,
    search,
    sort_key,
    totalCount,
    totalPages,
    documentType,
    tableList,
  } = useSelector((state: any) => state.agedReciableSlice);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    document.title = "Aged Reveivables | PyThru";
  }, []);

  const handleChangePerPage = (event: any, value: number) => {
    dispatch(updateAged({ limit: event.target.value, page: 1 }));
    dispatch(getAgedData());
  };

  const handleChange = (event: any, value: number) => {
    dispatch(updateAged({ page: value }));
    dispatch(getAgedData());
  };

  const handleDialogClose = () => {
    setOpen(false);
    setStatusOpen(false);
    setId("");
  };
  React.useEffect(() => {
    if (search) dispatch(getAgedData());
  }, [debouncedSearch]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    const propr = property;
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    // dispatch(
    //   updateCustomer({
    //     sort_type: isAsc ? "+1" : "-1",
    //     sort_key: property,
    //   })
    // );
    // dispatch(getCustomerListing());
  };

  const handleSearch = (event: any, value: string) => {
    dispatch(updateAged({ search: event.target.value }));
    if (!event.target.value) dispatch(getAgedData());
  };

  const handleSearchClear = () => {
    dispatch(updateAged({ search: "" }));
    dispatch(getAgedData());
  };

  const handleDelete = (id: string) => {
    setId(id);
    setOpen(true);
  };

  const handleConfirmDeletion = () => {
    if (id) {
      //   dispatch(deleteCustomerData(id));
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

  const { permissions } = useSelector((state: any) => state.commonSlice);
  return (
    <>
      <Box className="tableContainer m-t-30">
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
              className="w-100"
            />
            <DownloadDropDownMenu
              generateExcel={generateExcel}
              generatePdf={generatePdf}
              documentType={documentType}
            />
          </Box>
        </div>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
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
              //order={"desc"}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {tableList.length > 0 ? (
                tableList.map((row: any, index: number) => {
                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row?._id}
                    >
                      <TableCell component="th" scope="row" padding="none">
                        <div className="Dflex al-cnt">
                          <figure className="pp_img">
                            <img
                              src={
                                row?.customerVendorDetails?.image
                                  ? row?.customerVendorDetails?.image
                                  : profileIcon
                              }
                              alt="profile-pic"
                              width="50"
                              height="50"
                            />
                          </figure>
                          {row?.customerVendorDetails?.displayName}
                          <br />
                          {row?.customerVendorDetails?.primaryContactName}
                        </div>
                      </TableCell>

                      <TableCell align="right">
                        <p className="td_para">
                          {convertIntegerToDecimal(row.amount0)}
                        </p>
                      </TableCell>
                      <TableCell align="right">
                        {convertIntegerToDecimal(row.amount31)}
                      </TableCell>
                      <TableCell align="right">
                        {convertIntegerToDecimal(row?.amount61)}
                      </TableCell>
                      <TableCell align="right">
                        {convertIntegerToDecimal(row.amount91)}
                      </TableCell>
                      <TableCell align="right">
                        {convertIntegerToDecimal(row.totalDueAmount)}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell className="no-record" colSpan={6}>
                    <div className="no_data_fnd">
                      <img src={NODATA_6} className="pointer" />
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
            {tableList && tableList.length > 0
              ? page === 1
                ? `1 - ${tableList.length}`
                : `${limit * (page - 1) + 1}  - ${
                    limit * (page - 1) + tableList.length
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
    </>
  );
}
