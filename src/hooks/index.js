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
});

export function BaseContextProvider(props) {
  const [reload, setReload] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);

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
  };
  return (
    <BaseContext.Provider value={context}>
      {props.children}
    </BaseContext.Provider>
  );
}

export default BaseContext;
