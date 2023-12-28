import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Typography } from 'antd';
import { FormattedMessage, useIntl } from 'umi';
import { currentUser } from '@/services/ant-design-pro/api';

const Welcome_s: React.FC = () => {
  const intl = useIntl();
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  //获取当前用户名
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

  useEffect(() => {
    const fetchData = async () => {
      if (currentUserInfo && currentUserInfo.name) {
        try {
          // 获取未提交作业的课程信息
          const responseCourses = await fetch(`http://localhost:5000/api/welcome_s/getUnsubmittedCourses/${currentUserInfo.name}`);
          const coursesData = await responseCourses.json();
          setCountOfHomeworkToBeSubmitted(coursesData.count);
  
          // 获取待批改作业的课程门数
          const responseCount = await fetch(`http://localhost:5000/api/welcome_s/getPendingCourseCount/${currentUserInfo.name}`);
          const countData = await responseCount.json();
          setCountOfHomeworkToBeCorrected(countData.count);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
  
    fetchData();
  }, [currentUserInfo]); // 添加 currentUserInfo 作为依赖项
  
  
  //有几门课程有待提交作业
  const [countOfHomeworkToBeSubmitted,setCountOfHomeworkToBeSubmitted] = useState(0);
  const [homeworkToBeSubmitted,setHomeworkToBeSubmitted] = useState([]);
  //有几门课程有待提交作业
  const [countOfHomeworkToBeCorrected,setCountOfHomeworkToBeCorrected] = useState(0);
  const [homeworkToBeCorrected,setHomeworkToBeCorrected] = useState([]);


  return (
    <PageContainer>
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage_teacher',
            defaultMessage: '欢迎来到学生界面，尊敬的' + (currentUserInfo ? currentUserInfo.name : '加载中...'),
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <p>您有{countOfHomeworkToBeSubmitted}门课程有待提交作业</p>
        <p>您有{countOfHomeworkToBeCorrected}门课程有待批改作业</p>
        <Typography.Text strong>
          <a
            href="https://procomponents.ant.design/components/table"
            rel="noopener noreferrer"
            target="__blank"
          >
            <FormattedMessage id="pages.welcome.link" defaultMessage="Welcome" />
          </a>
        </Typography.Text>
        {/* <CodePreview>yarn add @ant-design/pro-components</CodePreview> */}
      </Card>
    </PageContainer>
  );
};

export default Welcome_s;
