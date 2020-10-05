import React from 'react'
import classes from './block.module.scss'

const block = (props: { children?: React.ReactNode }) => (
  <div className={classes.block}>{props.children}</div>
)

export default block
