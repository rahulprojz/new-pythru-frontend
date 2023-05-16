import { useDispatch } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { SetStateAction, Dispatch, useCallback } from "react";
import DeleteDialog from "../../dialog/index";
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
  menuLinks,
  deleteIMG,
  getEstimateStatusCss,
} from "../../../constants";
import EstimateMenuDropDown from "../../menu/estimateDropDownMenu";
import {
  convertIntegerToDecimal,
  getFilterFormtedDate,
  getFormtedDate,
  getOverDueDays,
  getSentDate,
  getStateName,
} from "../../../utils";
import { useNavigate } from "react-router-dom";
import moment from "moment";
// import CancelDialog from "../common/CancelDialog";

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

  const { detail, setOpenDetail, permission } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [cancelOpen, setOpen] = React.useState<boolean>(false);

  const [expiredEstimateOpen, setEstimateOpen] = React.useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const markAsCancel = useCallback(() => {
    setOpen(true);
  }, [cancelOpen]);

  const downloadDoc = () => {
    dispatch(downloadSalesandPurchaseDetail(detail._id));
    setOpenDetail(false);
    setAnchorEl(null);
  };
  const resendInvoice = () => {
    console.log("showDropdownLinks", getFilterFormtedDate(detail.dueDate));
    console.log("moment()");
    const currentDate = new Date(moment().format("YYYY-MM-DD"));
    const dueDate = new Date(getFilterFormtedDate(detail.dueDate)); //

    if (detail.status == statusEnum.NOT_SENT && dueDate < currentDate) {
      setEstimateOpen(true);
    } else {
      dispatch(sendDoument(detail._id));
      setOpenDetail(false);
      setAnchorEl(null);
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
    setEstimateOpen(false);
  };

  const convertIntoInvoice = () => {
    let labelsRN = {
      state: {
        billTo: "Invoice To",
        salesOrderDate: "Invoice Date",
        dueDate: "Due Date",
        salesOrderNo: "Invoices No",
        salesOrderDesc: "Invoice Description",
        documentText: "Invoice",
        type: 1,
        redirect: "invoice",
        documentType: 3,
        isDocumentConverted: true,
        convertedFrom: detail._id,
      },
    };

    navigate("/sales/invoice/add/" + detail._id, labelsRN);
  };
  const convertIntoSalesOrder = () => {
    let labelsRN = {
      state: {
        billTo: "Bill To",
        salesOrderDate: "Sales Order Date",
        dueDate: "Due Date",
        salesOrderNo: "Sales Order No",
        salesOrderDesc: "Sales Order description",
        documentText: "Sales order",
        type: 1,
        redirect: "order",
        documentType: 2,
        isDocumentConverted: true,
        convertedFrom: detail._id,
      },
    };

    navigate("/sales/order/add/" + detail._id, labelsRN);
  };

  const convertIntoDeliveryChallan = () => {
    let labelsRN = {
      state: {
        billTo: "Bill To",
        salesOrderDate: "Delivery Challan Date",
        dueDate: "Due Date",
        salesOrderNo: "Delivery Challan Number",
        salesOrderDesc: "Delivery Challan Description",
        documentText: "Delivery Challan",
        type: 1,
        redirect: "delivery",
        documentType: 4,
        isDocumentConverted: true,
        convertedFrom: detail._id,
      },
    };

    navigate("/sales/delivery/add/" + detail._id, labelsRN);
  };

  const showDropdownLinks = (link: string) => {
    switch (link) {
      case "Download":
        return downloadDoc();
        break;
      case "Cancel":
        return markAsCancel();
        break;
      case "Resend Estimate":
        return resendInvoice();
        break;
      case "Send Estimate":
        return resendInvoice();
        break;
      case "Convert to invoice":
        return convertIntoInvoice();
        break;
      case "Convert to Sales Order":
        return convertIntoSalesOrder();
        break;
      case "Convert to Delivery Challan":
        return convertIntoDeliveryChallan();
        break;

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
              Estimate Options
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
            {menuLinks &&
              menuLinks[detail?.status] &&
              menuLinks[detail?.status].map((link: string) => {
                return (
                  <MenuItem
                    onClick={() => showDropdownLinks(link)}
                    disableRipple
                  >
                    {link}
                  </MenuItem>
                );
              })}
          </StyledMenu>
        </div>
        <div className="stockContainer Dflex al-cnt">
          <StockStatus
            text="Total Amount"
            stvalue={convertIntegerToDecimal(detail?.totalPrice)}
            classname="flex-wrap paid normal-info"
          />

          <StockStatus
            text="Date Sent"
            stvalue={
              (detail.status != statusEnum.NOT_SENT &&
                getSentDate(detail?.statusHistory, detail.status)) ||
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
          {" "}
          {/* Classes are closed, pending, paid, cancelled */}
          {detail?.status ? getEstimateStatus(detail.status) : "N/A"}
        </span>
      </div>
      <DeleteDialog
        dialogOpen={cancelOpen}
        popimg={deleteIMG}
        dialogTitle={`Cancel Estimate`}
        yesHandle={() => {
          dispatch(markAsCancelSalesAndPurchase(detail._id));
          setOpenDetail(false);
          setAnchorEl(null);
          handleDialogClose();
        }}
        handleDialogClose={handleDialogClose}
        dialogPara="Are you sure you want to cancel this estimate?"
        nvCancel="Cancel"
        nvYes="Yes"
      />
      <DeleteDialog
        dialogOpen={expiredEstimateOpen}
        popimg={deleteIMG}
        dialogTitle={`Estimate expired`}
        yesHandle={() => {
          handleDialogClose();
        }}
        handleDialogClose={handleDialogClose}
        dialogPara="You can not send this estimate as due date has expired"
        nvCancel="Close"
      />
    </div>
  );
};

export default Estimate;
