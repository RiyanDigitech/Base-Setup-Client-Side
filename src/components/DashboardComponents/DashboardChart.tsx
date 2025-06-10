import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import PieChart from "./PieChart";
import { useQuery } from "@tanstack/react-query";
import { getBarChartData } from "@/services/DashboardServices/DashboardService";

const DashboardChart: React.FC = () => {
  const {
    data: weeklyData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["dashboard-bar"],
    queryFn: getBarChartData,
  });

  const barData = Array.isArray(weeklyData) ? weeklyData : [];

  const barSeries = [
    {
      name: "Sent",
      data: barData.map((item) => ({
        x: item.week,
        y: item.sent,
        fillColor: "#42A5F5", // Blue
      })),
    },
    {
      name: "Received",
      data: barData.map((item) => ({
        x: item.week,
        y: item.received,
        fillColor: "#66BB6A", // Green
      })),
    },
  ];

  const barOptions: ApexOptions = {
    chart: {
      id: "bar",
      stacked: false,
    },
    xaxis: {
      type: "category",
      labels: {
        rotate: -45,
      },
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
      text: "User SMS Summary Report",
      align: "left",
      style: { fontSize: "14px" },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        distributed: true,
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-2/3">
        {isLoading ? (
          <div>Loading bar chart...</div>
        ) : isError ? (
          <div>Error loading bar chart: {error?.message}</div>
        ) : barData.length === 0 ? (
          <div>No data available</div>
        ) : (
          <Chart
            options={barOptions}
            series={barSeries}
            type="bar"
            height={250}
          />
        )}
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/3">
        <PieChart />
      </div>
    </div>
  );
};

export default DashboardChart;
