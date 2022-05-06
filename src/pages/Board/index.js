import { Button } from "antd";
import { DoubleLeftOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import Board from "react-trello";
import { MOCK_DATA_BOARD } from "../../mocks";

export default function BoardView() {
  const navigate = useNavigate();
  return (
    <div className="container__wrapper">
      <div className="list__project__header">
        <h3>Danh Sách Trạng Thái Các Task Của Dự Án</h3>
      </div>
      <div style={{ paddingLeft: 20, paddingBottom: 20 }}>
        <Button
          type="primary"
          onClick={() => navigate("/")}
          icon={<DoubleLeftOutlined />}
        >
          Quay lại danh sách dự án
        </Button>
      </div>
      <Board
        style={{ width: "100%", minHeight: 500 }}
        data={MOCK_DATA_BOARD}
        draggable
        editable
        canAddLanes
      />
    </div>
  );
}
