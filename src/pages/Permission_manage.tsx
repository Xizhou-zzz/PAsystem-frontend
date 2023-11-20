import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Table, Modal, Button, Select } from 'antd';
const { Option } = Select;
const Permission_manage: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [selectedRole, setSelectedRole] = useState<string>('');

    const handleAuthorize = (record) => {
        setSelectedUser(record);
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleRoleChange = (value) => {
        setSelectedRole(value);
    };

    const users = [
        {
            key: '1',
            name: '曾令腾',
            account: 'zlt',
            role: '学生',
        },
        {
            key: '2',
            name: '李四',
            account: 'lisi',
            role: '教师',
        },
        {
            key: '3',
            name: '王五',
            account: 'wangwu',
            role: '管理员',
        },
    ];

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '账号',
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: '权限',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: '操作',
            key: 'action',
            render: (record: any) => (
                <Button type="primary" onClick={() => handleAuthorize(record)}>
                    授权
                </Button>
            ),
        },
    ];

    return (
        <PageContainer>
            <Card>
                <h2>用户列表</h2>
                <Table dataSource={users} columns={columns} />

                <Modal
                    title="调整权限"
                    visible={isModalVisible}
                    onOk={handleModalOk}
                    onCancel={handleModalCancel}
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="选择权限"
                        onChange={handleRoleChange}
                        value={selectedRole}
                    >
                        <Option value="学生">学生</Option>
                        <Option value="助教">助教</Option>
                        <Option value="教师">教师</Option>
                        <Option value="管理员">管理员</Option>
                    </Select>
                </Modal>
            </Card>
        </PageContainer>
    );
};
export default Permission_manage;
