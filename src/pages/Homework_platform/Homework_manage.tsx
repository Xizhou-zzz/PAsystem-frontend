import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Table, Button, Input, Modal, Upload, Space, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { currentUser } from '@/services/ant-design-pro/api';
import axios from 'axios';

const HomeworkManage: React.FC = () => {
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

  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1,setIsModalVisible1] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState<any>({});
  const [fileList, setFileList] = useState([]);
  const [homeworkData, setHomeworkData] = useState([]); // 添加这行代码来定义homeworkData状态

  useEffect(() => {
    if (currentUserInfo) {
      const user_name = currentUserInfo.name; // 使用当前用户name
      axios.get(`http://127.0.0.1:5000/api/homework_manage/teacher_get/${user_name}`)
      .then(res => {
        setHomeworkData(res.data); // 更新homeworkData状态
      })
      .catch(error => {
        console.error('Error fetching homework data:', error);
      });
    }
  }, [currentUserInfo]); // 添加 currentUserInfo 作为依赖项

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

  const handleRelease = () => {
    console.log('点击了发布批改任务按钮');
    setIsModalVisible1(true);
  }
  const handleModalOk1 = () => {
    setIsModalVisible1(false);
    // 添加发布批改任务的逻辑
  };

  const handleModalCancel1 = () => {
    setIsModalVisible1(false);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    // 添加保存作业信息的逻辑
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleViewDetails = (record:any) => {
    setSelectedHomework(record);
    setIsModalVisible(true);
    setIsDetail(true); // 设置为详情模式
  };

  const handleDelete = (record:any) => {
    // 删除逻辑
  };

  const handleEdit = (record:any) => {
    setSelectedHomework(record);
    setIsModalVisible(true);
    setFileList([]); // 示例，实际应根据附件信息设置
    setIsDetail(false); // 设置为非详情模式
  };

  const handleFileChange = ({ fileList }:any) => setFileList(fileList);

  const TaskProgress: React.FC<{ percent: number }> = ({ percent }) => (
    <Progress percent={percent} steps={5} strokeColor={[]} />
  );
  
  const columns = [
    {
      title: '作业标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '课程编号',
      dataIndex: 'course_code',
      key: 'course_code',
    },
    {
      title: '课堂编号',
      dataIndex: 'class_code',
      key: 'class_code',
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
      dataIndex: 'due_date',
      key: 'due_date',
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
          <Button type="primary" onClick={handleRelease} style={{ marginRight: 16 }}>
            发布批改任务
          </Button>
          <Input.Search
            placeholder="搜索作业"
            onSearch={handleSearch}
            style={{ width: 200 }}
          />
        </div>
        <Table columns={columns} dataSource={homeworkData} /> {/* 使用homeworkData作为数据源 */}
        <Modal
          title={isDetail ? '作业详情' : selectedHomework?.title ? '编辑作业' : '新增作业'}
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          footer={!isDetail ? [<Button key="back" onClick={handleModalCancel}>取消</Button>, <Button key="submit" type="primary" onClick={handleModalOk}>保存</Button>] : null}
        >
          {/* 模态框内的内容 */}
          <div style={{ marginTop: 16 }}>
            作业标题：
            <Input value={selectedHomework?.title} disabled={isDetail} onChange={e => setSelectedHomework({ ...selectedHomework, title: e.target.value })} />
          </div>
          <div style={{ marginTop: 16 }}>
            所属课程：
            <Input value={selectedHomework?.course_name} disabled={isDetail} onChange={e => setSelectedHomework({ ...selectedHomework, course_name: e.target.value })} />
          </div>
          <div style={{ marginTop: 16 }}>
            截止日期：
            <Input value={selectedHomework?.due_date} disabled={isDetail} onChange={e => setSelectedHomework({ ...selectedHomework, due_date  : e.target.value })} />
          </div>
          <div style={{ marginTop: 16 }}>
            作业简介：
            <Input.TextArea
              rows={4}
              value={selectedHomework?.assignment_description}
              disabled={isDetail}
              onChange={e => setSelectedHomework({ ...selectedHomework, assignment_description: e.target.value })}
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

        <Modal
          title='发布批改任务'
          visible={isModalVisible1}
          onOk={handleModalOk1}
          onCancel={handleModalCancel1}
          footer={[<Button onClick={handleModalCancel1}>取消</Button>,
        <Button onClick={handleModalOk1} type='primary'>发布</Button>]}
        >
          {/* 模态框内的内容 */}
          <div style={{ marginTop: 16 }}>
            作业标题：
            <Input />
          </div>
          <div style={{ marginTop: 16 }}>
            所属课程：
            <Input />
          </div>
          <div style={{ marginTop: 16 }}>
            截止日期：
            <Input />
          </div>
          <div style={{ marginTop: 16 }}>
            批改人：
            <Input />
          </div>
          <div style={{ marginTop: 16 }}>
            作业简介：
            <Input.TextArea
              rows={4}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            上传附件：
            <Upload
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={() => false} // 阻止自动上传
            >
              <Button icon={<UploadOutlined />} disabled={isDetail}>选择文件</Button>
            </Upload>
          </div>
        </Modal>
    </PageContainer>
  );
};
export default HomeworkManage;
