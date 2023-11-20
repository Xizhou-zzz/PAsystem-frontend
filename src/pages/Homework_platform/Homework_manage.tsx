import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Table, Button, Input, Modal, Upload, Space,Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const HomeworkManage: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState<any>({});
  const [fileList, setFileList] = useState([]);
  const [isDetail, setIsDetail] = useState(false); // 新增状态来判断是否是详情模式

  const handleSearch = (value: string) => {
    setSearchText(value);
    // 添加搜索逻辑
  };

  const handleAddHomework = () => {
    setSelectedHomework({});
    setIsModalVisible(true);
    setFileList([]);
    setIsDetail(false); // 设置为非详情模式
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    // 添加保存作业信息的逻辑
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleViewDetails = (record) => {
    setSelectedHomework(record);
    setIsModalVisible(true);
    setIsDetail(true); // 设置为详情模式
  };

  const handleDelete = (record) => {
    // 删除逻辑
  };

  const handleEdit = (record) => {
    setSelectedHomework(record);
    setIsModalVisible(true);
    setFileList([]); // 示例，实际应根据附件信息设置
    setIsDetail(false); // 设置为非详情模式
  };

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  const dataSource = [
    // 示例数据源，需要根据实际情况调整
    {
      key: '1',
      course_id: 'C001',
      class_id: 'CL001',
      submitted_count: 30,
      homework_title: '作业1',
      course_name: '软件项目管理与运维',
      deadline: '2023-11-30',
    },
    {
      key: '2',
      course_id: 'C001',
      class_id: 'CL001',
      submitted_count: 20,
      homework_title: '作业2',
      course_name: '科技论文写作',
      deadline: '2023-11-30',
    },
    // 更多作业...
  ];
  const TaskProgress: React.FC<{ percent: number }> = ({ percent }) => (
    <Progress percent={percent} steps={5} strokeColor={[]} />
  );
  
  const columns = [
    {
      title: '作业标题',
      dataIndex: 'homework_title',
      key: 'homework_title',
    },
    {
      title: '课程编号',
      dataIndex: 'course_id',
      key: 'course_id',
    },
    {
      title: '课堂编号',
      dataIndex: 'class_id',
      key: 'class_id',
    },
    {
      title: '已提交人数',
      dataIndex: 'submitted_count',
      key: 'submitted_count',
    },
    {
      title: '提交进度',
      key: 'progress',
      render: (record: any) => <TaskProgress percent={70} />,
    },
    {
      title: '所属课程',
      dataIndex: 'course_name',
      key: 'course_name',
    },
    {
      title: '截止日期',
      dataIndex: 'deadline',
      key: 'deadline',
    },
    {
      title: '操作',
      key: 'action',
      render: (record: any) => (
        <Space>
          <Button onClick={() => handleViewDetails(record)} style={{ color: '#1890ff' }}>详情</Button>
          <Button onClick={() => handleDelete(record)} style={{ color: '#ff4d4f' }}>删除</Button>
          <Button onClick={() => handleEdit(record)} style={{ color: '#52c41a' }}>编辑</Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer style={{ backgroundColor: 'white' }}>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={handleAddHomework} style={{ marginRight: 16 }}>
            新增作业
          </Button>
          <Input.Search
            placeholder="搜索作业"
            onSearch={handleSearch}
            style={{ width: 200 }}
          />
        </div>
        <Table columns={columns} dataSource={dataSource} />
        <Modal
          title={isDetail ? '作业详情' : selectedHomework?.homework_title ? '编辑作业' : '新增作业'}
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          footer={!isDetail ? [<Button key="back" onClick={handleModalCancel}>取消</Button>, <Button key="submit" type="primary" onClick={handleModalOk}>保存</Button>] : null}
        >
          {/* 模态框内的内容 */}
          <div style={{ marginTop: 16 }}>
            作业标题：
            <Input value={selectedHomework?.homework_title} disabled={isDetail} onChange={e => setSelectedHomework({ ...selectedHomework, homework_title: e.target.value })} />
          </div>
          <div style={{ marginTop: 16 }}>
            所属课程：
            <Input value={selectedHomework?.course_name} disabled={isDetail} onChange={e => setSelectedHomework({ ...selectedHomework, course_name: e.target.value })} />
          </div>
          <div style={{ marginTop: 16 }}>
            截止日期：
            <Input value={selectedHomework?.deadline} disabled={isDetail} onChange={e => setSelectedHomework({ ...selectedHomework, deadline: e.target.value })} />
          </div>
          <div style={{ marginTop: 16 }}>
            作业简介：
            <Input.TextArea
              rows={4}
              value={selectedHomework?.description}
              disabled={isDetail}
              onChange={e => setSelectedHomework({ ...selectedHomework, description: e.target.value })}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            上传附件：
            <Upload
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={() => false} // 阻止自动上传
              disabled={isDetail}
            >
              <Button icon={<UploadOutlined />} disabled={isDetail}>选择文件</Button>
            </Upload>
          </div>
        </Modal>
    </PageContainer>
  );
};

export default HomeworkManage;
