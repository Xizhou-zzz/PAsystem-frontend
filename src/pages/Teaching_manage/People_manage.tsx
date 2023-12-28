import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Table, Button, Input, Modal, Checkbox, Form, Select } from 'antd';
import Search from 'antd/es/input/Search';

const { Option } = Select;

const People_manage: React.FC = () => {
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:5000/api/people')
            .then(response => response.json())
            .then(data => {
                console.log(data); // 检查数据结构
                if (Array.isArray(data.students) && Array.isArray(data.teachers)) {
                    setStudents(data.students);
                    setTeachers(data.teachers);
                } else {
                    // 处理错误情况或者设置默认值
                    setStudents([]);
                    setTeachers([]);
                }
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<any>(null);

    const handleAdjust = (record) => {
        setSelectedPerson(record);
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
          title: '姓名',
          dataIndex: 'username', // 确保这里是后端返回的对象中对应姓名的字段名
          key: 'username',
        },
        {
          title: 'ID',
          dataIndex: 'id', // 确保这里是后端返回的对象中对应ID的字段名
          key: 'id',
        },
        // ...其他列定义
        {
            title: '操作',
            key: 'courses',
            render: (record: any) => (
                <Button type="link" onClick={() => handleAdjust(record)}>
                    调整课程
                </Button>
            ),
        },
    ];

    const renderCourseOptions = () => {
        const courses = [
            '软件测试与质量保证',
            '专业课程综合实训III',
            '机械制图',
            '高等数学',
            '大学生心理健康',
            '闺蜜敌密辩证法',
        ]; //下拉菜单的备选课程列表
        return courses.map((course) => (
            <Option value={course} key={course}>
                {course}
            </Option>
        ));
    };

    const renderCourseList = (person) => {
        const { courses } = person;
        return courses.map((course) => (
            <Checkbox value={course} key={course}>
                {course}
            </Checkbox>
        ));
    };
    //学生的搜索
    const [searchText1, setSearchText1] = useState('');
    //老师的搜索
    const [searchText2, setSearchText2] = useState('');
    const handleSearch1 = (value) => {
        setSearchText1(value);
    };
    const handleSearch2 = (value) => {
        setSearchText2(value);
    };

    const filteredStudents = students.filter((student) =>
    student.username.includes(searchText1)
);

const filteredTeachers = teachers.filter((teacher) =>
    teacher.username.includes(searchText2)
);

    return (
        <PageContainer style ={{backgroundColor:'white'}}>
                <h2>
                    学生列表{' '}
                    <small>
                        (学生人数: {filteredStudents.length}/{students.length})
                    </small>
                </h2>
                <div>
                    <Search
                        placeholder="搜索学生姓名"
                        allowClear
                        enterButton="搜索"
                        onSearch={handleSearch1}
                        style={{ width: 200, marginLeft: 16 }}
                    />
                </div>
                <Table dataSource={filteredStudents} columns={columns} />

                <h2>
                    教师列表{' '}
                    <small>
                        (教师人数: {filteredTeachers.length}/{teachers.length})
                    </small>
                </h2>
                <div>
                    <Search
                        placeholder="搜索教师姓名"
                        allowClear
                        enterButton="搜索"
                        onSearch={handleSearch2}
                        style={{ width: 200, marginLeft: 16 }}
                    />
                </div>
                <Table dataSource={filteredTeachers} columns={columns} />

                <Modal
                    title="调整课程"
                    visible={isModalVisible}
                    onOk={handleModalOk}
                    onCancel={handleModalCancel}
                >
                    <Form>
                        <Form.Item label="已选课程">
                            <Checkbox.Group style={{ width: '100%' }}>
                                {selectedPerson &&
                                    selectedPerson.courses &&
                                    renderCourseList(selectedPerson)}
                            </Checkbox.Group>
                        </Form.Item>
                        <Form.Item label="全部课程">
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="请选择要调整的课程"
                                defaultValue={selectedPerson?.courses}
                            >
                                {renderCourseOptions()}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            
        </PageContainer>
    );
};

export default People_manage;
