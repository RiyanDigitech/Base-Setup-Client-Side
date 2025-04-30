import React, { useState } from 'react';
import { Table, Switch, Input, Button, Space, Card, message } from 'antd';
import {
  KeyOutlined,
  MailOutlined,
  ContactsOutlined,
} from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { enableOTPModal } from '@/services/authService/AuthService';

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
      description:
        'Alternative Contact Details For Notification Like, OTP, Expiry Reminders.',
      type: 'input',
      icon: <ContactsOutlined />,
      value: '923001234567,923131234567',
    },
  ]);

  const handleSwitchChange = (key: string, checked: boolean) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.key === key ? { ...setting, value: checked } : setting
      )
    );
    console.log(`${key}:`, checked);
  };

  const handleInputChange = (key: string, value: string) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.key === key ? { ...setting, value } : setting
      )
    );
  };

  const handleUpdate = (key: string) => {
    const updatedSetting:any = settings.find((setting) => setting.key === key);
    console.log('Updating setting:', updatedSetting);
    const enable = updatedSetting.value
    console.log("sfgd",enable)
    
    mfaToggleMutation.mutate(enable)

  };

  const mfaToggleMutation = useMutation({
   mutationFn:enableOTPModal,
   onSuccess:()=>{
      message.success("Two Step Verification Enable")
   },
   onError(error) {
    message.success("Two Step Verification Disable")
    console.log(error)
   },
  })

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      responsive: ['xs', 'sm', 'md', 'lg'],
      render: (_: any, record: Setting) => (
        <Space>
          {record.icon}
          <span>{record.description}</span>
        </Space>
      ),
    },
    {
      title: '',
      dataIndex: 'value',
      key: 'value',
      responsive: ['xs', 'sm', 'md', 'lg'],
      render: (_: any, record: Setting) =>
        record.type === 'switch' ? (
          <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
            <Switch
              checked={record.value as boolean}
              onChange={(checked) => handleSwitchChange(record.key, checked)}
              style={{
                backgroundColor: record.value ? 'green' : 'gray',
                borderColor: record.value ? 'green' : 'gray',
                transition: 'background-color 0.3s ease',
              }}
            />
            <p className="text-xs sm:text-sm">Toggle this switch element to on/off</p>
          </div>
        ) : (
          <Input
            value={record.value as string}
            onChange={(e) => handleInputChange(record.key, e.target.value)}
            style={{ width: '100%', maxWidth: 250 }}
          />
        ),
    },
    {
      title: 'Action',
      key: 'action',
      responsive: ['xs', 'sm', 'md', 'lg'],
      render: (_: any, record: Setting) => (
        <Button
          className='!bg-green-700 !text-white active:!scale-110'
          type="primary"
          onClick={() => handleUpdate(record.key)}
        >
          Update
        </Button>
      ),
    },
  ];

  return (
    <div className="p-2 sm:p-6">
      <Card title="Other Settings" className="max-w-full overflow-x-auto">
        <Table
          columns={columns}
          dataSource={settings}
          pagination={false}
          bordered
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
};

export default OtherSettings;
