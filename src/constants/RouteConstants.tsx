const routeConstants = {
  login: "/",
  loginPage: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  otp: "/otp",
  resetPassword: "/reset-password",
  resetPasswordOtpVerification: "/reset-password-otp-verification",
  thanksForRegister: "/thanks-for-register",
  dashboard: "/dashboard",
  payroll: "/payroll",
  products: "/products-&-services/products",
  services: "/products-&-services/services",
  phoneVerification: "/phone-verification",
  phoneVerificationOtp: "/phone-verification-otp",
  thanksResetPassword: "/thanks-for-reset-password",

  salesCustomers: "/sales/customers",
  salesCustomersAdd: "/sales/customers/add",
  salesCustomersEdit: "/sales/customers/edit/:id",

  purchaseVender: "/purchase/vendor",
  purchaseVenderAdd: "/purchase/vendor/add",
  purchaseVenderEdit: "/purchase/vendor/edit/:id",
  customerAdd: "/payments/collect/customers/add",
  customerEdit: "/payments/collect/customers/edit/:id",
  paymentCustomers: "/payments/collect/customers",
  paymentvendors: "/payments/payouts/vendor",
  vendorsAdd: "/payments/payouts/vendor/add",
  vendorsEdit: "/payments/payouts/vendor/edit/:id",
  paymentVendor: "/payouts/vendor",
  assets: "/assets",
  salesDashboard: "/sales/sales-dashboard",
  manualJournals: "accounting/manual-journals",
  estimate: "/sales/estimate",
  addEstimate: "/sales/estimate/add",
  estimateEdit: "/sales/estimate/edit/:id",
  estimateInvoice: "/estimate/invoice",
  salesOrder: "/sales/order",
  addSalesOrder: "/sales/order/add",
  salesOrderEdit: "/sales/order/edit/:id",
  salesInvoice: "/sales/invoice",
  addsalesInvoice: "/sales/invoice/add",
  addsalesOrderToInvoice: "/sales/invoice/add/:id",
  paymentInvoiceEdit: "/payments/collect/invoices/edit/:id",
  edtiSalesInvoice: "/sales/invoice/edit/:id",

  salesOrderInvoice: "/order/invoice",
  salesDelivery: "/sales/delivery",
  addSalesDelivery: "/sales/delivery/add",
  addSalesOrderToDelivery: "/sales/delivery/add/:id",
  salesDeliveryEdit: "/sales/delivery/edit/:id",
  salesCashMemo: "/sales/cash-memo",
  addSalesCashMemo: "/sales/cash-memo/add",
  salesCashMemoEdit: "/sales/cash-memo/edit/:id",
  salesCreditNote: "/sales/credit-note",
  addSalesCreditNote: "/sales/credit-note/add",
  salesCreditNoteEdit: "/sales/credit-note/edit/:id",
  invoices: "/invoices",
  invoiceAdd: "/invoice/add",
  invoiceView: "/invoice/view",
  accountsChart: "/accounting/chart-of-accounts",
  expenses: "/expenses",
  settings: "/settings",
  // cashflow: "/cashflow",
  general: "/reports/general-ledger",
  // trial: "/trial",
  // general: "/general",
  trial: "/reports/trial-balance",
  balance: "/reports/balance-sheet",
  // profitLoss: "/profit-loss",
  agedReceivables: "/reports/aged-reveivables",
  agedPayable: "/reports/aged-payables",
  profitLoss: "/reports/profit-loss",
  cashflow: "/reports/cash-flow",
  // agedReceivables: "/aged-reveivables",
  purchaseDashboard: "/purchase/purchase-dashboard",
  bills: "/purchase/bills",
  payoutsBills: "payments/payouts/bills",
  po: "/purchase/purchase-order",
  receiptNote: "/purchase/receipt-note",
  receipt: "/purchase/receipts",
  debitNote: "/purchase/debit-note",
  billEdit: "/purchase/bills/edit/:id",
  payoutBillAdd: "payments/payouts/bills/add",
  payoutBillEdit: "/payments/payouts/bills/edit/:id",
  billAdd: "/purchase/bills/add/",
  purchaseOrderAdd: "/purchase/purchase-order/add",
  purchaseOrderEdit: "/purchase/purchase-order/edit/:id",
  receiptNoteAdd: "/purchase/receipt-note/add",
  receiptNoteEdit: "/purchase/receipt-note/edit/:id",
  receiptAdd: "/purchase/receipt/add",
  receiptEdit: "/purchase/receipts/edit/:id",
  debitNoteAdd: "/purchase/debit-note/add",
  debitNoteEdit: "/purchase/debit-note/edit/:id",
  debitNoteConvert: "/purchase/debit-note/add/:id",
  receiptConvert: "/purchase/receipt/add/:id",
  receiptNoteConvert: "/purchase/receipt-note/add/:id",
  billConvert: "/purchase/bills/add/:id",
  creditNoteConvert: "/sales/credit-note/add/:id",
  cashMemoConvert: "/sales/cash-memo/add/:id",
  saleOrderConvert: "/sales/order/add/:id",
  deliveryChallanConvert: "/sales/delivery/add/:id",
  paymentInvoice: "/payments/collect/invoices",
  paymentBill: "/payment/payout/bill",
  role: "/role",
  member: "/team-member",
  pageNotFound: "*",
  postEmailVerfication: "/change-estimate-status",
  transactions: "/accounting/transactions",
  banking: "/banking",
  userManagement: "/team-management",
  bulkProductUpload: "/products-&-services/products/bulk-upload",
  bulkServiceUpload: "/products-&-services/services/bulk-upload",
  customerBulkUpload: "/payments/collect/customers/bulk-upload",
  vendorBulkUpload: "/payments/payouts/vendor/bulk-upload",
  paymentInvoiceAdd: "/payments/collect/invoices/add",
};

export const routesConstant = {
  routeConstants,
};
export default routesConstant;
