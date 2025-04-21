import { Form, Input, Button, Row, Col, Card } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const ChangePasswordForm = () => {
  const [form] = Form.useForm();

  const handlePasswordChange = (values: any) => {
    console.log('New Passwords:', values);
  };

  return (
    <Card title="Profile Details" className="shadow-md rounded-lg">
      <Form
        form={form}
        layout="vertical"
        onFinish={handlePasswordChange}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Current password"
              name="currentPassword"
              rules={[{ required: true, message: 'Please enter current password' }]}
            >
              <Input.Password
                placeholder="Enter current password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}></Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: 'Please enter new password' },
                { min: 8, message: 'Minimum 8 characters required' }
              ]}
            >
              <Input.Password
                placeholder="Enter new password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Retype New Password"
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Please confirm new password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm your new password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="mb-4 text-sm">
          <b>Password requirements:</b>
          <ul className="list-disc pl-5 mt-2">
            <li>Minimum 8 characters long - the more, the better</li>
            <li>At least one lowercase character</li>
            <li>At least one number, symbol, or whitespace character</li>
          </ul>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="mr-2 bg-[#047857] text-white hover:bg-green-900">
            Save changes
          </Button>
          <Button>Discard</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChangePasswordForm;
