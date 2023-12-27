import { PageContainer } from '@ant-design/pro-components';
import { Card, Form, Input, Button,Progress,Modal, message } from 'antd';
import React, {useState} from 'react';

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

  //定义当前密码强度进度条后面的文字内容
  const customText = () =>{
    return '中'
  }
  //修改密码弹出的对话框
  const [isChangePasswordModalOpen,setIsChangePasswordModalOpen] = useState(false);
  const showChangePasswordModal = () =>{
    setIsChangePasswordModalOpen(true);
  }
  const handleChangePasswordModalOk = () =>{
    //需要添加修改后端密码的逻辑，把inputValue2或inputValue3的值传回后端，后端修改对应的密码
    setIsChangePasswordModalOpen(false);
    //如果修改成功
    success();
    //如果修改失败
    // error();
  }
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
      <Card title="密保手机">
        <Form onFinish={handleUpdateEmail}>
          <Form.Item label="已绑定手机号" name="phoneNumber">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">修改</Button>
          </Form.Item>
        </Form>
      </Card>
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
