import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row, Popover, Pagination } from "antd";
import { FireOutlined, MoreOutlined } from "@ant-design/icons";

import "../../assets/css/listProject.css";

export default function ListProject() {
  const content = (
    <div>
      <p>
        <Link to={"/board"}>Go to board</Link>
      </p>
      <p>Content</p>
    </div>
  );

  var list_porjects = [];
  var sub_projects = [];
  for (let i = 0; i < 7; i++) {
    if ((i + 1) % 4 !== 0) {
      sub_projects.push(
        <Col span={6}>
          <Card
            title={`Tìm hiểu về Docker ${i}`}
            bordered={false}
            style={{ borderRadius: 10 }}
            extra={
              <Popover content={content} title="Options">
                <MoreOutlined style={{ fontSize: 20 }} />
              </Popover>
            }
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
    } else {
      sub_projects.push(
        <Col span={6}>
          <Card
            title={`Tìm hiểu về Docker ${i}`}
            bordered={false}
            style={{ borderRadius: 10 }}
            extra={
              <Popover content={content} title="Options">
                <MoreOutlined style={{ fontSize: 20 }} />
              </Popover>
            }
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
    if (i === 6 && sub_projects.length !== 0) {
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
        <h3>List Projects</h3>
      </div>
      <div className="list__project__filter"></div>
      <div className="list__project__content">{list_porjects}</div>
      <div className="list__project__pagination">
        <Pagination showSizeChanger={false} defaultCurrent={1} total={500} />
      </div>
    </div>
  );
}
