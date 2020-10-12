import React from 'react'
import { Tag } from 'antd'

import classes from './tag.module.scss'

interface props {
  content: string
}

const Tags: React.FC<props> = ({ content }) => (
  <Tag className={classes.tag}>{content}</Tag>
)

export default Tags
