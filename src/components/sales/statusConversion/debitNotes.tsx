import { useDispatch } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { SetStateAction, Dispatch, useCallback } from "react";
import moment from "moment";
import DeleteDialogs from "../../dialog/index";
import {
  markAsCancelSalesAndPurchase,
  downloadSalesandPurchaseDetail,
  sendDoument,
  updateAmountSalesAndPurchase,
} from "../../../screens/saleandPurchase/action";
import StockStatus from "../../stock";
import DeleteDialog from "../../../components/dialog";

import Typography from "@mui/material/Typography";
import {
  PHONE_ICON_OUTLINE,
  MAIL_ICON_OUTLINE,
  LOGOBLUE,
  HORIZONTAL_DOTS_CIRCULAR,
  getEstimateStatus,
  statusEnum,
  deleteIMG,
  getEstimateStatusCss,
} from "../../../constants";
import EstimateMenuDropDown from "../../menu/estimateDropDownMenu";
import {
  convertIntegerToDecimal,
  getFormtedDate,
  getOverDueDays,
  getStateName,
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

let labelsBill = {
  state: {
    billTo: "Bill From",
    salesOrderDate: "Receipt  Date",
    dueDate: "Due Date",
    salesOrderNo: "bills No",
    salesOrderDesc: "bills description",
    documentText: "bills",
    redirect: "bills",
    type: 2,
    documentType: 9,
  },
};
let labelsRN = {
  state: {
    billTo: "Bill To",
    salesOrderDate: "Receipt Note Date",
    dueDate: "Due Date",
    salesOrderNo: "Receipt Note No",
    salesOrderDesc: "Receipt Note description",
    documentText: "Receipt Note",
    redirect: "receipt-note",
    type: 2,

    documentType: 8,
    // isDocumentConverted: true,
    // convertedFrom: detail._id,
  },
};
interface EstimateMenuProps {
  detail: any;
  setOpenDetail: any;
  permission: any;
}

const Index = (props: EstimateMenuProps) => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [submitModal, setSubmitModal] = React.useState(false);

  const { detail, permission } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [cancelOpen, setOpen] = React.useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [markPaidOpen, setMarkPaidOpen] = React.useState<boolean>(false);
  const [markAspaid, setMarkPaid] = React.useState<boolean>(true);

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
  };
  const resendPurchaseOrder = () => {
    dispatch(sendDoument(detail._id));
    setAnchorEl(null);
    props.setOpenDetail(false);
  };
  const convertIntoRN = () => {
    navigate("/purchase/receipt-note/add/" + detail._id, labelsRN);
  };
  const convertIntoBill = () => {
    navigate("/purchase/bills/add/" + detail._id, labelsBill);
  };
  const markAsPaid = () => {
    setSubmitModal(true);
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
              Debit Note Options
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
            {[statusEnum.NOT_SENT, statusEnum.PAYMENT_DUE].includes(
              detail.status
            ) ? (
              <MenuItem onClick={markAsCancel} disableRipple>
                Cancel
              </MenuItem>
            ) : (
              <></>
            )}
            {[
              statusEnum.NOT_SENT,
              statusEnum.CANCELED,
              statusEnum.PAID,
              statusEnum.PAYMENT_DUE,
            ].includes(detail.status) ? (
              <MenuItem onClick={downloadDoc} disableRipple>
                Download
              </MenuItem>
            ) : (
              <></>
            )}
            {[statusEnum.NOT_SENT].includes(detail.status) ? (
              <MenuItem onClick={resendPurchaseOrder} disableRipple>
                Send Debit Note
              </MenuItem>
            ) : (
              <></>
            )}
            {[statusEnum.PAYMENT_DUE, statusEnum.PAID].includes(
              detail.status
            ) ? (
              <MenuItem onClick={resendPurchaseOrder} disableRipple>
                Resend Debit Note
              </MenuItem>
            ) : (
              <></>
            )}
            {[statusEnum.PAYMENT_DUE].includes(detail.status) ? (
              <MenuItem
                onClick={() => {
                  setMarkPaidOpen(true);
                  setAnchorEl(null);
                  setMarkPaid(false);
                }}
                disableRipple
              >
                Mark as Paid
              </MenuItem>
            ) : (
              <></>
            )}
          </StyledMenu>
        </div>
        <div className="stockContainer Dflex al-cnt">
          <StockStatus
            text="Outstanding"
            stvalue={`${convertIntegerToDecimal(detail?.dueAmount)}` || `₹0`}
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
              detail.statusHistory?.filter((item: any) => item.status == 5)
                .length
                ? moment(
                    detail.statusHistory?.filter(
                      (item: any) => item.status === 5
                    )[0].createdAt
                  ).format("DD-MM-YYYY")
                : "N/A"
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
          {" "}
          {/* Classes are closed, pending, paid, cancelled */}
          {detail?.status ? getEstimateStatus(detail.status) : "N/A"}
        </span>
      </div>
      {markPaidOpen && (
        <MarkPaid
          detail={detail}
          openPopup={markPaidOpen}
          setMarkPaidOpen={setMarkPaidOpen}
          setAnchorEl={setAnchorEl}
          setOpenDetail={props.setOpenDetail}
          markAspaidStatus={markAspaid}
        />
      )}
      <DeleteDialogs
        dialogOpen={cancelOpen}
        popimg={deleteIMG}
        dialogTitle={`Cancel debit note`}
        yesHandle={() => {
          dispatch(markAsCancelSalesAndPurchase(detail._id));
          props.setOpenDetail(false);
          setAnchorEl(null);
          handleDialogClose();
        }}
        handleDialogClose={handleDialogClose}
        dialogPara="Are you sure you want to cancel this debit note?"
        nvCancel="Cancel"
        nvYes="Yes"
      />
    </div>
  );
};

export default Index;
