import React from "react";
import { useNavigate } from "react-router-dom";
import ModalAddProject from "../../modals/add_project";
import { Card, Col, Row, Pagination, Input } from "antd";
import {
  FireOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import "../../assets/css/listProject.css";

const { Search } = Input;

export default function ListProject() {
  const navigate = useNavigate();

  const onSearch = (value) => console.log(value);

  var list_porjects = [];
  var sub_projects = [];
  for (let i = 0; i < 12; i++) {
    if ((i + 1) % 4 !== 0) {
      sub_projects.push(
        <Col span={6}>
          <Card
            title={`Tìm hiểu về Docker ${i}`}
            bordered={false}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined
                key="ellipsis"
                onClick={() => navigate("/board")}
              />,
            ]}
          >
            <div className="list__units">
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
            </div>
          </Card>
        </Col>
      );
    } else {
      sub_projects.push(
        <Col span={6}>
          <Card
            title={`Tìm hiểu về Docker ${i}`}
            bordered={false}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined
                key="ellipsis"
                onClick={() => navigate("/board")}
              />,
            ]}
          >
            <div className="list__units">
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
            </div>
          </Card>
        </Col>
      );

      var sub_object = (
        <Row gutter={16} style={{ marginTop: 15 }}>
          {sub_projects}
        </Row>
      );

      list_porjects.push(sub_object);

      sub_projects = [];
    }

    // Check last item
    if (i === 11 && sub_projects.length !== 0) {
      sub_object = (
        <Row gutter={16} style={{ marginTop: 15 }}>
          {sub_projects}
        </Row>
      );

      list_porjects.push(sub_object);
    }
  }

  return (
    <div className="container__wrapper">
      <div className="list__project__header">
        <h3>List Projects Personal</h3>
      </div>
      <div className="list__project__filter"></div>
      <div className="list__project__content">
        <div className="list__project__action">
          <ModalAddProject />
          <Search
            style={{ width: 500, float: "right" }}
            placeholder="Search projecdt with project name or hashtag"
            onSearch={onSearch}
            enterButton
            allowClear
            size="large"
          />
        </div>
        {list_porjects}
      </div>
      <div className="list__project__pagination">
        <Pagination showSizeChanger={false} defaultCurrent={1} total={500} />
      </div>
    </div>
  );
}
