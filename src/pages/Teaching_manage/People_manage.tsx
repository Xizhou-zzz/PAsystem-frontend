import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Button, Table, Modal, Checkbox, Form, Select } from 'antd';

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
            title: '课程',
            key: 'courses',
            render: (record: any) => (
                <Button type="link" onClick={() => handleAdjust(record)}>
                    调整
                </Button>
            ),
        },
    ];

    const renderCourseOptions = () => {
        // 根据实际情况生成课程选项
        const courses = ['软件测试与质量保证', '专业课程综合实训III','机械制图', '高等数学','大学生心理健康', '闺蜜敌密辩证法'];
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

    return (
        <PageContainer>
            <Card>
                <h2>学生列表</h2>
                <Table dataSource={students} columns={columns} />

                <h2>教师列表</h2>
                <Table dataSource={teachers} columns={columns} />

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
                                placeholder="请选择课程"
                                defaultValue={selectedPerson?.courses}
                            >
                                {renderCourseOptions()}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </PageContainer>
    );
};
export default People_manage;
