import React, { useState } from "react";
import { DatePicker, Button, Radio, Card, Space, Typography } from "antd";
import type { RadioChangeEvent } from "antd";
import dayjs from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker";
import SmsStatistics from "@/components/SentStatistics/SentStatistics";

const { RangePicker } = DatePicker;
const { Title } = Typography;

const SentStatistics: React.FC = () => {
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [filterType, setFilterType] = useState<string>("Delivery Wise");

  const onDateChange: RangePickerProps["onChange"] = (dates, dateStrings) => {
    if (dates) {
      setDateRange([dateStrings[0], dateStrings[1]]);
    } else {
      setDateRange(null);
    }
  };

  const onFilterChange = (e: RadioChangeEvent) => {
    setFilterType(e.target.value);
  };

  const handleFilter = () => {
    console.log("Filtering from", dateRange, "Type:", filterType);
  };

  return (

    <div>
      <Card title={<Title level={5}>Sent Statistics</Title>} className="shadow rounded-lg mt-7 p-4">
        <Space wrap style={{ marginBottom: 16 }}>
          <RangePicker
            format="YYYY-MM-DD"
            onChange={onDateChange}
            defaultValue={[dayjs(), dayjs()]}
          />
          <Button type="primary" onClick={handleFilter} style={{ backgroundColor: "#6c757d", borderColor: "#6c757d" }}>
            Filter
          </Button>
        </Space>
        <br />
        <Radio.Group className="mt-5" onChange={onFilterChange} value={filterType}>
          <Radio value="Date Wise" style={{
            color: filterType === "Date Wise" ? "green" : "inherit",
            fontWeight: filterType === "Date Wise" ? "bolder" : "normal",
            textDecoration: filterType === "Date Wise" ? "underline" : "none"
          }}>
            Date Wise
          </Radio>
          <Radio value="Instance Wise" style={{
            color: filterType === "Instance Wise" ? "green" : "inherit",
            fontWeight: filterType === "Instance Wise" ? "bolder" : "normal",
            textDecoration: filterType === "Instance Wise" ? "underline" : "none"
          }}>
            Instance Wise
          </Radio>
          <Radio value="Number Wise" style={{
            color: filterType === "Number Wise" ? "green" : "inherit",
            fontWeight: filterType === "Number Wise" ? "bolder" : "normal",
            textDecoration: filterType === "Number Wise" ? "underline" : "none"
          }}>
            Number Wise
          </Radio>
          <Radio
            value="Delivery Wise"
            style={{
              color: filterType === "Delivery Wise" ? "green" : "inherit",
              fontWeight: filterType === "Delivery Wise" ? "bolder" : "normal",
              textDecoration: filterType === "Delivery Wise" ? "underline" : "none"
            }}
          >
            Delivery Wise
          </Radio>
        </Radio.Group>
      </Card>
      <div className="mt-7">
        <SmsStatistics />
      </div>
    </div>
  );
};

export default SentStatistics;
