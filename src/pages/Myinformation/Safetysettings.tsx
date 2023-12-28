import { PageContainer } from '@ant-design/pro-components';
import { Card, Form, Input, Button,Progress,Modal, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { currentUser } from '@/services/ant-design-pro/api';
import axios from 'axios'; // 确保安装了axios

const Safetysettings: React.FC = () => {
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

  const handleUpdatePassword = (values: any) => {
    // 处理更新密码逻辑
    console.log('更新密码:', values);
    // 这里可以编写更新密码的处理代码，如发送到后端进行保存等操作
  };

  //定义当前密码强度进度条后面的文字内容
  const customText = () =>{
    return '中'
  }
  //修改密码弹出的对话框
  const [isChangePasswordModalOpen,setIsChangePasswordModalOpen] = useState(false);
  const showChangePasswordModal = () =>{
    setIsChangePasswordModalOpen(true);
  }
  const handleChangePasswordModalOk = async () => {
    if (passwordMismatch || !inputValue2 || !inputValue3) {
      error();
      return;
    }
  
    try {
      const response = await axios.put(`http://127.0.0.1:5000/api/safetysettings/updatepassword`, {
        username: currentUserInfo?.name,
        currentPassword:inputValue1,
        newPassword: inputValue2,
      });
  
      if (response.status === 200) {
        success();
        setIsChangePasswordModalOpen(false);
        setInputValue1('');
        setInputValue2('');
        setInputValue3('');
      } else {
        error();
      }
    } catch (e) {
      console.error('Error updating password:', e);
      error();
    }
  };
  

  const [messageApi, contextHolder] = message.useMessage();
  const success = () =>{
    messageApi.open({
      type:'success',
      content:'密码修改成功！'
    });
  };
  
  const error = () =>{
    messageApi.open({
      type:'error',
      content:'密码修改失败！'
    });
  };
  const handleChangePasswordModalCancel = () =>{
    setInputValue1('');
    setInputValue2('');
    setInputValue3('');
    setIsChangePasswordModalOpen(false);
  }
  //修改密码弹出的对话框中的三个输入框的值
  const [inputValue1,setInputValue1] = useState('');
  const [inputValue2,setInputValue2] = useState('');
  const [inputValue3,setInputValue3] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const handleChange1 = (e) => {
    // 处理输入框1的内容变化
    setInputValue1(e.target.value);
  };

  const handleChange2 = (e) => {
    // 处理输入框2的内容变化
    setInputValue2(e.target.value);
    setPasswordMismatch(false);
  };

  const handleChange3 = (e) => {
    // 处理输入框3的内容变化
    const newValue = e.target.value;
    setInputValue3(newValue);
    if(newValue != inputValue2){
      setPasswordMismatch(true);
    }
    else{
      setPasswordMismatch(false);
    }
  };

  return (
    <PageContainer style={{ backgroundColor: 'white' }}>
      {contextHolder}
      <Card title="账户密码" style={{ marginBottom: 24 }}>
        <Form onFinish={handleUpdatePassword}>
          <Form.Item label="当前密码强度" name="passwordStrength">
            <Progress steps={3} percent={50} format={customText}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={showChangePasswordModal}>修改</Button>
          </Form.Item>
        </Form>
      </Card>
      <Modal title="修改密码" open={isChangePasswordModalOpen} onOk={handleChangePasswordModalOk} onCancel={handleChangePasswordModalCancel}>
        <p>请输入当前密码：</p>
        <Input value={inputValue1} onChange={handleChange1}/>
        <p>请输入修改后密码：</p>
        <Input value={inputValue2} onChange={handleChange2}/>
        <p>请再次输入修改后密码：</p>
        <Input value={inputValue3} onChange={handleChange3} style={{
            border: passwordMismatch ? '1px solid red' : '',
            marginBottom: '8px',
          }}/>
        {passwordMismatch && <div style={{ color: 'red' }}>两次输入的密码不一致</div>}
      </Modal>
    </PageContainer>
  );
};

export default Safetysettings;
