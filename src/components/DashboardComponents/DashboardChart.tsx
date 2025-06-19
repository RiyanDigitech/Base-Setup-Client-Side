import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import PieChart from "./PieChart";
import { useQuery } from "@tanstack/react-query";
import { getBarChartData } from "@/services/DashboardServices/DashboardService";

const DashboardChart: React.FC = () => {
  const [viewType, setViewType] = useState<"weekly" | "daily">("weekly");

  const {
    data: chartData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["dashboard-bar"],
    queryFn: getBarChartData,
  });

  const barDataWeekly = Array.isArray(chartData?.weekly) ? chartData.weekly : [];

  const barDataDaily = chartData?.daily
    ? Object.entries(chartData.daily).map(([date, values]: any) => ({
        date,
        sent: values.sent,
        received: values.received,
      }))
    : [];

  const barSeries =
    viewType === "weekly"
      ? [
          {
            name: "Sent",
            data: barDataWeekly.map((item: any) => ({
              x: item.week,
              y: item.sent,
            })),
          },
          {
            name: "Received",
            data: barDataWeekly.map((item: any) => ({
              x: item.week,
              y: item.received,
            })),
          },
        ]
      : [
          {
            name: "Sent",
            data: barDataDaily.map((item: any) => ({
              x: item.date,
              y: item.sent,
            })),
          },
          {
            name: "Received",
            data: barDataDaily.map((item: any) => ({
              x: item.date,
              y: item.received,
            })),
          },
        ];

  const barOptions: ApexOptions = {
    chart: {
      id: "bar",
      stacked: false,
    },
    colors: ["#0035a7", "#007016"], // ✅ Legend and bar colors
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
      text: viewType === "weekly" ? "Weekly Usage History" : "Daily Usage History",
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
        distributed: false, // ✅ Respect colors array
      },
    },
    legend: {
      show: true, // ✅ Keep Apex legend (with correct colors now)
    },
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Toggle Buttons */}
      <div className="flex justify-start gap-2">
        <button
          onClick={() => setViewType("daily")}
          className={`px-4 py-1 rounded ${
            viewType === "daily" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Convert to Daily
        </button>
        <button
          onClick={() => setViewType("weekly")}
          className={`px-4 py-1 rounded ${
            viewType === "weekly" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Convert to Weekly
        </button>
      </div>

      {/* Chart & Pie Sections */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-2/3">
          {isLoading ? (
            <div>Loading bar chart...</div>
          ) : isError ? (
            <div>Error loading bar chart: {error?.message}</div>
          ) : barSeries[0].data.length === 0 ? (
            <div>No data available</div>
          ) : (
            <Chart options={barOptions} series={barSeries} type="bar" height={250} />
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/3">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
