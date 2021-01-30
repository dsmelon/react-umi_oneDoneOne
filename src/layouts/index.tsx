import React, { memo } from 'react'
import { connect  } from 'umi';
import { Modal } from 'antd';

export default connect(({ global: { openLoginPopu } }) => ({ openLoginPopu }))(
memo(({ children, openLoginPopu, dispatch }) => {

    const ok = async () => {
        dispatch({type: "global/login"})
    }
    const cancel = () => {
        dispatch({type: "global/openLoginPopu", payload: false})
        window.loginAct()
    }
    return <>
        {children}
        <Modal
          title="登录"
          visible={openLoginPopu}
          onOk={ok}
          onCancel={cancel}
          okText="登录"
          cancelText="关闭"
        >
          你还没有登录，请点击确定进行登录，点击取消关闭（也就是appwebview左上角的返回）
        </Modal>
    </>
}));