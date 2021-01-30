
import React, { memo } from 'react'
import { Button } from 'antd'
import wx from '@/utils/sdk'
export default memo(() => {
    const a = async () => {
        alert(await wx("a"))
    }
    const b = async () => {
        alert(await wx("b","xxx"))
    }
    return <>
        它们都需要在ready执行完毕之后才可以调用，封装之后直接调用即可<br/>
        可以明显的看出，第一次有延迟，是在等待ready,第二次之后没有延迟，因为ready已经执行<br/>
        <Button onClick={a}>调用a变量</Button>
        <Button onClick={b}>调用b函数</Button>
    </>
})