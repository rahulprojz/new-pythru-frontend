import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsVariable from "highcharts/modules/variable-pie";
import { InvoiceAnalyticsOptions } from "./ChartOptions";

HighchartsVariable(Highcharts);

Highcharts.setOptions({
	lang: {
  	thousandsSep: ""
  }
})

interface Props {
  invoiceChartData: any;
}

const InvoiceAnalytics = ({ invoiceChartData }: Props) => {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={InvoiceAnalyticsOptions(invoiceChartData)}
    />
  );
};

export default InvoiceAnalytics;
