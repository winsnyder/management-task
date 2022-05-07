import React, { useContext, useEffect } from "react";
import { Tabs } from "antd";
import SignupForm from "../../components/signup.form";
import LoginForm from "../../components/login.form";
import BaseContext from "../../hooks";

/*Import CSS*/
import "../../assets/css/login.css"

const { TabPane } = Tabs;

export default function Login() {
  const baseCtx = useContext(BaseContext);

  const handleSwitch = (key) => {
    baseCtx.changeTab(key);
  };

  /*init tab*/
  useEffect(() => {
    baseCtx.changeTab("1");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="wrapper-form">
      <Tabs
        activeKey={baseCtx.tab}
        onChange={handleSwitch}
        defaultActiveKey={baseCtx.tab}
      >
        <TabPane tab="LOGIN" key="1">
          <LoginForm />
        </TabPane>
        <TabPane tab="SIGNUP" key="2">
          <SignupForm />
        </TabPane>
      </Tabs>
    </div>
  );
}