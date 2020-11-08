import React, { useState } from 'react'
import { Comment, Tooltip } from 'antd'
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from '@ant-design/icons'

import MyTextArea from '../MyTextArea/myTextArea'
// import classes from './commentTemplate.module.scss'

type commentTemplate = {
  id?: string
  content?: string
  //   action: ReactElement[]
  floor?: string
  className?: string
  clicked?: boolean
  parent: boolean
}

const CommenTemplate: React.FC<commentTemplate> = (props) => {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [action, setAction] = useState('')

  const like = () => {
    setLikes(1)
    setDislikes(0)
    setAction('liked')
  }

  const dislike = () => {
    setLikes(0)
    setDislikes(1)
    setAction('disliked')
  }

  const [textArea, setTextArea] = useState(false)

  const toggleTextAreaHandler = (e: any) => {
    e.stopPropagation()
    setTextArea(!textArea)
  }

  const onFocusHandler = (e: any) => {
    e.stopPropagation()
  }

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {React.createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === 'disliked' ? DislikeFilled : DislikeOutlined,
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    props.parent ? (
      <span
        id={`1`}
        key="comment-basic-reply-to"
        onClick={toggleTextAreaHandler}
      >
        回覆
      </span>
    ) : null,
  ]

  return (
    <Comment author={props.floor} actions={actions} content={props.content}>
      {textArea ? <MyTextArea /> : null}
      {props.children}
    </Comment>
  )
}
export default CommenTemplate
