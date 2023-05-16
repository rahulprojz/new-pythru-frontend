import { useDispatch } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { SetStateAction, Dispatch, useCallback } from "react";
import DeleteDialogs from "../../dialog/index";
import {
  markAsCancelSalesAndPurchase,
  downloadSalesandPurchaseDetail,
  sendDoument,
} from "../../../screens/saleandPurchase/action";
import StockStatus from "../../stock";

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
  getSentDate,
  getStateName,
} from "../../../utils";
import { useNavigate } from "react-router-dom";

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

interface EstimateMenuProps {
  detail: any;
  setOpenDetail: React.Dispatch<React.SetStateAction<boolean>>;
  permission: any;
}

const DeliveryChallan = (props: EstimateMenuProps) => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { detail, setOpenDetail, permission } = props;

  let labelsRN = {
    state: {
      billTo: "Invoice To",
      salesOrderDate: "Invoice Date",
      dueDate: "Due Date",
      salesOrderNo: "Invoices No",
      salesOrderDesc: "Invoice Description",
      documentText: "Invoices",
      type: 1,
      redirect: "invoice",
      documentType: 3,
      isDocumentConverted: true,
      convertedFrom: detail._id,
    },
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [cancelOpen, setOpen] = React.useState<boolean>(false);
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
    props.setOpenDetail(false);
    setAnchorEl(null);
  };
  const sendDeliveryChallan = () => {
    dispatch(sendDoument(detail._id));
    props.setOpenDetail(false);
    setAnchorEl(null);
  };
  const convertIntoInvoice = () => {
    navigate("/sales/invoice/add/" + detail._id, labelsRN);
  };

  return (
    <div>
      <div className="invoice-detail-card m-b-20">
        <div className="Dflex al-cnt sp-bt m-b-10 wrap">
          <Typography variant="subtitle2" className="m-b-10">
            Collection Activity :
            <span className="bold">{detail.documentNumber}</span>
          </Typography>
          {permission && (
            <Button
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              disableElevation
              className="lineDropdown m-b-10"
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Delivery Challan options
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
            {[statusEnum.NOT_SENT, statusEnum.PENDING].includes(
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
              statusEnum.PENDING,
              statusEnum.CANCELED,
              statusEnum.CLOSED,
            ].includes(detail.status) ? (
              <MenuItem onClick={downloadDoc} disableRipple>
                Download
              </MenuItem>
            ) : (
              <></>
            )}

            {[
              statusEnum.NOT_SENT,
              statusEnum.PENDING,
              statusEnum.CLOSED,
            ].includes(detail.status) ? (
              <MenuItem onClick={sendDeliveryChallan} disableRipple>
                Send Delivery challan
              </MenuItem>
            ) : (
              <></>
            )}

            {[statusEnum.NOT_SENT, statusEnum.PENDING].includes(
              detail.status
            ) ? (
              <MenuItem onClick={convertIntoInvoice} disableRipple>
                Convert into Invoice
              </MenuItem>
            ) : (
              <></>
            )}
          </StyledMenu>
        </div>
        <div className="stockContainer Dflex al-cnt">
          <StockStatus
            text="Total Amount"
            stvalue={convertIntegerToDecimal(detail?.totalPrice)}
            classname="flex-wrap paid normal-info"
          />
          <StockStatus
            text="Date sent"
            stvalue={getSentDate(detail?.statusHistory, detail.status)}
            classname="flex-wrap gray normal-info"
          />
          <StockStatus
            text="Overdue Days"
            stvalue={getOverDueDays(detail)}
            classname="flex-wrap gray normal-info"
          />
          {false && (
            <StockStatus
              text="Days Overdue"
              stvalue={0}
              classname="flex-wrap gray normal-info"
            />
          )}
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
      <DeleteDialogs
        dialogOpen={cancelOpen}
        popimg={deleteIMG}
        dialogTitle={`Cancel Delivery Challan`}
        yesHandle={() => {
          dispatch(markAsCancelSalesAndPurchase(detail._id));
          props.setOpenDetail(false);
          setAnchorEl(null);
          handleDialogClose();
        }}
        handleDialogClose={handleDialogClose}
        dialogPara="Are you sure you want to cancel this Delivery Challan?"
        nvCancel="Cancel"
        nvYes="Yes"
      />
    </div>
  );
};

export default DeliveryChallan;
