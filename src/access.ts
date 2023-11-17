/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
//对用户权限的管理
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    canStudent: currentUser && currentUser.access === 'student',
    canTeacher: currentUser && currentUser.access === 'teacher',
  };
}
