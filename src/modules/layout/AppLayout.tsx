// src/modules/layout/AppLayout.tsx
import React from "react";
import { Layout, Menu } from "@arco-design/web-react";
import { Outlet, useRouter } from "@tanstack/react-router";

const { Sider, Header, Content } = Layout;

export default function AppLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  console.log(children);

  const router = useRouter();
  const navigate = (key: string) =>
    router.navigate({
      to: key,
      search: (current) => current,
      params: (current) => current,
    });

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider breakpoint="lg" collapsible>
        <div
          style={{
            height: 56,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
          }}
        >
          Admin
        </div>
        <Menu
          onClickMenuItem={navigate}
          defaultSelectedKeys={["/"]}
          style={{ height: "calc(100% - 56px)" }}
        >
          <Menu.Item key="/">仪表盘</Menu.Item>
          <Menu.Item key="/users">用户管理</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>这里放搜索、主题切换、用户信息</Header>
        <Content style={{ padding: 16 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
