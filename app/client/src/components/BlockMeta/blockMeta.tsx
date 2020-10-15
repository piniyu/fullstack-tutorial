import React, { useState, useEffect } from 'react'

import { Card } from 'antd'
import Block from '../Block/block'
import classes from './blockMeta.module.scss'

import Tag from '../Tag/tag'

const BlockMeta = (props: any) => {
  return (
    <Block title="Meta">
      <ul>
        <li>
          <span className={classes.span}>關聯標籤</span>
          <Tag content="$BA" />
        </li>
        <li>
          <span className={classes.span}>關聯事件</span>
          <Tag content="~COVI-19~" />
        </li>
        <li>
          <span className={classes.span}>簡介</span>
          <p>
            波音公司（英語：The Boeing
            Company）是美國一家開發、生產及销售固定翼飛機、旋翼
            机、运载火箭、导弹和人造卫星等產品，為世界最大的航天航空器製造商。
          </p>
        </li>
      </ul>
    </Block>
  )
}

export default BlockMeta
