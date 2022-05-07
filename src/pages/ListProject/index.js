import React from "react";
import { useNavigate } from "react-router-dom";
import ModalAddProject from "../../modals/add_project";
import ModalDeleteProject from "../../modals/delete_project";
import ModalEditProject from "../../modals/edit_project";
import { Card, Col, Row, Input, Spin, Divider } from "antd";
import {
  FireOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import "../../assets/css/listProject.css";

// import service
import { projectApi } from "../../services/project";
import BaseContext from "../../hooks";

const { Search } = Input;

export default function ListProject() {
  const baseCtx = React.useContext(BaseContext);
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [spinning, setSpinning] = React.useState(true);
  const [projectId, setProjectId] = React.useState("");
  const [projectName, setProjectName] = React.useState("");

  const onSearch = async (value) => {
    await getDataFetch({ keyword: value });
  };

  // Using useEffect hook call service

  const getDataFetch = async (params) => {
    setSpinning(true);
    // const token = sessionStorage.getItem("token");
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    try {
      let response = await projectApi.getList(params, token);
      setData(response.data.results);
      setSpinning(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    (async () => {
      await getDataFetch({});
    })();
    // eslint-disable-next-line
  }, [baseCtx.reload]);

  var list_porjects = [];
  var sub_projects = [];

  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      if ((i + 1) % 4 !== 0) {
        sub_projects.push(
          <Col span={6} key={i}>
            <Card
              title={<b>{data[i].project_name}</b>}
              bordered={false}
              actions={[
                <DeleteOutlined
                  key="setting"
                  onClick={() => {
                    baseCtx.changeIsShow(true);
                    setProjectId(data[i].id);
                    setProjectName(data[i].project_name);
                  }}
                />,
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    baseCtx.changeIsShowEdit(true);
                    setProjectId(data[i].id);
                  }}
                />,
                <EyeOutlined
                  key="ellipsis"
                  onClick={() => navigate(`/board/${data[i].id}`)}
                />,
              ]}
            >
              <h4>
                Tag: <b>{data[i].tag}</b>
              </h4>
              <h4>
                Deadline:{" "}
                {Date.now() > Date.parse(data[i].deadline) ? (
                  <b style={{ color: "red" }}>{data[i].deadline}</b>
                ) : (
                  <b>{data[i].deadline}</b>
                )}
              </h4>
              {/* <div className="list__units">
                <div className="unit">
                  <FireOutlined /> To Do (15)
                </div>
                <div className="unit">
                  <FireOutlined /> Doing (15)
                </div>
                <div className="unit">
                  <FireOutlined /> Pending (15)
                </div>
                <div className="unit">
                  <FireOutlined /> Done (15)
                </div>
              </div> */}
            </Card>
          </Col>
        );
      } else {
        sub_projects.push(
          <Col span={6} key={i}>
            <Card
              title={<b>{data[i].project_name}</b>}
              bordered={false}
              actions={[
                <DeleteOutlined
                  key="setting"
                  onClick={() => {
                    baseCtx.changeIsShow(true);
                    setProjectId(data[i].id);
                    setProjectName(data[i].project_name);
                  }}
                />,
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    baseCtx.changeIsShowEdit(true);
                    setProjectId(data[i].id);
                  }}
                />,
                <EyeOutlined
                  key="ellipsis"
                  onClick={() => navigate(`/board/${data[i].id}`)}
                />,
              ]}
            >
              <h4>
                Tag: <b>{data[i].tag}</b>
              </h4>
              <h4>
                Deadline:{" "}
                {Date.now() > Date.parse(data[i].deadline) ? (
                  <b style={{ color: "red" }}>{data[i].deadline}</b>
                ) : (
                  <b>{data[i].deadline}</b>
                )}
              </h4>
              {/* <div className="list__units">
                <div className="unit">
                  <FireOutlined /> To Do (15)
                </div>
                <div className="unit">
                  <FireOutlined /> To Do (15)
                </div>
                <div className="unit">
                  <FireOutlined /> To Do (15)
                </div>
                <div className="unit">
                  <FireOutlined /> To Do (15)
                </div>
              </div> */}
            </Card>
          </Col>
        );

        var sub_object = (
          <Row gutter={16} style={{ marginTop: 15 }} key={i}>
            {sub_projects}
          </Row>
        );

        list_porjects.push(sub_object);

        sub_projects = [];
      }

      // Check last item
      if (i === data.length - 1 && sub_projects.length !== 0) {
        sub_object = (
          <Row gutter={16} style={{ marginTop: 15 }} key={i}>
            {sub_projects}
          </Row>
        );

        list_porjects.push(sub_object);
      }
    }
  }

  return (
    <>
      <div className="container__wrapper">
        <div className="list__project__header">
          <h3>Danh Sách Dự Án Cá Nhân</h3>
        </div>
        <div className="list__project__filter"></div>
        <Spin spinning={spinning}>
          <div className="list__project__content">
            <div className="list__project__action">
              <ModalAddProject />
              <Search
                style={{ width: 500, float: "right" }}
                placeholder="Tìm kiếm dự án bằng tên dự án hoặc tag,..."
                onSearch={onSearch}
                enterButton
                allowClear
                size="large"
              />
            </div>
            <Divider orientation="left" plain>
              Danh sách dự án của bạn
            </Divider>
            {list_porjects}
          </div>
        </Spin>
        {/* <div className="list__project__pagination">
        <Pagination showSizeChanger={false} defaultCurrent={1} total={500} />
      </div> */}
      </div>
      {baseCtx.isShow ? (
        <ModalDeleteProject
          id={projectId}
          isShow={baseCtx.isShow}
          projectName={projectName}
        />
      ) : (
        ""
      )}
      {baseCtx.isShowEdit ? (
        <ModalEditProject id={projectId} isShow={baseCtx.isShowEdit} />
      ) : (
        ""
      )}
    </>
  );
}
