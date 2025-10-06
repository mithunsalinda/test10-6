import React from "react";
import {
  Col,
  Layout,
  Row,
  Typography,
  Form,
  Input,
  Button,
} from "antd";
import type { FormProps } from "antd";

import type { LoginRequest } from "./LoginForm.type";

const { Title, Text } = Typography;
const { Content } = Layout;

const Login: React.FC = () => {
  const onFinish: FormProps<LoginRequest>["onFinish"] = async (values) => {
    try {
    } catch (err) {}
  };
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      <Content>
        <Row style={{ height: "100vh" }}>
          <Col>
            <div>
              <div style={{ marginBottom: 32 }}>
                <Title level={2}>Sign in</Title>
                <Text type="secondary">
                  Please login to continue to your account.
                </Text>
              </div>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                //onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item<LoginRequest>
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your Email!" },
                    {
                      type: "email",
                      message: "Please enter a valid email address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item<LoginRequest>
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item label={null}>
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;
