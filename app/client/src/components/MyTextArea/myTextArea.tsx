import React, { useState } from 'react'
import { Input, Button } from 'antd'

import classes from './myTextArea.module.scss'

const { TextArea } = Input

interface props {
  focused?: any
}

const MyTextArea = (props: props) => {
  const [commentValue, setValue] = useState('')

  const [buttonDisable, setButtonState] = useState(true)

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let texts = event.target.value
    setValue(texts)
    buttonStateHandler(texts)
  }
  const buttonStateHandler = (value: string) => {
    if (value == '') {
      setButtonState(true)
    } else {
      setButtonState(false)
    }
  }

  const stopPropagationHandler = (e: any) => {
    e.stopPropagation()
  }

  //   const { value } = commentValue

  return (
    <div className={classes.Wrapper}>
      <TextArea
        className={classes.TextArea}
        placeholder="留言..."
        autoSize
        onChange={onChangeHandler}
        onClick={stopPropagationHandler}
      />
      <Button
        type="text"
        disabled={buttonDisable}
        onClick={stopPropagationHandler}
      >
        送出
      </Button>
    </div>
  )
}

export default MyTextArea
