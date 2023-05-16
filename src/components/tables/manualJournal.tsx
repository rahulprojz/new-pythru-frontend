import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
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
import { FilterList } from "@material-ui/icons";
import Badge from "@mui/material/Badge";

import SelectPerPage from "../select/paginationSelect";
import DeleteDialog from "../dialog/index";
import MenuBar from "../menu/index";
import {
  deleteIMG,
  MANUAL_JOURNAL_TYPE,
  NODATA_7,
  NODATA_8,
} from "../../constants";

import { getFormtedDate } from "../../utils";
import { updateManualJournal } from "../../screens/accounting/manualJournals/manualJournalSlice";
import {
  getManualJournalList,
  deleteManualJournal,
  downloadPdf,
} from "../../screens/accounting/manualJournals/action";

import Detail from "../../screens/accounting/manualJournals/detail";

import { useParams } from "react-router-dom";

import IconLabelButtons from "../buttons/buttonWithIcon";
import useDebounce from "../../hooks/use.debounce";

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
    id: "createdAt",
    numeric: false,
    disablePadding: true,
    label: "Creation Date",
  },
  {
    id: "transactionDate",
    numeric: false,
    disablePadding: true,
    label: "Transaction Date",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: true,
    label: "Description",
  },
  {
    id: "creditAccount",
    numeric: false,
    disablePadding: true,
    label: "Category (Credit A/C)",
  },
  {
    id: "debitAccount",
    numeric: false,
    disablePadding: true,
    label: "Category (Debit A/C)",
  },
  {
    id: "amount",
    numeric: false,
    disablePadding: true,
    label: "Amount",
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
  getRowData: (data: any) => void;
  handleAddManualJournal: () => void;
  dashboardHide?: boolean;
}

