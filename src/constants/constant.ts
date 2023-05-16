import { AvatarIMG, ProductPlaceholder } from "./Image";

export const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
export const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const adharRegExp = /[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
export const panRegExp = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
export const gstRegExp =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
export const zipRegExp = /[1-9]{1}[0-9]{2}[0-9]{3}$/;
export const profileIcon = ProductPlaceholder;
export const phonePreventText = ["e", "E", "+", "-"];
export const space = /^\s/;

export const websiteRegex =
  /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

export const taxability = [
  { id: 1, title: "Taxable" },
  { id: 2, title: "Exempted" },
  { id: 3, title: "Nil rated" },
  { id: 4, title: "Non-GST" },
];
export const productServices = [
  { key: 1, title: "Product" },
  { key: 2, title: "Services" },
];
export const getStatus = (status: number) => {
  switch (status) {
    case 1:
      return "Active";
    case 2:
      return "Inactive";
    case 3:
      return "Deleted";
    default:
      return "N/A";
  }
};

export const getNavigationPath = (type: number) => {
  switch (type) {
    case 1:
      return "sales/estimate";
    case 2:
      return "sales/order";
    case 3:
      return "sales/invoice";
    case 4:
      return "sales/delivery";
    case 5:
      return "sales/credit-note";
    case 6:
      return "sales/cash-memo";
    case 7:
      return "purchase/purchase-order";
    case 8:
      return "purchase/receipt-note";
    case 9:
      return "purchase/bills";
    case 10:
      return "purchase/debit-note";
    case 11:
      return "purchase/receipt-note";
    case 18:
      return "products-&-services/products";
    case 19:
      return "sales/estimate";
    case 20:
      return "sales/estimate";
    case 21:
      return "sales/estimate";
    case 22:
      return "sales/invoice";
    default:
      return "purchase/purchase-dashboard";
  }
};

export const navEnum = {
  UPDATE_PASSWORD: 0,
  SIGN_UP_OTP: 1,
  FORGET_PASSWORD_OTP: 2,
  ADMIN: 24,
};

export const getStatusNumber = (status: any) => {
  switch (status) {
    case 1:
      return "2";
    case 2:
      return "1";
    case 3:
      return "3";
    default:
      return "N/A";
  }
};

export const getStatusMessage = (status: any, type: string) => {
  switch (status) {
    case "1":
      return `Are you sure you want to Active this ${type}?`;
    case "2":
      return `Are you sure you want to Inactive this ${type}?`;
    case "3":
      return `Are you sure you want to Deleted this ${type}?`;
    default:
      return "N/A";
  }
};

export const statusList = [
  { id: 0, title: "All" },
  { id: 1, title: "Active" },
  { id: 2, title: "Inactive" },
];
export const statusListRole = [
  { id: 1, title: "Active" },
  { id: 2, title: "Inactive" },
];

export const LIST_TYPE = {
  HSN_SAC: 1,
  SALES_UNIT: 2,
  GST_RATE: 3,
};

export const gstSlab = ["5", "12", "18", "28"];
export const statusEnum = {
  NOT_SENT: 1,
  PENDING: 2,
  APPROVED: 3,
  DECLINED: 4,
  PAYMENT_DUE: 5,
  PARTIALLY_PAID: 6,
  PAID: 7,
  CANCELED: 8,
  CLOSED: 9,
  EXPIRED: 10,
  DELETED: 11,
};

export const DOCUMENT_TYPE = {
  ESTIMATES: 1,
  SALES_ORDER: 2,
  INVOICE: 3,
  DELIVERY_CHALLAN: 4,
  CASH_MEMO: 6,
  CREDIT_NOTE: 5,
  PURCHASE_ORDER: 7,
  RECEIPT_NOTE: 8,
  BILLS: 9,
  DEBIT_NOTE: 10,
  RECEIPT: 11,
};

export const MANUAL_JOURNAL_TYPE = {
  CUSTOM: 1,
  SALES_PURCHASE: 2,
};

export const PAYMENT_MODE = {
  CASH: 1,
  BANK: 2,
};

export const TYPE = {
  SALES: 1,
  PURCHASE: 2,
};

export const DASHBOARD_TYPE = {
  SALES: "sales",
  PURCHASE: 2,
};

export const NOTIFICATION_TYPE = {
  OUT_OF_STOCK: 18,
  ACCEPT_ESTIMATE: 19,
  DECLINE_ESTIMATE: 20,
  EXPIRE_ESTIMATE: 21,
  ONE_DUE_DAY: 22,
};

export const BANK_TYPE = {
  PERFIOS: 1,
  ICICI: 2,
};

interface MenuDropDownLinks {
  [key: string]: string[];
}

export const menuLinks: MenuDropDownLinks = {
  1: ["Cancel", "Download", "Send Estimate"],
  2: ["Cancel", "Download", "Resend Estimate", "Convert to invoice"],
  3: [
    "Cancel",
    "Download",
    "Resend Estimate",
    "Convert to invoice",
    "Convert to Sales Order",
    "Convert to Delivery Challan",
  ],
  4: ["Download"],
  8: ["Download"],
  9: ["Download", "Resend Estimate"],
  10: ["Download"],
};

export const getEstimateStatus = (status: number) => {
  switch (status) {
    case 1:
      return "Not Sent";
    case 2:
      return "Pending";
    case 3:
      return "Approved";
    case 4:
      return "Declined";
    case 5:
      return "Payment Due";
    case 6:
      return "Partially Paid";
    case 7:
      return "Paid";
    case 8:
      return "Cancelled";
    case 9:
      return "Closed";
    case 10:
      return "Expired";
    default:
      return "Deleted";
  }
};

export const getEstimateStatusCss = (status: number) => {
  switch (status) {
    case 1:
      return "not-sent";
    case 2:
      return "pending";
    case 3:
      return "approved";
    case 4:
      return "declined";
    case 5:
      return "payment-due";
    case 6:
      return "paritally-paid";
    case 7:
      return "paid";
    case 8:
      return "cancelled";
    case 9:
      return "closed";
    case 10:
      return "expired";
    default:
      return "deleted";
  }
};

interface DashboardFiltersLabels {
  [key: number]: string;
}

export const dashboardFiltersLabels: DashboardFiltersLabels = {
  1: "All",
  2: "This Month",
  3: "This Week",
  4: "Today",
};

export const profitLossLabels: any = {
  1: "Current Financial year",
  2: " Previous Financial year",
  3: " Last 12 month",
};

export const getProductServiceMenu = (status: number) => {
  switch (status) {
    case 1:
      return "Inactive";
    case 2:
      return "Active";
  }
};

export const productServiceStatus = [
  { id: "1", name: "Active" },
  { id: "2", name: "Inactive" },
];

export const dashboardDropDown = [
  { id: "1", name: "Not Sent" },
  { id: "2", name: "Pending" },
  { id: "3", name: "Approved" },
  { id: "4", name: "Declined" },
  { id: "5", name: "Payment Due" },
  { id: "6", name: "Partially Paid" },
  { id: "7", name: "Paid" },
  { id: "8", name: "Cancelled" },
  { id: "9", name: "Closed" },
  { id: "10", name: "Expired" },
];
export const purchaseDashboardDropDown = [
  { id: "1", name: "Not Sent" },
  { id: "2", name: "Pending" },
  { id: "3", name: "Approved" },
  { id: "5", name: "Payment Due" },
  { id: "7", name: "Paid" },
  { id: "8", name: "Cancelled" },
  { id: "9", name: "Closed" },
];

export const estimateDropdown = [
  { id: "1", name: "Not Sent" },
  { id: "2", name: "Pending" },
  { id: "3", name: "Approved" },
  { id: "4", name: "Declined" },
  { id: "9", name: "Closed" },
  { id: "8", name: "Cancelled" },
  { id: "10", name: "Expired" },
];

export const orderDeliveryReceiptNoteDropdown = [
  { id: "1", name: "Not Sent" },
  { id: "2", name: "Pending" },
  { id: "8", name: "Cancelled" },
  { id: "9", name: "Closed" },
];

export const invoiceDropdown = [
  { id: "1", name: "Not Sent" },
  { id: "5", name: "Payment Due" },
  { id: "8", name: "Cancelled" },
  { id: "9", name: "Closed" },
  { id: "7", name: "Paid" },
  { id: "6", name: "Partially Paid" },
];

export const creditNoteDropdown = [
  { id: "1", name: "Not Sent" },
  { id: "5", name: "Payment Due" },
  { id: "8", name: "Cancelled" },
  // { id: "4", name: "Initiated" },
  { id: "7", name: "Paid" },
];

export const cashMemoReciptDropdown = [
  { id: "1", name: "Not Sent" },
  { id: "9", name: "Closed" },
];

export const billDropdown = [
  { id: "1", name: "Not Sent" },
  { id: "5", name: "Payment Due" },
  { id: "8", name: "Cancelled" },
  { id: "9", name: "Closed" },
  { id: "7", name: "Paid" },
  { id: "6", name: "Partially Paid" },
  // { id: "7", name: "Initiated" },
];
export const debitNoteDropdown = [
  { id: "1", name: "Not Sent" },
  { id: "5", name: "Payment Due" },
  { id: "8", name: "Cancelled" },
  { id: "7", name: "Paid" },
];

export const overDueDays = [
  { id: "1", name: "All" },
  //{ id: "2", name: "0 Days" },
  { id: "3", name: "1-7 Days" },
  { id: "4", name: "8-15 Days" },
  { id: "5", name: "16-30 Days" },
  { id: "6", name: "31-60 Days" },
  { id: "7", name: "61-90 Days" },
  { id: "8", name: "90+ Days" },
];

export const productServiceDropdown = [
  { id: "1", name: "Product" },
  { id: "2", name: "Service" },
];

export const manualJournalCategory = [
  { id: 1, name: "category1" },
  { id: 1, name: "category2" },
];

export const fileFormat = {
  excel:
    "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
  pdf: "data:application/pdf;base64,",
};

export const getDocumentType = (status: number) => {
  switch (status) {
    case 0:
      return "dashboard";
    case 1:
      return "estimate";
    case 2:
      return "order";
    case 3:
      return "invoice";
    case 4:
      return "delivery";
    case 5:
      return "credit-note";
    case 6:
      return "cash-memo";
    case 7:
      return "purchase-order";
    case 8:
      return "receipt-note";
    case 9:
      return "bill";
    case 10:
      return "debit-note";
    case 12:
      return "Expense";
    case 13:
      return "Customer";
    case 14:
      return "Vendor";
    case 15:
      return "GeneralLedger";
    case 16:
      return "Aged-payable";
    case 17:
      return "Aged-receivables";
    case 18:
      return "Products-categories";
    case 19:
      return "Services-categories";
    case 20:
      return "Sample-template";
    default:
      return "receipt";
  }
};

export const SalesInvoiceLabel = {
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
  },
};

