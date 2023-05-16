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
import { useNavigate } from "react-router-dom";
import { visuallyHidden } from "@mui/utils";
import SelectPerPage from "../select/paginationSelect";
import Pagination from "@mui/material/Pagination";
import { FilterList } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import {
  getProductAndServicesCategory,
  deletCategory,
  // getProductServicedetail,
} from "../../screens/settings/action";
import FilterCategory from "../../screens/settings/categoryFilter";

import { updateSettingsState } from "../../screens/settings/settingSlice";
import { useSelector } from "react-redux";
import SearchInput from "../inputs/searchInput";
import IconLabelButtons from "../buttons/buttonWithIcon";
import DeleteDialog from "./../dialog/index";
import MenuBar from "./../menu/index";
import { NODATA_6, deleteIMG, profileIcon } from "../../constants";
import Detail from "./productServiceDetail";
import { addDefaultSrc } from "../../utils/Common.Function";
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

type Order = "asc" | "desc";

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly

interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "categoryId",
    numeric: false,
    disablePadding: true,
    label: "Category ID",
  },
  {
    id: "categoryName",
    numeric: false,
    disablePadding: true,
    label: "Category Name",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: true,
    label: "Category Type",
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
}
export default function EnhancedTable(props: TableTpProps) {
  const { filterPress, setState } = props;
  const Navigate = useNavigate();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof any>("name");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [productDetailsState, setproductDetailsState] = React.useState(false);
  const dispatch: any = useDispatch();
  const {
    productServicesCategory,
    limit,
    page,
    search,
    sort_key,
    totalCount,
    totalPages,
    filterCount,
  } = useSelector((state: any) => state.settingSlice);

  const debouncedSearch = useDebounce(search, 500);
  React.useEffect(() => {
    dispatch(getProductAndServicesCategory());
  }, [debouncedSearch]);

  const handleChangePerPage = (event: any, value: number) => {
    dispatch(updateSettingsState({ limit: event.target.value, page: 1 }));
    dispatch(getProductAndServicesCategory());
  };

  const handleChange = (event: any, value: number) => {
    dispatch(updateSettingsState({ page: value }));
    dispatch(getProductAndServicesCategory());
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
      updateSettingsState({
        sort_type: isAsc ? "+1" : "-1",
        sort_key: property,
      })
    );
    dispatch(getProductAndServicesCategory());
  };

  const handleSearch = (event: any, value: string) => {
    dispatch(updateSettingsState({ search: event.target.value }));
  };

  const handleSearchClear = () => {
    dispatch(updateSettingsState({ search: "" }));
    dispatch(getProductAndServicesCategory());
  };

  const handleDelete = (id: string) => {
    setId(id);
    setOpen(true);
  };

  const handleConfirmDeletion = () => {
    if (id) {
      dispatch(deletCategory(id));
      setOpen(false);
      setId("");
    }
  };

  const { productServiceDetail } = useSelector(
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
              badgeContent={filterCount}
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
          <Table aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              // numSelected={selected.length}
              order={order}
              orderBy={sort_key}
              //onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={productServicesCategory?.length}
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
              {productServicesCategory && productServicesCategory.length ? (
                productServicesCategory.map((row: any, index: number) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row?._id}
                      className={"tableRow"}
                    >
                      <TableCell align="right">
                        {row?.categoryId || "N/A"}
                      </TableCell>
                      <TableCell align="right">{row?.categoryName}</TableCell>
                      <TableCell align="right">
                        {row?.type == 1 ? "Product" : "Service" || "N/A"}
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
                      <TableCell>
                        <div className={"iconsContainer"}>
                          <MenuBar
                            id={row._id}
                            handleDelete={handleDelete}
                            handleEdit={() => {
                              props.handleEdit(row);
                            }}
                            pageEdit={false}
                            isEdit={
                              (permissions && permissions["settings"].edit) ||
                              !permissions
                                ? true
                                : false
                            }
                            isDelete={
                              (permissions && permissions["settings"].block) ||
                              !permissions
                                ? true
                                : false
                            }
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell className="no-record" colSpan={4}>
                    <div className="no_data_fnd">
                      <img
                        src={NODATA_6}
                        className="pointer"
                        // onClick={() => setState(true)}
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
            {productServicesCategory && productServicesCategory.length > 0
              ? page === 1
                ? `1 - ${productServicesCategory.length}`
                : `${limit * (page - 1) + 1}  - ${
                    limit * (page - 1) + productServicesCategory.length
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

      {/* <Detail
        productServiceDetail={productServiceDetail}
        productDetailsState={productDetailsState}
        setproductDetailsState={setproductDetailsState}
        setState={setState}
      /> */}
      <DeleteDialog
        dialogOpen={open}
        popimg={deleteIMG}
        dialogTitle="Remove Category"
        yesHandle={handleConfirmDeletion}
        handleDialogClose={handleDialogClose}
        dialogPara="Are you sure you want to Remove this Category?"
        nvCancel="Cancel"
        nvYes="Yes"
      />
    </>
  );
}
