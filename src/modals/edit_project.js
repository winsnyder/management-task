import React from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";
import moment from "moment";
import { projectApi } from "../services/project";
import BaseContext from "../hooks";

export default function ModalEditProject(props) {
  const baseCtx = React.useContext(BaseContext);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = React.useState(props.isShow);
  const dateFormat = "YYYY/MM/DD";

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    baseCtx.changeIsShowEdit(false);
  };

  React.useEffect(() => {
    (async () => {
      try {
        const response = await projectApi.get(parseInt(props.id), "");
        form.setFieldsValue({
          project_name: response.data.results.project_name,
          tag: response.data.results.tag,
          deadline: moment(response.data.results.deadline),
        });
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const onFinish = async (values) => {
    console.log("Success:", moment(values.deadline).format("YYYY-MM-DD"));

    const token = sessionStorage.getItem("token");

    try {
      const reponse = await projectApi.update(
        parseInt(props.id),
        JSON.stringify({
          project_name: values.project_name,
          tag: values.tag,
          deadline: moment(values.deadline).format("YYYY-MM-DD"),
        }),
        token
      );

      if (reponse.data.statusCode === 200) {
        baseCtx.changeReload();
        setIsModalVisible(false);
        form.resetFields();
        baseCtx.changeIsShowEdit(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title="Sửa thông tin dự án"
        visible={isModalVisible}
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
            <DatePicker format={dateFormat} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