export const CashMemoLabel = {
  state: {
    billTo: "Bill To",
    salesOrderDate: "Cash Memo Date",
    dueDate: "Due Date",
    salesOrderNo: "Cash Memo No",
    salesOrderDesc: "Cash Memo Description",
    documentText: "Cash Memo",
    type: 1,
    redirect: "cash-memo",
    documentType: 6,
  },
};

export const CreditNoteLabel = {
  state: {
    billTo: "Bill To",
    salesOrderDate: "Credit Note Date",
    dueDate: "Due Date",
    salesOrderNo: "Credit Note No",
    salesOrderDesc: "Credit Note Description",
    documentText: "Credit Note",
    documentType: 5,
    type: 1,
    redirect: "credit-note",
  },
};

export const DeliveryLabel = {
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
  },
};

export const EstimateLabel = {
  state: {
    billTo: "Customer",
    salesOrderDate: "Estimate Date",
    dueDate: "Expiry Date",
    salesOrderNo: "Estimate No",
    salesOrderDesc: "Notes & Terms",
    documentText: "Estimate",
    type: 1,
    redirect: "estimate",
    documentType: 1,
  },
};

export const SalesOrderLabel = {
  state: {
    billTo: "Bill To",
    salesOrderDate: "Sales Order Date",
    dueDate: "Due Date",
    salesOrderNo: "Sales Order No",
    salesOrderDesc: "Sales Order Description",
    documentText: "Sales order",
    type: 1,
    redirect: "order",
    documentType: 2,
  },
};
export const PurchaseOrderLabel = {
  state: {
    billTo: "Bill To",
    salesOrderDate: "Purchase Order Date",
    dueDate: "Expected Delivery Date",
    salesOrderNo: "Purchase Order No",
    salesOrderDesc: "Purchase Order Description",
    documentText: "Purchase Drder",
    redirect: "purchase-order",
    type: 2,
    documentType: 7,
  },
};

