import React, { useState, useEffect } from 'react'
import { List } from 'antd'
import CommentTemplate from '../CommentTemplate/commentTemplate'
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
  interface listData {
    //   href: string
    //   title: string
    //   description: string
    id: string
    parent: boolean
    content: string
    floor: string

    clicked: boolean
  }

  let listData: Array<listData> = [
    {
      // href: 'https://ant.design',
      // title: `ant design part ${i}`,
      // description:
      //   'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      id: `1`,
      parent: false,
      content:
        'dkjkjf;akjsd;flkja;sdkj;lkjd;lfkja;lskdjf lkasjdf types beautifully and efficiently.',
      floor: `1`,

      clicked: false,
    },
  ]
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
      clicked: false,
    })
  }
  const [list, setList] = useState(listData)

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
      renderItem={(item) => (
        <li
          className={classes.commentRoot}
          onClick={() => parentCommentClickHandler(item.id)}
        >
          <CommentTemplate
            id={item.id}
            content={item.content}
            clicked={item.clicked}
            parent={true}
          >
            {item.clicked ? (
              <>
                <CommentTemplate
                  id={item.id}
                  content="fsjd;flkja;lksdjf"
                  clicked={item.clicked}
                  parent={false}
                />
                <CommentTemplate
                  id={item.id}
                  content="fsjd;flkja;lksdjf"
                  clicked={item.clicked}
                  parent={false}
                />
              </>
            ) : null}
          </CommentTemplate>
        </li>
      )}
    />
  )
}

export default CommentList
