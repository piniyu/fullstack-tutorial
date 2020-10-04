import React from 'react'
import ReactDOM from 'react-dom'
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client'

import { typeDefs } from './store/resolvers'
import { Pages } from './pages'
import Templates from './templates'
import { cache } from './cache'
import './index.less'

// const cache = new InMemoryCache({
//   dataIdFromObject: (o: any) => {
//     switch (o.__typename) {
//       case 'Like': {
//         if (o.feedId) return `Like:Feed:${o.feedId}`
//         else if (o.commentId) return `Like:Comment:${o.commentId}`
//         else if (o.postId) return `Like:Post:${o.postId}`
//         else if (o.pollId) return `Like:Poll:${o.pollId}`
//         else return null
//       }
//       default:
//         return defaultDataIdFromObject(o)
//     }
//   },
// })

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
  headers: {
    // authorization: localStorage.getItem('token') || '',
    'client-name': 'Tsubane[web]',
    'client-version': '0.1.0',
  },
  // TODO: 需設為'include'，否則cookies不會被儲存（不確定正式時是否需要）
  // Ref 1: https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials
  // Ref 2: https://github.com/apollographql/apollo-client/issues/4190
  credentials: 'include',
  // credentials: "same-origin",
  resolvers: {},
  // resolvers,
  typeDefs,
})

// cache.writeData({
//   data: {
//     // me: null,
//     // isLoggedIn: !!localStorage.getItem('token'),
//     // isLoggedIn: false,
//     cartItems: [],
//     isClicked: false,
//     // myPostLikes: [],
//     myLikes: [
//       {
//         __typename: 'Like',
//         id: 'id-id-id',
//         feedId: '1234',
//         postId: null,
//         pollId: null,
//         commentId: null,
//         choice: 1,
//         updatedAt: '12-12-2012',
//       },
//       {
//         __typename: 'Like',
//         id: 'id-id-id2',
//         feedId: null,
//         postId: null,
//         pollId: null,
//         commentId: '1234',
//         choice: 1,
//         updatedAt: '12-12-2012',
//       },
//     ],
//   },
// })

ReactDOM.render(
  <ApolloProvider client={client}>
    {/* <Templates /> */}
    <Pages />
  </ApolloProvider>,
  document.getElementById('root'),
)
