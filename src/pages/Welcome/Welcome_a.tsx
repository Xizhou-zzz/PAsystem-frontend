import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Typography } from 'antd';
import { FormattedMessage, useIntl } from 'umi';
import { currentUser } from '@/services/ant-design-pro/api';

const Welcome_a: React.FC = () => {
  const intl = useIntl();
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

  return (
    <PageContainer>
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage_teacher',
            defaultMessage: '欢迎来到教师界面，尊敬的' + (currentUserInfo ? currentUserInfo.name : '加载中...'),
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
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

export default Welcome_a;
