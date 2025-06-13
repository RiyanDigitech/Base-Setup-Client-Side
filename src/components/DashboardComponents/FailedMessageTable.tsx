import { Button, DatePicker, Input, Spin, Table, Tag } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getFailedSMS } from "@/services/DashboardServices/DashboardService";
import '../../Css/Spin.css';
import { useState } from "react";
import dayjs from "dayjs";

function FailedMessageTable() {
    const { RangePicker } = DatePicker;
    const columns = [
        { title: 'Code', dataIndex: 'error_code' },
        { title: 'TO', dataIndex: 'wa_id' },
        { title: 'Message', dataIndex: 'error_message' },
        {
            title: 'Status',
            dataIndex: 'status',
            render: () => <Tag color="red">Failed</Tag>
        },
        { title: 'Failed Message', dataIndex: 'message' },
        { title: 'Time', dataIndex: 'timestamp' },
    ];

    const [searchCode, setSearchCode] = useState('');
    const [dateRange, setDateRange] = useState<[any, any] | null>(null);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 8 });

    const handleTableChange = (paginationInfo: any) => {
        setPagination({
            current: paginationInfo.current,
            pageSize: paginationInfo.pageSize
        });
    };

    const { data, isFetching } = useQuery({
        queryKey: ['failedSMS', searchCode, dateRange, pagination.current, pagination.pageSize],
        queryFn: () =>
            getFailedSMS({
                error_code: searchCode,
                start_date: dateRange?.[0] ? dayjs(dateRange[0]).format('YYYY-MM-DD') : null,
                end_date: dateRange?.[1] ? dayjs(dateRange[1]).format('YYYY-MM-DD') : null,
                page: pagination.current,
                limit: pagination.pageSize,
            }),
    });

    const total = data?.total || 0;
    const tableData = Array.isArray(data?.data?.data) ? data.data.data.map((e: any) => ({ ...e, key: e.id })) : [];

    return (
        <div className="p-4 bg-white rounded mt-9 min-h-screen overflow-auto">
            <div className="mt-2 mb-4 flex justify-between gap-3">
                <Input
                    type="number"
                    onChange={(e) => setSearchCode(e.target.value)}
                    value={searchCode}
                    placeholder="Search by Code"
                    className="focus:!border-green-600"
                />
                <RangePicker
                    onChange={(dates) => setDateRange(dates)}
                    value={dateRange}
                />
                <Button disabled className="!bg-green-600 text-white rounded p-2 active:!scale-110">
                    <ExportOutlined /> Export
                </Button>
            </div>
            <Spin spinning={isFetching} className="custom-green-spin" tip="Loading Data">
                <Table
                    columns={columns}
                    dataSource={tableData}
                    scroll={{ x: "max-content" }}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: total,
                        // showSizeChanger: true
                    }}
                    onChange={handleTableChange}
                />
            </Spin>
        </div>
    );
}

export default FailedMessageTable;