export const BillLabel = {
  state: {
    billTo: "Bill From",
    salesOrderDate: "Bill  Date",
    dueDate: "Due Date",
    salesOrderNo: "Bill No",
    salesOrderDesc: "Bill Description",
    documentText: "Bill",
    redirect: "bills",
    type: 2,
    documentType: 9,
  },
};

export const ReceiptLabel = {
  state: {
    billTo: "Bill To",
    salesOrderDate: "Receipt Date",
    dueDate: "Due Date",
    salesOrderNo: "Receipt No",
    salesOrderDesc: "Receipt Description",
    documentText: "Receipt",
    redirect: "receipts",
    type: 2,
    documentType: 11,
  },
};

export const ReceiptNoteLabel = {
  state: {
    billTo: "Bill To",
    salesOrderDate: "Receipt Note Date",
    dueDate: "Due Date",
    salesOrderNo: "Receipt Note No",
    salesOrderDesc: "Receipt Note Description",
    documentText: "Receipt Note",
    redirect: "receipt-note",
    type: 2,
    documentType: 8,
  },
};

export const DebitNoteLabel = {
  state: {
    billTo: "Bill To",
    salesOrderDate: "Debit Note Date",
    dueDate: "Due Date",
    salesOrderNo: "Debit Note No",
    salesOrderDesc: "Debit Note Description",
    documentText: "Debit Note",
    redirect: "debit-note",
    type: 2,
    documentType: 10,
  },
};

