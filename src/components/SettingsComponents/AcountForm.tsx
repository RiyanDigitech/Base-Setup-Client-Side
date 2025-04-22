import { Form, Input, Button, Row, Col, Card } from 'antd';

const AccountForm = () => {
    const [form] = Form.useForm();

    const handleSave = (values: any) => {
        console.log('Saved:', values);
    };

  return (
   <Card title="Profile Details" className="shadow-md rounded-lg">
                           <Form
                               form={form}
                               layout="vertical"
                               onFinish={handleSave}
                               initialValues={{
                                   accountId: '1263',
                                   username: '923091256389',
                                   name: 'Rabees Waheed',
                                   email: 'rabees@digitechinfra.com',
                               }}
                           >
                               <Row gutter={16}>
                                   <Col xs={24} md={12}>
                                       <Form.Item label="Account ID" name="accountId">
                                           <Input disabled />
                                       </Form.Item>
                                   </Col>
                                   <Col xs={24} md={12}>
                                       <Form.Item label="Username" name="username">
                                           <Input disabled />
                                       </Form.Item>
                                   </Col>
                                   <Col xs={24} md={12}>
                                       <Form.Item label="Name" name="name">
                                           <Input />
                                       </Form.Item>
                                   </Col>
                                   <Col xs={24} md={12}>
                                       <Form.Item label="Email" name="email">
                                           <Input />
                                       </Form.Item>
                                   </Col>
                               </Row>
   
                               <Form.Item>
                                   <Button htmlType="submit" className="mr-2 bg-[#047857] text-white hover:bg-green-900">
                                       Save changes
                                   </Button>
                                   <Button>Discard</Button>
                               </Form.Item>
                           </Form>
                       </Card>
  );
};

export default AccountForm;
