import React from "react";
import Board from "react-trello";
import { MOCK_DATA_BOARD } from "../../mocks";

export default function BoardView() {
  return <Board data={MOCK_DATA_BOARD} />;
}
