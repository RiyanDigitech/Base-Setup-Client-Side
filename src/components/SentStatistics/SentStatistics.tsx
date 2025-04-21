import React, { useState } from "react";
import { Table, Card, Input } from "antd";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface DataType {
  key: string;
  id: number;
  data: string;
  smsCount: number;
}

const originalData: DataType[] = [
  {
    key: "1",
    id: 1,
    data: "2025-04-18",
    smsCount: 5,
  },
  {
    key: "2",
    id: 2,
    data: "2025-04-17",
    smsCount: 3,
  },
  {
    key: "3",
    id: 3,
    data: "2025-04-16",
    smsCount: 4,
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
  
  const filteredData = originalData.filter(item =>
    item.data.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <Card style={{ flex: 1 }} title="Statistics 2025-04-18 - To - 2025-04-18">
        <Input
          placeholder="Search by Date..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={{ pageSize: 5 }}
          summary={() => {
            const total = filteredData.reduce((sum, item) => sum + item.smsCount, 0);
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>TOTAL:</Table.Summary.Cell>
                <Table.Summary.Cell index={1}></Table.Summary.Cell>
                <Table.Summary.Cell index={2}></Table.Summary.Cell>
                <Table.Summary.Cell index={3}>{total}</Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        />
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
