import React, { useState, useEffect } from 'react'

import { Card } from 'antd'
import classes from './block.module.scss'

interface props {
  title: string
  children: React.ReactNode
}

const Block = (props: props) => {
  const [isloadding, setLoadding] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoadding(false), 2000)
  }, [])

  return (
    <Card
      title={props.title}
      className={classes.card}
      hoverable
      loading={isloadding}
      bordered={false}
    >
      {props.children}
    </Card>
  )
}

export default Block
