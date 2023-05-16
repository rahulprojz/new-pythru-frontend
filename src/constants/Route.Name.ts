import { lazy } from "react";
import constant from "./RouteConstants";

const Login = lazy(() => import("../screens/onboarding/login"));
const ResetPassword = lazy(() => import("../screens/onboarding/resetPassword"));
const Signup = lazy(() => import("../screens/onboarding/signup"));
const ForgotPassword = lazy(
  () => import("../screens/onboarding/forgotPassword")
);
const OTP = lazy(() => import("../screens/onboarding/otp"));
const ThanksForregister = lazy(
  () => import("../screens/onboarding/registationThanks")
);
const Products = lazy(() => import("../screens/productandServices/products"));
const Assets = lazy(() => import("../screens/accounting/assets"));

const EstimateInvoice = lazy(
  () => import("../screens/saleandPurchase/sales/estimate/estimateInvoice")
);

const SalesDashboard = lazy(
  () => import("../screens/saleandPurchase/sales/dashboard")
);
const PurchaseDashboard = lazy(
  () => import("../screens/saleandPurchase/purchase/dashboard")
);

const Estimate = lazy(
  () => import("../screens/saleandPurchase/sales/estimate")
);

const salesOrders = lazy(
  () => import("../screens/saleandPurchase/sales/salesOrder")
);

const salesInvoices = lazy(
  () => import("../screens/saleandPurchase/sales/salesInvoice")
);

const deliveryOrders = lazy(
  () => import("../screens/saleandPurchase/sales/deliveryChallan")
);

const cashMemo = lazy(
  () => import("../screens/saleandPurchase/sales/cashMemo")
);

const creditNote = lazy(
  () => import("../screens/saleandPurchase/sales/creditNote")
);

const salesAddForm = lazy(() => import("../components/sales/common/AddEdit"));
const SalesPurchaAddForm = lazy(
  () => import("../components/sales/common/AddEdit")
);

const salesAddInvoiceFrom = lazy(
  () => import("../components/sales/common/AddEdit")
);

const Customers = lazy(() => import("../screens/payments/customers"));
const CustomerAdd = lazy(
  () => import("../screens/payments/customers/CustomerAdd")
);

const Expenses = lazy(() => import("../screens/purchase/expenses"));

const Services = lazy(() => import("../screens/productandServices/services"));
const Invoices = lazy(() => import("../screens/payments/invoices"));
const InvoiceAdd = lazy(
  () => import("../screens/payments/invoices/AddInvoice")
);
const InvoiceView = lazy(
  () => import("../screens/payments/invoices/InvoiceView")
);
const Settings = lazy(() => import("../screens/settings/index"));
// const Cashflow = lazy(() => import("../screens/reports/cashflow/index"));
const General = lazy(
  () => import("../screens/reports/trailAndgeneral/general/general")
);
const TrialBalance = lazy(
  () => import("../screens/reports/trailAndgeneral/trailBalance")
);
const BalanceSheet = lazy(
  () => import("../screens/reports/profitLossAndCashflow/balanceSheet")
);
const ProfitLoss = lazy(
  () => import("../screens/reports/profitLossAndCashflow/profitLoss")
);
const Cashflow = lazy(
  () => import("../screens/reports/profitLossAndCashflow/cashFlow")
);

const AgedReceivables = lazy(
  () => import("../screens/reports/agedReceivablesAndPayable/reciable")
);
const AgedPayable = lazy(
  () => import("../screens/reports/agedReceivablesAndPayable/payable")
);

// const PurchaseOrderInvoice = lazy(
//   () =>
//     import(
//       "../screens/saleandPurchase/purchase/purchaseOrder/purchaseOrderInvoice"
//     )
// );

const AccountsChart = lazy(() => import("../screens/accounting/accountsChart"));

const ManualJournals = lazy(
  () => import("../screens/accounting/manualJournals")
);

