import React, { useState, useEffect } from 'react'

import { Card } from 'antd'
// import Block from '../Block/block'

const BlockMeta = (props: any) => {
  const [isloadding, setLoadding] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoadding(false), 3000)
  })

  return (
    <Card hoverable loading={isloadding} bordered={false}>
      <ul>
        <li>
          <span>關聯標籤</span>
          <p>$BA</p>
        </li>
        <li>
          <span>關聯事件</span>
          <p>~COVI-19</p>
        </li>
        <li>
          <span>簡介</span>
          <p>
            波音公司（英語：The Boeing
            Company）是美國一家開發、生產及销售固定翼飛機、旋翼
            机、运载火箭、导弹和人造卫星等產品，為世界最大的航天航空器製造商。
          </p>
        </li>
      </ul>
    </Card>
  )
}

export default BlockMeta
