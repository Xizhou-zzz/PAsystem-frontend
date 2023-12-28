import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Table, Button, Input, Modal, Upload, Space, Progress,Select,Calendar,Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { currentUser } from '@/services/ant-design-pro/api';
import axios from 'axios';
import type { Dayjs } from 'dayjs';
import type { CalendarProps } from 'antd';
import type { RadioChangeEvent } from 'antd';

const HomeworkManage: React.FC = () => {
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
  const [selectedHomework, setSelectedHomework] = useState<any>({});
  const [fileList, setFileList] = useState([]);
  const [homeworkData, setHomeworkData] = useState([]); // 添加这行代码来定义homeworkData状态
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [isModalVisible4, setIsModalVisible4] = useState(false);
  
  
  const [selectedDueDate, setSelectedDueDate] = useState(null); // 存储选中的截止日期

  useEffect(() => {
    if (currentUserInfo) {
      const user_name = currentUserInfo.name; // 使用当前用户name
      axios.get(`http://127.0.0.1:5000/api/homework_manage/teacher_get/${user_name}`)
      .then(res => {
        setHomeworkData(res.data); // 更新homeworkData状态
      })
      .catch(error => {
        console.error('Error fetching homework data:', error);
      });
    }
  }, [currentUserInfo]); // 添加 currentUserInfo 作为依赖项

  const [courseOptions, setCourseOptions] = useState([]);  // 新增一个状态来存储去重后的课程名称
  
  useEffect(() => {
    if (homeworkData.length > 0) {
      // 提取课程名称
      const courseNames = homeworkData.map(item => item.course_name);
      // 去重
      const uniqueCourseNames = Array.from(new Set(courseNames));
      // 创建 Select options
      const options = uniqueCourseNames.map(name => ({ value: name, label: name }));
      setCourseOptions(options);
    }
  }, [homeworkData]); // 当 homeworkData 更新时重新计算


  
  const [searchText, setSearchText] = useState('');
  const handleSearch = (value: string) => {
    setSearchText(value);
    // 添加搜索逻辑
  };
  const filteredHomework = homeworkData.filter((data) =>
    data.title.includes(searchText)
  );

  const handleAddHomework = () => {
    setSelectedHomework({});
    setIsModalVisible1(true);
    setFileList([]);
    setSelectedDueDate(null); // 重置截止日期
  
  };
  
  

  const handleRelease = () => {
    console.log('点击了发布批改任务按钮');
    setIsModalVisible2(true);
  }
  
  const handleDelete = (record) => {
    Modal.confirm({
      title: '确定要删除这项作业吗？',
      content: '这将删除所有相关的学生作业记录。',
      onOk: async () => {
        try {
          // 发送删除请求
          const response = await axios.delete(`http://127.0.0.1:5000/api/homework_manage/deletehomework/${record.course_name}/${record.title}`);
          if (response.status === 200) {
            //message.success('作业删除成功');
            // 刷新作业列表
            fetchHomeworkData();
          }
        } catch (error) {
          //message.error('作业删除失败');
        }
      }
    });
  };
  

  

  const fetchHomeworkData = async () => {
    // 获取作业数据的逻辑
  };
  

  const handleFileChange = ({ fileList }:any) => setFileList(fileList);

  const TaskProgress: React.FC<{ percent: number }> = ({ percent }) => (
    <Progress percent={percent} steps={5} strokeColor={[]} />
  );
  
  const columns = [
    {
      title: '作业标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '课程编号',
      dataIndex: 'course_code',
      key: 'course_code',
    },
    {
      title: '课堂编号',
      dataIndex: 'class_code',
      key: 'class_code',
    },
    {
      title: '已提交人数',
      dataIndex: 'submitted_count',
      key: 'submitted_count',
    },
    {
      title: '提交进度',
      key: 'progress',
      render: (record: any) => <TaskProgress percent={70} />,
    },
    {
      title: '所属课程',
      dataIndex: 'course_name',
      key: 'course_name',
    },
    {
      title: '截止日期',
      dataIndex: 'due_date',
      key: 'due_date',
    },
    {
      title: '操作',
      key: 'action',
      render: (record: any) => (
        <Space>
          <Button onClick={()=>handleDetail(record)} style={{ color: '#1890ff' }}>详情</Button>
          <Button onClick={() => handleDelete(record)} style={{ color: '#ff4d4f' }}>删除</Button>
          <Button onClick={()=>handleEdit(record)} style={{ color: '#52c41a' }}>编辑</Button>
        </Space>
      ),
    },
  ];
  const handleInputChange = (e, fieldName) => {
    // 更新 selectedRow1 的对应属性
    setSelectedRow1({
      ...selectedRow1,
      [fieldName]: e.target.value,
    });
  };

  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRow1,setSelectedRow1] = useState(null);
  const handleDetail = (record) =>{
    setSelectedRow(record);
    setIsModalVisible3(true);
  }
  const handleModalOk3 = () => {
    setIsModalVisible3(false);
  };
  const handleModalCancel3 = () => {
    setIsModalVisible3(false);
  };
  const handleEdit = (record) =>{
    setSelectedRow1(record);
    setIsModalVisible4(true);
  }
  const handleModalOk4 = () => {
    if (!selectedRow1) {
      // 可以在这里进行一些错误处理或者提示用户
      console.error('selectedRow1 is null');
      return;
    }
    //构建要传回给后端的数据
    const updatedCourseInformation = {
      title: selectedRow1.title,
      course_code: selectedRow1.course_code,
      class_code: selectedRow1.class_code,
      submitted_count: selectedRow1.submitted_count,
      course_name: selectedRow1.course_name,
      due_date: selectedRow1.due_date,
    }
    
    setIsModalVisible4(false);
  };
  const handleModalCancel4 = () => {
    setIsModalVisible4(false);
  };

  //第一个对话框（新增作业对话框）的确定按钮处理
  const handleModalOk1 = async () => {
    const homeworkInfo = {
      courseName: selectedValue1,
      title: selectedHomework?.title,
      dueDate: selectedDueDate, // 使用选中的截止日期
      description: selectedHomework?.assignment_description,
      // 其他需要的字段...
    };
  
    try {
      if (currentUserInfo) {
      const user_name = currentUserInfo.name; // 使用当前用户name
      // 发送数据到后端
      console.log(homeworkInfo);
      await axios.post(`http://127.0.0.1:5000/api/homework_manage/addhomework/${user_name}`, homeworkInfo);
      //message.success('作业保存成功');
      setIsModalVisible1(false);
      }
    } catch (error) {
      console.error('Error saving homework:', error);
      //message.error('作业保存失败');
    }
  };

  //第一个对话框（新增作业对话框）的取消按钮处理
  const handleModalCancel1 = () => {
    setSelectedValue1('');
    setIsModalVisible1(false);
  };
  //第一个对话框（新增作业对话框）中选择框选择内容改变时的处理函数
  const handleSelectChange1 = value => {
    setSelectedValue1(value);
  };

  //第二个对话框（发布批改任务对话框）中选择框选择内容改变时的处理函数
  const handleSelectChange2 = value => {
    setSelectedValue2(value);
  };
  const handleSelectChange3 = value => {
    setSelectedValue3(value);
  };
  //第二个对话框（发布批改任务对话框）的保存按钮处理
  const handleModalOk2 = () => {
    setSelectedValue2('');
    setIsModalVisible2(false);
    // 添加发布批改任务的逻辑
  };
  //第二个对话框（新增作业对话框）的取消按钮处理
  const handleModalCancel2 = () => {
    setSelectedValue2('');
    setIsModalVisible2(false);
  };
  //新增作业模态框中所选择的课程值
  const [selectedValue1,setSelectedValue1] = useState('');
  //发布批改任务模态框中所选择的课程值
  const [selectedValue2,setSelectedValue2] = useState('');
  //发布批改任务模态框中所选择的作业标题值
  const [selectedValue3,setSelectedValue3] = useState('');


  //第一个对话框中的日历内容变化处理内容
  const onPanelChange1 = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log("Panel Change:", value.format('YYYY-MM-DD'), mode);
    // 不再在此设置日期
  };
  
  const onPanelChange2 = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log("Panel Change:", value.format('YYYY-MM-DD'), mode);
    // 不再在此设置日期
  };

  const onSelectDate1 = (value: Dayjs) => {
    console.log("Selected Date:", value.format('YYYY-MM-DD'));
    setSelectedDueDate(value.format('YYYY-MM-DD'));
  };
  
  const onSelectDate2 = (value: Dayjs) => {
    console.log("Selected Date:", value.format('YYYY-MM-DD'));
    // 如果需要，在这里处理第二个日历的日期选择
  };

  //分配方式的值：1代表随机分配 2代表算法分配
  const [value, setValue] = useState(1);
  //处理单选框所选内容发生变化的函数
   const onRadioChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };


  

  return (
    <PageContainer style={{ backgroundColor: 'white' }}>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={handleAddHomework} style={{ marginRight: 16 }}>
            新增作业
          </Button>
          <Button type="primary" onClick={handleRelease} style={{ marginRight: 16 }}>
            发布批改任务
          </Button>
          <Input.Search
            placeholder="搜索作业"
            onSearch={handleSearch}
            style={{ width: 200 }}
          />
        </div>
        <Table columns={columns} dataSource={filteredHomework} /> {/* 使用homeworkData作为数据源 */}

        <Modal
        title='新增作业'
        visible={isModalVisible1}
        onOk={handleModalOk1}
        onCancel={handleModalCancel1}
      >
          {/* 模态框内的内容 */}
          <div style={{ marginTop: 16 }}>
          所属课程：
          <Select 
            style={{ width: 200 }}
            value={selectedValue1}
            onChange={handleSelectChange1}
            options={courseOptions} // 使用去重后的课程名称作为选择项
          />
        </div>
          <div style={{ marginTop: 16 }}>
            作业标题：
            <Input value={selectedHomework?.title}  onChange={e => setSelectedHomework({ ...selectedHomework, title: e.target.value })} />
          </div>
          <div style={{ marginTop: 16 }}>
            截止日期：
            {/* <Input value={selectedHomework?.due_date} disabled={isDetail} onChange={e => setSelectedHomework({ ...selectedHomework, due_date  : e.target.value })} /> */}
            <Calendar 
              fullscreen={false} 
              onPanelChange={onPanelChange1} 
              onSelect={onSelectDate1} // 使用 onSelect 事件
            />

{/* <Calendar 
  fullscreen={false} 
  onPanelChange={onPanelChange2} 
  onSelect={onSelectDate2} // 使用 onSelect 事件
/> */}
          </div>
          <div style={{ marginTop: 16 }}>
            作业简介：
            <Input.TextArea
              rows={4}
              value={selectedHomework?.assignment_description}
              
              onChange={e => setSelectedHomework({ ...selectedHomework, assignment_description: e.target.value })}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            上传附件：
            <Upload
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={() => false} // 阻止自动上传
              
            >
              <Button icon={<UploadOutlined />} >选择文件</Button>
            </Upload>
          </div>
        </Modal>

        <Modal
          title='发布批改任务'
          visible={isModalVisible2}
          onOk={handleModalOk2}
          onCancel={handleModalCancel2}
          footer={[<Button onClick={handleModalCancel2}>取消</Button>,
        <Button onClick={handleModalOk2} type='primary'>发布</Button>]}
        >
          {/* 模态框内的内容 */}
          <div style={{ marginTop: 16 }}>
            所属课程：
            <Select 
              style={{ width: 300 }}
              value={selectedValue2}
              onChange={handleSelectChange2}
              //此处的课程名称应从后端获取
              options = {[
                {value:'软件项目管理与产品运维',label:'软件项目管理与产品运维'},
                {value:'科技论文协作',label:'科技论文协作'},
              ]}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            作业标题：
            <Select 
              style={{ width: 300 }}
              value={selectedValue3}
              onChange={handleSelectChange3}
              //此处的课程名称应从后端获取
              options = {[
                {value:'软件项目管理与产品运维作业1',label:'软件项目管理与产品运维作业1'},
                {value:'科技论文协作作业1',label:'科技论文协作作业1'},
              ]}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            截止日期：
            <Calendar fullscreen={false} onPanelChange={onPanelChange2} />
          </div>
          <div style={{ marginTop: 16 }}>
            作业分配方式：
            <Radio.Group onChange={onRadioChange} value={value}>
              <Radio value={1}>随机分配</Radio>
              <Radio value={2}>算法分配</Radio>
            </Radio.Group>
          </div>
        </Modal>
        <Modal title='作业详情' visible={isModalVisible3} onOk={handleModalOk3}
          onCancel={handleModalCancel3}>
            {selectedRow && (
              <div>
                <p>作业标题：<Input disabled = {true} value={selectedRow.title}/></p>
                <p>课程编号：<Input disabled = {true} value={selectedRow.course_code}/></p>
                <p>课堂编号：<Input disabled = {true} value={selectedRow.class_code}/></p>
                <p>已提交人数：<Input disabled = {true} value={selectedRow.submitted_count}/></p>
                <p>所属课程：<Input disabled = {true} value={selectedRow.course_name}/></p>
                <p>截止日期：<Input disabled = {true} value={selectedRow.due_date}/></p>
              </div>
            )}
        </Modal>
        <Modal title="编辑作业" visible={isModalVisible4} onOk={handleModalOk4}
          onCancel={handleModalCancel4}>
            {selectedRow1 && (
              <div>
                <p>作业标题：<Input  value={selectedRow1.title} onChange={(e) => handleInputChange(e, 'title')}/></p>
                <p>课程编号：<Input  value={selectedRow1.course_code} onChange={(e) => handleInputChange(e, 'course_code')}/></p>
                <p>课堂编号：<Input  value={selectedRow1.class_code} onChange={(e) => handleInputChange(e, 'class_code')}/></p>
                <p>已提交人数：<Input  value={selectedRow1.submitted_count} onChange={(e) => handleInputChange(e, 'submitted_count')}/></p>
                <p>所属课程：<Input  value={selectedRow1.course_name} onChange={(e) => handleInputChange(e, 'course_name')}/></p>
                <p>截止日期：<Input  value={selectedRow1.due_date} onChange={(e) => handleInputChange(e, 'due_date')}/></p>
              </div>
            )}
        </Modal>
    </PageContainer>
  );
};
export default HomeworkManage;
