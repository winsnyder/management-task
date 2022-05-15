import React from "react";
import { Drawer, Button } from "antd";
import { CommentOutlined } from "@ant-design/icons";

import ListComment from "../components/comment";

export default function InfoDrawer(props) {
  const [visible, setVisible] = React.useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        type="default"
        onClick={showDrawer}
        icon={<CommentOutlined />}
        shape="circle"
      />
      <Drawer
        title={<b>ADD COMMENT ABOUT PROJECT</b>}
        placement="right"
        onClose={onClose}
        visible={visible}
        size="large"
      >
        <ListComment project_id={props.project_id}/>
      </Drawer>
    </>
  );
}
