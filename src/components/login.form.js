import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { authenApi } from "../services/authen";

export default function LoginForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      let response = await authenApi.login(
        JSON.stringify({
          username: values.username,
          password: values.password,
        })
      );
      // set token into session storage
      window.sessionStorage.setItem("token", response.data.token);
      // redirect to dashboard
      navigate("/");
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message);
        form.resetFields();
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      form={form}
      labelCol={{
        span: 8,
      }}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 9,
        }}
      >
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
