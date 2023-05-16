import moment from "moment";
import React, { useEffect } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import { ProfitLoseGraphOptions } from "./ChartOptions";

import ReactApexChart from "react-apexcharts";

// import Highchartslogarithmic from "highcharts/modules/logarithmic";

// HighchartsVariable(Highcharts);

interface Props {
  profitLosseData: any;
}

// PROFIT LOOSE CHART OPTIONS ******

function handleMoment(start: any, end: any) {
  const dateStart = moment(start);
  const dateEnd = moment(end);
  const timeValues = [];

  while (dateEnd > dateStart || dateStart.format("M") === dateEnd.format("M")) {
    timeValues.push(dateStart.format("MMM"));
    dateStart.add(1, "month");
  }

  // timeValues.pop();
  // console.log("Month =>", timeValues);
  return timeValues;
}

// let width:any = document.querySelector(".donut-chart-cover bg-white")?.offsetWidth

const ProfitLoseBarGraph = ({ profitLosseData }: Props) => {
  const data: any = {
    series: profitLosseData.graph?.reduce((acc: any, curr: any) => {
      let fix = {
        ...curr,
        data: curr.data.map((item: any) => item.toFixed(2)),
      };

      return [...acc, fix];
    }, []) || [
      {
        name: "Total Profit",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // color: "white",
      },
      {
        name: "Total Price",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // color: "white"
      },
      {
        name: "Total loss",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // color: "blue"
      },
    ],
    options: {
      chart: {
        type: "area",
        toolbar: {
          show: false,
        },

        height: 350,
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: [3, 3, 3],
        dashArray: [5, 5, 5],
      },

      xaxis: {
        // type: "datetime",
        categories: handleMoment(
          profitLosseData?.startDate,
          profitLosseData?.endDate
        ),

        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },

      yaxis: {
        tickAmount: 4,
        floating: false,

        labels: {
          style: {
            colors: "#8e8da4",
          },
          offsetY: -7,
          offsetX: 0,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      fill: {
        // colors: ["transparent", "transparent", "transparent"],
        opacity: 0.1,
      },
      tooltip: {
        x: {
          format: "yyyy",
        },
        y: {
          formatter: (y: any) => "₹ " + y?.toFixed(2),
        },
        fixed: {
          enabled: false,
          position: "topRight",
        },
      },
      grid: {
        yaxis: {
          lines: {
            offsetX: -30,
          },
        },
        padding: {
          left: 20,
        },
      },
    },
  };

  return (
    <>
      {/* <HighchartsReact
      highcharts={Highcharts}
      options={ProfitLoseGraphOptions(profitLosseData)}
      oneToOne={true}
      /> */}

      <ReactApexChart
        options={data?.options}
        series={data?.series}
        type="area"
        height={350}
        // width="100%"
      />
    </>
  );
};

export default ProfitLoseBarGraph;
