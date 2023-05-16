import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import useDebounce from "../../../../hooks/use.debounce";

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

import IconLabelButtons from "../../../../components/buttons/buttonWithIcon";
import SelectPerPage from "../../../../components/select/paginationSelect";
import SearchInput from "../../../../components/inputs/searchInput";
import DeleteDialog from "../../../../components/dialog/index";
import MenuBar from "../../../../components/menu/index";
import {
  NO_DATA_FOUND,
  AvatarIMG,
  deleteIMG,
  getEstimateStatus,
  getEstimateStatusCss,
  statusEnum,
  LIST_EDIT_ICON,
  NODATA_5,
} from "../../../../constants";

import {
  addDefaultSrc,
  convertIntegerToDecimal,
  getOverDueDays,
} from "../../../../utils";
import { updateSalePurchase } from "../../../saleandPurchase/salePurchaseSlice";
import {
  getSalePurchaseList,
  deleteSalePurchase,
  getSalePurchaseDetail,
} from "../../../saleandPurchase/action";
import EstimateDetailDrawer from "../../../../components/drawer";
import Detail from "../../../../components/sales/common/details";
import EstimateMenuDropDown from "../../../../components/menu/estimateDropDownMenu";
import DownloadDropDownMenu from "../../../../components/menu/downloadDropDownMenu";

import { generateExcel, generatePdf } from "../../../saleandPurchase/action";
import { useLocation, useNavigate } from "react-router-dom";

