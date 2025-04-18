import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const DashboardChart: React.FC = () => {
  // Bar Chart Options
  const barOptions: ApexOptions = {
    chart: {
      id: "bar",
    },
    xaxis: {
      categories: ["2025-04-10", "2025-04-11", "2025-04-15", "2025-04-16", "2025-04-17"],
    },
    dataLabels: {
      enabled: true,
    },
    title: {
      text: "Last 7 Days Usage History",
      align: "left",
      style: { fontSize: "18px", fontWeight: "bold" },
    },
    subtitle: {
      text: "User SMS Summary Report 21",
      align: "left",
      style: { fontSize: "14px" },
    },
    colors: [
        "#00C853", // Emerald Green (fresh and bold)
        "#4CAF50", // Material UI Green
        "#2E7D32", // Dark Green (deep and premium)
        "#66BB6A", // Soft Leaf Green
        "#81C784", // Minty Light Green
      ]
  };

  const barSeries = [
    {
      name: "Broadcast",
      data: [7, 2, 3, 4, 5],
    },
  ];

  // Pie Chart Options
  const pieOptions: ApexOptions = {
    labels: ["Instance: 2108 (DELIVERED)"],
    colors: [
        "#00C853", // Emerald Green (fresh and bold)
        "#4CAF50", // Material UI Green
        "#2E7D32", // Dark Green (deep and premium)
        "#66BB6A", // Soft Leaf Green
        "#81C784", // Minty Light Green
      ],
    title: {
      text: "Instance Wise Usage",
      align: "left",
      style: { fontSize: "18px", fontWeight: "bold" },
    },
    subtitle: {
      text: "Today SMS Summary Report 5",
      align: "left",
      style: { fontSize: "14px" },
    },
    legend: {
      show: false,
    },
  };

  const pieSeries = [100];

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-2/3">
        <Chart options={barOptions} series={barSeries} type="bar" height={350} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/3">
        <Chart options={pieOptions} series={pieSeries} type="pie" height={350} />
      </div>
    </div>
  );
};

export default DashboardChart;
