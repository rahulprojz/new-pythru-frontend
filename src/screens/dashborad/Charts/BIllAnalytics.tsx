import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsVariable from "highcharts/modules/variable-pie";
import { BIllAnalyticsOptions } from "./ChartOptions";

HighchartsVariable(Highcharts);

Highcharts.setOptions({
	lang: {
  	thousandsSep: ""
  }
})

interface Props {
    billChartData: any;
  }


const BIllAnalytics = ({billChartData}:Props) => {
  return (
    <HighchartsReact highcharts={Highcharts} options={BIllAnalyticsOptions(billChartData)} />
  );
};

export default BIllAnalytics;
