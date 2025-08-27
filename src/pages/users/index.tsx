// src/pages/users.tsx
import React from "react";
import { Table, Typography } from "@arco-design/web-react";
import { useQuery } from "@tanstack/react-query";

type User = { id: number; name: string; email: string };

export default function Users() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/users"); // 换成你的后端地址
      return (await res.json()) as User[];
    },
  });

  return (
    <>
      <Typography.Title heading={4}>用户列表</Typography.Title>
      <Table
        loading={isLoading}
        data={data ?? []}
        columns={[
          { title: "ID", dataIndex: "id" },
          { title: "姓名", dataIndex: "name" },
          { title: "邮箱", dataIndex: "email" },
        ]}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}
