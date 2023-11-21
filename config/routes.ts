//该文件是一个路由配置文件，需要添加页面时需要对此文件进行修改
//path是访问新增页面需要输入的网址 component是该新增页面的文件地址
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    //学生的欢迎界面
    path: '/welcome_s',
    name: 'welcome_s',
    icon: 'smile',
    access: 'canStudent',
    component: './Welcome/Welcome_s',
  },
  {
    //老师的欢迎界面
    path: '/welcome_t',
    name: 'welcome_t',
    icon: 'smile',
    access: 'canTeacher',
    component: './Welcome/Welcome_t',
  },
  {
    //管理员的欢迎界面
    path: '/welcome_a',
    name: 'welcome_a',
    icon: 'smile',
    access: 'canAdmin',
    component: './Welcome/Welcome_a',
  },
  {
    //教师的 课程平台 菜单栏
    path: '/course_platform_t',
    name: 'course_platform_t',
    icon: 'MenuOutlined',
    access: 'canTeacher',
    routes: [
      {
        //我的课程 菜单栏
        path: '/course_platform_t/mycourse_t',
        name: 'mycourse_t',
        component: './Course_platform_t/Mycourse_t',
      },
      {
        //学生成绩 菜单栏
        path: '/course_platform_t/student_grade',
        name: 'student_grade',
        component: './Course_platform_t/Student_grade',
      },
    ],
  },
  {
    //教师的 作业平台 菜单栏
    path: '/homework_platform',
    name: 'homework_platform',
    icon: 'MenuOutlined',
    access: 'canTeacher',
    routes: [
      {
        //作业管理 菜单栏
        path: '/homework_platform/homework_manage',
        name: 'homework_manage',
        component: './Homework_platform/Homework_manage',
      },
      {
        //批改情况 菜单栏
        path: '/homework_platform/correction',
        name: 'correction',
        component: './Homework_platform/Correction',
      },
    ],
  },
  {
    //学生的 课程平台 菜单栏
    path: '/course_platform_s',
    name: 'course_platform_s',
    icon: 'MenuOutlined',
    access: 'canStudent',
    routes: [
      {
        //我的课程 菜单栏
        path: '/course_platform_s/mycourse_s',
        name: 'mycourse_s',
        component: './Course_platform_s/Mycourse_s',
      },
      {
        //我的任务 菜单栏
        path: '/course_platform_s/mission',
        name: 'mission',
        component: './Course_platform_s/Mission',
      },
    ],
  },
  {
    //管理员的 授课管理 菜单栏
    path: '/teaching_manage',
    name: 'teaching_manage',
    icon: 'MenuOutlined',
    access: 'canAdmin',
    routes: [
      {
        //课程管理 菜单栏
        path: '/teaching_manage/course_manage',
        name: 'course_manage',
        component: './Teaching_manage/Course_manage',
      },
      {
        //人员管理 菜单栏
        path: '/teaching_manage/people_manage',
        name: 'people_manage',
        component: './Teaching_manage/People_manage',
      },
    ],
  },
  {
    //管理员的 权限管理 菜单栏
    path: '/permission_manage',
    name: 'permission_manage',
    icon: 'KeyOutlined',
    access: 'canAdmin',
    component: './Permission_manage',
  },
  {
    //通用的 个人信息 菜单栏
    path: '/myinformation',
    name: 'myinformation',
    icon: 'MenuOutlined',
    routes: [
      {
        //基本信息 菜单栏
        path: '/myinformation/basicinformation',
        name: 'basicinformation',
        component: './Myinformation/Basicinformation',
      },
      {
        //安全设置 菜单栏
        path: '/myinformation/safetysettings',
        name: 'safetysettings',
        component: './Myinformation/Safetysettings',
      },
      {
        //其他设置 菜单栏
        path: '/myinformation/othersettings',
        name: 'othersettings',
        component: './Myinformation/Othersettings',
      },
    ],
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
