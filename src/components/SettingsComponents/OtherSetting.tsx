import React, { useState } from 'react';
import { Table, Switch, Input, Button, Space, Card } from 'antd';
import { KeyOutlined, MailOutlined, ContactsOutlined } from '@ant-design/icons';

interface Setting {
  key: string;
  description: string;
  type: 'switch' | 'input';
  icon: React.ReactNode;
  value: boolean | string | number;
}

const OtherSettings: React.FC = () => {
     const [settings, setSettings] = useState<Setting[]>([
    {
      key: 'twoStepVerification',
      description: 'Enable Two Step Verification',
      type: 'switch',
      icon: <KeyOutlined />,
      value: false,
    },
    {
      key: 'failedSMSResubmission',
      description: 'Failed SMS Resubmission',
      type: 'switch',
      icon: <MailOutlined />,
      value: true,
    },
    {
      key: 'resubmissionAttempts',
      description: 'No. Of Resubmission Attempts',
      type: 'input',
      icon: <MailOutlined />,
      value: 3,
    },
    {
      key: 'alternativeContacts',
      description: 'Alternative Contact Details For Notification Like, OTP, Expiry Reminders.',
      type: 'input',
      icon: <ContactsOutlined />,
      value: '923001234567,923131234567',
    },
  ]);


  const [checked, setChecked] = useState(false);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
  };
//   const handleSwitchChange = (key: string, checked: boolean) => {
//     setSettings((prev) =>
//       prev.map((setting) =>
//         setting.key === key ? { ...setting, value: checked } : setting
//       )
//     );
//   };

  const handleInputChange = (key: string, value: string) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.key === key ? { ...setting, value } : setting
      )
    );
  };

  const handleUpdate = (key: string) => {
    const updatedSetting = settings.find((setting) => setting.key === key);
    console.log('Updating setting:', updatedSetting);
  };

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (_: any, record: Setting) => (
        <Space>
          {record.icon}
          {record.description}
        </Space>
      ),
    },
    {
      title: '',
      dataIndex: 'value',
      key: 'value',
      render: (_: any, record: Setting) =>
        record.type === 'switch' ? (
          <div className='flex gap-6'>
            <Switch
      checked={checked}
      onChange={handleChange}
      style={{
        backgroundColor: checked ? 'green' : 'white',
        borderColor: checked ? 'green' : 'gray', // Adjust border color if needed
        transition: 'background-color 0.3s ease',
      }}
    />
          <p>Toggle this switch element to on/off</p>
          </div>
        ) : (
          <Input
            value={record.value as string}
            onChange={(e) => handleInputChange(record.key, e.target.value)}
            style={{ width: 200 }}
          />
        ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Setting) => (
        <Button className='!bg-green-700 !text-white active:!scale-110' type="primary" onClick={() => handleUpdate(record.key)}>
          Update
        </Button>
      ),
    },
  ];

  return (
    <Card title="Other Settings" >
      <Table
        columns={columns}
        dataSource={settings}
        pagination={false}
        bordered
      />
    </Card>
  );
};

export default OtherSettings;
