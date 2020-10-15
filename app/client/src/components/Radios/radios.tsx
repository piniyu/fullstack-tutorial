import React from 'react'
import { Radio } from 'antd'
import classes from './radios.module.scss'

interface Props {
  title?: string
  buttonText: string[]
}

const Radios = (props: Props) => {
  const radioGroup = props.buttonText!.map((text: string) => (
    <Radio.Button value={text}>{text}</Radio.Button>
  ))
  return (
    <div className={classes.RadioWrapper}>
      {props.title ? <h4>{props.title}</h4> : null}
      <Radio.Group buttonStyle="solid">{radioGroup}</Radio.Group>
    </div>
  )
}

export default Radios
