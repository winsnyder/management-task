import React, { useContext } from "react";
import { Form, Input, Button, message } from "antd";
import BaseContext from "../hooks";
import { authenApi } from "../services/authen";

export default function SignupForm() {
  // context base
  const baseCtx = useContext(BaseContext);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    // Verify password
    if (values.password !== values.repassword) {
      message.error("Please enter correct password!");
      form.resetFields(["password", "repassword"]);
    } else {
      try {
        await authenApi.signup(
          JSON.stringify({
            username: values.username,
            password: values.password,
          })
        );
        message.success("Create user success!");
        baseCtx.changeTab("1");
      } catch (error) {
        if (error.response) {
          message.error(error.response.data.message);
          form.resetFields();
        }
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onCancel = () => {
    baseCtx.changeTab("1");
  };

  return (
    <Form
      form={form}
      name="basic"
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
        label="Re-Password"
        name="repassword"
        rules={[
          {
            required: true,
            message: "Please input your re-password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>

        <Button type="primary" danger onClick={() => onCancel()}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}
