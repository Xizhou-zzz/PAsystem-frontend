import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Button, Table, Modal, Checkbox, Form, Select } from 'antd';
import Search from "antd/es/input/Search";

const { Option } = Select;

const People_manage: React.FC = () => {
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

    const students = [
        {
            key: '1',
            name: '曾令腾',
            student_id: '21301002',
            courses: ['软件测试与质量保证', '专业课程综合实训III'],
        },
        {
            key: '2',
            name: '李明',
            student_id: '21301000',
            courses: ['机械制图', '高等数学'],
        },
    ];

    const teachers = [
        {
            key: '1',
            name: '完颜慧德',
            teacher_id: 'T001',
            courses: ['大学生心理健康', '闺蜜敌密辩证法'],
        },
    ];

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'ID',
            dataIndex: 'student_id',
            key: 'student_id',
        },
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

    const [searchText, setSearchText] = useState('');

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const filteredStudents = students.filter((student) =>
        student.name.includes(searchText)
    );

    const filteredTeachers = teachers.filter((teacher) =>
        teacher.name.includes(searchText)
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
                        onSearch={handleSearch}
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
                        onSearch={handleSearch}
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
