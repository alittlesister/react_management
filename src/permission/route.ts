// import { history } from '@umijs/max';

// // 路由拦截
// export function onRouteChange({ location, routes, action }: any) {
//   // 获取 token
//   const token = localStorage.getItem('token');
  
//   // 白名单路由
//   const whiteList = ['/login', '/register'];
  
//   // 如果没有 token 且不在白名单中，重定向到登录页
//   if (!token && !whiteList.includes(location.pathname)) {
//     history.push('/login');
//   }
// }




// // 全局初始化数据配置
// export async function getInitialState() {
//   // 获取用户信息等初始化数据
//   return {
//     name: 'Admin',
//     // 其他全局数据
//   };
// } 