import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Table, Button, Select, Modal, Input, Space } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const GradingStatus: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedResult, setSelectedResult] = useState<any>({});

  const handleCourseChange = (value) => {
    setSelectedCourse(value);
    // 根据选中的课程获取批改情况
  };

  const handleViewDetails = (record) => {
    setSelectedResult(record);
    setIsModalVisible(true);
    // 这里可以添加获取该学生的互评人姓名的逻辑
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  // 示例数据，实际应从后端获取
  const dataSource = [
    {
      key: '1',
      course_name:'软件项目管理与产品运维',
      homework_title: '作业1',
      course_id: 'C001',
      class_id: 'CL001',
      student_name: '学生A',
      grade: '85',
      peer_reviewer: '学生B',
    },
    // 更多数据...
  ];

  const columns = [
    {
      title: '课程名称',
      dataIndex: 'course_name',
      key: 'course_name',
    },
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
      title: '学生姓名',
      dataIndex: 'student_name',
      key: 'student_name',
    },
    {
      title: '成绩',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: '操作',
      key: 'action',
      render: (record: any) => <Button onClick={() => handleViewDetails(record)}>查看详情</Button>,
    },
  ];

  return (
    <PageContainer style={{backgroundColor:'white'}}>
        <Space>
        <Select
          defaultValue="请选择课程"
          style={{ width: 250 }}
          // onChange={handleChangeCourse}
          // 目前是静态数据，课程列表需要从后端获取
          options={[
            {value:'软件项目管理与产品运维',label:'软件项目管理与产品运维'},
            {value:'综合实训',label:'综合实训'},
          ]}
        />
        <Select
          defaultValue="请选择作业标题"
          style={{ width: 200 }}
          // onChange={handleChangeHomework}
          //作业标题列表需要从后端获取
          // 目前是静态数据，作业标题列表需要从后端获取，一个课程名称有它对应的作业标题列表
          options={[
            {value:'作业1',label:'作业1'},
            {value:'作业2',label:'作业2'},
          ]}
        />
        </Space>
        <Table columns={columns} dataSource={dataSource} style={{ marginTop: 16 }} />
        <Modal
          title="批改详情"
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          <div>学生姓名：{selectedResult.student_name}</div>
          <div>成绩：{selectedResult.grade}</div>
          <div>互评人姓名：{selectedResult.peer_reviewer}</div>
          <div>
            评价：
            <Input.TextArea rows={3} />
          </div>
          <div style={{ marginTop: 16 }}>
            <Space>
              <Button type="primary" icon={<CheckCircleOutlined />}>
                同意
              </Button>
              <Button type="danger" icon={<CloseCircleOutlined />}>
                不同意
              </Button>
            </Space>
          </div>
        </Modal>
      
    </PageContainer>
  );
};

export default GradingStatus;
