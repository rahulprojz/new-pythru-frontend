import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./../buttons/button.scss";
import {
  CashMemoLabel,
  CreditNoteLabel,
  SalesInvoiceLabel,
  DeliveryLabel,
  EstimateLabel,
  SalesOrderLabel,
  PurchaseOrderLabel,
  ReceiptNoteLabel,
  BillLabel,
  ReceiptLabel,
  DebitNoteLabel,
} from "../../constants";

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

interface CreateMenuProps {
  type: string;
}

const CreateMenuDropDown = (props: CreateMenuProps) => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { type } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    document.body.classList.add("inherit-scroller");
  };
  const handleClose = () => {
    setAnchorEl(null);
    document.body.classList.remove("inherit-scroller");
  };

  const handleSalesInvoice = () => {
    navigate("/sales/invoice/add", SalesInvoiceLabel);
    setAnchorEl(null);
  };

  const handleCashMemo = () => {
    navigate("/sales/cash-memo/add", CashMemoLabel);
    setAnchorEl(null);
  };

  const handleCreditNote = () => {
    navigate("/sales/credit-note/add", CreditNoteLabel);
    setAnchorEl(null);
  };

  const handleDelivery = () => {
    navigate("/sales/delivery/add", DeliveryLabel);
    setAnchorEl(null);
  };

  const handleEstimate = () => {
    navigate("/sales/estimate/add", EstimateLabel);
    setAnchorEl(null);
  };

  const handleSalesOrder = () => {
    navigate("/sales/order/add", SalesOrderLabel);
    setAnchorEl(null);
  };

  const handleCustomer = () => {
    navigate("/payments/collect/customers/add");
    setAnchorEl(null);
  };

  const handleExpenses = () => {
    navigate("/expenses");
    setAnchorEl(null);
  };
  const handleVendor = () => {
    navigate("/payments/payouts/vendor/add");
    setAnchorEl(null);
  };

  const handlePurchaseOrder = () => {
    navigate("/purchase/purchase-order/add", PurchaseOrderLabel);
    setAnchorEl(null);
  };
  const handleRecieptNote = () => {
    navigate("/purchase/receipt-note/add", ReceiptNoteLabel);
    setAnchorEl(null);
  };

  const handleBills = () => {
    navigate("/purchase/bills/add", BillLabel);
    setAnchorEl(null);
  };
  const handleReceipt = () => {
    navigate("/purchase/receipt/add", ReceiptLabel);
    setAnchorEl(null);
  };

  const handleDebitNote = () => {
    navigate("/purchase/debit-note/add", DebitNoteLabel);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        className="btn m-r-20 buttonWithIcon"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        + Create
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {type === "sales" ? (
          <div>
            <MenuItem onClick={handleCustomer} disableRipple>
              Customer
            </MenuItem>
            <MenuItem onClick={handleEstimate} disableRipple>
              Estimate
            </MenuItem>
            <MenuItem onClick={handleSalesOrder} disableRipple>
              Sales Order
            </MenuItem>
            <MenuItem onClick={handleSalesInvoice} disableRipple>
              Sales Invoice
            </MenuItem>
            <MenuItem onClick={handleDelivery} disableRipple>
              Delivery Challan
            </MenuItem>
            <MenuItem onClick={handleCashMemo} disableRipple>
              Cash Memo
            </MenuItem>
            <MenuItem onClick={handleCreditNote} disableRipple>
              Credit Note
            </MenuItem>
          </div>
        ) : (
          <div>
            {/* <MenuItem onClick={handleExpenses} disableRipple>
              Expenses
            </MenuItem> */}
            <MenuItem onClick={handleVendor} disableRipple>
              Vendor
            </MenuItem>
            <MenuItem onClick={handlePurchaseOrder} disableRipple>
              Purchase Order
            </MenuItem>
            <MenuItem onClick={handleRecieptNote} disableRipple>
              Receipt Note
            </MenuItem>
            <MenuItem onClick={handleBills} disableRipple>
              Bills
            </MenuItem>
            <MenuItem onClick={handleReceipt} disableRipple>
              Receipt
            </MenuItem>
            <MenuItem onClick={handleDebitNote} disableRipple>
              Debit Note
            </MenuItem>
          </div>
        )}
      </StyledMenu>
    </div>
  );
};

export default CreateMenuDropDown;
