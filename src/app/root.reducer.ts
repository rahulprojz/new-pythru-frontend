import { combineReducers } from "redux";
// import counterReducer from "../features/counter/counterSlice";
import forgotPasswordSlice from "../screens/onboarding/forgotPassword/forgotPasswordSlice";
import globalLoaderSlice from "../components/backdrop/backdropSlice";
import signupSlice from "../screens/onboarding/signup/signupSlice";
import productServicesSlice from "../screens/productandServices/productServiceSlice";
import customerListSlice from "../screens/payments/customerListSlice";
import expenseListSlice from "../screens/purchase/expenseListSlice";
import assetSlice from "../screens/accounting/assets/assetSlice";
import salePurchaseSlice from "../screens/saleandPurchase/salePurchaseSlice";
import emailPostVerficationSlice from "../screens/onboarding/EmailPostVerfication/emailPostVerficationSlice";
import dashboardSlice from "../screens/dashborad/dashboardSlice";
import commonSlice from "./commonSlice";
import settingSlice from "../screens/settings/settingSlice";
import dashboardListSlice from "../screens/dashborad/dashboardSlice";
import notificationSlice from "../components/header/notificationSlice";
import teamManagementSlice from "../screens/teamManagement/teamManagementSlice";
import agedReciableSlice from "../screens/reports/agedReceivablesAndPayable/agedSlice";
import profitLossSlice from "../screens/reports/profitLossAndCashflow/profitLossSlice";
import generalAndTrail from "../screens/reports/trailAndgeneral/trailAndgeneralSlice";
import manualJournalSlice from "../screens/accounting/manualJournals/manualJournalSlice";
import bankingSlice from "../screens/banking/bankingSlice";

const rootReducer = combineReducers({
  forgotPasswordSlice,
  globalLoaderSlice,
  signupSlice,
  productServicesSlice,
  customerListSlice,
  expenseListSlice,
  assetSlice,
  commonSlice,
  salePurchaseSlice,
  emailPostVerficationSlice,
  settingSlice,
  dashboardListSlice,
  notificationSlice,
  dashboardSlice,
  teamManagementSlice,
  agedReciableSlice,
  profitLossSlice,
  manualJournalSlice,
  generalAndTrail,
  bankingSlice,
  // counter: counterReducer,
});

export default rootReducer;
