import React from 'react';
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useQuery } from "@tanstack/react-query";
import { getPieChartData } from "@/services/DashboardServices/DashboardService";

function PieChart() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getPieChartData,
  });

  const pieLabels = data ? Object.keys(data).map(key => key.toUpperCase()) : [];
  const pieSeries = data ? Object.values(data) : [];

  const pieOptions: ApexOptions = {
    labels: pieLabels,
    colors: [
      "#42A5F5", // SENT
      "#66BB6A", // DELIVERED
      "#AB47BC", // READ
    ],
    title: {
      text: "Instance Wise Usage",
      align: "left",
      style: { fontSize: "18px", fontWeight: "bold" },
    },
    dataLabels: {
      enabled: true,
    },
    subtitle: {
      text: "Today SMS Summary Report",
      align: "left",
      style: { fontSize: "14px" },
    },
    legend: {
      show: true,
      position: "bottom",
    },
  };

  if (isLoading) return <div>Loading chart...</div>;

  if (isError || !data) {
    console.error("Pie chart error:", error);
    return <div>Error loading chart data</div>;
  }

  if (pieSeries.every(val => val === 0)) {
    return (
  <div className="flex items-center justify-center">
    <div className="text-center p-6 bg-white rounded-2xl mt-18 shadow-xl">
      <p className="text-lg font-semibold text-gray-700">
        No message activity today.
      </p>
    </div>
  </div>
);

  }

  return (
    <Chart
      options={pieOptions}
      series={pieSeries}
      type="pie"
      height={300}
    />
  );
}

export default PieChart;
