import { Form, Input, Button, Row, Col, Card } from 'antd';

const AccountForm = () => {
    const [form] = Form.useForm();

    const handleSave = (values: any) => {
        console.log('Saved:', values);
    };
  
   const userDetails = JSON.parse(localStorage.getItem('userdetails') || '{}');
  
  return (
   <Card title="Profile Details" className="shadow-md rounded-lg">
                           <Form
                               form={form}
                               layout="vertical"
                               onFinish={handleSave}
                               initialValues={{
                                   accountId: `${userDetails ? userDetails.id : '000'}`,
                                   name:    `${userDetails ? userDetails.name : '000'}`,
                                   username: `${userDetails ? userDetails.phone : '000'}`,
                                   email:   `${userDetails ? userDetails.email : '000'}`,
                               }}
                           >
                               <Row gutter={16}>
                                   <Col xs={24} md={12}>
                                       <Form.Item label="Account ID" name="accountId">
                                           <Input disabled />
                                       </Form.Item>
                                   </Col>
                                   <Col xs={24} md={12}>
                                       <Form.Item label="Phone" name="username">
                                           <Input disabled />
                                       </Form.Item>
                                   </Col>
                                   <Col xs={24} md={12}>
                                       <Form.Item label="Name" name="name">
                                           <Input disabled />
                                       </Form.Item>
                                   </Col>
                                   <Col xs={24} md={12}>
                                       <Form.Item label="Email" name="email">
                                           <Input disabled />
                                       </Form.Item>
                                   </Col>
                               </Row>
   
                               {/* <Form.Item>
                                   <Button htmlType="submit" 
                                    className="bg-[#047857] me-5 text-white w-full md:w-auto hover:!bg-green-500"
                                   >
                                       Save changes
                                   </Button>
                                   <Button
                                   className="bg-[#6d6d6d] text-white w-full md:w-auto hover:!bg-green-500"
                                   >Discard</Button>
                               </Form.Item> */}
                           </Form>
                       </Card>
  );
};

export default AccountForm;
