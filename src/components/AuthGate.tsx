import { Layout, Spin } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import TopHeader from './TopHeader';
const { Header, Sider, Content } = Layout;

export default function AuthGate() {
    const { user, loading } = useAuth();
const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed((prev) => !prev);
  };
    if (loading) {
        return (
            <Layout style={{ minHeight: "100vh" }}>
                <Content style={{ display: "grid", placeItems: "center" }}>
                    <Spin size="large" />
                </Content>
            </Layout>
        );
    }

    if (!user) return <Navigate to="/login" replace />;

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFF',
          padding: '0 16px',
          justifyContent: 'space-between',
        }}
      >
        <TopHeader onToggleSidebar={handleToggle} />
      </Header>
            <Layout>
        <Sider
          width={280}
          collapsedWidth={10}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          breakpoint="lg"
          style={{
            background: '#437cff',
            height: 'calc(100vh - 64px)',
            overflow: 'auto',
            position: 'fixed',
            zIndex: 1000,
            left: collapsed ? -280 : 0,
            top: 64,
            transition: 'left 0.3s ease',
          }}
        >
    
        </Sider>
        <Layout
          style={{
            marginLeft: collapsed ? 0 : 280,
            transition: 'margin-left 0.3s ease',
            padding: 10,
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          <Content style={{ overflow: 'auto', height: '10vh' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
        
    );
}