const ResetPasswordOtpVerification = lazy(
  () => import("../screens/onboarding/resetPasswordOtp")
);
const PhoneVerification = lazy(
  () => import("../screens/onboarding/phoneVerificationForSocialSignup")
);
const PhoneVerificationOtp = lazy(
  () => import("../screens/onboarding/mobileVerificationForSocialSignupOtp")
);
const Dashboard = lazy(() => import("../screens/dashborad"));
const Payroll = lazy(() => import("../screens/payroll"));
const ThanksResetPassword = lazy(
  () => import("../screens/onboarding/thanksForReset")
);
const Bills = lazy(() => import("../screens/saleandPurchase/purchase/bills"));
const Po = lazy(
  () => import("../screens/saleandPurchase/purchase/purchaseOrder")
);
const ReceiptNote = lazy(
  () => import("../screens/saleandPurchase/purchase/receiptNote")
);
const Receipt = lazy(
  () => import("../screens/saleandPurchase/purchase/Receipt")
);
const DebitNote = lazy(
  () => import("../screens/saleandPurchase/purchase/debitNote")
);
const Role = lazy(() => import("../screens/teamManagement/role/role"));
const Member = lazy(() => import("../screens/teamManagement/member/member"));

const PostEmailVerfication = lazy(
  () => import("../screens/onboarding/EmailPostVerfication")
);
const Banking = lazy(() => import("../screens/banking/index"));

const bulkUploadPage = lazy(
  () => import("../screens/productandServices/bulkUpload")
);

const customerBulkUploadPage = lazy(
  () => import("../screens/payments/bulkUpload")
);

const { routeConstants } = constant;

const {
  login,
  pageNotFound,
  loginPage,
  signup,
  forgotPassword,
  otp,
  resetPassword,
  resetPasswordOtpVerification,
  thanksForRegister,
  dashboard,
  payroll,
  products,
  services,
  phoneVerification,
  phoneVerificationOtp,
  salesCustomers,
  salesCustomersAdd,
  salesCustomersEdit,
  purchaseVender,
  assets,
  estimate,
  addEstimate,
  estimateInvoice,
  customerEdit,
  estimateEdit,
  thanksResetPassword,
  customerAdd,
  invoices,
  invoiceAdd,
  invoiceView,
  accountsChart,
  manualJournals,
  // addPurchaseOrder,
  // purchaseOrderInvoice,
  expenses,
  settings,
  paymentCustomers,
  paymentvendors,
  vendorsAdd,
  vendorsEdit,
  cashflow,
  general,
  trial,
  balance,
  profitLoss,
  agedReceivables,
  bills,
  po,
  receiptNote,
  receipt,
  debitNote,
  role,
  member,
  salesOrder,
  addSalesOrder,
  salesOrderEdit,
  salesInvoice,
  addsalesInvoice,
  edtiSalesInvoice,
  salesDelivery,
  addSalesDelivery,
  salesDeliveryEdit,
  salesOrderInvoice,
  salesCashMemo,
  addSalesCashMemo,
  salesCashMemoEdit,
  salesCreditNote,
  addSalesCreditNote,
  salesCreditNoteEdit,
  billEdit,
  billAdd,
  purchaseDashboard,
  purchaseOrderAdd,
  purchaseOrderEdit,
  receiptNoteAdd,
  receiptNoteEdit,
  receiptAdd,
  receiptEdit,
  debitNoteAdd,
  debitNoteEdit,
  postEmailVerfication,
  salesDashboard,
  debitNoteConvert,
  receiptConvert,
  receiptNoteConvert,
  billConvert,
  addsalesOrderToInvoice,
  addSalesOrderToDelivery,
  creditNoteConvert,
  cashMemoConvert,
  saleOrderConvert,
  deliveryChallanConvert,
  paymentInvoice,
  paymentBill,
  agedPayable,
  purchaseVenderEdit,
  purchaseVenderAdd,
  transactions,
  paymentVendor,
  payoutsBills,
  banking,
  userManagement,
  bulkProductUpload,
  bulkServiceUpload,
  customerBulkUpload,
  vendorBulkUpload,
  paymentInvoiceAdd,
  paymentInvoiceEdit,
  payoutBillAdd,
  payoutBillEdit,
} = routeConstants;

