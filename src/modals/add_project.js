import React from "react";
import { Modal, Button, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function ModalAddProject() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Add Project
      </Button>
      <Modal
        title="Create a new project"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel} danger type="primary">
            Cancel
          </Button>,
          <Button key="submit" type="primary" htmlType="submit" form="myForm">
            Submit
          </Button>,
        ]}
      >
        <Form
          id="myForm"
          name="basic"
          labelCol={{ span: 6 }}
          //   wrapperCol={{ span: 1 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Project Name"
            name="project_name"
            rules={[{ required: true, message: "Please input project name!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
