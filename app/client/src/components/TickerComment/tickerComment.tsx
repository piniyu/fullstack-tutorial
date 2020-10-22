import React, { useState, useEffect } from 'react'

import { Card } from 'antd'
import Block from '../Block/block'
import Radio from '../Radios/radios'
import MyTextArea from '../MyTextArea/myTextArea'
import CommentList from '../CommentList/commentList'

import classes from './tickerComment.module.scss'

const TickerComment = () => {
  const data = [
    {
      q: '你與公司的關係是?',
      a: ['同業', '上下游', '消費者', '分析師', '看戲'],
    },
    { q: '預測?', a: ['看多', '看空', '不知道'] },
    { q: '優劣勢(非必填)', a: ['優勢', '劣勢'] },
  ]

  const radioList = data.map((radio, index) => (
    <Radio key={index} title={radio.q} buttonText={radio.a} />
  ))

  return (
    <Block title="對公司的看法">
      {radioList}
      <MyTextArea />
      <CommentList />
    </Block>
  )
}

export default TickerComment
