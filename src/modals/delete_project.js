import React from "react";
import { Modal, Button } from "antd";
import { projectApi } from "../services/project";
import BaseContext from "../hooks";

export default function ModalDeleteProject(props) {
  const baseCtx = React.useContext(BaseContext);
  const [isModalVisible, setIsModalVisible] = React.useState(props.isShow);

  const handleCancel = () => {
    setIsModalVisible(false);
    baseCtx.changeIsShow(false)
  };

  const onFinish = async () => {
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNjUxODc1NTQ5fQ.0rKmiJqQymIR_GyjEfmtFy3nC8_bux94f0H1sNfLpwg";

    try {
      const reponse = await projectApi.remove(parseInt(props.id), token);

      if (reponse.status === 204) {
        baseCtx.changeReload();
        setIsModalVisible(false);
        baseCtx.changeIsShow(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        title="Warning!!!"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel} danger type="primary">
            Hủy bỏ
          </Button>,
          <Button onClick={onFinish} type="primary">
            Đồng ý
          </Button>,
        ]}
      >
        Bạn thực sự muốn xóa dự án <b>{props.projectName}</b>?
      </Modal>
    </>
  );
}
