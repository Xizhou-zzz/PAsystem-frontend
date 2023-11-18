import { PageContainer } from '@ant-design/pro-components';
import { Card, Form, Input, Button } from 'antd';
import React from 'react';

const Safetysettings: React.FC = () => {
  const handleUpdatePassword = (values: any) => {
    // 处理更新密码逻辑
    console.log('更新密码:', values);
    // 这里可以编写更新密码的处理代码，如发送到后端进行保存等操作
  };

  const handleUpdatePhone = (values: any) => {
    // 处理更新手机逻辑
    console.log('更新手机:', values);
    // 这里可以编写更新手机的处理代码，如发送到后端进行保存等操作
  };

  const handleUpdateEmail = (values: any) => {
    // 处理更新邮箱逻辑
    console.log('更新邮箱:', values);
    // 这里可以编写更新邮箱的处理代码，如发送到后端进行保存等操作
  };

  return (
    <PageContainer>
      <Card title="账户密码" style={{ marginBottom: 24 }}>
        <Form onFinish={handleUpdatePassword}>
          <Form.Item label="当前密码强度" name="passwordStrength">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">修改</Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title="密保手机" style={{ marginBottom: 24 }}>
        <Form onFinish={handleUpdatePhone}>
          <Form.Item label="已绑定手机" name="boundPhone">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">修改</Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title="备用邮箱">
        <Form onFinish={handleUpdateEmail}>
          <Form.Item label="已绑定邮箱" name="boundEmail">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">修改</Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default Safetysettings;
