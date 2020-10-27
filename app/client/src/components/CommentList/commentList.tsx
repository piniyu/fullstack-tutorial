import React, { useState } from 'react'
import { List, Comment, Space, Tooltip } from 'antd'
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from '@ant-design/icons'
import classes from './commentList.module.scss'

interface listData {
  //   href: string
  //   title: string
  //   description: string
  parent: boolean
  content: string
  floor: string
}

const listData: Array<listData> = []
for (let i = 0; i < 14; i++) {
  listData.push({
    // href: 'https://ant.design',
    // title: `ant design part ${i}`,
    // description:
    //   'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    parent: false,
    content:
      'dkjkjf;akjsd;flkja;sdkj;lkjd;lfkja;lskdjf lkasjdf types beautifully and efficiently.',
    floor: `#${i + 1}`,
  })
}

interface IconText {
  icon: React.FunctionComponent
  text: string
}
const IconText = ({ icon, text }: IconText) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const CommentList = () => {
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
    <span key="comment-basic-reply-to">回覆</span>,
  ]

  type commentTemplate = {
    content: string
    floor?: string
    children?: React.ReactNode
  }
  const CommentTemplate: React.FC<commentTemplate> = (props) => (
    <Comment author={props.floor} actions={actions} content={props.content}>
      {props.children}
    </Comment>
  )

  return (
    <List
      className={classes.List}
      size="large"
      header={`${listData.length} 條討論`}
      pagination={{
        onChange: (page) => {
          console.log(page)
        },
        pageSize: 5,
      }}
      dataSource={listData}
      // footer={
      //   //   <div>
      //   //     <b>ant design</b> footer part
      //   //   </div>
      // }
      renderItem={(item) => (
        <li className={classes.commentRoot}>
          <CommentTemplate content={item.content}>
            <CommentTemplate content={item.content} floor={item.floor} />
          </CommentTemplate>
        </li>
        // <li>
        //   <Comment actions={actions} content={item.content} />
        // </li>
        // key={item.title}
        // className={classes.iconText}
        // actions={[
        //   <IconText
        //     icon={StarOutlined}
        //     text="156"
        //     key="list-vertical-star-o"
        //   />,
        //   <IconText
        //     icon={LikeOutlined}
        //     text="156"
        //     key="list-vertical-like-o"
        //   />,
        //   <IconText
        //     icon={MessageOutlined}
        //     text="2"
        //     key="list-vertical-message"
        //   />,

        // extra={
        //   <img
        //     width={272}
        //     alt="logo"
        //     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        //   />
        // }
        // >
        //   <span className={classes.ListContent}>{item.content}</span>
        // </List.Item>
      )}
    />
  )
}

export default CommentList
