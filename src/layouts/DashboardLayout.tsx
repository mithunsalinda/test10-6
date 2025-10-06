import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import { useState } from "react";

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#FFF",
          padding: "0 16px",
          justifyContent: "space-between",
        }}
      ></Header>

      <Layout>
        <Sider
          width={280}
          collapsedWidth={10}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          breakpoint="lg"
          style={{
            background: "#437cff",
            height: "calc(100vh - 64px)",
            overflow: "auto",
            position: "fixed",
            zIndex: 1000,
            left: collapsed ? -280 : 0,
            top: 64,
            transition: "left 0.3s ease",
          }}
        ></Sider>
        <Layout
          style={{
            marginLeft: collapsed ? 0 : 280,
            transition: "margin-left 0.3s ease",
            padding: 10,
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <Content style={{ overflow: "auto", height: "10vh" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
