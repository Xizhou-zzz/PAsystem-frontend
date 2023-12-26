import { PageContainer } from '@ant-design/pro-components';
import { Card, Table, Button, Input, Space, Modal,Form,message,Popconfirm,Select } from 'antd';
import React, { useState,useEffect } from 'react';
import { Line } from '@ant-design/charts';
import { ColumnType, ColumnGroupType } from 'antd/lib/table';

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
  //提交成功与否消息提示的相关定义
  const [messageApi, contextHolder] = message.useMessage();
  const info1 = () => {
    messageApi.info('修改成功！');
  };
  const info2 = () => {
    messageApi.info('删除成功！');
  };

  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<any>(null);
  const [selectedRow,setSelectedRow] = useState<number>(-1);
  const [dataSource,setDataSource] = useState([
    { id: '21301002', grade: '90' },
    { id: '21301004', grade: '80' },
    { id: '21301016', grade: '70' },
    { id: '21301019', grade: '100' },
    { id: '21301027', grade: '90' },
    { id: '21301028', grade: 'NULL' },
  ]);
  // 当selectedGrade变化时，更新表单的默认值
  useEffect(() => {
    form.setFieldsValue(selectedGrade);
  }, [selectedGrade]);
  //更新特定行的函数
  const updateRow = (index:any, newData:any) => {
    setDataSource((prevDataSource) => {
      const newDataSource = [...prevDataSource]; // 创建副本以避免直接修改原数组
      newDataSource[index] = newData; // 更新特定行的数据
      return newDataSource;
    });
  };
  //删除特定行的函数
  const deleteRow = (rowindex:any) => {
    setDataSource((prevDataSource) =>
      prevDataSource.filter((_, index) => index !== rowindex)
    );
  };
  //表单提交后的操作，更新数据源并显示在界面上
  const onFinish = (values:any) =>{
    console.log('修改后的数据:', values);
    updateRow(selectedRow,values);
  }

  const handleSearch = (value: string) => {
    setSearchText(value);
  };
  //处理更改成绩逻辑
  const handleEdit = (record: any, index: number) => {
    console.log('当前行的数据：', record);
    setSelectedGrade(record);
    console.log('要修改的行号：', index);
    setSelectedRow(index);
    setIsModalVisible(true);
  };
  //处理删除成绩逻辑
  const handleDelete = (record: any, index: number) => {
    console.log('要删除的成绩:', record);
    console.log('要删除的行号：', index);
    // 这里可以编写删除设备的处理代码，如发送到后端进行删除等操作
    deleteRow(index);
    info2();
  };

  const handleModalOk = () => {
    // 处理模态框确认逻辑
    setIsModalVisible(false);
    //提交表单
    form.submit();
    setSelectedGrade(null);
    //修改数据成功
    info1();
  };

  const handleModalCancel = () => {
    // 处理模态框取消逻辑
    setIsModalVisible(false);
    setSelectedGrade(null);
  };

  //处理选择课程名称的函数
  const handleChangeCourse = (value: string) => {
  console.log(`选择的课程名称是：${value}`);
  //后端在此添加内容
};
  //处理选择作业标题的函数
  const handleChangeHomework = (value: string) => {
  console.log(`选择的作业标题是： ${value}`);
  //后端在此添加内容
};
//根据选择的课程名和作业标题返回对应的学生成绩列表

  const columns: (ColumnType<{ id: string; homework: string; grade: string }> | ColumnGroupType<{ id: string; homework: string; grade: string }>)[] = [

    { title: '学生学号', dataIndex: 'id', key: 'id' },
    { title: '成绩', dataIndex: 'grade', key: 'grade' },
    {
      title: '操作',
      key: 'action',
      render: (text,record: any ,index: number) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record,index)}>
            更改
          </Button>
          <Button danger onClick={() => handleDelete(record,index)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer style={{ backgroundColor: 'white' }}>
      {contextHolder}
      <Space>
        <Select
          defaultValue="请选择课程"
          style={{ width: 250 }}
          onChange={handleChangeCourse}
          // 目前是静态数据，课程列表需要从后端获取
          options={[
            {value:'软件项目管理与运维',label:'软件项目管理与运维'},
            {value:'科技论文写作w',label:'科技论文写作w'},
          ]}
        />
        <Select
          defaultValue="请选择作业标题"
          style={{ width: 200 }}
          onChange={handleChangeHomework}
          //作业标题列表需要从后端获取
          // 目前是静态数据，作业标题列表需要从后端获取，一个课程名称有它对应的作业标题列表
          options={[
            {value:'作业1',label:'作业1'},
            {value:'作业2',label:'作业2'},
          ]}
        />
      </Space>
        {/* <div style={{ marginBottom: 16 }}>
          <Input.Search
            placeholder="搜索"
            onSearch={handleSearch}
            style={{ width: 200, marginLeft: 16 }}
          />
        </div> */}

        <Table dataSource={dataSource} columns={columns} rowKey="id" />

        {/* 设备模态框 */}
        <Modal
          title={selectedGrade ? '更改成绩' : '新增成绩'}
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >

          <Form form={form} onFinish={onFinish}>
            <Form.Item
              label="学生学号"
              name="id">
                <Input value={selectedGrade?.id}/>
            </Form.Item>
            <Form.Item
              label="作业名称"
              name="homework">
                <Input value={selectedGrade?.homework}/>
            </Form.Item>
            <Form.Item
              label="作业成绩"
              name="grade">
                <Input value={selectedGrade?.grade}/>
            </Form.Item>
          </Form>

        </Modal>
        <div>
          <p style={{ fontSize: '20px' }}>作业均分</p>
          <Line {...config} />
        </div>
    </PageContainer>
  );
};

export default Student_grade;