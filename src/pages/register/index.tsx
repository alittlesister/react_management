import React from "react";
import { Form, Input, Button, Message } from "@arco-design/web-react";
import { IconUser, IconLock, IconPhone, IconEmail, IconIdcard } from "@arco-design/web-react/icon";
import { validPwd, validPhone, validEmail } from "@/regexp";
import { registerUser, RegisterUserData } from "@/services/user";
import styles from "./register.less";

const FormItem = Form.Item;

const rules = {
  username: [
    { required: true, message: "请输入用户名" },
    { min: 3, max: 20, message: "用户名长度为3-20位" },
    { pattern: /^[a-zA-Z0-9_]+$/, message: "用户名只能包含字母、数字和下划线" },
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
  confirmPassword: [
    { required: true, message: "请确认密码" },
    {
      validator: (value: string | undefined, cb: (msg?: string) => void) => {
        // 这里需要从表单实例获取密码值，暂时简化处理
        if (!value) {
          cb("请确认密码");
        } else {
          cb(undefined);
        }
      }
    }
  ],
  nickname: [
    { required: true, message: "请输入昵称" },
    { min: 2, max: 20, message: "昵称长度为2-20位" },
  ],
  email: [
    { required: true, message: "请输入邮箱" },
    {
      validator: (value: string | undefined, cb: (msg?: string) => void) => {
        if (!value) {
          cb("请输入邮箱");
        } else if (!validEmail.test(value)) {
          cb("请输入有效的邮箱地址");
        } else {
          cb(undefined);
        }
      }
    }
  ],
  phone: [
    {
      validator: (value: string | undefined, cb: (msg?: string) => void) => {
        if (value && !validPhone.test(value)) {
          cb("请输入有效的手机号");
        } else {
          cb(undefined);
        }
      }
    }
  ]
};

export default function RegisterPage() {
  const [form] = Form.useForm();

  // 自定义密码确认验证
  const validateConfirmPassword = (value: string | undefined) => {
    const password = form.getFieldValue('password');
    if (!value) {
      return '请确认密码';
    }
    if (value !== password) {
      return '两次输入的密码不一致';
    }
    return undefined;
  };

  const handleSubmit = async (values: any) => {
    try {
      await form.validate();
      
      // 构建注册数据，符合数据库表结构
      const registerData: RegisterUserData = {
        username: values.username,
        password: values.password, // 实际应用中需要加密
        nickname: values.nickname,
        email: values.email,
        phone: values.phone || null,
        role_ids: '1', // 默认普通用户角色
        status: 1, // 默认启用状态
        create_time: new Date().toISOString(),
        create_by: 'system'
      };

      console.log("注册信息:", registerData);
      
      // 调用注册API
      const response: any = await registerUser(registerData);
      
      if (response.success) {
        Message.success("注册成功！");
        form.resetFields();
        // 可以在这里跳转到登录页面
        // window.location.href = '/login';
      } else {
        Message.error("注册失败，请稍后重试");
      }
    } catch (error) {
      console.error("注册失败:", error);
      Message.error("注册失败，请检查表单信息");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerBox}>
        <h2 className={styles.title}>用户注册</h2>
        <Form
          form={form}
          layout="vertical"
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <FormItem field="username" label="用户名" rules={rules.username}>
            <Input 
              prefix={<IconUser />} 
              placeholder="请输入用户名（3-20位字母数字下划线）" 
              maxLength={20}
            />
          </FormItem>
          
          <FormItem field="nickname" label="昵称" rules={rules.nickname}>
            <Input 
              prefix={<IconIdcard />} 
              placeholder="请输入昵称（2-20位）" 
              maxLength={20}
            />
          </FormItem>
          
          <FormItem field="password" label="密码" rules={rules.password}>
            <Input.Password 
              prefix={<IconLock />} 
              placeholder="请输入密码（至少8位，包含大小写字母、数字和特殊字符）" 
            />
          </FormItem>
          
          <FormItem 
            field="confirmPassword" 
            label="确认密码" 
            rules={[
              { required: true, message: "请确认密码" },
              {
                validator: (value: string | undefined, cb: (msg?: string) => void) => {
                  const error = validateConfirmPassword(value);
                  cb(error);
                }
              }
            ]}
          >
            <Input.Password 
              prefix={<IconLock />} 
              placeholder="请再次输入密码" 
            />
          </FormItem>
          
          <FormItem field="email" label="邮箱" rules={rules.email}>
            <Input 
              prefix={<IconEmail />} 
              placeholder="请输入邮箱地址" 
              type="email"
            />
          </FormItem>
          
          <FormItem field="phone" label="手机号（选填）" rules={rules.phone}>
            <Input 
              prefix={<IconPhone />} 
              placeholder="请输入手机号（可选）" 
              maxLength={11}
            />
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit" long>
              注册
            </Button>
          </FormItem>
          
          <div className={styles.loginLink}>
            已有账号？<a href="/login">立即登录</a>
          </div>
        </Form>
      </div>
    </div>
  );
}
