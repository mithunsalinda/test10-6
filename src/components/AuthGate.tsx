import { Layout, Spin } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const { Content } = Layout;

export default function AuthGate() {
    const { user, loading } = useAuth();

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
            <Content style={{ padding: 24 }}>
                <Outlet />
            </Content>
        </Layout>
    );
}
