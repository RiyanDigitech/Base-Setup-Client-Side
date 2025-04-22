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
      type: "category",
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
  };
  

  const barSeries = [
    {
      name: "Broadcast",
      data: [
        { x: "2025-04-10", y: 7, fillColor: "#00C853" },   // Green
        { x: "2025-04-11", y: 2, fillColor: "#FF9800" },   // Orange
        { x: "2025-04-15", y: 3, fillColor: "#2196F3" },   // Blue
        { x: "2025-04-16", y: 4, fillColor: "#FFEB3B" },   // Yellow
        { x: "2025-04-17", y: 5, fillColor: "#9C27B0" },   // Purple
      ],
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
    xaxis: {
      type: "category",
    },
    dataLabels: {
      enabled: true,
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
        <Chart options={barOptions} series={barSeries} type="bar" height={250} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/3">
        <Chart options={pieOptions} series={pieSeries} type="pie" height={300} />
      </div>
    </div>
  );
};

export default DashboardChart;
