import { Form, Input, Button, Row, Col, Card } from 'antd';

const AccountForm = () => {
    const [form] = Form.useForm();

    const handleSave = (values: any) => {
        console.log('Saved:', values);
    };

  
 const userDetails = localStorage.getItem('userdetails');
  const user = userDetails && userDetails !== "undefined" ? JSON.parse(userDetails) : {};

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
                                       <Form.Item label="Account ID" name="id">
                                           <Input defaultValue={user?.id} disabled />
                                       </Form.Item>
                                   </Col>
                                   <Col xs={24} md={12}>
                                       <Form.Item label="Username" name="name">
                                           <Input defaultValue={user?.name} disabled />
                                       </Form.Item>
                                   </Col>
                                   <Col xs={24} md={12}>
                                       <Form.Item label="Phone" name="phone">
                                           <Input defaultValue={user?.phone} />
                                       </Form.Item>
                                   </Col>
                                   <Col xs={24} md={12}>
                                       <Form.Item label="Email" name="email">
                                           <Input defaultValue={user?.email} />
                                       </Form.Item>
                                   </Col>
                               </Row>
   
                               <Form.Item>
                                   <Button htmlType="submit" 
                                    className="bg-[#047857] me-5 text-white w-full md:w-auto hover:!bg-green-500"
                                   >
                                       Save changes
                                   </Button>
                                   <Button
                                   className="bg-[#6d6d6d] text-white w-full md:w-auto hover:!bg-green-500"
                                   >Discard</Button>
                               </Form.Item>
                           </Form>
                       </Card>
  );
};

export default AccountForm;