export const RoutesPath = [
  {
    path: login,
    element: Login,
  },
  {
    path: loginPage,
    element: Login,
  },
  {
    path: resetPassword,
    element: ResetPassword,
  },
  {
    path: signup,
    element: Signup,
  },
  {
    path: forgotPassword,
    element: ForgotPassword,
  },
  {
    path: otp,
    element: OTP,
  },
  {
    path: resetPasswordOtpVerification,
    element: ResetPasswordOtpVerification,
  },
  {
    path: thanksForRegister,
    element: ThanksForregister,
  },

  {
    path: phoneVerification,
    element: PhoneVerification,
  },
  {
    path: phoneVerificationOtp,
    element: PhoneVerificationOtp,
  },
  {
    path: postEmailVerfication,
    element: PostEmailVerfication,
  },
  {
    path: thanksResetPassword,
    element: ThanksResetPassword,
  },

  // {
  //   path: pageNotFound,
  //   element: Pagenotfound,
  // },
];

export const PrivateRoutesPath = [
  {
    path: salesCustomers,
    element: Customers,
  },
  {
    path: salesCustomersAdd,
    element: CustomerAdd,
  },
  {
    path: salesCustomersEdit,
    element: CustomerAdd,
  },
  {
    path: purchaseVender,
    element: Customers,
  },
  {
    path: purchaseVenderAdd,
    element: CustomerAdd,
  },
  {
    path: purchaseVenderEdit,
    element: CustomerAdd,
  },
  {
    path: paymentCustomers,
    element: Customers,
  },
  {
    path: paymentvendors,
    element: Customers,
  },
  {
    path: customerAdd,
    element: CustomerAdd,
  },
  {
    path: customerEdit,
    element: CustomerAdd,
  },
  // {
  //   path: vendors,
  //   element: Customers,
  // },
  {
    path: vendorsAdd,
    element: CustomerAdd,
  },
  {
    path: vendorsEdit,
    element: CustomerAdd,
  },
  {
    path: paymentVendor,
    element: Customers,
  },
  {
    path: invoices,
    element: Invoices,
  },
  {
    path: invoiceAdd,
    element: InvoiceAdd,
  },
  {
    path: invoiceView,
    element: InvoiceView,
  },
  {
    path: accountsChart,
    element: AccountsChart,
  },
  {
    path: assets,
    element: Assets,
  },
  {
    path: manualJournals,
    element: ManualJournals,
  },

  {
    path: dashboard,
    element: Dashboard,
  },
  {
    path: payroll,
    element: Payroll,
  },

  {
    path: products,
    element: Products,
  },
  {
    path: services,
    element: Services,
  },
  {
    path: salesDashboard,
    element: SalesDashboard,
  },

  {
    path: purchaseDashboard,
    element: PurchaseDashboard,
  },
  // {
  //   path: addPurchaseOrder,
  //   element: AddPurchaseOrder,
  // },
  // {
  //   path: purchaseOrderInvoice,
  //   element: PurchaseOrderInvoice,
  // },

  {
    path: estimate,
    element: Estimate,
  },
  {
    path: addEstimate,
    //element: AddEstimate,
    element: salesAddForm,
  },

  {
    path: estimateEdit,
    element: salesAddForm,
  },

  {
    path: estimateInvoice,
    element: EstimateInvoice,
  },

  {
    path: salesOrder,
    element: salesOrders,
  },
  {
    path: addSalesOrder,
    element: SalesPurchaAddForm,
  },

  {
    path: salesOrderEdit,
    element: SalesPurchaAddForm,
  },

  {
    path: salesDelivery,
    element: deliveryOrders,
  },
  {
    path: addSalesDelivery,
    element: salesAddForm,
  },
  {
    path: addSalesOrderToDelivery,
    element: salesAddForm,
  },
  {
    path: salesDeliveryEdit,
    element: salesAddForm,
  },
  {
    path: salesCreditNote,
    element: creditNote,
  },
  {
    path: addSalesCreditNote,
    element: salesAddForm,
  },

  {
    path: salesCreditNoteEdit,
    element: salesAddForm,
  },
  {
    path: salesCashMemo,
    element: cashMemo,
  },
  {
    path: addSalesCashMemo,
    element: salesAddForm,
  },

  {
    path: salesCashMemoEdit,
    element: salesAddForm,
  },
  {
    path: salesInvoice,
    element: salesInvoices,
  },
  {
    path: paymentInvoice,
    element: salesInvoices,
  },
  {
    path: addsalesInvoice,
    element: salesAddForm,
  },
  {
    path: paymentInvoiceEdit,
    element: salesAddForm,
  },
  {
    path: payoutBillAdd,
    element: salesAddForm,
  },
  {
    path: payoutBillEdit,
    element: salesAddForm,
  },

  {
    path: addsalesOrderToInvoice,
    element: salesAddForm,
  },
  {
    path: edtiSalesInvoice,
    element: salesAddForm,
  },
  {
    path: paymentInvoiceAdd,
    element: salesAddForm,
  },
  {
    path: salesOrderInvoice,
    element: EstimateInvoice,
  },

  {
    path: expenses,
    element: Expenses,
  },
  {
    path: settings,
    element: Settings,
  },
  {
    path: cashflow,
    element: Cashflow,
  },
  {
    path: general,
    element: General,
  },
  {
    path: trial,
    element: TrialBalance,
  },
  {
    path: balance,
    element: BalanceSheet,
  },
  {
    path: profitLoss,
    element: ProfitLoss,
  },
  {
    path: agedReceivables,
    element: AgedReceivables,
  },
  {
    path: agedPayable,
    element: AgedPayable,
  },
  {
    path: bills,
    element: Bills,
  },
  {
    path: payoutsBills,
    element: Bills,
  },
  {
    path: po,
    element: Po,
  },
  {
    path: receiptNote,
    element: ReceiptNote,
  },
  {
    path: receipt,
    element: Receipt,
  },
  {
    path: debitNote,
    element: DebitNote,
  },
  {
    path: billEdit,
    element: SalesPurchaAddForm,
  },
  {
    path: billAdd,
    element: SalesPurchaAddForm,
  },
  {
    path: purchaseOrderAdd,
    element: SalesPurchaAddForm,
  },
  {
    path: purchaseOrderEdit,
    element: SalesPurchaAddForm,
  },
  {
    path: receiptNoteAdd,
    element: SalesPurchaAddForm,
  },
  {
    path: receiptNoteEdit,
    element: SalesPurchaAddForm,
  },
  {
    path: receiptAdd,
    element: SalesPurchaAddForm,
  },
  {
    path: receiptEdit,
    element: SalesPurchaAddForm,
  },
  {
    path: debitNoteAdd,
    element: SalesPurchaAddForm,
  },
  {
    path: debitNoteEdit,
    element: SalesPurchaAddForm,
  },

  {
    path: debitNoteConvert,
    element: SalesPurchaAddForm,
  },
  {
    path: receiptConvert,
    element: SalesPurchaAddForm,
  },
  {
    path: receiptNoteConvert,
    element: SalesPurchaAddForm,
  },
  {
    path: billConvert,
    element: SalesPurchaAddForm,
  },
  {
    path: creditNoteConvert,
    element: SalesPurchaAddForm,
  },
  {
    path: cashMemoConvert,
    element: SalesPurchaAddForm,
  },

  {
    path: saleOrderConvert,
    element: SalesPurchaAddForm,
  },
  {
    path: deliveryChallanConvert,
    element: SalesPurchaAddForm,
  },

  {
    path: paymentInvoice,
    element: salesInvoices,
  },
  {
    path: paymentBill,
    element: Bills,
  },

  // userManagement
  {
    path: userManagement,
    element: Role,
  },
  // {
  //   path: role,
  //   element: Role,
  // },
  // {
  //   path: member,
  //   element: Member,
  // },
  { path: transactions, element: Expenses },
  { path: banking, element: Banking },
  { path: bulkProductUpload, element: bulkUploadPage },
  { path: bulkServiceUpload, element: bulkUploadPage },
  { path: customerBulkUpload, element: customerBulkUploadPage },
  { path: vendorBulkUpload, element: customerBulkUploadPage },
];
