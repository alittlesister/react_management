import React from "react";
import { Form, Input, Button, Message } from "@arco-design/web-react";
import { IconUser, IconLock } from "@arco-design/web-react/icon";
import styles from "./login.less";
import { validPwd } from "@/regexp";
import { loginUser, LoginUserData } from "@/api/user";

const FormItem = Form.Item;

const rules = {
  username: [
    { required: true, message: "请输入用户名" },
    { min: 3, max: 10, message: "用户名长度为3-10位" },
  ],
  password: [
    { required: true, message: "请输入密码" },
    {
      validator: (value: string | undefined, cb: (msg?: string) => void) => {
        if (!value) {
          cb("请输入密码");
        } else if (!validPwd.test(value)) {
          cb("密码至少8位，且包含大写字母、小写字母、数字和特殊字符");
        } else {
          cb(undefined);
        }
      }
    },
  ],
};

export default function LoginPage() {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      await form.validate();
      
      const loginData: LoginUserData = {
        username: values.username,
        password: values.password
      };

      console.log("登录信息:", loginData);
      
      // 调用登录API
      const response: any = await loginUser(loginData);
      
      if (response.success) {
        Message.success("登录成功！");
        // 可以在这里保存token和用户信息
        // localStorage.setItem('token', response.data.token);
        // localStorage.setItem('user', JSON.stringify(response.data.user));
        // 跳转到首页
        // window.location.href = '/';
      } else {
        Message.error("登录失败，请检查用户名和密码");
      }
    } catch (error) {
      console.error("登录失败:", error);
      Message.error("登录失败，请稍后重试");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>用户登录</h2>
        <Form
          form={form}
          onSubmit={handleSubmit}
          className={styles.form}
          layout="vertical"
        >
          <FormItem field="username" rules={rules.username}>
            <Input prefix={<IconUser />} placeholder="请输入用户名" />
          </FormItem>
          <FormItem field="password" rules={rules.password}>
            <Input.Password prefix={<IconLock />} placeholder="请输入密码" />
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit" long>
              登录
            </Button>
          </FormItem>
          
          <div className={styles.registerLink}>
            还没有账号？<a href="/register">立即注册</a>
          </div>
        </Form>
      </div>
    </div>
  );
}
