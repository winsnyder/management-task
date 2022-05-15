import { Button } from "antd";
import { DoubleLeftOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Board from "react-trello";
import { taskApi } from "../../services/task";

export default function BoardView() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({});
  const { projectId } = useParams();

  React.useEffect(() => {
    (async () => {
      try {
        const response = await taskApi.get(parseInt(projectId), "");
        setData(response.data.results);
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line
  }, []);

  let dataRender = {
    lanes: [],
  };

  if (Object.keys(data).length !== 0 && data.constructor === Object) {
    dataRender.lanes = JSON.parse(data.data).lanes;
  }

  const handleOnDatachange = (newData) => {
    const token = sessionStorage.getItem("token") || "";
    (async () => {
      try {
        const response = await taskApi.update(
          parseInt(projectId),
          JSON.stringify({
            data: JSON.stringify(newData),
          }),
          token
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    })();
  };

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
        style={{ width: "100%", minHeight: 300 }}
        data={dataRender}
        draggable
        editable
        canAddLanes
        onDataChange={(newData) => handleOnDatachange(newData)}
      />
    </div>
  );
}
