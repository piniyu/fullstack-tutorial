import React, { Fragment } from 'react'
import { Router, RouteComponentProps, Redirect } from '@reach/router'
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { PageContainer, Pane } from '../components/layout'
import { BoardPage } from './board'
import { PostThreadPage } from './postThread'
import { SubmitPage } from './submit'
import { SymbolPage } from './symbol'
import { ProtectedRoute, Login, AutoLogin } from './login'
import { Ticker } from './Ticker'
import { EventPage } from './Event'


interface NotFoundProps extends RouteComponentProps { }

const NotFound: React.FC<NotFoundProps> = () => {
  return <h1>Page not found</h1>
}

export function Pages() {
  useQuery<QT.myPostLikes>(queries.MY_POST_LIKES)
  useQuery<QT.myPollVotes>(queries.MY_POLL_VOTES)
  useQuery<QT.myCommentLikes>(queries.MY_COMMENT_LIKES)
  const { data, loading, refetch } = useQuery<QT.me>(queries.ME)

  const isLoggedIn = !!data?.me

  if (loading) return null

  return (
    <>
      {/* <AutoLogin /> */}
      {!isLoggedIn && <Redirect from="" to="/login" noThrow />}

      <Router primary={false} component={Fragment}>

        <SubmitPage path="submit" />

        {/* <ProtectedRoute path="submit" isLoggedIn={isLoggedIn} as={<SubmitPage />} /> */}

        <PostThreadPage path="post/:id" me={data?.me} />

        {/* <PostThreadPage path="post/:id" /> */}

        <PageContainer path="/" isLoggedIn={isLoggedIn}>

          <BoardPage path="/" me={data?.me} />

          <SymbolPage path="symbol/:name" />

          <Ticker path="ticker" />

          <EventPage path="event/:name" />

          {/* <ProtectedRoute as={Feed} isLoggedIn={isLoggedIn} default /> */}
          {/* <Pane left={<Board me={data?.me} />} right={<BoardRightPane />} default /> */}

          <Login path="login" />

          <NotFound default />

        </PageContainer>

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
      </Router>
    </>

  )
}

