import React, { createContext, useState } from "react";

const BaseContext = createContext({
  // management state reload component
  reload: false,
  changeReload: () => {},

  // manage switch tab
  isShow: false,
  changeIsShow: () => {},

  isShowEdit: false,
  changeIsShowEdit: () => {},

  // manage switch tab
  tab: "1",
  changeTab: () => {},
});

export function BaseContextProvider(props) {
  const [reload, setReload] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [tab, setTab] = useState(1);

  // handle change status
  const handleChangeReload = () => {
    return setReload(!reload);
  };

  // handle switch tab
  const handleChangeIsShow = (isShow) => {
    return setIsShow(isShow);
  };

  const handleChangeIsShowEdit = (isShowEdit) => {
    return setIsShowEdit(isShowEdit);
  };

  // handle switch tab
  const handleChangeTab = (tab) => {
    return setTab(tab);
  };

  const context = {
    // reload
    reload: reload,
    changeReload: handleChangeReload,

    // switch tab
    isShow: isShow,
    changeIsShow: handleChangeIsShow,

    // switch tab
    isShowEdit: isShowEdit,
    changeIsShowEdit: handleChangeIsShowEdit,

    // switch tab
    tab: tab,
    changeTab: handleChangeTab,
  };
  return (
    <BaseContext.Provider value={context}>
      {props.children}
    </BaseContext.Provider>
  );
}

export default BaseContext;
