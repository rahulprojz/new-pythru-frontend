import * as React from "react";
import moment from "moment";
import { alpha, styled } from "@mui/material/styles";
import { Box, Button, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import useDebounce from "../../hooks/use.debounce";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";

import IconLabelButtons from "../buttons/buttonWithIcon";
import { Link, useNavigate } from "react-router-dom";
import { visuallyHidden } from "@mui/utils";
import SelectPerPage from "../select/paginationSelect";
import Pagination from "@mui/material/Pagination";

import { MoreHoriz, FilterList } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { deleteProductAndService } from "../../screens/productandServices/action";
import { useSelector } from "react-redux";
import SearchInput from "../inputs/searchInput";
import DeleteDialog from "./../dialog/index";
import MenuBar from "./../menu/index";
import {
  NODATA_5,
  deleteIMG,
  getStatusMessage,
  getStatusNumber,
  profileIcon,
} from "../../constants";
import ChangeStatus from "../dialog/ChangeStatus";
import { updateTeamManagement } from "../../screens/teamManagement/teamManagementSlice";
import {
  getRoleDetail,
  getroles,
} from "../../screens/teamManagement/teamManagemnetAction";
import RoleDetailsDrawer from "./../drawer";
import RoleDetails from "./roleDetails";

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
    label: "Role",
  },

  {
    id: "createdAt",
    numeric: false,
    disablePadding: true,
    label: "Created Date",
  },

  {
    id: "updatedAt",
    numeric: false,
    disablePadding: true,
    label: "Modfication On",
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
      onRequestSort(event, property);
    };

  return (
    <TableHead className="hideActionSort">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell?.id}
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

interface TableTpProps {
  filterPress?: any;
  handleEdit?: any;
  setState?: any;
  count?: any;
  setEditStatus?: any;
  setAddState1?: any;
}

export default function EnhancedTable(props: TableTpProps) {
  const { filterPress, setAddState1, handleEdit, setState, count } = props;
  const Navigate = useNavigate();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const [dense, setDense] = React.useState(false);
  const [statusOpen, setStatusOpen] = React.useState(false);
  const [roleStatus, setRoleStatus] = React.useState({
    id: "",
    status: "",
  });
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [addState, setAddState] = React.useState(false);
  const dispatch: any = useDispatch();
  const {
    limit,
    page,
    search,
    sort_key,
    totalCount,
    totalPages,
    roleList,
    rollFilterCount,
  } = useSelector((state: any) => state.teamManagementSlice);
  const debouncedSearch = useDebounce(search, 500);

  const handleChangePerPage = (event: any, value: number) => {
    dispatch(updateTeamManagement({ limit: event.target.value, page: 1 }));
    dispatch(getroles());
  };

  const handleChange = (event: any, value: number) => {
    dispatch(updateTeamManagement({ page: value }));
    dispatch(getroles());
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
    // if (property === "status") return;
    dispatch(
      updateTeamManagement({
        sort_type: isAsc ? "+1" : "-1",
        sort_key: property,
      })
    );
    dispatch(getroles());
  };

  React.useEffect(() => {
    dispatch(getroles());
  }, [debouncedSearch]);

  const handleSearch = (event: any, value: string) => {
    dispatch(updateTeamManagement({ search: event.target.value }));
  };

  const handleSearchClear = () => {
    dispatch(updateTeamManagement({ search: "" }));
    dispatch(getroles());
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
    dispatch(getRoleDetail(id, setAddState));
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
              badgeContent={rollFilterCount}
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
            sx={{ minWidth: 1366 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              // numSelected={selected.length}
              order={order}
              orderBy={sort_key}
              //onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              //rowCount={rows.length}
              numSelected={0}
              onSelectAllClick={function (
                event: React.ChangeEvent<HTMLInputElement>
              ): void {
                throw new Error("Function not implemented.");
              }}
              //order={"desc"}
            />
            <TableBody>
              {roleList && roleList?.length ? (
                roleList?.map((row: any, index: number) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row?._id}
                      className={"tableRow"}
                    >
                      <TableCell component="th" scope="row" padding="none">
                        <p
                          onClick={() => handleRowClick(row?._id)}
                          className="td_para pointer"
                          title={row?.name?.length > 30 ? `${row?.name}` : ""}
                        >
                          {row?.name || "N/A"}
                        </p>
                      </TableCell>

                      <TableCell align="right">
                        {row?.createdAt
                          ? moment(row.createdAt).format("DD-MM-YYYY")
                          : "N/A"}
                      </TableCell>

                      <TableCell align="right">
                        {row?.updatedAt
                          ? moment(row.updatedAt).format("DD-MM-YYYY")
                          : "N/A"}
                      </TableCell>

                      <TableCell align="right">
                        <Box
                          className={`table-status-cell ${
                            row?.status === 1
                              ? "active"
                              : row?.status === 2
                              ? "inactive"
                              : "N/A"
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
                              id={row._id}
                              isDelete={false}
                              handleDelete={handleDelete}
                              handleEdit={() => handleEdit(row)}
                              pageEdit={false}
                              handleStatus={() => {
                                setStatusOpen(true);
                                setRoleStatus({
                                  id: row._id,
                                  status: getStatusNumber(row.status),
                                });
                              }}
                              changeStatus={true}
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
                  <TableCell className="no-record" colSpan={5}>
                    <div className="no_data_fnd">
                      <img
                        src={NODATA_5}
                        className="pointer"
                        onClick={() => setAddState1(true)}
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
            {roleList && roleList.length > 0
              ? page === 1
                ? `1 - ${roleList.length}`
                : `${limit * (page - 1) + 1}  - ${
                    limit * (page - 1) + roleList.length
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

      <RoleDetailsDrawer
        state={addState}
        setState={setAddState}
        className="addRoleDrawer"
      >
        <RoleDetails
          openDrawer={setAddState}
          setEditOpen={props.setEditStatus}
          type="role"
        />
      </RoleDetailsDrawer>
      <DeleteDialog
        dialogOpen={open}
        popimg={deleteIMG}
        dialogTitle="Remove Service"
        yesHandle={handleConfirmDeletion}
        handleDialogClose={handleDialogClose}
        dialogPara="Are you sure you want to Remove this Service?"
        nvCancel="Cancel"
        nvYes="Yes"
      />
      <ChangeStatus
        dialogOpen={statusOpen}
        popimg={deleteIMG}
        dialogTitle={
          roleStatus.status === "1" ? "Active Role" : "Inactive Role"
        }
        id={roleStatus.id}
        status={roleStatus.status}
        type={"role"}
        handleDialogClose={(e: any, status: any) => {
          setStatusOpen(false);
        }}
        dialogPara={getStatusMessage(roleStatus.status, "role")}
        nvCancel="Cancel"
        nvYes="Yes"
      />
    </>
  );
}
