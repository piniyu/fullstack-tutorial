import React from 'react'
import { List, Avatar, Space } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'
import { updateImportEqualsDeclaration } from 'typescript'
import classes from './commentList.module.scss'

interface listData {
  href: string
  //   title: string
  //   description: string
  content: string
}

const listData: Array<listData> = []
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    // title: `ant design part ${i}`,
    // description:
    //   'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'dkjfa;lksdj;flkaj;lksdj;lfkja;dslkjf;akjsd;flkja;sdkj;lkjd;lfkja;lskdjf lkasjdf types beautifully and efficiently.',
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

const CommentList = () => (
  <List
    className={classes.List}
    size="large"
    header={`${listData.length} 條討論`}
    pagination={{
      onChange: (page) => {
        console.log(page)
      },
      pageSize: 3,
    }}
    dataSource={listData}
    // footer={
    //   //   <div>
    //   //     <b>ant design</b> footer part
    //   //   </div>
    // }
    renderItem={(item) => (
      <List.Item
        // key={item.title}
        className={classes.iconText}
        actions={[
          <IconText
            icon={StarOutlined}
            text="156"
            key="list-vertical-star-o"
          />,
          <IconText
            icon={LikeOutlined}
            text="156"
            key="list-vertical-like-o"
          />,
          <IconText
            icon={MessageOutlined}
            text="2"
            key="list-vertical-message"
          />,
        ]}
        // extra={
        //   <img
        //     width={272}
        //     alt="logo"
        //     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        //   />
        // }
      >
        <span className={classes.ListContent}>{item.content}</span>
      </List.Item>
    )}
  />
)

export default CommentList
