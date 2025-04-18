import { useState } from 'react';
import { Input, DatePicker, Button } from 'antd';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import type { RangePickerProps } from 'antd/es/date-picker';
import TableAction from '@/components/SentStatistics/TableActions';

const { RangePicker } = DatePicker;

const SentMessage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    console.log('Search:', value);
    // Yahan search filter logic lagao
  };

  const handleDateChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
    setDateRange(dateStrings as [string, string]);
    console.log('Date Range:', dateStrings);
    // Yahan date filter logic lagao
  };

  const handleExport = () => {
    console.log('Export Clicked');
    // Yahan export logic lagao (CSV, PDF, etc.)
  };

  return (
    <div className="bg-white rounded p-6 mt-7">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl shadow-md">
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          onChange={handleSearch}
          className="w-full md:w-1/3"
        />

        <RangePicker
          onChange={handleDateChange}
          className="w-full md:w-1/3"
        />

        <Button
          icon={<DownloadOutlined />}
          className="w-full md:w-auto bg-green-600 text-white hover:bg-green-700"
          onClick={handleExport}
        >
          Export
        </Button>
      </div>

      <div className="mt-7">
        <TableAction />
      </div>
    </div>
  );
};

export default SentMessage;
