
import React, { useEffect, memo } from 'react'
import { connect } from 'umi'
import { Button } from 'antd'

export default connect(({global: { userInfo }}) => ({ userInfo }))(memo(({ userInfo, dispatch }) => {
    useEffect(() => {
        //验证连发接口登录窗口也只会打开一次
        dispatch({type: "global/getInfo"})
        dispatch({type: "global/getInfo"})
        dispatch({type: "global/getInfo"})
    }, [])
    const useOnce = async () => {
        const res = await dispatch({type: "global/test2"})
        alert(res.test);
    }
    const useEnd = async () => {
        const res = await dispatch({type: "global/test"})
        alert(res.test);
    }
    return <>
        <Button onClick={useOnce}>使用第一次数据</Button>
        <Button onClick={useEnd}>使用最后一次数据</Button>
        <Button onClick={window.exit}>退出登录</Button>
        <div>{userInfo.name}</div>
    </>
}))