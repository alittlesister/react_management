import request from "@/utils/request";

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
export const registerUser = (data: RegisterUserData) => {
  return request.post("/users/register", data);
};

// 登录用户接口
export interface LoginUserData {
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
  export const loginUser = (data: LoginUserData) => {
    return request.post("/users/login", data);
  };
  