import { PageContainer } from '@ant-design/pro-components';
import { Card, Divider, Space, Button, Table, Modal, Upload, Input, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { currentUser } from '@/services/ant-design-pro/api';
import axios from 'axios'; // 确保安装了axios

const Mission: React.FC = () => {
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

  const [homeworkData, setHomeworkData] = useState([]);
  const [missionData, setMissionData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  // 定义状态变量
const [gradingInfo, setGradingInfo] = useState({
  grade: '',
  reason: ''
});

// 更新成绩和理由的函数
const handleGradingChange = (e, field) => {
  setGradingInfo({ ...gradingInfo, [field]: e.target.value });
};

// 确认批改的逻辑（根据实际需求实现）
const confirmGrading = () => {
  console.log('成绩:', gradingInfo.grade, '理由:', gradingInfo.reason);
  // 发送数据到后端等逻辑
  setIsModalOpen2(false);
};

  // 获取数据
  useEffect(() => {
    if (currentUserInfo) {
      const user_name = currentUserInfo.name; // 使用当前用户name
    const fetchHomeworkData = async () => {
      const response = await axios.get(`http://127.0.0.1:5000//api/course_platform_s/mission/gethomework/${user_name}`);
      setHomeworkData(response.data);
      console.log(response.data);
    };

    const fetchMissionData = async () => {
      const response = await axios.get(`http://127.0.0.1:5000//api/course_platform_s/mission/getmission/${user_name}`);
      console.log(response.data); // 检查返回的数据
      setMissionData(response.data);
    };

    fetchHomeworkData();
    fetchMissionData();
    }
  }, [currentUserInfo]);

  //控制查看作业对话框是否弹出的状态变量
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //控制提交作业对话框是否弹出的状态变量
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('请输入作业内容：');
  const [uploadFileList, setUploadFileList] = useState([]); // 新增状态变量
  const [homeworkText, setHomeworkText] = useState('');

  // 在打开提交作业对话框时，不要重置文件列表
  const showModal1 = () => {
    setOpen(true);
    // 不再调用 setUploadFileList([]);
  };

  // 在关闭提交作业对话框时，也不要重置文件列表
  const handleCancel1 = () => {
    console.log('Clicked cancel button');
    setOpen(false);
    // 不再调用 setUploadFileList([]);
  };


  //提交成功与否消息提示的相关定义
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.info('提交成功！');
  };

  // 当提交作业对话框确定按钮被点击
const handleOk1 = async () => {
  const formData = new FormData();
  uploadFileList.forEach(file => {
    formData.append('file', file.originFileObj);
  });

  try {
    const response = await axios.post('http://127.0.0.1:5000/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    // 这里假设后端返回的数据中包含了文件的路径
    const filePath = response.data.path;
    const fileName = uploadFileList[0].name;
    const fileData = homeworkText;
    await submitHomework({
      filePath,
      fileName,
      fileData,
      homeworkId: selectedHomeworkId // 确保这里正确传递了homeworkId
    }); // 提交作业的函数，需要实现
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
  
  //点击批改作业弹出的对话框
  const [isModalOpen2,setIsModalOpen2] = useState(false);
  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleOk2 = () => {
    console.log('点击了批改作业对话框的确定按钮');
    setIsModalOpen2(false);
  };

  const handleCancel2 = () => {
    console.log('点击了批改作业对话框的取消按钮');
    setIsModalOpen2(false);
  };

// 当文件上传状态改变时
const handleUploadChange = (info) => {
  let fileList = [...info.fileList];

  // 只显示最近上传的文件，且保留上传状态
  fileList = fileList.slice(-1);
  fileList = fileList.map(file => {
    if (file.response) {
      // 把response中的文件路径等信息转化成fileList需要的格式
      file.url = file.response.path;
    }
    return file;
  });

  setUploadFileList(fileList);
};
  
  const handleLookHomework = (record) =>{
    setSelectedRow(record);
    showModal();
  
  }
const [selectedHomeworkId, setSelectedHomeworkId] = useState(null);

// 假设这是用户点击提交作业按钮时调用的函数
const handleSelectHomework = (record) => {
  setSelectedHomeworkId(record.homework_id);
  showModal1(); // 打开提交作业的模态框
};
const [isResultModalOpen, setIsResultModalOpen] = useState(false);
const [selectedResult, setSelectedResult] = useState(null);
const [userFeedback, setUserFeedback] = useState("");

const handleShowResult = (record) => {
  setSelectedResult(record);
  setIsResultModalOpen(true);
};

const submitHomework = async ({ filePath, fileName, fileData, homeworkId }) => {
  console.log(homeworkId);
  try {
    const response = await axios.post('http://127.0.0.1:5000/api/submit_homework', {
      filePath,
      fileName,
      fileData,
      homeworkId, // 添加这行
      userName: currentUserInfo.name
    });
      if (response.data.message === '作业提交成功') {
        message.success('作业提交成功');
        // 可以在这里执行其他逻辑，例如关闭模态框
      }
    } catch (error) {
      console.error('Error submitting homework:', error);
      message.error('作业提交失败');
    }
  };

  const handleAppeal = () => {
    // 处理申诉逻辑
    console.log("申诉内容：", userFeedback);
    // 发送申诉内容到后端或执行其他逻辑
    setIsAppealModalOpen(true);
  };

  const handleResultModalOk = () => {
    // 这里可以添加处理逻辑，例如发送用户反馈到后端
  
    // 关闭模态框
    setIsResultModalOpen(false);
  };
  
  //提交作业中文本域相关定义
  const { TextArea } = Input;
  const columns = [
    {
      title: '课程名称',
      dataIndex: 'course_name',
      key: 'course_name',
    },
    {
      title: '作业名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '成绩',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: '',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Button onClick={() => handleLookHomework(record)}>查看作业</Button>
          {/* 只有当 grade 为 -1 时才显示提交按钮 */}
          {record.grade === -1 && (
            <Button type="primary" onClick={() => handleSelectHomework(record)}>
              提交作业
            </Button>
          )}
          {record.grade >= 0 && (
          <Button type="primary" onClick={() => handleShowResult(record)}>
            查看结果
          </Button>
        )}
        <Modal
  title="互评结果"
  visible={isResultModalOpen}
  onOk={handleResultModalOk}
  onCancel={() => setIsResultModalOpen(false)}
>
  {selectedResult && (
    <div>
      <p>互评成绩：{selectedResult.grade}</p>
      <p>互评理由：你做的很好！</p>
      <Input.TextArea
        rows={4}
        value={userFeedback}
        onChange={(e) => setUserFeedback(e.target.value)}
        placeholder="请输入您对该评价的看法"
      />
      <Button type="primary" onClick={handleAppeal} style={{ marginTop: '10px' }}>
        申诉
      </Button>
    </div>
  )}
</Modal>
          <Modal
            title="提交作业"
            open={open}
            onOk={handleOk1}
            confirmLoading={confirmLoading}
            onCancel={handleCancel1}
            destroyOnClose={true}
          >
            <p>{modalText}</p>
            <TextArea defaultValue="" rows={4} />
            <Upload
              action="http://127.0.0.1:5000/api/upload" // 指定上传的URL
              onChange={handleUploadChange} // 处理文件上传的状态变化
            >
            <Button icon={<UploadOutlined />}>上传附件</Button>
            </Upload>
          </Modal>
        </Space>
      ),
    },
  ];

  const columns1 = [
    {
      title: '课程名称',
      dataIndex: '7',
      key: 'course_name',
    },
    {
      title: '作业名称',
      dataIndex: '1',
      key: 'title',
    },
    {
      title: '',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Button onClick={()=>handleLookHomework(record)}>查看作业</Button>
          <Button type="primary" onClick={showModal2}>
            批改作业
          </Button>
          {/* 批改作业对话框 */}
          <Modal
  title="批改作业"
  visible={isModalOpen2}
  onOk={confirmGrading}
  onCancel={() => setIsModalOpen2(false)}
  destroyOnClose={true}
>
  <div>
    {/* 更新下载链接，指向 Flask 提供的下载路由 */}
    <p><a href="http://127.0.0.1:5000/download/homework1.txt" download>下载作业文件</a></p>
    <p>成绩：<Input value={gradingInfo.grade} onChange={(e) => handleGradingChange(e, 'grade')} /></p>
    <p>理由：<Input.TextArea value={gradingInfo.reason} onChange={(e) => handleGradingChange(e, 'reason')} rows={4} /></p>
  </div>
</Modal>
        </Space>
      ),
    },
  ];
  //申诉内容对话框
  const [isAppealModalOpen,setIsAppealModalOpen] = useState(false);
  const handleAppealModalOk = async () => {
    try{
      const response = await axios.post('http://127.0.0.1:5000//api/course_platform_s/mission/postdata',{
        appeal:appeal,
      });
      if (response.status === 200){
        setIsAppealModalOpen(false);

      }else{
        console.error('内容：',response.data);
      }
    } catch(error){
      console.error('ss',error);
    }
  };
  const handleAppealModalCancel = () => {
    setAppeal('');
    setIsAppealModalOpen(false);
  };
  const [appeal,setAppeal] = useState('');

  return (
    <PageContainer style={{ backgroundColor: 'white' }}>

      {/* 提交作业对话框 */}
      <Modal
        title="提交作业"
        open={open}
        onOk={handleOk1}
        confirmLoading={confirmLoading}
        onCancel={handleCancel1}
        destroyOnClose={true}
      >
        <p>{modalText}</p>
        <TextArea
  value={homeworkText}
  onChange={(e) => setHomeworkText(e.target.value)}
  rows={4}
/>
        <Upload
          action="http://127.0.0.1:5000/api/upload"
          onChange={handleUploadChange}
          fileList={uploadFileList} // 使用状态变量作为fileList
        >
          <Button icon={<UploadOutlined />}>上传附件</Button>
        </Upload>
      </Modal>

      {/* 查看作业对话框 */}
      <Modal
            title="作业内容"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
          {selectedRow && (
              <div>
                <p>课程名称：<Input disabled = {true} value={selectedRow.course_name}/></p>
                <p>作业名称：<Input disabled = {true} value={selectedRow.title}/></p>
              </div>
            )}
      </Modal>
      <Modal title="申诉" open={isAppealModalOpen} onOk={handleAppealModalOk} onCancel={handleAppealModalCancel}>
        <Input.TextArea
          rows={4}
          value={appeal}
          onChange={(e) => setAppeal(e.target.value)}
          placeholder="请输入您申诉的理由"
        />
      </Modal>

      {contextHolder}
        <p>所有作业</p>
        <Table columns={columns} dataSource={homeworkData} />
        <Divider />
        <p>所有批改作业</p>
        <Table columns={columns1} dataSource={missionData} />
    </PageContainer>
  );
};

export default Mission;
