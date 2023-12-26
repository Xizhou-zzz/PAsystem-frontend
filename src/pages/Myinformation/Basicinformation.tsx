import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Avatar, Form, Input, Button, Upload, message } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { currentUser } from '@/services/ant-design-pro/api';
import axios from 'axios';

const Basicinformation: React.FC = () => {
  
  const [currentUserInfo, setCurrentUserInfo] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await currentUser();
        setCurrentUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };
    fetchCurrentUser();
  }, []);

  // 确保在组件函数体内部调用Form.useForm()
  const [form] = Form.useForm();
    //声明一个状态变量avatarUrl，初始值设为null；声明一个函数setAvatarUrl，用于更新avatarUrl的值
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (currentUserInfo) {
      const user_name = currentUserInfo.name; // 使用当前用户name
      axios.get(`http://localhost:5000/api/user/${user_name}`)
        .then(response => {
          form.setFieldsValue(response.data);
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [currentUserInfo, form]); // 添加 currentUserInfo 作为依赖项

  const [initialValues, setInitialValues] = useState({
    username: '',
    id: '',
    access: '',
    email: '',
    address: ''
  });
  
  // 处理更新信息逻辑
  const handleUpdateInfo = (values: any) => {
    console.log('更新信息:', values);

    axios.post('http://localhost:5000/api/user/update', values)
      .then(response => {
        message.success('用户信息更新成功');
        // 这里可以进行其他操作，如更新页面状态或重定向
      })
      .catch(error => {
        console.error('Error updating user data:', error);
        message.error('用户信息更新失败');
      });
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
        form={form} // 将form实例传递给Form组件
        onFinish={handleUpdateInfo}
        style={{ marginTop: 24 }}
        >
          <Form.Item name="username" label="用户名">
            <Input type="text" style={{ marginLeft: '0em' }} />
          </Form.Item>
          <Form.Item name="id" label="账号">
            <Input style={{ marginLeft: '1em' }} />
          </Form.Item>
          <Form.Item name="access" label="身份">
            <Input style={{ marginLeft: '1em' }} />
          </Form.Item>
          <Form.Item name="email" label="邮箱">
            <Input style={{ marginLeft: '1em' }} />
          </Form.Item>
          <Form.Item name="address" label="地址">
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
