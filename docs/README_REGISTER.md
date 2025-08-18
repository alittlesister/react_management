# 用户注册页面功能说明

## 概述

根据 `fd_user` 数据库表结构设计的用户注册页面，包含完整的表单验证和API集成。

## 数据库表结构

```sql
CREATE TABLE `fd_user` (
    `username` varchar(255) DEFAULT NULL COMMENT '登录名',
    `password` varchar(255) DEFAULT NULL COMMENT '密码Hash',
    `nickname` varchar(255) DEFAULT NULL COMMENT '用户昵称/真实名称',
    `role_ids` varchar(255) DEFAULT NULL COMMENT '角色ID列表',
    `status` tinyint(1) DEFAULT NULL COMMENT '状态 0:禁用 1:启用',
    `email` varchar(255) NOT NULL COMMENT '邮箱',
    `phone` varchar(255) DEFAULT NULL COMMENT '手机号',
    `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '用户唯一标志id',
    `create_by` varchar(255) DEFAULT NULL,
    `create_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
```

## 功能特性

### 1. 表单字段
- **用户名** (必填): 3-20位字母、数字、下划线
- **昵称** (必填): 2-20位字符
- **密码** (必填): 至少8位，包含大小写字母、数字和特殊字符
- **确认密码** (必填): 与密码保持一致
- **邮箱** (必填): 有效的邮箱格式
- **手机号** (选填): 有效的手机号格式

### 2. 表单验证
- 实时验证用户输入
- 密码强度检查
- 邮箱格式验证
- 手机号格式验证
- 密码确认一致性检查

### 3. 样式设计
- 现代化渐变背景
- 响应式设计
- 美观的表单样式
- 悬停和焦点效果

### 4. API集成
- 模拟注册API调用
- 错误处理
- 成功提示
- 表单重置

## 文件结构

```
src/
├── pages/
│   ├── register/
│   │   ├── index.tsx          # 注册页面组件
│   │   └── register.less      # 注册页面样式
│   └── login/
│       ├── index.tsx          # 登录页面组件
│       └── login.less         # 登录页面样式
├── services/
│   └── user.ts               # 用户相关API服务
└── regexp/
    └── index.ts              # 正则表达式验证规则
```

## 使用方法

1. 访问 `/register` 路径进入注册页面
2. 填写所有必填字段
3. 点击"注册"按钮提交表单
4. 注册成功后可以跳转到登录页面

## 技术栈

- React 18
- TypeScript
- Arco Design UI组件库
- Less CSS预处理器

## 注意事项

1. 实际部署时需要替换模拟API为真实的注册接口
2. 密码应该在后端进行加密处理
3. 可以根据需要添加更多的验证规则
4. 建议添加验证码或短信验证功能增强安全性