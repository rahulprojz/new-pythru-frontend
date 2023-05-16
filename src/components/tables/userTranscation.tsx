import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import { alpha, styled } from "@mui/material/styles";
import { Badge, Box, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import Pagination from "@mui/material/Pagination";
import { FilterList, MoreHoriz } from "@material-ui/icons";
import IconLabelButtons from "../buttons/buttonWithIcon";
import { NODATA_6 } from "../../constants";

import { updateManualJournal } from "../../screens/accounting/manualJournals/manualJournalSlice";

import { useLocation, useParams } from "react-router-dom";

import useDebounce from "../../hooks/use.debounce";

import AddFilterDrawer from "../drawer";
import Filter from "../../screens/banking/filter";
import {
  generateExcel,
  generatePdf,
  getUserAccountTransactionsList,
} from "../../screens/banking/action";
import { updateBanking } from "../../screens/banking/bankingSlice";
import NormalButton from "../buttons/normalButton";
import { getBankType, getTransId } from "../../utils";
import DownloadDropDownMenu from "../menu/downloadDropDownMenu";
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
    id: "xn_date",
    numeric: false,
    disablePadding: true,
    label: "Date",
  },
  {
    id: "xn_amount",
    numeric: false,
    disablePadding: true,
    label: "Transactions details",
  },
  {
    id: "balance",
    numeric: false,
    disablePadding: true,
    label: "Amount",
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
  data: any;
}

export default function EnhancedTable(props: TableTpProps) {
  const location: any = useLocation();
  const dispatch: any = useDispatch();
  const { data } = props;

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("createdAt");

  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [dense, setDense] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const params: any = useParams();

  const [rowDetails, setRowDetails] = useState<any>({});

  const [filterState, setfilterState] = useState<boolean>(false);

  var transactionId = getTransId(data);
  var bankType = getBankType(data);

  const {
    limit,
    page,
    userTransactionList,
    totalCount,
    totalPage,
    search,
    sort_key,
    filterCount,
  } = useSelector((state: any) => state.bankingSlice);
  const debouncedSearch = useDebounce(search, 500);
  React.useEffect(() => {
    if (search) dispatch(getUserAccountTransactionsList());
  }, [debouncedSearch]);

  const handleChangePerPage = (event: any, value: number) => {
    dispatch(updateBanking({ limit: event.target.value, page: 1 }));
    dispatch(getUserAccountTransactionsList());
  };

  const handleChange = (event: any, value: number) => {
    dispatch(updateManualJournal({ page: value }));
    dispatch(getUserAccountTransactionsList());
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
      updateManualJournal({
        sort_type: isAsc ? "+1" : "-1",
        sort_key: property,
      })
    );
    dispatch(getUserAccountTransactionsList());
  };

  const handleSearch = (event: any, value: string) => {
    dispatch(updateManualJournal({ search: event.target.value }));
    if (!event.target.value) {
      dispatch(getUserAccountTransactionsList());
    }
  };

  const handleSearchClear = () => {
    dispatch(updateManualJournal({ search: "" }));
    dispatch(getUserAccountTransactionsList());
  };

  const { permissions } = useSelector((state: any) => state.commonSlice);

  const filterPress = () => {
    setfilterState(true);
  };

  return (
    <>
      <Box className="tableContainer" style={{marginTop: '0px'}}>
        <div className="table-filter-head">
          <Box className="search_bar w-100 for-banking">
            <Badge
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              badgeContent={filterCount}
              color="primary"
            >
              <DownloadDropDownMenu
                generateExcel={generateExcel}
                generatePdf={generatePdf}
                documentType={1}
              />
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
              {userTransactionList && userTransactionList.length ? (
                userTransactionList.map((row: any, index: number) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      className={"tableRow"}
                    >
                      <TableCell
                        className="pointer"
                        component="th"
                        scope="row"
                        padding="none"
                      >
                        {row.date}
                      </TableCell>

                      <TableCell component="th" scope="row" padding="none">
                        <p
                          className="td_para"
                          title={
                            row?.transactionDetails?.length > 40
                              ? `${row?.transactionDetails}`
                              : ""
                          }
                        >
                          {row.transactionDetails || "N/A"}
                        </p>
                      </TableCell>

                      <TableCell align="right">
                        <p
                          className={
                            Math.sign(row.amount) == -1
                              ? "negative"
                              : "positive"
                          }
                        >
                          ₹{row.amount || "N/A"}
                        </p>
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
        {/* <Box className="pagination-cover">
          <Typography variant="subtitle2">
            {" "}
            Showing{" "}
            {userTransactionList && userTransactionList.length > 0
              ? page === 1
                ? `1 - ${userTransactionList.length}`
                : `${limit * (page - 1) + 1}  - ${
                    limit * (page - 1) + userTransactionList.length
                  } `
              : "0 - 0"}{" "}
            of {totalCount} rows
          </Typography>
          <Pagination
            count={totalPage || 0}
            variant="outlined"
            onChange={handleChange}
          />
        </Box> */}
      </Box>
      <AddFilterDrawer
        state={filterState}
        setState={setfilterState}
        className="filterDrawer"
      >
        <Filter stateState={setfilterState} data={data} />
      </AddFilterDrawer>
    </>
  );
}
