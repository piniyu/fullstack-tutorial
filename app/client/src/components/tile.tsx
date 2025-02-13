import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Link } from '@reach/router'
import { Button, Card, Divider, Typography, Space, Form, Input, List } from 'antd'
import { CoffeeOutlined, SwapLeftOutlined, SwapRightOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { CommentList } from './commentList'
import { PollChoiceRadioGroup } from './pollChoice'
import { PollFooter, PostFooter } from './tileFooter'
import { VotePostForm, NewChoicePostForm } from './postForm'

interface SymbolListProps {
  symbols: QT.pollFragment_symbols[] | null
}

const SymbolList: React.FC<SymbolListProps> = ({ symbols }) => {
  if (symbols === null) return null
  return (
    <Space>
      {
        symbols.map((e, i) =>
          <Link key={i} to={`/symbol/${encodeURIComponent(e.name)}`}>
            {/* <i><Typography.Text type="secondary">{d.name}</Typography.Text></i> */}
            <i>{e.name}</i>
          </Link>
        )
      }
    </Space>
  )
}

interface PostCardProps {
  // createPostLike: (variables: QT.createPostLikeVariables) => void
  // updatePostLike: (variables: QT.updatePostLikeVariables) => void
  // comments: React.StatelessComponent
  post: QT.pollFragment_posts
  me?: QT.me_me
  toLogin?: () => void
  folded?: boolean
  noHeader?: boolean
  noSpin?: boolean
  noThread?: boolean
  choice: string
}

const PostCard: React.FC<PostCardProps> = ({ post, me, toLogin, choice, folded = true, noHeader = false, noSpin = false, noThread = false }) => {
  const [commentCount, setCommentCount] = useState<number>(post.count.nComments)
  const [showComments, setShowComments] = useState<boolean>(false)

  function toAddCommentCountByOne() { setCommentCount(commentCount + 1) }

  const mePosted = me?.id === post.userId
  const edit = me?.id === post.userId
    ? <Link to={`/post/${post.id}?update`}>edit</Link>
    : null

  return (
    <>
      <Typography.Paragraph>
        {`[${choice}] ${post.text}`}
        <PostFooter {...{ post, commentCount, showComments, setShowComments, mePosted }} />
      </Typography.Paragraph>
      {/* {
        showComments &&
        <CommentList me={me} postId={post.id} toAddCommentCountByOne={toAddCommentCountByOne} />
      } */}
    </>
  )
}

interface PollProps {
  // createPostLike: (variables: QT.createPostLikeVariables) => void
  // updatePostLike: (variables: QT.updatePostLikeVariables) => void
  // comments: React.StatelessComponent
  poll: QT.pollFragment
  me?: QT.me_me
  toLogin?: () => void
  folded?: boolean
  noHeader?: boolean
  noSpin?: boolean
  noThread?: boolean
  myVotes?: QT.myVotes_myVotes[]
}

enum TailPanel {
  POSTS,
  SUBMIT,
}

function ChoicePanel({ choices }: { choices: QT.choice[] }) {
  return (
    <Space>
      {
        choices.map(e =>
          <Button key={e.id} size="small" shape="round" onClick={() => {
            // setShowComments(!showComments)
          }}>
            {e.text}
            {/* &nbsp; */}
            {/* <small><LikeOutlined />30</small> */}
          </Button>
        )
      }
    </Space>
  )
}

export const PollCard: React.FC<PollProps> = ({ poll, me, toLogin, myVotes = [], folded = true, noHeader = false, noSpin = false, noThread = false }) => {
  const [commentCount, setCommentCount] = useState<number>(poll.count.nComments)
  const [showComments, setShowComments] = useState<boolean>(false)
  const [showDetail, setShowDetail] = useState<boolean>(!folded)
  const [viewed, setViewed] = useState<boolean>(false)
  const [tailPanel, setTailPanel] = useState<TailPanel>(TailPanel.POSTS)
  const [clickedChoiceId, setClickedChoiceId] = useState<string | null>(null)

  function toAddCommentCountByOne() {
    setCommentCount(commentCount + 1)
  }

  const mePolled = me?.id === poll.userId
  const meVote = myVotes.find(e => e.pollId === poll.id)
  // const edit = me?.id === poll.userId
  //   ? <Link to={`/post/${poll.id}?update`}>edit</Link>
  //   : null

  const start = dayjs(poll.start)
  const end = dayjs(poll.end)
  const title = poll.cat === QT.PollCat.FIXED ? poll.title : `${poll.title}[開放式回答]`

  const comments = poll.posts.map(e => ({
    ...e,
    thisPollVote: e.votes.find(e => e.pollId === poll.id)
  }))


  const postsDict = Object.fromEntries<QT.pollFragment_posts[]>(
    poll.choices.map(e => {
      const posts = poll.posts.filter(f => {
        const v = f.votes.find(g => g.pollId === poll.id)
        if (v?.choiceId === e.id) return true
        else return false
      })
      return [e.id, posts]
    })
  )
  const choiceDict = Object.fromEntries(
    poll.choices.map(e => [e.id, e])
  )

  return (
    <Card>

      <Typography.Paragraph>

        <PollFooter {...{ poll, commentCount, showComments, setShowComments, mePolled }} />

        {/* <Typography.Text type="secondary">邀請您參與評審：</Typography.Text> */}
        {
          <span onClick={() => { setViewed(true); setShowDetail(!showDetail) }}>
            {
              viewed ?
                <Typography.Text>{title}&nbsp;</Typography.Text>
                :
                <Typography.Text strong>{title}&nbsp;</Typography.Text>
            }
          </span>
        }

        <SymbolList symbols={poll.symbols} />

        {
          meVote &&
          <>
            <br />
            <Typography.Text type="secondary">你已經投票</Typography.Text>
          </>
        }

        {/* <PollChoiceRadioGroup {...{ pollId: poll.id, me, poll, count: poll.count, setShowDetail }} /> */}


      </Typography.Paragraph>


      {/* {
        showComments &&
        <Typography.Paragraph>
          {poll.text}
        </Typography.Paragraph>
      } */}

      <Typography.Paragraph>
        <Space>
          {
            poll.choices.map(e =>
              <Button key={e.id} data-id={e.id} size="small" shape="round"
                type={e.id === clickedChoiceId ? "primary" : "default"}
                onClick={(e) => {
                  setShowComments(true)
                  setShowDetail(true)
                  setClickedChoiceId(e.currentTarget.getAttribute('data-id'))
                }}
              >
                {e.text}&nbsp;<small>?%</small>
                {/* &nbsp; <small><LikeOutlined />30</small> */}
              </Button>
            )
          }
          <Button type="link" size="small">新增選項</Button>
          {/* <Button type="link" size="small">所有</Button> */}
        </Space>
      </Typography.Paragraph>


      {/* {
        showDetail &&
        <Typography.Paragraph>
          <Typography.Text type="secondary">
            預測日：{end.format('l')}
            <br />投票期間：{start.format('l')} - {end.format('l')}
            <br />判定方式：投票人評審小組
          </Typography.Text>
        </Typography.Paragraph>
      } */}

      {
        // showComments && clickedChoiceId && postsByChoice[clickedChoiceId].length > 0 &&
        showComments && clickedChoiceId &&
        <>
          <List
            bordered
            size="small"
            dataSource={postsDict[clickedChoiceId]}
            locale={{ emptyText: `[${choiceDict[clickedChoiceId].text}] 無人回覆` }}
            renderItem={e => {
              return (
                <List.Item>
                  <PostCard post={e} me={me} choice={choiceDict[clickedChoiceId].text} />
                </List.Item>
              )
            }}
          />
          <br />
        </>

        // <>
        //   <Divider />
        //   {
        //     poll.posts && poll.posts.length > 0 ?
        //       poll.posts.map((e, i) => <PostCard key={i} post={e} me={me} />)
        //       :
        //       "暫無回應"
        //   }
        // </>
        // <CommentList me={me} postId={poll.id} toAddCommentCountByOne={toAddCommentCountByOne} />
      }


      {
        showComments && clickedChoiceId && !meVote &&
        <>
          <Card size="small">
            <VotePostForm pollId={poll.id} choice={choiceDict[clickedChoiceId]} />
            {/* <NewChoicePostForm /> */}
          </Card>
        </>
      }



    </Card>
  )
}


export const Post: React.FC<PostCardProps> = ({ post, me, toLogin, folded = false, noHeader = false }) => {
  switch (post.cat) {
    case QT.PostCat.LINK:
      // return <PostCard title={<a target="_new" href="link">title<a />} />
      return null
    case QT.PostCat.REPLY:
      return <PostCard post={post} me={me} toLogin={toLogin} folded={folded} noHeader={noHeader} noThread noSpin choice="choice" />
  }
}
