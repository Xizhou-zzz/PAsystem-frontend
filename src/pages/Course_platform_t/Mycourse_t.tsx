import { PageContainer } from '@ant-design/pro-components';
import { Card, Table, Button, Input, Space, Modal, Tag } from 'antd';
import { currentUser } from '@/services/ant-design-pro/api';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Mycourse_t: React.FC = () => {
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
  

  const [course_data, setCourseData] = useState([]);
    // 在页面加载时发起get请求，获取后端数据
    useEffect(() => {
      if (currentUserInfo) {
        const user_name = currentUserInfo.name; // 使用当前用户name
        axios.get(`http://127.0.0.1:5000/teaching_manage/course_manage/get/${user_name}`)
      .then(res => {
        console.log(res.data);
        setCourseData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
      }
    }, [currentUserInfo]); // 添加 currentUserInfo 作为依赖项
  

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);

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
        </Space>
      ),
    },
  ];

  //搜索逻辑的实现
  const [searchText, setSearchText] = useState('');
  const handleSearch = (value: string) => {
    setSearchText(value);
  };
  const filteredCourses = course_data.filter((data) =>
    data.course_name.includes(searchText)
  );
  

  return (
    <PageContainer style={{ backgroundColor: 'white' }}>
        <div style={{ marginBottom: 16 }}>
          <Input.Search
            placeholder="搜索课程"
            onSearch={handleSearch}
            style={{ width: 200, marginLeft: 16 }}
          />
        </div>
        <Table columns={columns} dataSource={filteredCourses} />
        {/* 设备模态框 */}
        <Modal
          title={selectedClass ? '课程详情' : '新增设备'}
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

export default Mycourse_t;
