import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Table, Modal, Button, Select,Input } from 'antd';
import axios from 'axios';

const { Option } = Select;

const Permission_manage: React.FC = () => {
    const [users, setUsers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [selectedRole, setSelectedRole] = useState<string>('');

    const handleAuthorize = (record) => {
        setSelectedUser(record);
        setSelectedRole(record.access); // 初始化选中的权限为当前用户权限
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        // 发送请求更新用户权限
        axios.post(`http://localhost:5000/api/users/${selectedUser.id}/access`, {
            access: selectedRole
        })
        .then(response => {
            setIsModalVisible(false);
    
            // 更新 users 状态以反映权限的更改
            setUsers(users.map(user => {
                if (user.id === selectedUser.id) {
                    return { ...user, access: selectedRole }; // 更新权限
                }
                return user;
            }));
        })
        .catch(error => {
            console.error('Error updating access:', error);
        });
    };
    

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleRoleChange = (value) => {
        setSelectedRole(value);
    };

    const columns = [
        {
            title: '姓名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '权限',
            dataIndex: 'access',
            key: 'access',
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
    const [searchText, setSearchText] = useState('');
    const handleSearch = (value) => {
        setSearchText(value);
    };
     const filteredUsers = users.filter((user) =>
    user.access.includes(searchText)
);

    return (
        <PageContainer style={{backgroundColor:'white'}}>
                <h2>用户列表</h2>
                <Input.Search
                    placeholder="搜索权限"
                    onSearch={handleSearch}
                    style={{ width: 200, marginLeft: 16 }}
                />
                <Table dataSource={filteredUsers} columns={columns} />

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
                        <Option value="student">学生</Option>
                        <Option value="assistant">黑名单用户</Option>
                        <Option value="teacher">教师</Option>
                        <Option value="admin">管理员</Option>
                    </Select>
                </Modal>
            
        </PageContainer>
    );
};
export default Permission_manage;
