import React, { useState, useEffect } from 'react'

import { Card } from 'antd'
import Block from '../Block/block'
import Radio from '../Radios/radios'

import classes from './tickerComment.module.scss'

const TickerComment = () => {
  const [button, setButton] = useState([
    '同業',
    '上下游',
    '消費者',
    '分析師',
    '看戲',
  ])

  return (
    <Block title="對公司的看法">
      <Radio title="你與公司的關係是?" buttonText={button} />
      {/* <Radio title="預測?" /> */}
    </Block>
  )
}

export default TickerComment
