// src/pages/Login/index.tsx
import React, { useState } from "react";
import { Col, Layout, Row, Typography, Form, Input, Button, Checkbox, message, Card } from "antd";
import type { FormProps } from "antd";
import { useNavigate } from "react-router-dom";
import { loginWithEmail } from "../../services/auth";
import { getAuthErrorMessage } from "../../uil/const";
import { App as AntdApp } from "antd";
type LoginRequest = { email: string; password: string; remember?: boolean };

const { Title, Text } = Typography;
const { Content } = Layout;

const Login: React.FC = () => {
    const nav = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [loginError, setLoginError] = useState("");
    const { message } = AntdApp.useApp();
    const onFinish: FormProps<LoginRequest>["onFinish"] = async (values) => {
        const { email, password, remember = true } = values;
        setSubmitting(true);
        try {
            await loginWithEmail(email, password, remember);
            message.success("Welcome back!");
            nav("/dashboard", { replace: true });
        } catch (err: any) {
            const code = err?.code as string | undefined;
            const friendly = getAuthErrorMessage(code, err?.message);
            if (import.meta.env.DEV) console.error("Login error:", code, err);
            message.error(friendly);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Layout
            style={{
                minHeight: "100vh",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFF",
                display: "flex",
            }}
        >
            <Content>
                <Card>
                    <Row>
                        <Col>
                            <div>
                                <div style={{ marginBottom: 32 }}>
                                    <Title level={2} style={{ marginBottom: 0 }}>
                                        Sign in
                                    </Title>
                                    <Text type="secondary">Please login to continue to your account.</Text>
                                </div>

                                <Form<LoginRequest>
                                    layout="vertical"
                                    onFinish={onFinish}
                                    initialValues={{ remember: true }}
                                    autoComplete="off"
                                >
                                    <Form.Item<LoginRequest>
                                        label="Email"
                                        name="email"
                                        rules={[
                                            { required: true, message: "Please input your email!" },
                                            {
                                                type: "email",
                                                message: "Please enter a valid email address!",
                                            },
                                        ]}
                                    >
                                        <Input size="large" />
                                    </Form.Item>

                                    <Form.Item<LoginRequest>
                                        label="Password"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your password!",
                                            },
                                        ]}
                                    >
                                        <Input.Password size="large" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            size="large"
                                            block
                                            loading={submitting}
                                        >
                                            Login
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Content>
        </Layout>
    );
};

export default Login;
