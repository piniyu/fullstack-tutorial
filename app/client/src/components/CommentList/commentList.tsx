import React, { ReactElement, useState } from 'react'
import { List, Comment, Space, Tooltip } from 'antd'
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from '@ant-design/icons'
import MyTextArea from '../MyTextArea/myTextArea'
import classes from './commentList.module.scss'

// interface IconText {
//   icon: React.FunctionComponent
//   text: string
// }
// const IconText = ({ icon, text }: IconText) => (
//   <Space>
//     {React.createElement(icon)}
//     {text}
//   </Space>
// )

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

  interface listData {
    //   href: string
    //   title: string
    //   description: string
    id: string
    parent: boolean
    content: string
    floor: string
    action: ReactElement[]
    clicked: boolean
    input: boolean
  }

  const toggleTextAreaHandler = (e: any, id: string) => {
    e.stopPropagation()
    const newList = list.map((item) => {
      if (id === item.id) {
        const updatedItem = {
          ...item,
          ...item.action,
          input: !item.input,
        }
        return updatedItem
      }
      return item
    })
    setList(newList)
  }

  const listData: Array<listData> = []
  for (let i = 0; i < 14; i++) {
    listData.push({
      // href: 'https://ant.design',
      // title: `ant design part ${i}`,
      // description:
      //   'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      id: `${i}`,
      parent: false,
      content:
        'dkjkjf;akjsd;flkja;sdkj;lkjd;lfkja;lskdjf lkasjdf types beautifully and efficiently.',
      floor: `#${i + 1}`,
      action: [
        <Tooltip key="comment-basic-like" title="Like">
          <span onClick={like}>
            {React.createElement(
              action === 'liked' ? LikeFilled : LikeOutlined,
            )}
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
        <span
          key="comment-basic-reply-to"
          onClick={(e) => toggleTextAreaHandler(e, `${i}`)}
        >
          回覆
        </span>,
      ],
      clicked: false,
      input: false,
    })
  }
  const [list, setList] = useState(listData)

  //   const actions = [
  //     <Tooltip key="comment-basic-like" title="Like">
  //       <span onClick={like}>
  //         {React.createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
  //         <span className="comment-action">{likes}</span>
  //       </span>
  //     </Tooltip>,
  //     <Tooltip key="comment-basic-dislike" title="Dislike">
  //       <span onClick={dislike}>
  //         {React.createElement(
  //           action === 'disliked' ? DislikeFilled : DislikeOutlined,
  //         )}
  //         <span className="comment-action">{dislikes}</span>
  //       </span>
  //     </Tooltip>,
  //     <span key="comment-basic-reply-to" onClick={toggleTextAreaHandler}>
  //       回覆
  //     </span>,
  //   ]

  type commentTemplate = {
    id: string
    content: string
    action: ReactElement[]
    floor?: string
    clicked: boolean
    input?: boolean
  }
  const CommentTemplate: React.FC<commentTemplate> = (props) => (
    <Comment
      author={props.floor}
      actions={props.action}
      content={props.content}
    >
      {props.children}
    </Comment>
  )

  const parentCommentClickHandler = (id: string) => {
    const commentId = id
    const newList = list.map((item) => {
      if (item.id === commentId) {
        // if (item.clicked) {
        //   if (item.input) {
        //     return item
        //   } else {
        //     const updatedItem = {
        //       ...item,
        //       clicked: !item.clicked,
        //     }
        //     return updatedItem
        //   }
        // }
        const updatedItem = {
          ...item,
          clicked: !item.clicked,
        }
        return updatedItem
      }
      return item
    })
    setList(newList)
  }

  const onFocusHandler = (e: any) => {
    e.stopPropagation()
  }

  return (
    <List
      className={classes.List}
      size="large"
      header={`${list.length} 條討論`}
      pagination={{
        onChange: (page) => {
          console.log(page)
        },
        pageSize: 5,
      }}
      dataSource={list}
      // footer={
      //   //   <div>
      //   //     <b>ant design</b> footer part
      //   //   </div>
      // }
      renderItem={
        (item) => (
          <li
            className={classes.commentRoot}
            onClick={() => parentCommentClickHandler(item.id)}
          >
            <CommentTemplate
              id={item.id}
              content={item.content}
              action={item.action}
              clicked={item.clicked}
              //   input={item.input}
            >
              {/* <CommentTemplate content={item.content} floor={item.floor} /> */}
              {item.input ? <MyTextArea focused={onFocusHandler} /> : null}
            </CommentTemplate>
          </li>
        )

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
      }
    />
  )
}

export default CommentList
