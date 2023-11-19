import { PageContainer } from "@ant-design/pro-components";
import {Card,Divider,Space,Button,Table,Modal,Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from "react";

const Mission: React.FC = () =>{
  //控制查看作业对话框是否弹出的状态变量
  const [isModalOpen,setIsModalOpen] = useState(false);
  const showModal = () =>{
    setIsModalOpen(true);
  }
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //控制提交作业对话框是否弹出的状态变量
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal1 = () => {
    setOpen(true);
  };

  const handleOk1 = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel1 = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
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
    }

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
          <Modal title="作业内容" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          </Modal>
          <Button type="primary" onClick={showModal1}>提交作业</Button>
          <Modal
            title="Title"
            open={open}
            onOk={handleOk1}
            confirmLoading={confirmLoading}
            onCancel={handleCancel1}>
              <p>{modalText}</p>
              <Upload >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
          </Modal>
        </Space>
      ),
    },
  ];


  return (
    <PageContainer>
      <Card>
        <p>
          待完成作业：
        </p>
        <Table columns={columns} dataSource={dataSource} />
        <Divider />
        <p>
          待批改作业：
        </p>
      </Card>
    </PageContainer>
  )
};

export default Mission;