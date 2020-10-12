import React, { useState, useEffect } from 'react'

import { Card } from 'antd'
import Radio from '../Radios/radios'

import classes from './tickerComment.module.scss'

const TickerComment = () => {
  return (
    <Card
      title="對公司看法"
      className={classes.card}
      hoverable
      // loading={isLoadding}
      bordered={false}
    >
      <Radio />
    </Card>
  )
}

export default TickerComment
