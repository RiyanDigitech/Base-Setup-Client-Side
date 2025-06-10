import React, { useState } from "react";
import { Table, Card, Input } from "antd";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";


// interface DataType {
//   key: string;
//   id: number;
//   data: string;
//   smsCount: number;
// }


const data = [
  // {
  //   id: 1,
  //   data: "2025-04-21",
  //   smsCount: 2,
  // },
  {
    id: 2,
    data: "2025-05-21",
    smsCount: 243,
  },
  {
    id: 3,
    data: "2025-12-21",
    smsCount: 452,
  },
];

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "DATA",
    dataIndex: "data",
    key: "data",
  },
  {
    title: "NO. OF SMS",
    dataIndex: "smsCount",
    key: "smsCount",
  },
];

const chartOptions: ApexOptions = {
  chart: {
    type: 'bar'
  },
  xaxis: {
    categories: ['2025-04-18']
  },
  dataLabels: {
    enabled: true
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
    }
  },
  colors: ["#00C853", "#4CAF50", "#2E7D32", "#66BB6A", "#81C784"],
  title: {
    text: '2025-04-18 To 2025-04-18 Usage',
    align: 'center'
  }
};

const chartSeries = [
  {
    name: 'Broadcast',
    data: [5]
  }
];

const SmsStatistics: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  

  return (
    <div 
    className="flex flex-col md:flex-row"
    style={{ display: 'flex', gap: '2rem'}}>
      <Card style={{ flex: 1 }} title="Statistics 2025-04-18 - To - 2025-04-18">
        <Input
          placeholder="Search by Date..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 16 }}
        />
         <div style={{ background: "#fff", padding: 20, borderRadius: 10 }}>
      

      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey="id"
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={2}>
              <strong>TOTAL:</strong>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2}>
              <strong>645</strong>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    </div>
      </Card>

      <Card style={{ flex: 1 }}>
        <Chart         
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      </Card>
    </div>
  );
};

export default SmsStatistics;







































// import React, { useState, useMemo } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Table, Card, Input, Spin } from "antd";
// import Chart from "react-apexcharts";
// import { ApexOptions } from "apexcharts";
// import { getDataTableChart } from "@/"; // adjust path if needed

// const SmsStatistics: React.FC = () => {
//   const [searchText, setSearchText] = useState("");
//   const wa_id = "923002292312"; // or pass via props/context

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["sms-stats", wa_id],
//     queryFn: () => getDataTableChart(wa_id),
//   });

//   const tableData = useMemo(() => {
//     if (!data) return [];
//     return Object.entries(data.daily).map(([date, value], index) => ({
//       id: index + 1,
//       date,
//       smsCount: value.sent + value.received,
//     }));
//   }, [data]);

//   const filteredData = tableData.filter((item) =>
//     item.date.includes(searchText)
//   );

//   const totalCount = filteredData.reduce((sum, row) => sum + row.smsCount, 0);

//   const chartCategories = filteredData.map((row) => row.date);
//   const chartSeries = [
//     {
//       name: "SMS Count",
//       data: filteredData.map((row) => row.smsCount),
//     },
//   ];

//   const chartOptions: ApexOptions = {
//     chart: { type: "bar" },
//     xaxis: { categories: chartCategories },
//     dataLabels: { enabled: true },
//     colors: ["#00C853"],
//     title: {
//       text: "Daily SMS Statistics",
//       align: "center",
//     },
//   };

//   if (isLoading) return <Spin fullscreen />;
//   if (error) return <div>Error fetching data: {(error as Error).message}</div>;

//   return (
//     <div className="flex flex-col md:flex-row" style={{ display: "flex", gap: "2rem" }}>
//       <Card style={{ flex: 1 }} title="SMS Statistics">
//         <Input
//           placeholder="Search by Date..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           style={{ marginBottom: 16 }}
//         />
//         <Table
//           dataSource={filteredData}
//           columns={[
//             { title: "ID", dataIndex: "id", key: "id" },
//             { title: "Date", dataIndex: "date", key: "date" },
//             { title: "No. of SMS", dataIndex: "smsCount", key: "smsCount" },
//           ]}
//           pagination={{ pageSize: 10 }}
//           rowKey="id"
//           summary={() => (
//             <Table.Summary.Row>
//               <Table.Summary.Cell index={0} colSpan={2}>
//                 <strong>TOTAL:</strong>
//               </Table.Summary.Cell>
//               <Table.Summary.Cell index={2}>
//                 <strong>{totalCount}</strong>
//               </Table.Summary.Cell>
//             </Table.Summary.Row>
//           )}
//         />
//       </Card>

//       <Card style={{ flex: 1 }}>
//         <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
//       </Card>
//     </div>
//   );
// };

// export default SmsStatistics;

