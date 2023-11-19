import { PageContainer } from '@ant-design/pro-components';
import { Card, Table, Button, Input, Space, Modal } from 'antd';
import React, { useState } from 'react';
import { Line } from '@ant-design/charts';

const Student_grade: React.FC = () => {
  const data = [
    { year: '作业1', value: 90 },
    { year: '作业2', value: 74 },
    { year: '作业3', value: 63.5 },
    { year: '作业4', value: 75 },
    { year: '作业5', value: 64.9 },
    { year: '作业6', value: 36 },
    { year: '作业7', value: 67 },
    { year: '作业8', value: 89 },
    { year: '作业9', value: 43 },
  ];
  const config = {
    data,
    height: 400,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };

  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);

  const dataSource = [
    { id: '21301002', homework: '作业1', grade: '90' },
    { id: '21301004', homework: '作业1', grade: '80' },
    { id: '21301016', homework: '作业2', grade: '70' },
    { id: '21301019', homework: '作业4', grade: '100' },
    { id: '21301027', homework: '作业5', grade: '90' },
    { id: '21301028', homework: '作业6', grade: 'NULL' },
    // 数据源
  ];

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleEdit = (record: any) => {
    setSelectedDevice(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: any) => {
    // 处理删除设备逻辑
    console.log('删除成绩:', record);
    // 这里可以编写删除设备的处理代码，如发送到后端进行删除等操作
  };

  const handleModalOk = () => {
    // 处理模态框确认逻辑
    setIsModalVisible(false);
    setSelectedDevice(null);
  };

  const handleModalCancel = () => {
    // 处理模态框取消逻辑
    setIsModalVisible(false);
    setSelectedDevice(null);
  };

  const columns = [
    { title: '学生学号', dataIndex: 'id', key: 'id' },
    { title: '作业', dataIndex: 'homework', key: 'homework' },
    { title: '成绩', dataIndex: 'grade', key: 'grade' },
    {
      title: '操作',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            更改
          </Button>
          <Button danger onClick={() => handleDelete(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer style={{ backgroundColor: 'white' }}>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Input.Search
            placeholder="搜索"
            onSearch={handleSearch}
            style={{ width: 200, marginLeft: 16 }}
          />
        </div>
        <Table dataSource={dataSource} columns={columns} rowKey="id" />

        {/* 设备模态框 */}
        <Modal
          title={selectedDevice ? '修改设备' : '新增设备'}
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          {/* 在模态框中可以放置设备的表单项，用于编辑或添加设备信息 */}
          {/* 这里只是一个示例，你可以根据实际需求进行修改 */}
          <div>
            学生学号：
            <Input value={selectedDevice?.id} />
          </div>
          <div>
            作业名称：
            <Input value={selectedDevice?.location} />
          </div>
          <div>
            作业成绩：
            <Input value={selectedDevice?.status} />
          </div>
        </Modal>
      </Card>
      <Card>
        <div>
          <p style={{ fontSize: '20px' }}>作业均分</p>
          <Line {...config} />
        </div>
      </Card>
    </PageContainer>
  );
};

export default Student_grade;
