import { useDispatch } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useCallback, useState } from "react";
import DeleteDialogs from "../../dialog/index";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import {
  markAsCancelSalesAndPurchase,
  downloadSalesandPurchaseDetail,
  sendDoument,
  updateAmountSalesAndPurchase,
} from "../../../screens/saleandPurchase/action";
import StockStatus from "../../stock";
import Typography from "@mui/material/Typography";
import {
  getEstimateStatus,
  menuLinksForInvoice,
  deleteIMG,
  getEstimateStatusCss,
  statusEnum,
} from "../../../constants";
import {
  convertIntegerToDecimal,
  getFormtedDate,
  getOverDueDays,
} from "../../../utils";
import { useNavigate } from "react-router-dom";

import MarkPaid from "./MarkPaid";
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

// let labelsBill = {
//   state: {
//     billTo: "Bill From",
//     salesOrderDate: "Receipt  Date",
//     dueDate: "Due Date",
//     salesOrderNo: "bills No",
//     salesOrderDesc: "bills description",
//     documentText: "bills",
//     redirect: "bills",
//     type: 2,
//     documentType: 9,
//   },
// };

interface EstimateMenuProps {
  detail: any;
  setOpenDetail: any;
  permission: any;
}

const Estimate = (props: EstimateMenuProps) => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [openPartiallyPaid, setOpenPartiallyPaid] = useState(false);
  const [partiallyPaidAmount, setPartiallyPaidAmount] = useState(null);
  const { detail, setOpenDetail, permission } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [paidOpen, setPaidOpen] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [cancelOpen, setOpen] = React.useState<boolean>(false);

  const [markPaidOpen, setMarkPaidOpen] = React.useState<boolean>(false);

  const [formData, setFormData] = React.useState<any>({});

  const [markAspaid, setMarkPaid] = React.useState<boolean>(true);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const markAsCancel = useCallback(() => {
    setOpen(true);
  }, [cancelOpen]);
  const handleDialogClose = () => {
    setOpen(false);
  };
  const downloadDoc = () => {
    dispatch(downloadSalesandPurchaseDetail(detail._id));
    setOpenDetail(false);
    setAnchorEl(null);
  };
  const convertIntoCreditNote = () => {
    let labelsCN = {
      state: {
        billTo: "Bill To",
        salesOrderDate: "Credit Note Date",
        dueDate: "Due Date",
        salesOrderNo: "Credit Note No",
        salesOrderDesc: "Credit Note description",
        documentText: "Credit Note",
        documentType: 5,
        type: 1,
        redirect: "credit-note",
        isDocumentConverted: true,
        convertedFrom: detail._id,
      },
    };
    navigate("/sales/credit-note/add/" + detail._id, labelsCN);
  };

  const convertIntoCashMemo = () => {
    let labelsCM = {
      state: {
        billTo: "Bill To",
        salesOrderDate: "Cash Memo Date",
        dueDate: "Due Date",
        salesOrderNo: "Cash Memo No",
        salesOrderDesc: "Cash Memo description",
        documentText: "Cash Memo",
        type: 1,
        redirect: "cash-memo",
        documentType: 6,
        isDocumentConverted: true,
        convertedFrom: detail._id,
      },
    };
    navigate("/sales/cash-memo/add/" + detail._id, labelsCM);
  };

  const resendInvoice = () => {
    dispatch(sendDoument(detail._id));
    setOpenDetail(false);
    setAnchorEl(null);
  };

  const getInitialValues = {
    amount: detail?.totalPrice,
    transactionDate: new Date(),
    paymentMode: "cash",
    bankAccount: "",
    totalPrice: detail?.totalPrice,
    salesPurchaseId: "",
  };

  const showDropdownLinks = (link: string) => {
    switch (link) {
      case "Download":
        return downloadDoc();
        break;
      case "Cancel":
        return markAsCancel();
        break;
      case "Send Invoice":
        return resendInvoice();
        break;
      case "Send Reminder":
        return resendInvoice();
      case "Convert to Credit Note":
        return convertIntoCreditNote();
        break;
      case "Mark as Partial Paid":
        setMarkPaidOpen(true);
        setAnchorEl(null);
        setMarkPaid(true);
        break;
      //return partiallyPaid();
      case "Convert to Cash memo":
        return convertIntoCashMemo();
      case "Mark as Paid":
        setMarkPaidOpen(true);
        setAnchorEl(null);
        setMarkPaid(false);
      default:
        break;
    }
  };

  return (
    <div>
      <div className="invoice-detail-card m-b-20">
        <div className="Dflex al-cnt sp-bt m-b-10 wrap">
          <Typography variant="subtitle2" className="m-b-10">
            Collection Activity :
            <span className="bold">{detail?.documentNumber}</span>
          </Typography>
          {permission && (
            <Button
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              className="lineDropdown m-b-10"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              INVOICE OPTIONS
            </Button>
          )}
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {menuLinksForInvoice[detail.status]?.map((link: string) => {
              return (
                <MenuItem onClick={() => showDropdownLinks(link)} disableRipple>
                  {link}
                </MenuItem>
              );
            })}
          </StyledMenu>
        </div>
        <div className="stockContainer Dflex al-cnt">
          <StockStatus
            text="Current Due"
            stvalue={convertIntegerToDecimal(detail?.dueAmount)}
            classname="flex-wrap due normal-info"
          />
          <StockStatus
            text="Total Amount"
            stvalue={convertIntegerToDecimal(detail?.totalPrice)}
            classname="flex-wrap paid normal-info"
          />
          <StockStatus
            text="Date Sent"
            stvalue={
              (detail.status != 1 &&
                moment(
                  detail?.statusHistory?.filter(
                    (item: any) => item.status === 5
                  )[0]?.createdAt
                ).format("DD-MM-YYYY")) ||
              "N/A"
            }
            classname="flex-wrap gray normal-info"
          />
          <StockStatus
            text="Overdue Days"
            stvalue={getOverDueDays(detail)}
            classname="flex-wrap gray normal-info"
          />
        </div>
        <span
          className={`${getEstimateStatusCss(
            detail.status
          )} status-cover  m-t-20`}
        >
          {/* Classes are closed, pending, paid, cancelled */}
          {detail?.status ? getEstimateStatus(detail.status) : "N/A"}
        </span>
      </div>
      <DeleteDialogs
        dialogOpen={cancelOpen}
        popimg={deleteIMG}
        dialogTitle={`Cancel sales invoice`}
        yesHandle={() => {
          dispatch(markAsCancelSalesAndPurchase(detail._id));
          handleDialogClose();
          props.setOpenDetail(false);
          setAnchorEl(null);
        }}
        handleDialogClose={handleDialogClose}
        dialogPara="Are you sure you want to cancel this sales invoice?"
        nvCancel="Cancel"
        nvYes="Yes"
      />
      <DeleteDialogs
        dialogOpen={paidOpen}
        // popimg={deleteIMG}
        dialogTitle={`Partially Paid `}
        yesHandle={() => {
          dispatch(updateAmountSalesAndPurchase(formData));
          setAnchorEl(null);
          props.setOpenDetail(false);
          setPaidOpen(false);
          setOpenPartiallyPaid(false);
        }}
        handleDialogClose={() => setPaidOpen(false)}
        dialogPara="Are you sure you want to Partially Paid this sales invoice?"
        nvCancel="Cancel"
        nvYes="Yes"
      />
      {markPaidOpen && (
        <MarkPaid
          detail={detail}
          openPopup={markPaidOpen}
          setMarkPaidOpen={setMarkPaidOpen}
          setAnchorEl={setAnchorEl}
          setOpenDetail={setOpenDetail}
          markAspaidStatus={markAspaid}
        />
      )}
    </div>
  );
};

export default Estimate;
