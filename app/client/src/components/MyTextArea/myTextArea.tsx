import React, { useState } from 'react'
import { Input, Button } from 'antd'

import classes from './myTextArea.module.scss'

const { TextArea } = Input

const MyTextArea = () => {
  const [commentValue, setValue] = useState('')

  const [buttonDisable, setButtonState] = useState(true)

  const onChangeHanddler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let texts = event.target.value
    setValue(texts)
    buttonStateHanddler(texts)
  }
  const buttonStateHanddler = (value: string) => {
    if (value == '') {
      setButtonState(true)
    } else {
      setButtonState(false)
    }
  }

  //   const { value } = commentValue

  return (
    <div className={classes.Wrapper}>
      <TextArea
        className={classes.TextArea}
        placeholder="留言..."
        autoSize
        onChange={onChangeHanddler}
      />
      <Button type="text" disabled={buttonDisable}>
        送出
      </Button>
    </div>
  )
}

export default MyTextArea
