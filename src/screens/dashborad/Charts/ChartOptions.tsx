import moment from "moment";
import { useSelector } from "react-redux";

export const dataa = [
  {
    data: 359.99,
    label: "Paid",
    color: "paid",
    percentageValue: 53.36558835993783,
  },
  {
    data: 51.85,
    label: "Partially Paid",
    color: "partial-paid",
    percentageValue: 41.27426974933684,
  },
  {
    data: 127.8,
    label: "Payment Due",
    color: "payment-due",
    percentageValue: 5.014832603475066,
  },
  {
    data: 80.8,
    label: "Closed",
    color: "closed",
    percentageValue: 50.34530928725023935,
  },
  {
    data: 90.8,
    label: "Not Sent",
    color: "not-sent",
    percentageValue: 990.34530928725023935,
  },
];

const colorObj: any = {
  paid: "#34913e",
  partialpaid: "#febd38 ",
  paymentdue: "#fe464b",
  notsent: "#8d79f6",
  closed: "#7a7a7a",
};

export const InvoiceAnalyticsOptions = (invoiceChartData: any) => {

  return {
    chart: {
      type: "variablepie",
    },
    title: {
      text: `Total Invoice <br>  ₹ ${invoiceChartData
        ?.reduce((a: any, b: any) => a + b.data, 0)
        ?.toFixed(2)}<br>`,
      verticalAlign: "middle",
      y: 18,
      style: {
        color: "black",
        fontWeight: "bold",
        fontSize: "18px",
      },
    },
    plotOptions: {
      variablepie: {
        dataLabels: {
          enabled: false,
          connectorWidth: 0,
          distance: -5,
        },
      },
    },

    tooltip: {
      headerFormat: "",
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
        "Amount: <b>₹ {point.y}</b><br/>",
      valueDecimals: 2,
    },

    series: [
      {
        innerSize: "50%",
        showInLegend: false,
        zMin: 0,
        name: "Inovie",
        data: invoiceChartData?.map((item: any, i: number) => {
          return {
            name: item?.label,
            y: item.data,
            z: 92 + i * 30,
            color: colorObj[item.color.replace("-", "")],
          };
        }),
      },
    ],
  };
};

export const BIllAnalyticsOptions = (billChartData: any) => {
  return {
    chart: {
      type: "variablepie",
    },
    title: {
      text: "",
    },

    plotOptions: {
      variablepie: {
        dataLabels: {
          enabled: false,
          connectorWidth: 0,
          distance: 0,
        },
        startAngle: -90,
        endAngle: 90,
        size: "100%",
      },
    },

    tooltip: {
      headerFormat: "",
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
        "Amount: <b>₹ {point.y}</b><br/>",
      valueDecimals: 2,
    },

    series: [
      {
        // colors: ["#7AD3FF", "#FE6C6C", "#FFD572", "#B09FFF"],
        innerSize: "20%",
        borderWidth: 5,
        zMin: 0,
        showInLegend: false,
        name: "Bill",
        data: billChartData.map((item: any, i: number) => {
          return {
            name: item?.label,
            y: item.data,
            z: 92 + i * 30,
            color: colorObj[item.color.replace("-", "")],
          };
        }),
      },
    ],
  };
};

// PROFIT LOOSE CHART OPTIONS ******

function handleMoment(start: any, end: any) {
  const dateStart = moment(start);
  const dateEnd = moment(end);
  const timeValues = [];

  while (dateEnd > dateStart || dateStart.format("M") === dateEnd.format("M")) {
    timeValues.push(dateStart.format("MMMM"));
    dateStart.add(1, "month");
  }

  // timeValues.pop();
  return timeValues;
}

// export const ProfitLoseGraphOptions = (profitLosseData: any) => {
//   console.log(profitLosseData);

//   const data: any = { ...profitLosseData };

//   console.log("DAta =>", data);
//   return {
//     chart: {
//       type: "areaspline",
//     },
//     title: {
//       text: "",
//     },
//     subtitle: {
//       align: "center",
//     },
//     legend: {
//       layout: "vertical",
//       align: "left",
//       verticalAlign: "top",
//       x: 120,
//       y: 70,
//       floating: true,
//       borderWidth: 1,
//       backgroundColor: "#FFFFFF",
//     },
//     xAxis: {
//       categories:
//         // handleMoment(
//         //   profitLosseData?.startDate,
//         //   profitLosseData?.endDate
//         // ),
//         // ["Week One", "Week Two", "Week Three", "Week Four"],
//         // [
//         //   "Sunday",
//         //   "Monday",
//         //   "Tuesday",
//         //   "Wednesday",
//         //   "Thursday",
//         //   "Friday",
//         //   "Saturday",
//         // ],
//         [
//           "Jan",
//           "Feb",
//           "Mar",
//           "Apr",
//           "May",
//           "Jun",
//           "Jul",
//           "Aug",
//           "Sep",
//           "Oct",
//           "Nov",
//           "Dec",
//         ],

//     },
//     yAxis: {
//       title: {
//         text: "Rupees",
//       },
//       plotLines: [
//         {
//           color: "#57BFF3",
//           width: 2,
//           value: 0,
//           dashStyle: "solid",
//         },
//       ],
//     },
//     tooltip: {
//       shared: true,
//     },
//     credits: {
//       enabled: false,
//     },
//     plotOptions: {
//       series: {
//         lineWidth: 3,
//         animation: false,
//         marker: {
//           enabled: false,
//           states: {
//             hover: {
//               enabled: false,
//             },
//           },
//         },
//       },
//       areaspline: {
//         fillOpacity: 0.1,
//         dashStyle: "Dash",
//         // -----------------------------------------------------
//         // STYLES FOR THE CHART LINES ***
//         // 'Dash' | 'DashDot' | 'Dot' | 'LongDash' | 'LongDashDot' | 'LongDashDotDot' | 'ShortDash' | 'ShortDashDot' | 'ShortDashDotDot' | 'ShortDot' | 'Solid'
//         // ---------------------------------------------------------
//       },
//     },
//     series: data?.graph ? data?.graph :
//     [
//       {
//         name: "Total Income",
//         data: [70, 130, -90, -50, 40, 150, 170, 190, 300, 450, 700, 900],
//         color: "#B09FFF",
//       },
//       {
//         name: "Total Expense",
//         data: [110, 390, -40, -330, 570, 680, 770, 890, 950, 1150, 1210, 1450],
//         color: "#FFD572",
//       },
//       {
//         name: "Total Profit",
//         data: [200, 430, 500, 650, 470, 750, 870, 1100, 1300, 1450, 1700, 1900],
//         color: "#FE6C6C",
//       },
//     ],
//   };
// };
