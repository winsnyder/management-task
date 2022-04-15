import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Board from "react-trello";
import { MOCK_DATA_BOARD } from "../../mocks";

export default function BoardView() {
  const navigate = useNavigate();
  return (
    <div className="container__wrapper">
      <div className="list__project__header">
        <h3>List Tasks Of Project</h3>
      </div>
      <div style={{ paddingLeft: 20, paddingBottom: 20 }}>
        <Button type="primary" onClick={() => navigate("/")}>
          Back to Projects
        </Button>
      </div>
      <Board style={{ width: "100%", minHeight: 500}} data={MOCK_DATA_BOARD} draggable editable canAddLanes />
    </div>
  );
}
