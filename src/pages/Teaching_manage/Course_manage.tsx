import { PageContainer } from '@ant-design/pro-components';
import { Card, Table, Button, Input, Space, Modal, Tag } from 'antd';
import React, { useState, useEffect } from 'react';

const Course_manage: React.FC = () => {
  const [dataSource, setDataSource] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);

  useEffect(() => {
    // 发起请求以获取课程数据
    fetch('http://localhost:5000/api/courses')
      .then(response => response.json())
      .then(data => setDataSource(data))
      .catch(error => console.error('Error:', error));
  }, []);
  
  
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleModalOk = () => {
    // 处理模态框确认逻辑
    setIsModalVisible(false);
    setSelectedClass(null);
  };

  const handleModalCancel = () => {
    // 处理模态框取消逻辑
    setIsModalVisible(false);
    setSelectedClass(null);
  };

  const handleEdit = (record: any) => {
    setSelectedClass(record);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: '课程名称',
      dataIndex: 'course_name',
      key: 'course_name',
    },
    {
      title: '课程编号',
      dataIndex: 'course_id',
      key: 'course_id',
    },
    {
      title: '主讲教师',
      dataIndex: 'main_teacher',
      key: 'main_teacher',
    },
    {
      title: '授课教室',
      dataIndex: 'teaching_room',
      key: 'teaching_room',
    },
    {
      title: '授课时间',
      dataIndex: 'teaching_time',
      key: 'teaching_time',
    },
    {
      title: '',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            查看
          </Button>
          <Button>
            修改课程信息
          </Button>
          <Button type="primary" danger>
            删除课程
          </Button>

        </Space>
      ),
    },
  ];

  return (
    <PageContainer style={{ backgroundColor: 'white' }}>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary">
            新增课程
          </Button>
          <Input.Search
            placeholder="搜索课程"
            onSearch={handleSearch}
            style={{ width: 200, marginLeft: 16 }}
          />
        </div>
        <Table columns={columns} dataSource={dataSource} />
        {/* 设备模态框 */}
        <Modal
          title={selectedClass ? '课程详情' : '新增课程'}
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          {/* 在模态框中可以放置设备的表单项，用于编辑或添加设备信息 */}
          {/* 这里只是一个示例，你可以根据实际需求进行修改 */}
          <div>
            课程名称：
            <Input value={selectedClass?.course_name} />
          </div>
          <div>
            授课教师：
            <Input value={selectedClass?.main_teacher} />
          </div>
          <div>
            授课教室：
            <Input value={selectedClass?.teaching_room} />
          </div>
          <div>
            授课时间：
            <Input value={selectedClass?.teaching_time} />
          </div>
        </Modal>
      
    </PageContainer>
  );
};

export default Course_manage;
