import React from 'react'
import { Button } from 'antd'

import classes from './tag.module.scss'

interface props {
  content: string
}

const Tag: React.FC<props> = ({ content }) => (
  <Button className={classes.tag} shape="round" size="small">
    {content}
  </Button>
)

export default Tag
