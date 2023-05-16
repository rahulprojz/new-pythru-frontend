import { updateGlobalLoader } from "../../components/backdrop/backdropSlice";
// import { bill_Static, invoice_Static } from "../../constants";
import { Alert, api, endpoints } from "../../utils";
import { updatedashboard } from "./dashboardSlice";

interface GetDashboardParameters {
  documentType: number;
  type: number;
}

let invoice_Static: any = [
  {
    name: "Payment Due",
    percentage: 0,
    value: 0,
  },
  {
    name: "Paid",
    percentage: 0,
    value: 0,
  },
  {
    name: "Not Sent",
    percentage: 0,
    value: 0,
  },
];

let bill_Static: any = [
  {
    name: "Payment Due",
    percentage: 0,
    value: 0,
  },
  {
    name: "Paid",
    percentage: 0,
    value: 0,
  },
  {
    name: "Not Sent",
    percentage: 0,
    value: 0,
  },
];

const arr = {
  data: [56, 34, 11],
  label: ["Payment Due", "Closed", "Not Sent"],
  percentageValues: [78, 89, 99],
  total: 440.3,
};

export const getDasboardPieInvoiceChartData = ({
  documentType,
  type,
}: GetDashboardParameters) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getDashboardPieChart,
      `?documentType=${documentType}&type=${type}`,
      (respData: any) => {
        if (documentType === 3) {
          dispatch(
            updatedashboard({
              invoiceChartData: respData.data?.responseData?.newData,
              invoiceFooterData:
                respData.data.responseData.dataByStatus.label.map(
                  (item: any, i: number) => {
                    return {
                      name: item,
                      value: respData.data.responseData.dataByStatus.data[i],
                      percentage:
                        respData.data.responseData.dataByStatus
                          .percentageValues[i],
                    };
                  }
                ),
            })
          );
        } else if (documentType === 9) {
          dispatch(
            updatedashboard({
              billChartData: respData.data?.responseData?.newData,
              billFooterData: respData.data.responseData.dataByStatus.label.map(
                (item: any, i: number) => {
                  return {
                    name: item,
                    value: respData.data.responseData.dataByStatus.data[i],
                    percentage:
                      respData.data.responseData.dataByStatus.percentageValues[
                        i
                      ],
                  };
                }
              ),
            })
          );
        }
        dispatch(updateGlobalLoader(false));
      },
      (error: any) => {
        dispatch(updateGlobalLoader(false));
        console.log("Err =>", error);
        let { data } = error;
        // Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const getProfitLosseData = (type: number) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.dashboardLooseProfit,
      `?type=${type}`,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updatedashboard({
            profitLosseData: respData.data.responseData,
            profitLossDataFooter: respData.data.responseData?.graph?.reduce(
              (acc: any, curr: any) => {
                let obj = {
                  name: curr.name,
                  value: curr.data
                    .reduce((a: number, c: number) => a + c)
                    ?.toFixed(2),
                  color: curr.color,
                };

                return [...acc, obj];
              },
              []
            ),
          })
        );
      },
      (error: any) => {
        console.log("error from dashboard api", error);
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const getCustomerVendorData = () => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getCustomerVendorData,
      ``,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updatedashboard({
            customerdata: respData.data.responseData.customer,
            vendordata: respData.data.responseData.vendor,
          })
        );
      },
      (error: any) => {
        console.log("error from dashboard api", error);
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const getProductServicesData = () => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getProductServicesData,
      ``,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(
          updatedashboard({
            productdata: respData.data.responseData.product,
            servicesdata: respData.data.responseData.service,
          })
        );
      },
      (error: any) => {
        console.log("error from dashboard api", error);
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};

export const getSalePurchaseDueAmountData = () => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.getApiCall(
      endpoints.getSalePurchaseDueAmountData,
      ``,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        // console.log("data from product api", respData.data.responseData);
        dispatch(
          updatedashboard({
            salesdue: respData.data.responseData.salesDue,
            purchasedue: respData.data.responseData.purchaseDue,
          })
        );
      },
      (error: any) => {
        console.log("error from dashboard api", error);
        dispatch(updateGlobalLoader(false));
        let { data } = error;
        Alert(2, data?.message || data?.responseMsg);
      }
    );
  };
};
