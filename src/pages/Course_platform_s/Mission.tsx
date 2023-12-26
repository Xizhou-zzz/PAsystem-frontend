import { PageContainer } from '@ant-design/pro-components';
import { Card, Divider, Space, Button, Table, Modal, Upload, Input, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const Mission: React.FC = () => {
  //控制查看作业对话框是否弹出的状态变量
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //控制提交作业对话框是否弹出的状态变量
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('请输入作业内容：');

  const showModal1 = () => {
    setOpen(true);
  };

  //提交成功与否消息提示的相关定义
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.info('提交成功！');
  };

  const handleOk1 = () => {
    setModalText('正在提交...');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      setModalText('请输入作业内容：');
      info();
    }, 2000);
  };

  const handleCancel1 = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  //点击批改作业弹出的对话框
  const [isModalOpen2,setIsModalOpen2] = useState(false);
  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleOk2 = () => {
    console.log('点击了批改作业对话框的确定按钮');
    setIsModalOpen2(false);
  };

  const handleCancel2 = () => {
    console.log('点击了批改作业对话框的取消按钮');
    setIsModalOpen2(false);
  };

  const handleUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      // 正在上传
      console.log('Uploading...');
    } else if (info.file.status === 'done') {
      // 上传完成
      message.success(`${info.file.name} 文件上传成功`);
    } else if (info.file.status === 'error') {
      // 上传失败
      message.error(`${info.file.name} 文件上传失败`);
    }
  };
  
  //提交作业中文本域相关定义
  const { TextArea } = Input;
  //待完成作业表格数据和列名定义
  const dataSource = [
    {
      key: '1',
      course_name: '科技论文写作',
      homework_name: '作业1',
    },
    {
      key: '2',
      course_name: '计算机网络',
      homework_name: '作业2',
    },
  ];
  const columns = [
    {
      title: '课程名称',
      dataIndex: 'course_name',
      key: 'course_name',
    },
    {
      title: '作业名称',
      dataIndex: 'homework_name',
      key: 'homework_name',
    },
    {
      title: '',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Button onClick={showModal}>查看作业</Button>
          <Modal
            title="作业内容"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          ></Modal>
          <Button type="primary" onClick={showModal1}>
            提交作业
          </Button>
          <Modal
            title="提交作业"
            open={open}
            onOk={handleOk1}
            confirmLoading={confirmLoading}
            onCancel={handleCancel1}
            destroyOnClose={true}
          >
            <p>{modalText}</p>
            <TextArea defaultValue="" rows={4} />
            <Upload
              action="http://127.0.0.1:5000/api/upload" // 指定上传的URL
              onChange={handleUploadChange} // 处理文件上传的状态变化
            >
            <Button icon={<UploadOutlined />}>上传附件</Button>
            </Upload>
          </Modal>
        </Space>
      ),
    },
  ];

  //待批改作业表格数据和列名定义
  const dataSource1 = [
    {
      key: '1',
      course_name: '科技论文写作',
      homework_name: '作业1',
    },
    {
      key: '2',
      course_name: '计算机网络',
      homework_name: '作业2',
    },
  ];
  const columns1 = [
    {
      title: '课程名称',
      dataIndex: 'course_name',
      key: 'course_name',
    },
    {
      title: '作业名称',
      dataIndex: 'homework_name',
      key: 'homework_name',
    },
    {
      title: '',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Button onClick={showModal}>查看作业</Button>
          <Modal
            title="作业内容"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          ></Modal>

          <Button type="primary" onClick={showModal2}>
            批改作业
          </Button>
          <Modal
            title="批改作业"
            open={isModalOpen2}
            onOk={handleOk2}
            confirmLoading={confirmLoading}
            onCancel={handleCancel2}
            destroyOnClose={true}
          >
            <p>请提交批改内容：</p>
            <TextArea defaultValue="" rows={4} />
            <Upload>
              <Button icon={<UploadOutlined />}>上传附件</Button>
            </Upload>
          </Modal>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer style={{ backgroundColor: 'white' }}>
      {contextHolder}
        <p>待完成作业：</p>
        <Table columns={columns} dataSource={dataSource} />
        <Divider />
        <p>待批改作业：</p>
        <Table columns={columns1} dataSource={dataSource1} />
    </PageContainer>
  );
};

export default Mission;
