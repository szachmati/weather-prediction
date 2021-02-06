import React from "react";
import { Line } from "react-chartjs-2";
import { Container } from "@material-ui/core";

interface LineChartProps {
  label: string;
  dataArray: Array<any>;
  testArray: Array<any>;
  labels: Array<any>;
}

export const LineChart = (props: LineChartProps) => {
  const { dataArray, testArray, labels, label } = props;

  const data = {
    labels: labels, //["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: label,
        data: dataArray, // [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: "rgb(66,153,6)",
        borderColor: "rgba(215,42,85,0.2)",
      },
      {
        label: label,
        data: testArray, // [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: "rgb(68,153,6)",
        borderColor: "rgba(212,42,85,0.2)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <Container maxWidth={"xl"}>
      <Line data={data} options={options} width={100} height={25} />
    </Container>
  );
};