export default function EnhancedTable(props: TableTpProps) {
  const dispatch: any = useDispatch();
  const { setState, filterPress, getRowData, handleAddManualJournal } = props;
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("createdAt");

  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [dense, setDense] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const params: any = useParams();

  const [rowDetails, setRowDetails] = useState<any>({});

  const {
    limit,
    page,
    list,
    search,
    sort_key,
    totalCount,
    totalPage,
    detail,
    filterCount,
  } = useSelector((state: any) => state.manualJournalSlice);
  const debouncedSearch = useDebounce(search, 500);
  React.useEffect(() => {
    if (search) dispatch(getManualJournalList());
  }, [debouncedSearch]);

  const handleChangePerPage = (event: any, value: number) => {
    dispatch(updateManualJournal({ limit: event.target.value, page: 1 }));
    dispatch(getManualJournalList());
  };

  const handleChange = (event: any, value: number) => {
    if (props.dashboardHide) {
      let limit = 5;
      dispatch(updateManualJournal({ page: value }));
      dispatch(getManualJournalList(limit));
    } else {
      dispatch(updateManualJournal({ page: value }));
      dispatch(getManualJournalList());
    }
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
    if (props.dashboardHide) {
      let limit = 5;
      dispatch(getManualJournalList(limit));
    } else {
      dispatch(getManualJournalList());
    }
  };

  const handleSearch = (event: any, value: string) => {
    dispatch(updateManualJournal({ search: event.target.value }));
    if (!event.target.value) {
      dispatch(getManualJournalList());
    }
  };

  const handleSearchClear = () => {
    dispatch(updateManualJournal({ search: "" }));
    dispatch(getManualJournalList());
  };

  const handleDelete = (id: string) => {
    setId(id);
    setOpen(true);
  };

  const handleConfirmDeletion = () => {
    if (id) {
      dispatch(deleteManualJournal(id, setOpen));
      setId("");
    }
  };

  const handleRowClick = (id: string) => {
    setOpenDetail(true);
    setRowDetails(list.find((v: any) => v._id == id));
  };

  return (
    <>
      <Box className="tableContainer">
        {!props?.dashboardHide && (
          <div className="table-filter-head">
            <Box id="tableTitle" className="paginationDropdown">
              <span className="p-r-10">Shows</span>{" "}
              <SelectPerPage handleChange={handleChangePerPage} page={limit} />
            </Box>
            <Box className="search_bar">
              <Badge
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={{ ml: 3 }}
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
        )}
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
              {list && list.length ? (
                list.map((row: any, index: number) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row?._id}
                      className={"tableRow"}
                    >
                      <TableCell align="right">
                        {getFormtedDate(row.createdAt, "DD-MM-YYYY") || "N/A"}
                      </TableCell>
                      <TableCell
                        className="pointer"
                        component="th"
                        scope="row"
                        padding="none"
                        onClick={() => handleRowClick(row._id)}
                      >
                        {getFormtedDate(row.transactionDate, "DD-MM-YYYY") ||
                          "N/A"}
                      </TableCell>

                      <TableCell component="th" scope="row" padding="none">
                        <p
                          className="td_para"
                          title={
                            row?.description?.length > 20
                              ? `${row?.description}`
                              : ""
                          }
                        >
                          {row.description || "N/A"}
                        </p>
                      </TableCell>

                      <TableCell align="right">
                        {row.creditAccount
                          .map(
                            (v: any) =>
                              v.parentCategoryName + "-" + v.categoryName
                          )
                          .toString() || "N/A"}
                      </TableCell>

                      <TableCell align="right">
                        {row.debitAccount
                          .map(
                            (v: any) =>
                              v.parentCategoryName + "-" + v.categoryName
                          )
                          .toString() || "N/A"}
                      </TableCell>

                      <TableCell align="right">
                        ₹{row.amount.toFixed(2) || "N/A"}
                      </TableCell>

                      <TableCell>
                        {
                          <div className={"iconsContainer"}>
                            <MenuBar
                              id={row._id}
                              isDelete={[MANUAL_JOURNAL_TYPE.CUSTOM].includes(
                                row?.type
                              )}
                              handleDelete={handleDelete}
                              pageEdit={false}
                              handleEdit={() => {
                                getRowData(row);
                              }}
                              isEdit={[MANUAL_JOURNAL_TYPE.CUSTOM].includes(
                                row?.type
                              )}
                              isPreview={true}
                              handlePreview={() => {
                                handleRowClick(row._id);
                              }}
                              handleDownload={() => {
                                dispatch(downloadPdf(row._id));
                              }}
                            />
                          </div>
                        }
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell className="no-record" colSpan={10}>
                    <div className="no_data_fnd">
                      <img
                        src={props?.dashboardHide ? NODATA_7 : NODATA_8}
                        className="pointer"
                        onClick={
                          props?.dashboardHide
                            ? () => {
                                return;
                              }
                            : handleAddManualJournal
                        }
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
          {props?.dashboardHide ? (
            <Typography variant="subtitle2"></Typography>
          ) : (
            <Typography variant="subtitle2">
              {" "}
              Showing{" "}
              {list && list.length > 0
                ? page === 1
                  ? `1 - ${list.length}`
                  : `${limit * (page - 1) + 1}  - ${
                      limit * (page - 1) + list.length
                    } `
                : "0 - 0"}{" "}
              {!props?.dashboardHide && `of ${totalCount} items`}
            </Typography>
          )}
          <Pagination
            count={totalPage || 0}
            variant="outlined"
            onChange={handleChange}
          />
        </Box>
      </Box>

      <DeleteDialog
        dialogOpen={open}
        popimg={deleteIMG}
        dialogTitle={`Remove Manual Journal`}
        yesHandle={handleConfirmDeletion}
        handleDialogClose={handleDialogClose}
        dialogPara="Are you sure you want to delete this Manual Journal?"
        nvCancel="Cancel"
        nvYes="Yes"
      />
      <Detail
        dialogOpen={openDetail}
        setOpenDetail={setOpenDetail}
        rowDetails={rowDetails}
      />
    </>
  );
}
