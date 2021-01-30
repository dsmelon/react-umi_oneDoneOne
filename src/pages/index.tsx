import React, { memo, useEffect } from 'react';
import { WhiteSpace } from 'antd-mobile';
import { Link } from 'umi';
export default memo(() => {
  useEffect(() => {
    console.log(
      1??2,
      {}?.b
    )
  })
  return (
    <div style={{padding: 20}}>
      本例子向大家演示前端顶级架构思想，本例子只是演示，演示最复杂的异步token和弹窗登录（或appwebview内）的情况
      <WhiteSpace size="lg" />
      <Link to="/test">去试试</Link>
      <WhiteSpace size="lg" />
      <Link to="/asyncapi">前置条件api调用方式演示</Link>
    </div>
  );
})
