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
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";

import IconLabelButtons from "../buttons/buttonWithIcon";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Link, useNavigate } from "react-router-dom";
import { visuallyHidden } from "@mui/utils";
import SelectPerPage from "../select/paginationSelect";
import Pagination from "@mui/material/Pagination";
import { Navigate } from "react-router-dom";

import { MoreHoriz, FilterList } from "@material-ui/icons";

import { useDispatch } from "react-redux";
import {
  getProductAndServicesListing,
  deleteProductAndService,
} from "../../screens/productandServices/action";
import { updateProductAndServices } from "../../screens/productandServices/productServiceSlice";
import { useSelector } from "react-redux";
import SearchInput from "../inputs/searchInput";
import DeleteDialog from "../dialog/index";
import MenuBar from "../menu/index";
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
  getMembers,
  getMemberDetail,
} from "../../screens/teamManagement/teamManagemnetAction";
import DetailsMember from "../drawer";
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
    id: "fullName",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email Id",
  },

  {
    id: "roleName",
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
  setEditMemberStatus?: any;
  setAddMember?: any;
}

export default function MemberTable(props: TableTpProps) {
  const { filterPress, handleEdit, setAddMember, setState, count } = props;
  const Navigate = useNavigate();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const [addState, setAddState] = React.useState(false);
  const [detailsStatus, setDetailsStatus] = React.useState(false);

  const [dense, setDense] = React.useState(false);
  const [statusOpen, setStatusOpen] = React.useState(false);
  const [memberStatus, setMemberStatus] = React.useState({
    id: "",
    status: "",
  });
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [productDetailsState, setproductDetailsState] = React.useState(false);
  const dispatch: any = useDispatch();
  // const { limit, page, search, sort_key, totalCount, totalPages } = useSelector(
  //   (state: any) => state.productServicesSlice
  // );
  const {
    membersList,
    memberDetail,
    rollFilterCount,
    limit,
    page,
    search,
    sort_key,
    totalCount,
    totalPages,
  } = useSelector((state: any) => state.teamManagementSlice);

  const debouncedSearch = useDebounce(search, 500);

  const handleChangePerPage = (event: any, value: number) => {
    dispatch(updateTeamManagement({ limit: event.target.value, page: 1 }));
    dispatch(getMembers());
  };

  const handleChange = (event: any, value: number) => {
    dispatch(updateTeamManagement({ page: value }));
    dispatch(getMembers());
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
        sort_key_member: property,
      })
    );
    dispatch(getMembers());
  };

  React.useEffect(() => {
    dispatch(getMembers());
  }, [debouncedSearch]);

  const handleSearch = (event: any, value: string) => {
    dispatch(updateTeamManagement({ search: event.target.value }));
  };

  const handleSearchClear = () => {
    dispatch(updateTeamManagement({ search: "" }));
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
    dispatch(getMemberDetail(id, setDetailsStatus));
  };

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {};

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
              {membersList && membersList.length ? (
                membersList.map((row: any, index: number) => {
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
                          title={
                            row?.fullName?.length > 30 ? `${row?.fullName}` : ""
                          }
                        >
                          {row?.fullName || "N/A"}
                        </p>
                      </TableCell>

                      <TableCell component="th" scope="row" padding="none">
                        <p
                          onClick={() => handleRowClick(row?._id)}
                          // className="td_para pointer"
                          // title={row?.email?.length > 30 ? `${row?.email}` : ""}
                        >
                          {row?.email || "N/A"}
                        </p>
                      </TableCell>

                      <TableCell component="th" scope="row" padding="none">
                        <p
                          onClick={() => handleRowClick(row?._id)}
                          className="td_para pointer"
                        >
                          {row?.roleName || "N/A"}
                        </p>
                      </TableCell>

                      <TableCell align="right">
                        {row?.createdAt
                          ? moment(row.createdAt).format("DD-MM-YYYY")
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
                              isDelete={false}
                              id={row._id}
                              handleDelete={handleDelete}
                              handleEdit={() => handleEdit(row)}
                              pageEdit={false}
                              handleStatus={() => {
                                setStatusOpen(true);
                                setMemberStatus({
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
                  <TableCell className="no-record" colSpan={6}>
                    {/* <img
                      src={NO_DATA_FOUND}
                    />  */}
                    <div className="no_data_fnd">
                      <img
                        src={NODATA_5}
                        className="pointer"
                        onClick={() => setAddMember(true)}
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
            {membersList && membersList.length > 0
              ? page === 1
                ? `1 - ${membersList.length}`
                : `${limit * (page - 1) + 1}  - ${
                    limit * (page - 1) + membersList.length
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

      <DetailsMember state={detailsStatus} setState={setDetailsStatus}>
        <RoleDetails
          openDrawer={setDetailsStatus}
          setEditOpen={props.setEditMemberStatus}
          type="member"
        />
      </DetailsMember>

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
          memberStatus.status === "1" ? "Active Member" : "Inactive Member"
        }
        id={memberStatus.id}
        status={memberStatus.status}
        type={"member"}
        handleDialogClose={(e: any, status: any) => {
          setStatusOpen(false);
        }}
        dialogPara={getStatusMessage(memberStatus.status, "member")}
        nvCancel="Cancel"
        nvYes="Yes"
      />
    </>
  );
}
