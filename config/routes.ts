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
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/learn',
    name: 'learn',
    access: 'canStudent',
    icon: 'MenuOutlined',
    routes: [
      {
        //我的课程
        path: '/learn/mycourse',
        name: 'mycourse',
        component: './Learn/Mycourse',
      },
      {
        //我的作业
        path: '/learn/myhomework',
        name: 'myhomework',
        component: './Learn/Myhomework',
      },
      {
        //批改任务
        path: '/learn/evaluate',
        name: 'evaluate',
        component: './Learn/Evaluate',
      },
      {
        //成绩查询
        path: '/learn/grade',
        name: 'grade',
        component: './Learn/Grade',
      },
    ],
  },
  {
    path: '/set',
    name: 'set',
    access: 'canStudent',
    icon: 'MenuOutlined',
    routes: [
      {
        //个人信息
        path: '/set/myinformation',
        name: 'myinformation',
        component: './Set/Myinformation',
      },
      {
        //安全设置
        path: '/set/safetysetting',
        name: 'safetysetting',
        component: './Set/Safetysetting',
      },
    ],
  },
  {
    path: '/teacher',
    name: 'teacher',
    access: 'canTeacher',
    icon: 'MenuOutlined',
    routes: [
      {
        //我的课程
        path: '/teacher/Teacher_course',
        name: 'Teacher_course',
        component: './teacher/Teacher_course',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
