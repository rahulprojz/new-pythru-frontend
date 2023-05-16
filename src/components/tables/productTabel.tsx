import * as React from "react";
import moment from "moment";
import { alpha, styled } from "@mui/material/styles";
import useDebounce from "../../hooks/use.debounce";
import { Box, Button, TextField } from "@mui/material";
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
import { useLocation, useNavigate } from "react-router-dom";
import { visuallyHidden } from "@mui/utils";
import SelectPerPage from "../select/paginationSelect";
import Pagination from "@mui/material/Pagination";
import { FilterList } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import {
  getProductAndServicesListing,
  deleteProductAndService,
  getProductServicedetail,
} from "../../screens/productandServices/action";
import { updateProductAndServices } from "../../screens/productandServices/productServiceSlice";
import { useSelector } from "react-redux";
import SearchInput from "../inputs/searchInput";
import IconLabelButtons from "../buttons/buttonWithIcon";
import DeleteDialog from "./../dialog/index";
import ChangeStatus from "./../dialog/ChangeStatus";
import MenuBar from "./../menu/index";
import {
  NODATA_2,
  deleteIMG,
  getStatusMessage,
  getStatusNumber,
  profileIcon,
} from "../../constants";
import Detail from "./productServiceDetail";
import {
  addDefaultSrc,
  convertIntegerToDecimal,
} from "../../utils/Common.Function";
import Badge from "@mui/material/Badge";

interface Data {
  Pname: any;
  SaleDes: string;
  CreatDT: any;
  Category: string;
  SKU: number;
  Tax: number;
  stockhand: number;
  Pprice: number;
  saleP: number;
  action: any;
}

