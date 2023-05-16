export const IncomeAnalyticsOptions = (
  incomeData: any,
  graphColor: Array<any>,
  label: string
) => {
  return {
    chart: {
      type: "variablepie",
    },
    title: {
      text: "",
      verticalAlign: "middle",
      //   x: 30,
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
        "amount: <b>₹ {point.y}</b><br/>",
      valueDecimals: 2,
    },

    series: [
      {
        colors: graphColor,
        innerSize: "50%",
        zMin: 0,
        name: label,
        data: incomeData?.reduce((acc: any, curr: any, i: any) => {
          acc = [
            ...acc,
            {
              name: curr?.category,
              y: Math.abs(curr?.amount?.toFixed(2)),
              z: 92 + i * 30,
            },
          ];
          return acc;
        }, []),
      },
    ],
  };
};
