// 用户相关API服务

// 注册用户接口
export interface RegisterUserData {
  username: string;
  password: string;
  nickname: string;
  email: string;
  phone?: string | null;
  role_ids?: string;
  status?: number;
  create_time?: string;
  create_by?: string;
}

// 注册用户
export const registerUser = async (data: RegisterUserData) => {
  try {
    // 这里应该调用实际的API接口
    // const response = await fetch('/api/user/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });
    
    // 模拟API调用
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: '注册成功',
          data: {
            id: Math.floor(Math.random() * 1000) + 1,
            ...data
          }
        });
      }, 1000);
    });
  } catch (error) {
    throw new Error('注册失败，请稍后重试');
  }
};

// 用户登录接口
export interface LoginUserData {
  username: string;
  password: string;
}

// 用户登录
export const loginUser = async (data: LoginUserData) => {
  try {
    // 这里应该调用实际的API接口
    // const response = await fetch('/api/user/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });
    
    // 模拟API调用
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: '登录成功',
          data: {
            token: 'mock_token_' + Date.now(),
            user: {
              id: 1,
              username: data.username,
              nickname: '测试用户',
              email: 'test@example.com',
              role_ids: '1'
            }
          }
        });
      }, 1000);
    });
  } catch (error) {
    throw new Error('登录失败，请稍后重试');
  }
};