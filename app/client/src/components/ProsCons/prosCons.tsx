import React, { useState, useEffect } from 'react'

import { Card } from 'antd'
// import { CloseOutlined } from '@ant-design/icons'
import classes from './prosCons.module.scss'

import { ReactComponent as CheckOutlined } from '../../assets/icons/checkOutlined.svg'
import { ReactComponent as CloseOutlined } from '../../assets/icons/closeOutlined.svg'

import Tag from '../Tag/tag'

const ConsPros = (props: any) => {
  const [isLoadding, setLoadding] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoadding(false), 2000)
  }, [])

  const [consPros, setConsPros] = useState([
    {
      type: 'con',
      content: '優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢',
    },
    {
      type: 'con',
      content:
        '優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢',
    },
    {
      type: 'con',
      content:
        '優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢',
    },
    {
      type: 'con',
      content:
        '優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢優勢',
    },
    {
      type: 'pro',
      content: '劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢',
    },
    {
      type: 'pro',
      content:
        '劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢',
    },
    {
      type: 'pro',
      content:
        '劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢',
    },
    {
      type: 'pro',
      content:
        '劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢劣勢',
    },
  ])

  const consList = consPros.map((data, index) => {
    if (data.type == 'con') {
      return (
        <li key={index} data-type={data.type}>
          {/* <CheckOutlined /> */}
          <CheckOutlined />
          <span>{data.content}</span>
        </li>
      )
    }
  })
  const prosList = consPros.map((data, index) => {
    if (data.type == 'pro') {
      return (
        <li key={index} data-type={data.type}>
          <CloseOutlined />
          <span>{data.content}</span>
        </li>
      )
    }
  })

  return (
    <Card
      title="優劣勢"
      className={classes.card}
      hoverable
      loading={isLoadding}
      bordered={false}
    >
      <div className={classes.gridContainer}>
        <div>
          <ul>{consList}</ul>
        </div>
        {/* <div className={classes.line}></div> */}
        <div>
          <ul>{prosList}</ul>
        </div>
      </div>
    </Card>
  )
}

export default ConsPros
