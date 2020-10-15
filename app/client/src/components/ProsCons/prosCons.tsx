import React, { useState, useEffect } from 'react'

import Block from '../Block/block'
import classes from './prosCons.module.scss'

import { ReactComponent as CheckOutlined } from '../../assets/icons/checkOutlined.svg'
import { ReactComponent as CloseOutlined } from '../../assets/icons/closeOutlined.svg'

const ConsPros = (props: any) => {
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
    <Block title="優勢＆劣勢">
      <div className={classes.gridContainer}>
        <div>
          <ul>{consList}</ul>
        </div>
        {/* <div className={classes.line}></div> */}
        <div>
          <ul>{prosList}</ul>
        </div>
      </div>
    </Block>
  )
}

export default ConsPros