export const PermisstionRoleSelect = [
  { label: "View", type: "view" },
  { label: "Add", type: "add" },
  { label: "Edit", type: "edit" },
  { label: "Delete", type: "block" },
];

export const PermissionNotification = [
  { label: "View", type: "view" },
  { label: "Clear", type: "clear" },
];

export const AllPermissionsList = [
  {
    name: "Dashboard",
    roles: PermisstionRoleSelect,
    permissionType: "dashboard",
  },
  {
    name: "Product & Services",
    roles: PermisstionRoleSelect,
    permissionType: "productAndServices",
  },

  {
    name: "Payments",
    roles: PermisstionRoleSelect,
    permissionType: "payments",
  },
  {
    name: "Sales",
    roles: PermisstionRoleSelect,
    permissionType: "sales",
  },
  {
    name: "Purchases",
    roles: PermisstionRoleSelect,
    permissionType: "purchases",
  },
  {
    name: "Accounting",
    roles: PermisstionRoleSelect,
    permissionType: "accounting",
  },
  {
    name: "Reports",
    roles: PermisstionRoleSelect,
    permissionType: "reports",
  },
  {
    name: "Settings",
    roles: PermisstionRoleSelect,
    permissionType: "settings",
  },
  {
    name: "Banking",
    roles: PermisstionRoleSelect,
    permissionType: "banking",
  },
  {
    name: "Notification",
    roles: PermissionNotification,
    permissionType: "notification",
  },
];

export const dashboardChartStatic: any = {
  data: [0, 0, 0],
  label: ["Payment Due", "Paid", "Not Sent"],
  percentageValues: [0, 0, 0],
  total: 0.0,
};

export const bankAccountList = [
  { id: 1, name: "Allahabad Bank" },
  { id: 2, name: "Axis Bank" },
  { id: 3, name: "Andhra Bank" },
  { id: 4, name: "Bank of Bahrain and Kuwait" },
  { id: 5, name: "Kotak mahindra Bank" },
];

