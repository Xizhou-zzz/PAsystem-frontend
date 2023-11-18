import { PageContainer } from '@ant-design/pro-components';
import { Card, Table, Button, Input, Space, Modal, Tag } from 'antd';
import React, { useState, useEffect } from 'react';
import { Badge } from 'antd';


const Mycourse_t: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const handleSearch = (value: string) => {
    setSearchText(value);
  };
  const dataSource = [
    {
      key: '1',
      course_name: '科技论文写作',
      course_id: 'C110002B',
      teacher_name: '苏景昕',
    },
    {
      key: '2',
      course_name: '计算机网络',
      course_id: 'M310003B',
      teacher_name: '高睿鹏',
    }

  ];
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
      dataIndex: 'teacher_name',
      key: 'teacher_name'
    },
    {
      title: '',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Button>查看</Button>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Input.Search
            placeholder="搜索课程"
            onSearch={handleSearch}
            style={{ width: 200, marginLeft: 16 }}
          />
        </div>
        <Table columns={columns} dataSource={dataSource} />

      </Card>
    </PageContainer>
  );
};

export default Mycourse_t;