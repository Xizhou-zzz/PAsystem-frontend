import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Form, Input, Button, Upload, message } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
//定义一个名为Basicinformation的函数组件
const Basicinformation: React.FC = () => {
  //声明一个状态变量avatarUrl，初始值设为null；声明一个函数setAvatarUrl，用于更新avatarUrl的值
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  // 处理更新信息逻辑
  const handleUpdateInfo = (values: any) => {
    console.log('更新信息:', values);
    // 这里可以编写更新信息的处理代码，如发送到后端进行保存等操作
  };
  //处理头像上传逻辑
  const handleAvatarChange = (info: any) => {
    if (info.file.status === 'done') {
      // 头像上传成功
      const imageUrl = URL.createObjectURL(info.file.originFileObj);
      //头像上传成功后修改Avatar的值为新上传头像的URL
      setAvatarUrl(imageUrl);
      message.success('头像上传成功');
    } else if (info.file.status === 'error') {
      // 头像上传失败
      message.error('头像上传失败');
    }
  };

  return (
    <PageContainer style={{ backgroundColor: 'white' }}>
      <div style={{ textAlign: 'center' }}>
        <Avatar size={120} icon={<UserOutlined />} src={avatarUrl} />
        <Form
          onFinish={handleUpdateInfo}
          initialValues={{
            username: '闹铃哥',
            account: '起飞',
            identity: 'Admin',
            contact: '21301028@bjtu.edu.cn',
            hometown: '内蒙古包头市',
          }}
          style={{ marginTop: 24 }}
        >
          <Form.Item name="username" label="用户名">
            <Input type="text" style={{ marginLeft: '0em' }} />
          </Form.Item>
          <Form.Item name="account" label="账号">
            <Input style={{ marginLeft: '1em' }} />
          </Form.Item>
          <Form.Item name="identity" label="身份">
            <Input style={{ marginLeft: '1em' }} />
          </Form.Item>
          <Form.Item name="contact" label="邮箱">
            <Input style={{ marginLeft: '1em' }} />
          </Form.Item>
          <Form.Item name="hometown" label="籍贯">
            <Input style={{ marginLeft: '1em' }} />
          </Form.Item>
          <Form.Item label="上传头像">
            <Upload accept="image/*" showUploadList={false} onChange={handleAvatarChange}>
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageContainer>
  );
};

export default Basicinformation;
