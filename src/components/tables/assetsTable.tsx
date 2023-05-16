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

import IconLabelButtons from "../buttons/buttonWithIcon";
import {
  getAssets,
  deleteAsset,
  getAssetdetail,
} from "../../screens/accounting/assets/action";
import { updateAsset } from "../../screens/accounting/assets/assetSlice";
import SelectPerPage from "../select/paginationSelect";
import SearchInput from "../inputs/searchInput";
import DeleteDialog from "./../dialog/index";
import MenuBar from "./../menu/index";
import { deleteIMG, NODATA_6 } from "../../constants";
import AssetDetail from "../../screens/accounting/assets/assetDetail";
import AssetDetailDrawer from "../drawer";
import { convertIntegerToDecimal } from "../../utils";
import { useLocation } from "react-router-dom";

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
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Asset Name",
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
    label: "Creation Date",
  },
  {
    id: "amount",
    numeric: false,
    disablePadding: true,
    label: "Amount",
  },
  {
    id: "purchasedDate",
    numeric: false,
    disablePadding: true,
    label: "Purchase Date",
  },
  {
    id: "supportedDate",
    numeric: false,
    disablePadding: true,
    label: "Suported Date",
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

// interface EnhancedTableToolbarProps {
//   numSelected: number;
// }

// const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(
//               theme.palette.primary.main,
//               theme.palette.action.activatedOpacity
//             ),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           color='inherit'
//           variant='subtitle1'
//           component='div'
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           variant='h6'
//           id='tableTitle'
//           component='div'
//           className='tableHeading'
//         >
//           Recent Invoices
//         </Typography>
//       )}
//     </Toolbar>
//   );
// };

interface TableTpProps {
  filterPress: () => void;
  handleEdit: (row: any) => void;
  setState: Dispatch<SetStateAction<boolean>>;
  count: number;
}

export default function EnhancedTable(props: TableTpProps) {
  const dispatch: any = useDispatch();
  const location: any = useLocation();
  const { filterPress, handleEdit, setState, count } = props;
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("createdAt");

  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [dense, setDense] = useState<boolean>(false);
  const [openAssetDetail, setOpenAssetDetail] = useState<boolean>(false);

  const {
    limit,
    page,
    assetList,
    search,
    sort_key,
    totalCount,
    totalPage,
    assetDetail,
  } = useSelector((state: any) => state.assetSlice);

  React.useEffect(() => {
    if (location?.state?.open) {
      setState(true);
    }
  }, [location]);

  const handleChangePerPage = (event: any, value: number) => {
    dispatch(updateAsset({ limit: event.target.value, page: 1 }));
    dispatch(getAssets());
  };

  const handleChange = (event: any, value: number) => {
    dispatch(updateAsset({ page: value }));
    dispatch(getAssets());
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
      updateAsset({
        sort_type: isAsc ? "+1" : "-1",
        sort_key: property,
      })
    );
    dispatch(getAssets());
  };

  const handleSearch = (event: any, value: string) => {
    dispatch(updateAsset({ search: event.target.value }));
    dispatch(getAssets());
  };

  const handleSearchClear = () => {
    dispatch(updateAsset({ search: "" }));
    dispatch(getAssets());
  };

  const handleDelete = (id: string) => {
    setId(id);
    setOpen(true);
  };

  const handleConfirmDeletion = () => {
    if (id) {
      dispatch(deleteAsset(id));
      setOpen(false);
      setId("");
    }
  };

  const handleRowClick = (id: string) => {
    dispatch(getAssetdetail(id, setOpenAssetDetail));
  };

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
          <Table aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
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
              {assetList && assetList.length ? (
                assetList.map((row: any, index: number) => {
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
                        {row?.name || "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        <p className="td_para" title={row?.description?.length > 20 ? `${row?.description}` : ''}>{row?.description || "N/A"}</p>
                      </TableCell>
                      <TableCell align="right">
                        {row.createdAt
                          ? moment(row.createdAt).format("MMM D YYYY")
                          : "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        {/* {row?.amount ? `₹${row?.amount}` : "N/A"} */}
                        {convertIntegerToDecimal(row?.amount)}
                      </TableCell>
                      <TableCell align="right">
                        {row.purchasedDate
                          ? moment(row.purchasedDate).format("MMM D YYYY")
                          : "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        {row.supportedDate
                          ? moment(row.supportedDate).format("MMM D YYYY")
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {
                          <div className={"iconsContainer"}>
                            <MenuBar
                              id={row._id}
                              handleDelete={handleDelete}
                              handleEdit={() => handleEdit(row)}
                            />
                          </div>
                        }
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell className="no-record" colSpan={7}>
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
            {assetList && assetList.length > 0
              ? page === 1
                ? `1 - ${assetList.length}`
                : `${limit * (page - 1) + 1}  - ${
                    limit * (page - 1) + assetList.length
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

      <AssetDetailDrawer state={openAssetDetail} setState={setOpenAssetDetail}>
        <AssetDetail
          assetDetail={assetDetail}
          setOpenAssetDetail={setOpenAssetDetail}
          setState={setState}
        />
      </AssetDetailDrawer>

      <DeleteDialog
        dialogOpen={open}
        popimg={deleteIMG}
        dialogTitle="Remove Asset"
        yesHandle={handleConfirmDeletion}
        handleDialogClose={handleDialogClose}
        dialogPara="Are you sure you want to Remove this Asset?"
        nvCancel="Cancel"
        nvYes="Yes"
      />
    </>
  );
}
