import { PageContainer } from '@ant-design/pro-components';
import { Card, Table, Button, Input, Space, Modal, Tag  } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Course_manage: React.FC = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);

  useEffect(() => {
    // 发起请求以获取课程数据
    fetch('http://localhost:5000/api/courses')
      .then(response => response.json())
      .then(data => setDataSource(data))
      .catch(error => console.error('Error:', error));
  }, []);
  
  const [searchText, setSearchText] = useState('');
  const handleSearch = (value: string) => {
    setSearchText(value);
  };
  const filteredCourses = dataSource.filter((data) =>
    data.course_name.includes(searchText)
  );

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

  //新增课程对话框的逻辑
  const [isAddCourseModalOpen,setIsAddCourseModalOpen] = useState(false);
  const handleAddCourse = () =>{
    setIsAddCourseModalOpen(true);
  };
  //新增课程对话框的ok按钮
  const handleAddCourseModalOk = async () => {
    const NewCourseData = {
      courseName: newCourseName,
      courseId: newCourseId,
      mainTeacher: newMainTeacher,
      teachingClassrom: newTeachingClassroom,
      teachingTime: newTeachingTime,
    };
  
    try {
      // 发送POST请求到后端接口
      const response = await axios.post('http://localhost:5000/api/addcourse', NewCourseData);
      console.log(response); // 检查响应
  
      // 成功后的逻辑，例如更新课程列表
      // ...
  
      // 重置表单状态并关闭模态框
      setNewCourseName('');
      setNewCourseId('');
      setNewMainTeacher('');
      setNewTeachingClassroom('');
      setNewTeachingTime('');
      setIsAddCourseModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
      // 错误处理逻辑
    }
  };

  //新增课程对话框的cancel按钮
  const handleAddCourseModalCancel = () =>{
    setNewCourseName('');
    setNewCourseId('');
    setNewMainTeacher('');
    setNewTeachingClassroom('');
    setNewTeachingTime('');
    setIsAddCourseModalOpen(false);
  }
  //新增课程对话框的五个输入框中的内容变量
  const [newCourseName,setNewCourseName] = useState('');
  const [newCourseId,setNewCourseId] = useState('');
  const [newMainTeacher,setNewMainTeacher] = useState('');
  const [newTeachingClassroom,setNewTeachingClassroom] = useState('');
  const [newTeachingTime,setNewTeachingTime] = useState('');
  const handleNewCourseNameChange = (e) => {
    setNewCourseName(e.target.value);
  };
  
  const handleNewCourseIdChange = (e) => {
    setNewCourseId(e.target.value);
  };
  
  const handleNewMainTeacherChange = (e) => {
    setNewMainTeacher(e.target.value);
  };
  
  const handleNewTeachingClassroomChange = (e) => {
    setNewTeachingClassroom(e.target.value);
  };
  
  const handleNewTeachingTimeChange = (e) => {
    setNewTeachingTime(e.target.value);
  };
  
  


  return (
    <PageContainer style={{ backgroundColor: 'white' }}>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={handleAddCourse}>
            新增课程
          </Button>
          <Modal title="新增课程" open={isAddCourseModalOpen} onOk={handleAddCourseModalOk} onCancel={handleAddCourseModalCancel}>
            <p>课程名称：<Input onChange={handleNewCourseNameChange}/></p>
            <p>课程编号：<Input onChange={handleNewCourseIdChange}/></p>
            <p>主讲教师：<Input onChange={handleNewMainTeacherChange}/></p>
            <p>授课教室：<Input onChange={handleNewTeachingClassroomChange}/></p>
            <p>授课时间：<Input onChange={handleNewTeachingTimeChange}/></p>
          </Modal>
          <Input.Search
            placeholder="搜索课程"
            onSearch={handleSearch}
            style={{ width: 200, marginLeft: 16 }}
          />
        </div>
        <Table columns={columns} dataSource={filteredCourses} />
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