function createData(
  Pname: any,
  SaleDes: string,
  CreatDT: any,
  Category: string,
  SKU: number,
  Tax: number,
  stockhand: number,
  Pprice: number,
  saleP: number,
  action: any
): Data {
  return {
    Pname,
    SaleDes,
    CreatDT,
    Category,
    SKU,
    Tax,
    stockhand,
    Pprice,
    saleP,
    action,
  };
}
const rows = [
  createData(
    "LCD TV",
    "Lorem Ipsum has been the in Lorem Ipsum has been the in Lorem Ipsum has been the in",
    "23 Nov 2020",
    "Product",
    1,
    9,
    6,
    8295,
    8295,
    ""
  ),
  createData(
    "LCD TV",
    "Lorem Ipsum has been the in Lorem Ipsum has been the in Lorem Ipsum has been the in",
    "23 Nov 2020",
    "Product",
    1,
    9,
    6,
    8295,
    8295,
    ""
  ),
  createData(
    "LCD TV",
    "Lorem Ipsum has been the in Lorem Ipsum has been the in Lorem Ipsum has been the in",
    "23 Nov 2020",
    "Product",
    1,
    9,
    6,
    8295,
    8295,
    ""
  ),
  createData(
    "LCD TV",
    "Lorem Ipsum has been the in Lorem Ipsum has been the in Lorem Ipsum has been the in",
    "23 Nov 2020",
    "Product",
    1,
    9,
    6,
    8295,
    8295,
    ""
  ),
  createData(
    "LCD TV",
    "Lorem Ipsum has been the in Lorem Ipsum has been the in Lorem Ipsum has been the in",
    "23 Nov 2020",
    "Product",
    1,
    9,
    6,
    8295,
    8295,
    ""
  ),
  createData(
    "LCD TV",
    "Lorem Ipsum has been the in Lorem Ipsum has been the in Lorem Ipsum has been the in",
    "23 Nov 2020",
    "Product",
    1,
    9,
    6,
    8295,
    8295,
    ""
  ),
  createData(
    "LCD TV",
    "Lorem Ipsum has been the in Lorem Ipsum has been the in Lorem Ipsum has been the in",
    "23 Nov 2020",
    "Product",
    1,
    9,
    6,
    8295,
    8295,
    ""
  ),
  createData(
    "LCD TV",
    "Lorem Ipsum has been the in Lorem Ipsum has been the in Lorem Ipsum has been the in",
    "23 Nov 2020",
    "Product",
    1,
    9,
    6,
    8295,
    8295,
    ""
  ),
  createData(
    "LCD TV",
    "Lorem Ipsum has been the in Lorem Ipsum has been the in Lorem Ipsum has been the in",
    "23 Nov 2020",
    "Product",
    1,
    9,
    6,
    8295,
    8295,
    ""
  ),
  createData(
    "LCD TV",
    "Lorem Ipsum has been the in Lorem Ipsum has been the in Lorem Ipsum has been the in",
    "23 Nov 2020",
    "Product",
    1,
    9,
    6,
    8295,
    8295,
    ""
  ),
];

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
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Product Name",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: true,
    label: "Description",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: true,
    label: "Created Date",
  },
  {
    id: "productCategoryId",
    numeric: false,
    disablePadding: true,
    label: "Category",
  },
  {
    id: "skuNumber",
    numeric: false,
    disablePadding: true,
    label: "SKU",
  },
  {
    id: "gstRate",
    numeric: false,
    disablePadding: true,
    label: "Tax",
  },
  {
    id: "stockOnHand",
    numeric: false,
    disablePadding: true,
    label: "Stock on Hand",
  },
  {
    id: "purchasePrice",
    numeric: false,
    disablePadding: true,
    label: "Purchase Price",
  },
  {
    id: "salePrice",
    numeric: false,
    disablePadding: true,
    label: "Sale Price",
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
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead className="hideActionSort">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
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
  handleEdit?: any;
  setState?: any;
  count: any;
}
export default function EnhancedTable(props: TableTpProps) {
  const { filterPress, setState, count } = props;
  const Navigate = useNavigate();
  const location: any = useLocation();

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof any>("createdAt");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const [statusOpen, setStatusOpen] = React.useState(false);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [productDetailsState, setproductDetailsState] = React.useState(false);
  const dispatch: any = useDispatch();
  const [getProductStatus, setProductStatus] = React.useState({
    id: "",
    status: "",
  });
  const { limit, page, search, sort_key, totalCount, totalPages } = useSelector(
    (state: any) => state.productServicesSlice
  );

  React.useEffect(() => {
    if (location.state?.id) {
      dispatch(
        getProductServicedetail(location.state?.id, setproductDetailsState)
      );
    }
  }, [location.state?.id]);

  const debouncedSearch = useDebounce(search, 500);

  const handleChangePerPage = (event: any, value: number) => {
    dispatch(updateProductAndServices({ limit: event.target.value, page: 1 }));
    dispatch(getProductAndServicesListing());
  };

  const handleChange = (event: any, value: number) => {
    dispatch(updateProductAndServices({ page: value }));
    dispatch(getProductAndServicesListing());
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
      updateProductAndServices({
        sort_type: isAsc ? "+1" : "-1",
        sort_key: property,
      })
    );
    dispatch(getProductAndServicesListing());
  };

  React.useEffect(() => {
    if (search) dispatch(getProductAndServicesListing());
  }, [debouncedSearch]);

  React.useEffect(() => {
    if (location?.state?.open) {
      setState(true);
    }
  }, [location]);

  const handleSearch = (event: any, value: string) => {
    dispatch(updateProductAndServices({ search: event.target.value }));
    // dispatch(getProductAndServicesListing());
    if (!event.target.value) dispatch(getProductAndServicesListing());
  };

  const handleSearchClear = () => {
    dispatch(updateProductAndServices({ search: "" }));
    dispatch(getProductAndServicesListing());
  };

  const handleDelete = (id: string) => {
    setId(id);
    setOpen(true);
  };

  const handleConfirmDeletion = () => {
    if (id) {
      dispatch(deleteProductAndService(id));
      setOpen(false);
      setId("");
    }
  };

  const handleRowClick = (id: string) => {
    dispatch(getProductServicedetail(id, setproductDetailsState));
  };

  const handleAddProduct = () => {
    setState(true);
    dispatch(
      updateProductAndServices({
        editProductData: "",
        imageUrl: "",
      })
    );
  };

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {};

  const isSelected = (Pname: any) => selected.indexOf(Pname) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const { productServiceList, productServiceDetail } = useSelector(
    (state: any) => state.productServicesSlice
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
              badgeContent={count}
              color="primary"
            >
              <IconLabelButtons
                ButtonIcon={<FilterList />}
                onPress={filterPress}
                className="filterNv"
              />
            </Badge>
          </Box>
        </div>
        <TableContainer>
          <Table
            sx={{ minWidth: 1440 }}
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
              {productServiceList && productServiceList.length ? (
                productServiceList.map((row: any, index: number) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row?._id}
                      className={"tableRow"}
                    >
                      <TableCell component="th" scope="row" padding="none">
                        <div
                          className="Dflex al-cnt pointer"
                          onClick={() => handleRowClick(row?._id)}
                        >
                          <figure className="pp_img">
                            <img
                              onError={(e) => addDefaultSrc(e, profileIcon)}
                              src={row?.image || profileIcon}
                              alt="profile-pic"
                              width="100"
                              height="100"
                            />
                          </figure>
                          <p
                            className="td_para"
                            title={row?.name?.length > 20 ? `${row?.name}` : ""}
                          >
                            {row?.name || ""}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <p
                          className="td_para"
                          title={
                            row?.description?.length > 20
                              ? `${row?.description}`
                              : ""
                          }
                        >
                          {row?.description || "N/A"}
                        </p>
                      </TableCell>
                      <TableCell align="right">
                        {row?.createdAt
                          ? moment(row.createdAt).format("DD-MM-YYYY")
                          : "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        {row?.productCategoryId || "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        {row?.skuNumber || "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        <span className="nowrap">
                          {row?.gst ? `GST (${row.gst}%)` : "N/A"}
                        </span>{" "}
                        <br />
                        <span className="nowrap">
                          {row?.cess ? `CESS (${row.cess}%)` : ""}
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        {row?.trackInventory ? row?.stockLeft || "N/A" : "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        {convertIntegerToDecimal(row?.purchasePrice)}
                        {/* {row?.purchasePrice ? `₹${row?.purchasePrice}` : "N/A"} */}
                      </TableCell>
                      <TableCell align="right">
                        {convertIntegerToDecimal(row?.salePrice)}
                        {/* {row?.salePrice ? `₹${row?.salePrice}` : "N/A"} */}
                      </TableCell>
                      <TableCell align="right">
                        <Box
                          className={`table-status-cell ${
                            row?.status === 1
                              ? "active"
                              : row?.status === 2
                              ? "inactive"
                              : ""
                          }`}
                        >
                          {row?.status === 1
                            ? "Active"
                            : row?.status === 2
                            ? "Inactive"
                            : "N/A"}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {
                          <div className={"iconsContainer"}>
                            <MenuBar
                              isEdit={
                                (permissions &&
                                  permissions["productAndServices"].edit) ||
                                !permissions
                                  ? true
                                  : false
                              }
                              id={row._id}
                              handleDelete={handleDelete}
                              handleEdit={() => {
                                props.handleEdit(row);
                              }}
                              pageEdit={false}
                              handleStatus={() => {
                                setStatusOpen(true);
                                setProductStatus({
                                  id: row._id,
                                  status: getStatusNumber(row.status),
                                });
                              }}
                              isDelete={false}
                              changeStatus={
                                (permissions &&
                                  permissions["productAndServices"].block) ||
                                !permissions
                                  ? true
                                  : false
                              }
                              status={row.status}
                              type="productservice"
                            />
                          </div>
                        }
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell className="no-record" colSpan={11}>
                    <div className="no_data_fnd">
                      <img
                        src={NODATA_2}
                        className="pointer"
                        onClick={handleAddProduct}
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
            {productServiceList && productServiceList.length > 0
              ? page === 1
                ? `1 - ${productServiceList.length}`
                : `${limit * (page - 1) + 1}  - ${
                    limit * (page - 1) + productServiceList.length
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

      <Detail
        productServiceDetail={productServiceDetail}
        productDetailsState={productDetailsState}
        setproductDetailsState={setproductDetailsState}
        setState={setState}
      />
      <DeleteDialog
        dialogOpen={open}
        popimg={deleteIMG}
        dialogTitle="Remove Product"
        yesHandle={handleConfirmDeletion}
        handleDialogClose={handleDialogClose}
        dialogPara="Are you sure you want to Remove this Product?"
        nvCancel="Cancel"
        nvYes="Yes"
      />
      <ChangeStatus
        dialogOpen={statusOpen}
        popimg={deleteIMG}
        dialogTitle={
          getProductStatus.status === "1"
            ? "Active Product"
            : "Inactive Product"
        }
        id={getProductStatus.id}
        status={getProductStatus.status}
        type={"productservice"}
        handleDialogClose={(e: any, status: any) => {
          setStatusOpen(false);
        }}
        dialogPara={getStatusMessage(getProductStatus.status, "Product")}
        nvCancel="Cancel"
        nvYes="Yes"
      />
    </>
  );
}
