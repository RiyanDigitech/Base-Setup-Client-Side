


import { Table, Tag } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { CheckCircleOutlined } from "@ant-design/icons";

interface DataType {
  no: string,
  ID: number,
  FROM: string,
  TO: string,
  Message: string,
  Submitted: string,
  Delivered: string,
  Status: string,
}

function TableAction() {
  const columns: TableColumnsType<DataType> = [
    {
      title: '#',
      dataIndex: 'no',
    },
    {
      title: 'ID',
      dataIndex: 'ID',
      sorter: (a, b) => a.ID - b.ID,
    },
    {
      title: 'FROM',
      dataIndex: 'FROM',
      filters: [
        { text: 'Joe', value: 'Joe' },
        {
          text: 'Category 1', value: 'Category 1',
          children: [{ text: 'Yellow', value: 'Yellow' }, { text: 'Pink', value: 'Pink' }]
        },
        {
          text: 'Category 2', value: 'Category 2',
          children: [{ text: 'Green', value: 'Green' }, { text: 'Black', value: 'Black' }]
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.FROM.includes(value as string),
      width: '30%',
    },
    {
      title: 'TO',
      dataIndex: 'TO',
      sorter: (a, b) => a.ID - b.ID,
    },
    {
      title: 'Message',
      dataIndex: 'Message',
      key: 'Message',
      render: (text: string) => {
        const words = text.split(' ');
        return words.length > 10
          ? words.slice(0, 10).join(' ') + '...'
          : text;
      },
      sorter: (a, b) => a.ID - b.ID,
    },
    {
      title: 'Submitted',
      dataIndex: 'Submitted',
      sorter: (a, b) => a.ID - b.ID,
    },
    {
      title: 'Delivered',
      dataIndex: 'Delivered',
      sorter: (a, b) => a.ID - b.ID,
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (text: string) => (
        <Tag color={text === 'Delivered To Handset' ? 'blue' : 'red'}>
          <CheckCircleOutlined /> {text.toUpperCase()}
        </Tag>
      ),
      sorter: (a, b) => a.ID - b.ID,
    },
  ];

  const data: DataType[] = [
    {
      no: '18012294',
      ID: 2108,
      FROM: '923342591363',
      TO: '923444688888',
      Message: 'Chatbot Stopped Successfully! _For Previous Menu Reply_ 🅿 _For Main Menu Reply_ Ⓜ _To Stop This Chat Reply With_ *stop*',
      Submitted: '2025-04-18 04:12:31',
      Delivered: '2025-04-18 04:12:32',
      Status: 'Delivered To Handset',
    },
    {
        no: '18012294',
        ID: 2108,
        FROM: '923342591363',
        TO: '923444688888',
        Message: 'Chatbot Stopped Successfully! _For Previous Menu Reply_ 🅿 _For Main Menu Reply_ Ⓜ _To Stop This Chat Reply With_ *stop*',
        Submitted: '2025-04-18 04:12:31',
        Delivered: '2025-04-18 04:12:32',
        Status: 'Delivered To Handset',
      }
  ];

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className="overflow-auto mt-7">
  <Table<DataType>
    columns={columns}
    dataSource={data}
    onChange={onChange}
    pagination={{ pageSize: 5 }}
    scroll={{ x: 'max-content' }}
    className="green-table"
  />
</div>
  );
}

export default TableAction;

