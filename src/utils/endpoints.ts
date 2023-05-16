export const httpEndpoints = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
};

export const endpoints = {
  login: "user/v1/login",
  signup: "user/v1/sign-up",
  logout: "user/v1/logout",
  socialSignup: "user/v1/social-signup",
  checkPhoneAvailability: "user/v1/check-phone-availability",
  checkEmailAvailability: "user/v1/check-email-availability",
  resendOtp: "/user/v1/resend-otp",
  verifyOtp: "user/v1/verify-otp",
  userForgotPassword: "user/v1/forgot-password",
  forgotPasswordVerifyOtp: "/user/v1/forgot-password-verify-otp",
  resetPassword: "/user/v1/reset-password",
  socialLogin: "user/v1/social-login",
  sendPhoneOtp: "user/v1/send-phone-otp",
  productServiceList: "products/v1",
  productCategorySettings: "products/v1/categories",
  updateCategorySetting: "/products/v1/categories/update",
  productCategory: "products/v1/categories/search",
  presignedurl: "user/v1/presignedurl",
  checkDetailExist: "products/v1/check-details-exist",
  salesUnit: "user/v1/settings/get-sales-unit",
  getHSNCode: "user/v1/settings/get-hsn-sac-code",
  getListManagement: "user/v1/settings/list-management",
  addProductServices: "products/v1/add",
  deleteProductService: "products/v1/delete",
  salesPriceValue: "products/v1/sale-price-range",
  addCategories: "/products/v1/categories/add",
  customersList: "customers/v1",
  getChartOfAccount: "salespurchase/v1/chart-of-accounts",
  productServicedetail: "products/v1/details",
  updateProductServices: "products/v1/update",
  statesList: "user/v1/settings/get-states",
  checkCustDetailExist: "customers/v1/check-details-exist",
  AddCustomer: "customers/v1/add-customer-vendor",
  getCitiesList: "user/v1/settings/get-cities",
  getAsset: "user/v1/asset",
  deleteAsset: "user/v1/asset/delete",
  assetDetail: "user/v1/asset/detail",
  getCustomerDetails: "customers/v1/details",
  addAsset: "user/v1/asset/add",
  updateAsset: "user/v1/asset/update",
  updateCustomer: "customers/v1/edit-customer-vendor",
  deleteCustomer: "customers/v1/delete-customer-vendor",
  changeCustomerStatus: "customers/v1/change-status",
  customerDueAmountRange: "customers/v1/amount-range",
  stockCount: "products/v1/inventory-stock-counts",
  getAmountRange: "user/v1/asset/amount-range",
  charOfAccountAdd: "salespurchase/v1/chart-of-accounts/add",
  updateChartOfAccount: "salespurchase/v1/chart-of-accounts/update",
  getSalePurchaseList: "salespurchase/v1",
  deleteSalePurchase: "salespurchase/v1/delete",
  getSalePurchase: "salespurchase/v1/detail",
  getExpensesList: "salespurchase/v1/expenses",
  customerSearch: "customers/v1/search",
  addExpense: "salespurchase/v1/expenses/add-expenses",
  updateExpense: "salespurchase/v1/expenses/edit-expenses",
  deleteExpense: "salespurchase/v1/expenses/delete-expenses",
  changeStatusProductService: "products/v1/status",
  salePurchasePdf: "salespurchase/v1/generate-pdf",
  salePurchaseExcel: "salespurchase/v1/generate-excel",
  getExpenseAmountRange: "salespurchase/v1/expenses/amount-range",
  productServiceSearch: "products/v1/search",
  salePurchaseGenerateDocumentNumber:
    "salespurchase/v1/generate-document-number",
  downloadExpenseExcel: "salespurchase/v1/expenses/generate-excel",
  downloadExpensePdf: "salespurchase/v1/expenses/generate-pdf",
  addSalePurchase: "salespurchase/v1/add-sales-purchase",
  updateSalePurchase: "salespurchase/v1/update-sales-purchase",
  deletCategory: "products/v1/categories/delete",
  getOrganisationDetail: "user/v1/setting",
  changePassword: "user/v1/change-password",
  salePurchaseDetail: "salespurchase/v1/detail",
  changeEstimateStatus: "salespurchase/v1/change-estimate-status",
  purchaseSaleMarkAsCancel: "salespurchase/v1/mark-as-cancel",
  updateSalesPurchaseAmount: "salespurchase/v1/update-sale-purchase-amount",
  downloadDocSalesPurchase: "salespurchase/v1/download-document",
  sendDocumentSalseAndPurchase: "salespurchase/v1/send-document",
  salePurchaseDashboard: "salespurchase/v1/dashboard-listing",
  salePurchaseSaleOrderEmail: "salespurchase/v1/sales-order-mail-recipients",
  salePurchaseDashboardPdf: "salespurchase/v1/sales-dashboard-pdf",
  salePurchaseDashboardExcel: "salespurchase/v1/sales-dashboard-excel",
  getAllSalePurchaseList: "salespurchase/v1/open-documents",
  getDashboardPieChart: "salespurchase/v1/dashboard-pie-chart-data",
  getCustomerVendorData: "customers/v1/dashboard",
  getCustomerVendorPdf: "customers/v1/report/customer-vendor-pdf",
  getCustomerVendorExcel: "customers/v1/report/customer-vendor-excel",
  getProductServicesData: "products/v1/dashboard",
  getSalePurchaseDueAmountData: "salespurchase/v1/dashboard-stats",
  notificationList: "/communication/v1/notification",
  notificationDelete: "/communication/v1/clear-notification",
  notificationCount: "/communication/v1/notification-count",
  getRoles: "/user/v1/role",
  addrole: "/user/v1/role",
  getRole: "/user/v1/role/detail",
  updateRole: "/user/v1/role",
  updateRoleStatus: "/user/v1/role/status",
  getMembers: "/user/v1/member",
  addMember: "/user/v1/member",
  getMemberDetail: "user/v1/member/detail",
  updateMember: "user/v1/member/",
  updateMemberStatus: "user/v1/member/status",
  agedPayableAndReciables: "salespurchase/v1/report/receivables-payables",
  payableReciablePdf: "salespurchase/v1/report/receivables-payables-pdf",
  payableReciableExcel: "salespurchase/v1/report/receivables-payables-excel",
  getProfitLoss: "salespurchase/v1/report/profit-loss",
  cashflow: "salespurchase/v1/report/cashflow",
  getManualJournalsList: "salespurchase/v1/manual-journal/list",
  addManualJournals: "/salespurchase/v1/manual-journal/add",
  updateManualJournals: "/salespurchase/v1/manual-journal/update",
  deleteManualJournals: "/salespurchase/v1/manual-journal",
  getCustomerTransactionDetail: "/salespurchase/v1/customer-transaction",
  downloadManualJournal: "/salespurchase/v1/manual-journal/download",
  getGeneralLedger: "salespurchase/v1/report/general-ledger",
  getGeneralLedgerPdf: "salespurchase/v1/report/general-ledger-pdf",
  trailBalance: "salespurchase/v1/report/trial-balance",
  getBalanceSheet: "salespurchase/v1/report/balance-sheet",
  getBankingList: "user/v1/banking/bank-list",
  getAggrigatorWidget: "user/v1/banking/aggrigator-widget",
  getUserAccountList: "user/v1/banking/user-account-list",
  userAccountSummery: "user/v1/banking/account-summary",
  getUserAccountTransactionsList: "user/v1/banking/account-transaction",
  downloadBankfile: "user/v1/banking/download-account-transaction",
  linktoAccountapi: "user/v1/banking/icici/register-account",
  dashboardLooseProfit: "/salespurchase/v1/graph/profit-loss",
  dashboardProductExcel: "/products/v1/download-bulk-upload-template",
  bulkProductExcel: "/products/v1/bulk-upload",
  customerTemplateExcel: "/customers/v1/download-bulk-upload-template",
  customerBulkExcelUpload: "/customers/v1/bulk-upload",
};
