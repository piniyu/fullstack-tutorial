import React, { Fragment } from 'react'
import { Router, RouteComponentProps, Redirect } from '@reach/router'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
// import { PageContainer, Pane } from '../components/layout'
import AppLayout from '../pages/AppLayout/appLayout'
import { BoardPage } from './board'
import { PostThreadPage } from './postThread'
import { SubmitPage } from './submit'
import { SymbolPage } from './symbol'
import { ProtectedRoute, Login, AutoLogin } from './login'
import { Ticker } from './ticker'
import { EventPage } from './event'
import { StackPage } from './stack'
import { StagePage } from './stage'
import { CreditPage } from './credit'
import { CreatePollPage } from './createPoll'
import { TagPage } from './tag'
import { ComparePage } from './compare'
// import { BlockPage } from './block'

interface NotFoundProps extends RouteComponentProps {}

const NotFound: React.FC<NotFoundProps> = () => {
  return <h1>Page not found</h1>
}

export function Pages() {
  useQuery<QT.myPostLikes>(queries.MY_POST_LIKES)
  useQuery<QT.myVotes>(queries.MY_VOTES)
  useQuery<QT.myCommentLikes>(queries.MY_COMMENT_LIKES)
  const { data, loading, refetch } = useQuery<QT.me>(queries.ME)

  const isLoggedIn = !!data?.me

  if (loading) return null

  return (
    <>
      {/* <AutoLogin /> */}
      {/* {!isLoggedIn && <Redirect from="" to="/login" noThrow />} */}

      {/* <Router primary={false} component={Fragment}> */}
      {/* <BlockPage path="block" /> */}

      {/* <SubmitPage path="submit" /> */}

      {/* <ProtectedRoute path="submit" isLoggedIn={isLoggedIn} as={<SubmitPage />} /> */}

      {/* <PostThreadPage path="post/:id" me={data?.me} /> */}

      {/* <PostThreadPage path="post/:id" /> */}

      <AppLayout />

      {/* <PageContainer path="/" isLoggedIn={isLoggedIn}>
          <BoardPage path="/" me={data?.me} />

          <StagePage path="/" me={data?.me} />

          <SymbolPage path="symbol/:name" />

          <Ticker path="ticker" />

          <EventPage path="event/:name" />
          <EventPage path="event" />
          <StackPage path="stack" />
          <CreditPage path="credit" />
          <CreatePollPage path="cpoll" />
          <TagPage path="tag" />
          <ComparePage path="compare" />

          <ProtectedRoute as={Feed} isLoggedIn={isLoggedIn} default />
          <Pane left={<Board me={data?.me} />} right={<BoardRightPane />} default />

          <Login path="login" />

          <NotFound default />
        </PageContainer> */}

      {/* <Pane path="/" left={<Feeds />} right={undefined} /> */}
      {/* <EventPage path="event/:name" /> */}
      {/* <CommitCreate path="commit/new" /> */}
      {/* <Ticker path="ticker" /> */}
      {/* <Pane path="feeds" left={Feeds} right={Tracks} /> */}
      {/* <Feeds path="feeds" />

      {/* <Launches path="/" />
        <Launch path="launch/:launchId" />
        <Cart path="cart" />｀
        <Profile path="profile" /> */}
      {/* </Router> */}
    </>
  )
}
