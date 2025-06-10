import React, { useState } from 'react';
import { Table, Button, Tag, Select, Spin, Alert } from 'antd';
import { WechatOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllMessage } from '@/services/ChatServices/ChatsService';
import moment from 'moment';
import '@/Css/Spin.css'
const { Option } = Select;
interface ChatItem {
  wa_id: string;
  message: string;
  sender: string;
  created_at: string;
  updated_at: string;
}

const Chats: React.FC = () => {
  const navigate = useNavigate();

  const [statusFilter , setStatusFilter] = useState('')

  const handleReply = (record: ChatItem) => {
    console.log('Reply to:', record.wa_id);
    navigate(`/chat-reply/${record.wa_id}`);
  };


    console.log('Filter Result' , statusFilter)

  

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Number',
      dataIndex: 'wa_id',
      key: 'wa_id',
    },
    
    {
  title: 'Created At',
  dataIndex: 'created_at',
  key: 'created_at',
  render: (date: string) => moment(date).format('MMM DD, YYYY hh:mm A')
},
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
       render: (date: string) => moment(date).format('MMM DD, YYYY hh:mm A')
    },
   {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
  render: (status: string | null | undefined) => {
    if (!status) return <Tag color="default">UNKNOWN</Tag>;

    let color = 'default';
    const lowerStatus = status.toLowerCase();

    if (lowerStatus === 'replied') color = 'green';
    else if (lowerStatus === 'closed') color = 'red';
    else if (lowerStatus === 'pending') color = 'blue';

    return <Tag color={color}>{status.toUpperCase()}</Tag>;
  }
},
    
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: ChatItem) => (
        <Button
          className="!bg-green-600 !p-2 !text-white !rounded"
          type="primary"
          onClick={() => handleReply(record)}
        >
          <WechatOutlined /> Reply
        </Button>
      ),
    },
  ];


  const {data , isFetching , isError , error} = useQuery({
    queryKey:['chats', statusFilter],
    queryFn: () => getAllMessage(statusFilter)
  })

  const getData = Array.isArray(data?.data) ? data?.data : []
  const datasources = getData.map((item: any) => ({
    ...item,
    key: item.id,
  })); 

  return (
    <div className='p-6 bg-white min-h-screen mt-7'>
    {/* Dropdown filter */}
    <div style={{ marginBottom: 16 }}>
      <Select
        placeholder="Filter by Status"
        onChange={(value) => setStatusFilter(value)}
        allowClear
        style={{ width: 200 }}
      >
        <Option value="closed">Closed</Option>
        <Option value="replied">Replied</Option>
        <Option value="pending">Pending</Option>
      </Select>
    </div>

    {/* Table */}
    <Spin
       style={{ color: '#15803D' }}
       className="custom-green-spin"
       spinning={isFetching}
       tip="Loading Data"
     >
       {isError ? (
         <Alert
           type="error"
           message="Failed to load Users"
           description={String(error)}
           showIcon
           className="mb-4"
         />
       ) : (<Table
      dataSource={datasources}
      columns={columns}
    />
       )}
    </Spin>
  </div>
  );
};

export default Chats;