export const getNaigationPath = (path: string, navigate: any) => {
  switch (path !== "") {
    case path.includes("/sales/estimate/add"):
    case path.includes("/sales/estimate/edit"):
      return navigate(path, EstimateLabel);

    case path.includes("/sales/invoice/add"):
    case path.includes("/sales/invoice/edit"):
      return navigate(path, SalesInvoiceLabel);

    case path.includes("/sales/delivery/add"):
    case path.includes("/sales/delivery/edit"):
      return navigate(path, DeliveryLabel);

    case path.includes("/sales/order/add"):
    case path.includes("/sales/order/edit"):
      return navigate(path, SalesOrderLabel);

    case path.includes("/sales/cash-memo/add"):
    case path.includes("/sales/cash-memo/edit"):
      return navigate(path, CashMemoLabel);

    case path.includes("/sales/credit-note/add"):
    case path.includes("/sales/credit-note/edit"):
      return navigate(path, CreditNoteLabel);

    case path.includes("/purchase/purchase-order/add"):
    case path.includes("/purchase/purchase-order/edit"):
      return navigate(path, PurchaseOrderLabel);

    case path.includes("/purchase/receipt-note/add"):
    case path.includes("/purchase/receipt-note/edit"):
      return navigate(path, ReceiptNoteLabel);

    case path.includes("/purchase/bills/add"):
    case path.includes("/purchase/bills/edit"):
      return navigate(path, BillLabel);

    case path.includes("/purchase/receipt/add"):
    case path.includes("/purchase/receipt/edit"):
      return navigate(path, ReceiptLabel);

    case path.includes("/purchase/debit-note/add"):
    case path.includes("/purchase/debit-note/edit"):
      return navigate(path, DebitNoteLabel);

    default:
      return navigate(path);
  }
};

export const invoice_Static: any = [
  {
    className: "payment-due",
    name: "Payment Due",
    percentage: 0,
    value: 0,
    color: "#7ad3ff",
  },
  {
    className: "paid",
    name: "Paid",
    percentage: 0,
    value: 0,
    color: "#5e66ff",
  },
  {
    className: "not-sent",
    name: "Not Sent",
    percentage: 0,
    value: 0,
    color: "#ffd572",
  },

  {
    className: "closed",
    name: "Closed",
    percentage: 0,
    value: 0,
    color: "#fa2352",
  },
  {
    className: "partial-paid",
    name: "Partially Paid",
    percentage: 0,
    value: 0,
    color: "#b0ff80",
  },
];

export const bill_Static: any = [
  {
    className: "payment-due",
    name: "Payment Due",
    percentage: 0,
    value: 0,
    color: "#7ad3ff",
  },
  {
    className: "paid",
    name: "Paid",
    percentage: 0,
    value: 0,
    color: "#5e66ff",
  },
  {
    className: "not-sent",
    name: "Not Sent",
    percentage: 0,
    value: 0,
    color: "#ffd572",
  },

  {
    className: "closed",
    name: "Closed",
    percentage: 0,
    value: 0,
    color: "#fa2352",
  },
  {
    className: "partial-paid",
    name: "Partially Paid",
    percentage: 0,
    value: 0,
    color: "#b0ff80",
  },
];
export const CUSTOM_BANK_LIST = [
  {
    autoSyncSupported: true,
    instCode: 22,
    instId: 22,
    instName: "ICICI Bank, India",
    instType: "bank",
    instLogo: "NA",
    logo: "/bank-images/ICICI.png",
  },
  // {
  //   autoSyncSupported: true,
  //   instCode: 35,
  //   instId: 35,
  //   instName: "State Bank of India, India",
  //   instType: "bank",
  //   instLogo: "NA",
  //   logo: "/bank-images/SBI.png",
  // },
];
export const bankingStatementDropDown = [
  { id: "1", name: "This Month" },
  { id: "2", name: "Last 3 Month" },
  { id: "3", name: "Last 12 Month" },
  { id: "4", name: "Custom" },
];