type Order = "asc" | "desc";
type Data = any;
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "documentNumber",
    numeric: false,
    disablePadding: true,
    label: "Receipt Number",
  },
  {
    id: "customerVendorName",
    numeric: false,
    disablePadding: true,
    label: "Vendor Name",
  },
  {
    id: "referenceNumber",
    numeric: false,
    disablePadding: true,
    label: "Ref ID",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: true,
    label: "Creation Date",
  },
  {
    id: "fromDate",
    numeric: false,
    disablePadding: true,
    label: "Receipt Date",
  },
  {
    id: "dueDate",
    numeric: false,
    disablePadding: true,
    label: "Due Date",
  },
  {
    id: "daysLeft",
    numeric: false,
    disablePadding: true,
    label: "Overdue	Days",
  },
  {
    id: "totalPrice",
    numeric: false,
    disablePadding: true,
    label: "Amount",
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
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
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

interface TableTpProps {
  filterPress: () => void;
  labels: any;
  handleAddReceipt: () => void;
  setState: Dispatch<SetStateAction<boolean>>;
  //   count: number;
}

export default function EnhancedTable(props: TableTpProps) {
  const dispatch: any = useDispatch();
  const location: any = useLocation();
  const navigate = useNavigate();
  const { setState, filterPress, labels, handleAddReceipt } = props;
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("createdAt");
  const [rowDetails, setRowDetails] = useState<any>({});

  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [dense, setDense] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const {
    limit,
    page,
    salePurchaseList,
    search,
    sort_key,
    totalCount,
    totalPage,
    salePurchaseDetail,
    filterCount,
  } = useSelector((state: any) => state.salePurchaseSlice);
  const debouncedSearch = useDebounce(search, 500);
  React.useEffect(() => {
    if (search) dispatch(getSalePurchaseList());
  }, [debouncedSearch]);

  useEffect(() => {
    if (location?.state?.id) {
      dispatch(
        getSalePurchaseDetail(location.state.id, setOpenDetail, setRowDetails)
      );
    }
  }, [location]);
  const handleChangePerPage = (event: any, value: number) => {
    dispatch(updateSalePurchase({ limit: event.target.value, page: 1 }));
    dispatch(getSalePurchaseList());
  };

  const handleChange = (event: any, value: number) => {
    dispatch(updateSalePurchase({ page: value }));
    dispatch(getSalePurchaseList());
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
    dispatch(getSalePurchaseList());
  };

  const handleSearch = (event: any, value: string) => {
    dispatch(updateSalePurchase({ search: event.target.value }));
    if (!event.target.value) dispatch(getSalePurchaseList());
  };

  const handleSearchClear = () => {
    dispatch(updateSalePurchase({ search: "" }));
    dispatch(getSalePurchaseList());
  };

  const handleDelete = (id: string) => {
    setId(id);
    setOpen(true);
  };

  const handleConfirmDeletion = () => {
    if (id) {
      dispatch(deleteSalePurchase(id));
      setOpen(false);
      setId("");
    }
  };

  const handleRowClick = (row: any) => {
    setOpenDetail(true);
    // var rowDetails = salePurchaseList.filter((v: any) => {
    //   return v._id == id;
    // });
    setRowDetails(row);
    //setOpenDetail(true);
    //dispatch(getSalePurchaseDetail(id, setOpenDetail));
  };

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
            <DownloadDropDownMenu
              generateExcel={generateExcel}
              generatePdf={generatePdf}
              documentType={labels.state.documentType}
            />
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
              {salePurchaseList && salePurchaseList.length ? (
                salePurchaseList.map((row: any, index: number) => {
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
                        onClick={() => handleRowClick(row)}
                      >
                        {row?.documentNumber || "N/A"}
                      </TableCell>

                      <TableCell component="th" scope="row" padding="none">
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
                        {row.fromDate
                          ? moment(row.fromDate).format("DD-MM-YYYY")
                          : "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        {row.dueDate
                          ? moment(row.dueDate).format("DD-MM-YYYY")
                          : "N/A"}
                      </TableCell>
                      <TableCell align="right">{getOverDueDays(row)}</TableCell>

                      <TableCell align="right">
                        {convertIntegerToDecimal(row?.totalPrice)}
                        {/* {row?.totalPrice ? `₹${row?.totalPrice}` : "N/A"} */}
                      </TableCell>

                      <TableCell align="right">
                        <span
                          className={`${getEstimateStatusCss(
                            row.status
                          )} table-status-cell`}
                        >
                          {row?.status ? getEstimateStatus(row.status) : "N/A"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className={"iconsContainer"}>
                          {/* <MenuBar
                            id={row._id}
                            handleDelete={handleDelete}
                            pageEdit={true}
                            redirectLink={"/purchase/receipts/edit"}
                            data={labels}
                            isEdit={
                              (permissions && permissions["purchases"].edit) ||
                              !permissions
                                ? [statusEnum.NOT_SENT].includes(row.status)
                                : false
                            }
                            // isDelete={
                            //   (permissions && permissions["purchases"].block) ||
                            //   !permissions
                            //     ? true
                            //     : false
                            // }
                            isDelete={false}
                            disabled={
                              !((permissions &&
                                permissions["purchases"].edit) ||
                              !permissions
                                ? [statusEnum.NOT_SENT].includes(row.status)
                                : false)
                            }
                          /> */}
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(
                                `/purchase/receipts/edit/${row._id}`,
                                labels
                              );
                            }}
                            className={
                              !((permissions &&
                                permissions["purchases"]?.edit) ||
                              !permissions
                                ? [statusEnum.NOT_SENT].includes(row.status)
                                : false)
                                ? "disabled"
                                : ""
                            }
                          >
                            <img src={LIST_EDIT_ICON} />
                          </a>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell className="no-record" colSpan={11}>
                    <div className="no_data_fnd ">
                      <img
                        className="pointer"
                        src={NODATA_5}
                        onClick={handleAddReceipt}
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
            {salePurchaseList && salePurchaseList.length > 0
              ? page === 1
                ? `1 - ${salePurchaseList.length}`
                : `${limit * (page - 1) + 1}  - ${
                    limit * (page - 1) + salePurchaseList.length
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

      <EstimateDetailDrawer state={openDetail} setState={setOpenDetail}>
        <Detail
          detail={rowDetails}
          setOpenDetail={setOpenDetail}
          setState={setState}
          labels={labels}
        />
      </EstimateDetailDrawer>

      <DeleteDialog
        dialogOpen={open}
        popimg={deleteIMG}
        dialogTitle={`Remove ${labels.state.documentText}`}
        yesHandle={handleConfirmDeletion}
        handleDialogClose={handleDialogClose}
        dialogPara="Are you sure you want to delete?"
        nvCancel="Cancel"
        nvYes="Yes"
      />
    </>
  );
}
