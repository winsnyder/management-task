import React from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";
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

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Thêm dự án
      </Button>
      <Modal
        title="Thêm mới dự án"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel} danger type="primary">
            Hủy bỏ
          </Button>,
          <Button key="submit" type="primary" htmlType="submit" form="myForm">
            Lưu kết quả
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
            label="Tên dự án"
            name="project_name"
            rules={[{ required: true, message: "Hãy nhập tên dự án của bạn!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tags"
            name="tag"
            rules={[
              { required: true, message: "Hãy nhập tag để nhận diện dự án!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Deadline"
            name="deadline"
            rules={[
              {
                required: true,
                message: "Hãy nhập thời hạn kết thúc dự án!",
              },
            ]}
          >
            <DatePicker onChange={onChange} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
