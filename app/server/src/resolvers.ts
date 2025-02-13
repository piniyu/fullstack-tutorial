import _, { includes } from 'lodash'
import dayjs from 'dayjs'
import { compare, hash } from 'bcryptjs'
import { sign, JsonWebTokenError } from 'jsonwebtoken'
import { GraphQLResolverMap } from 'apollo-graphql'
import { GraphQLDateTime } from 'graphql-iso-date'
// import { PostCount, Post, PostCat, PostStatus, LikeChoice, PrismaClient, CommentLike } from '@prisma/client'
import * as PA from '@prisma/client'
import { Context } from './context'
import { APP_SECRET } from './server'
import { parse } from 'path'

// function mapPostInput(post: ST.PostInput) {
//   let content
//   switch (post.cat) {
//     case PostCat.IDEA:
//     case PostCat.ASK:
//       content = { text: post.contentText }
//       break
//     case PostCat.LINK:
//       content = {
//         text: post.contentText,
//         link: post.contentLink,
//       }
//       break
//   }
//   return { ...post, content }
// }

// function parsePostCount(count: PostCount): ST.PostCount {
//   if (!count.poll)
//     return {
//       ...count,
//       id: count.id.toString(),
//       poll: undefined,
//     }
//   const poll = JSON.parse(count.poll) as ST.PollCount
//   delete count.poll
//   return {
//     ...count,
//     id: count.id.toString(),
//     poll,
//   }
// }

// function parsePost(post: Post & { count: PostCount, symbols: Symbol[] }) {
//   const body = JSON.parse(post.body)
//   console.log(body)
//   delete post.body
//   return {
//     ...post,
//     bodyText: body.bodyText,
//     bodyPoll: body.bodyPoll,
//     bodyLink: body.bodyLink,
//     count: parsePostCount(post.count)
//   }
// }
type Like = PA.PostLike | PA.CommentLike | PA.PollLike

function deltaLike(like: Like, oldLike?: Like) {
  let dUps = 0, dDowns = 0

  if (oldLike) {
    switch (oldLike.choice) {
      case PA.LikeChoice.DOWN:
        dDowns -= 1
        break
      case PA.LikeChoice.UP:
        dUps -= 1
        break
    }
  }
  switch (like.choice) {
    case PA.LikeChoice.DOWN:
      dDowns += 1
      break
    case PA.LikeChoice.UP:
      dUps += 1
      break
  }

  return { dDowns, dUps }
}

export const resolvers: GraphQLResolverMap<Context> = {
  DateTime: GraphQLDateTime, // custom scalar
  Query: {
    roboPolls: async (parent, { symbolName }, { prisma }) => {
      const maxDate = dayjs().startOf("d").subtract(7, "d")

      // TODO: 應該要經過「挑選」，只挑重要的出來
      const polls = await prisma.poll.findMany({
        take: 100,
        where: {
          createdAt: { gte: maxDate.toDate() },
          symbols: symbolId ? { some: { id: parseInt(symbolId) } } : undefined,
        },
        orderBy: { createdAt: "desc" },
        include: {
          symbols: true,
          count: true,
          choices: true,
          posts: { include: { count: true } },
        },
        cursor: afterId ? { id: parseInt(afterId) } : undefined,
      })

      // prisma-bug-hack：假如傳回來的post-id與afterId相同，代表已經沒有更多post
      if (polls.length === 1 && polls[0].id === parseInt(afterId))
        return []
      return polls
    },

    latestPolls: async (parent, { symbolId, afterId }, { prisma }) => {
      const maxDate = dayjs().startOf("d").subtract(7, "d")

      // TODO: 應該要經過「挑選」，只挑重要的出來
      const polls = await prisma.poll.findMany({
        take: 100,
        where: {
          createdAt: { gte: maxDate.toDate() },
          symbols: symbolId ? { some: { id: parseInt(symbolId) } } : undefined,
        },
        orderBy: { createdAt: "desc" },
        include: {
          symbols: true,
          count: true,
          choices: true,
          posts: { include: { count: true, votes: true } },
        },
        cursor: afterId ? { id: parseInt(afterId) } : undefined,
      })

      // prisma-bug-hack：假如傳回來的post-id與afterId相同，代表已經沒有更多post
      if (polls.length === 1 && polls[0].id === parseInt(afterId))
        return []
      return polls
    },

    latestPosts: async (parent, { afterId, symbolId }, { prisma }) => {
      const maxDate = dayjs().startOf("d").subtract(7, "d")

      console.log(afterId)

      // TODO: post-children應該要經過「挑選」，只挑重要的出來
      const posts = await prisma.post.findMany({
        take: 100,
        where: {
          createdAt: { gte: maxDate.toDate() },
          symbols: symbolId ? { some: { id: parseInt(symbolId) } } : undefined,
        },
        orderBy: { createdAt: "desc" },
        include: {
          symbols: true,
          count: true,
          poll: { include: { count: true } },
        },
        cursor: afterId ? { id: parseInt(afterId) } : undefined,
      })

      // prisma-bug-hack：假如傳回來的post-id與afterId相同，代表已經沒有更多post
      if (posts.length === 1 && posts[0].id === parseInt(afterId))
        return []

      return posts
      // return _.shuffle(posts)
      // return _.shuffle(posts).map(p => parsePostContent(p))
      // return posts.map(p => parsePost(p))
    },

    repliedPosts: (parent, { parentId, afterId }, { prisma }) => {
      // const maxDate = dayjs().startOf("d").subtract(7, "d")

      // await prisma.postCount.findMany({
      //   where: {
      //     post: {
      //       parentId: parseInt(parentId),
      //       cat: PostCat.REPLY
      //     }
      //   },
      //   orderBy: { nUps: "desc" },
      //   include: {
      //     post: true
      //   }
      // })

      // TODO: `orderBy`要按照按讚數來排序
      return prisma.post.findMany({
        take: 30,
        where: {
          // createdAt: { gte: maxDate.toDate() },
          cat: PostCat.REPLY,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          symbols: true,
          count: true,
          poll: { include: { count: true } },
        },
        // cursor: { id: afterId }
      })
    },

    myPosts: (parent, args, { prisma, req }) => {
      // TODO: @me: 發文、按讚的、投過票的、comment的
      return prisma.post.findMany({
        take: 30,
        orderBy: { createdAt: "desc" },
        where: { userId: req.userId },
        include: {
          symbols: true,
          count: true,
          poll: {
            include: { count: true }
          },
        },
      })
    },

    // symbolPosts: (parent, { symbolId, after = null }, { prisma }) => {
    //   // return prisma.symbol.findOne({ where: { id: symbolId } })
    //   //   .posts({ first: 30 })
    //   return prisma.post.findMany({ where: { symbols: { every: { id: symbolId } } } })
    // },

    risingPosts: (parent, args, ctx) => {
      return []
    },

    trendPosts: (parent, args, ctx) => {
      return []
    },


    post: (parent, { id }, { prisma }) => {
      return prisma.post.findOne({
        where: { id: parseInt(id) },
        include: {
          symbols: true,
          count: true,
          poll: { include: { count: true } },
          // parent: { select: { id: true, cat: true, title: true } },
          // children: { select: { id: true, cat: true, title: true } }
        },
      })
    },

    comments: (parent, { postId, after }, { prisma }) => {
      return prisma.comment.findMany({
        where: { postId: parseInt(postId) },
        include: { count: true },
        take: 20
      })
    },

    symbol: (parent, { name }, { prisma }) => {
      return prisma.symbol.findOne({ where: { name } })
    },

    ticks: (parent, { symbolId, afterId }, { prisma }) => {
      return prisma.tick.findMany({
        take: 100,
        where: { symbolId },
        orderBy: { at: "desc" },
        cursor: { id: afterId }
      })
    },

    me: (parent, args, { prisma, req }) => {
      // throw Error("what ever error")
      return prisma.user.findOne({ where: { id: req.userId } })
    },

    myPostLikes: (parent, { after }, { prisma, req }) => {
      return prisma.postLike.findMany({ where: { userId: req.userId }, take: 50 })
    },

    myCommentLikes: (parent, { after }, { prisma, req }) => {
      return prisma.commentLike.findMany({ where: { userId: req.userId }, take: 50 })
    },

    myVotes: (parent, { after }, { prisma, req }) => {
      return prisma.vote.findMany({
        take: 50,
        where: { userId: req.userId },
      })
    },

    myFollows: (parent, { after }, { prisma, req }) => {
      return prisma.follow.findMany({ where: { userId: req.userId, followed: true } })
    },
    // myCommits: (parent, { after }, { prisma, req }) => {
    //   return prisma.commit.findMany({ where: { userId: req.userId }, take: 30 })
    // },
    // myCommitReviews: (parent, { after }, { prisma, req }) => {
    //   return prisma.commitReview.findMany({ where: { userId: req.userId }, take: 30 })
    // },
    // fetchPage: (parent, { url }, { prisma, req }) => {
    //   // grpc call to nlp-app
    //   return null
    // },
    tagHints: (parent, { term }, { prisma }) => {
      return null
    },
    tickerHints: (parent, { term }, { prisma }) => {
      return null
    },
    eventHints: (parent, { term }, { prisma }) => {
      return null
    },
  },
  Mutation: {

    signup: async (parent, { email, password }, { prisma, res }) => {
      res.clearCookie('token')
      const hashedPassword = await hash(password, 10)
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          profile: { create: {} },
          dailyProfile: { create: {} },
        },
      })
      return {
        token: sign({ userId: user.id }, APP_SECRET),
        user,
      }
    },

    login: async (parent, { email, password }, { prisma, res }) => {
      const user = await prisma.user.findOne({
        where: { email },
      })
      if (!user) throw new Error('Could not find a match for username and password')

      const valid = await compare(password, user.password)
      if (!valid) throw new Error('Could not find a match for username and password')

      const token = sign({ userId: user.id }, APP_SECRET)
      res.cookie('token', `Bearer ${token}`, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        // secure: true,  // https only
      })
      console.log(`User ${user.email} login succeess`)
      return { token, user }
    },

    logout: (parent, { email, password }, { prisma, res }) => {
      res.clearCookie('token')
      return true
    },

    createPost: async function (parent, { data, pollId }, { prisma, req }) {
      return prisma.post.create({
        data: {
          cat: data.cat,
          text: data.text,
          user: { connect: { id: req.userId } },
          poll: pollId ? { connect: { id: parseInt(pollId) } } : undefined,
          symbols: { connect: (data.symbolIds as string[]).map(x => ({ name: x })) },
          count: { create: {} },
        },
        include: {
          count: true,
          symbols: true,
          votes: true,
          // poll: true,
        },
      })
    },

    // updatePost: (parent, { id, data }, { prisma, req }) => {
    //   return prisma.post.update({ userId: req.userId, ...data })
    // },

    createVotePost: async function (parent, { pollId, choiceId, data }, { prisma, req }) {
      return prisma.post.create({
        data: {
          cat: data.cat,
          text: data.text,
          user: { connect: { id: req.userId } },
          poll: pollId ? { connect: { id: parseInt(pollId) } } : undefined,
          symbols: { connect: (data.symbolIds as string[]).map(x => ({ name: x })) },
          count: { create: {} },
          votes: {
            create: [
              {
                user: { connect: { id: req.userId } },
                poll: { connect: { id: parseInt(pollId) } },
                choice: { connect: { id: parseInt(choiceId) } }
              }
            ]
          }
        },
        include: {
          count: true,
          symbols: true,
          votes: true,
          // poll: true,
        },
      })
    },



    createPoll: async (parent, { data }, { prisma, req }) => {
      const start = dayjs().startOf('d')
      const end = start.add(data.nDays, 'd')

      return prisma.poll.create({
        data: {
          cat: data.cat,
          title: data.title,
          text: data.text,
          start: start.toDate(),
          end: end.toDate(),
          nDays: data.nDays,
          choices: {
            create: data.choices.map((e: String) => (
              {
                text: e,
                user: { connect: { id: req.userId } }
              }
            ))
          },
          user: { connect: { id: req.userId } },
          count: { create: {} },
          symbols: { connect: (data.symbolIds as string[]).map(e => ({ name: e })) },
        },
        include: {
          choices: true,
          symbols: true,
          count: true,
          posts: { include: { count: true } },
        },
      })
    },

    createComment: async (parent, { postId, data }, { prisma, req }) => {
      const post = await prisma.post.findOne({
        where: { id: parseInt(postId) },
        include: { count: true }
      })
      if (post === null) throw new Error("cannot find post")
      // if (post.status !== PostStatus.ACTIVE)
      //   throw new Error("post is not active")
      await prisma.postCount.update({
        data: { nComments: post.count.nComments + 1 },
        where: { postId: post.id }
      })
      return prisma.comment.create({
        data: {
          content: data.content,
          user: { connect: { id: req.userId } },
          post: { connect: { id: post.id } },
          count: { create: {} }
        },
        include: { count: true }
      })
    },

    updateComment: (parent, { id, data }, { prisma, req }) => {
      return prisma.comment.update({
        data: { content: data.cotent },
        where: { id: parseInt(id) }
      })
    },

    createPostLike: async (parent, { postId, data }, { prisma, req }) => {
      const like = await prisma.postLike.create({
        data: {
          choice: data.choice,
          user: { connect: { id: req.userId } },
          post: { connect: { id: parseInt(postId) } },
        }
      })
      const count = await prisma.postCount.findOne({ where: { postId: like.postId } })
      if (count === null) throw new Error('Something went wrong')

      const delta = deltaLike(like)

      const updatedCount = await prisma.postCount.update({
        data: {
          nUps: count.nUps + delta.dUps,
          nDowns: count.nDowns + delta.dDowns,
        },
        where: { postId: like.postId }
      })
      return { like, count: updatedCount }
    },

    updatePostLike: async (parent, { id, data }, { prisma, req }) => {
      const oldLike = await prisma.postLike.findOne({
        where: { id: parseInt(id) }
      })
      if (oldLike === null || data.choice === oldLike.choice)
        throw new Error('No matched data')

      const like = await prisma.postLike.update({
        data: { choice: data.choice },
        where: { id: oldLike.id }
      })

      const delta = deltaLike(like, oldLike)

      const count = await prisma.postCount.findOne({ where: { postId: like.postId } })
      if (count === null) throw new Error('Something went wrong')

      const updatedCount = await prisma.postCount.update({
        data: {
          nUps: count.nUps + delta.dUps,
          nDowns: count.nDowns + delta.dDowns,
        },
        where: { postId: like.postId }
      })
      return { like, count: updatedCount }
    },

    createPollLike: async (parent, { pollId, data }, { prisma, req }) => {
      const like = await prisma.pollLike.create({
        data: {
          choice: data.choice,
          user: { connect: { id: req.userId } },
          poll: { connect: { id: parseInt(pollId) } },
        }
      })
      const count = await prisma.pollCount.findOne({ where: { pollId: like.pollId } })
      if (count === null) throw new Error('Something went wrong')

      const delta = deltaLike(like)
      const updatedCount = await prisma.pollCount.update({
        data: {
          nUps: count.nUps + delta.dUps,
          nDowns: count.nDowns + delta.dDowns,
        },
        where: { pollId: like.pollId }
      })
      return { like, count: updatedCount }
    },

    updatePollLike: async (parent, { id, data }, { prisma, req }) => {
      const oldLike = await prisma.pollLike.findOne({
        where: { id: parseInt(id) }
      })
      if (oldLike === null || data.choice === oldLike.choice)
        throw new Error('No matched data')

      const like = await prisma.pollLike.update({
        data: { choice: data.choice },
        where: { id: oldLike.id }
      })

      const delta = deltaLike(like, oldLike)
      const count = await prisma.pollCount.findOne({ where: { pollId: like.pollId } })
      if (count === null) throw new Error('Something went wrong')

      const updatedCount = await prisma.pollCount.update({
        data: {
          nUps: count.nUps + delta.dUps,
          nDowns: count.nDowns + delta.dDowns,
        },
        where: { pollId: like.pollId }
      })
      return { like, count: updatedCount }
    },

    createCommentLike: async (parent, { commentId, data }, { prisma, req }) => {
      const like = await prisma.commentLike.create({
        data: {
          choice: data.choice,
          user: { connect: { id: req.userId } },
          comment: { connect: { id: parseInt(commentId) } },
        }
      })
      const count = await prisma.commentCount.findOne({ where: { commentId: like.commentId } })
      if (count === null) throw new Error('Something went wrong')

      const delta = deltaLike(like)
      const updatedCount = await prisma.commentCount.update({
        data: {
          nUps: count.nUps + delta.dUps,
          nDowns: count.nDowns + delta.dDowns,
        },
        where: { commentId: like.commentId }
      })
      return { like, count: updatedCount }
    },

    updateCommentLike: async (parent, { id, data }, { prisma, req }) => {
      const oldLike = await prisma.commentLike.findOne({
        where: { id: parseInt(id) }
      })
      if (oldLike === null || data.choice === oldLike.choice)
        throw new Error('No matched data')

      const like = await prisma.commentLike.update({
        data: { choice: data.choice },
        where: { id: oldLike.id }
      })

      const delta = deltaLike(like, oldLike)
      const count = await prisma.commentCount.findOne({ where: { commentId: like.commentId } })
      if (count === null) throw new Error('Something went wrong')

      const updatedCount = await prisma.commentCount.update({
        data: {
          nUps: count.nUps + delta.dUps,
          nDowns: count.nDowns + delta.dDowns,
        },
        where: { commentId: like.commentId }
      })

      return { like, count: updatedCount }
    },

    createVote: (parent, { pollId, choiceId, postId }, { prisma, req }) => {
      return prisma.vote.create({
        data: {
          user: { connect: { id: req.userId } },
          poll: { connect: { id: parseInt(pollId) } },
          choice: { connect: { id: parseInt(choiceId) } },
          post: postId ? { connect: { id: parseInt(postId) } } : undefined,
        }
      })
    },

    // updatePollVote: (parent, { pollId, data }, { prisma, req }) => {
    //   return prisma.pollVote.update({ userId: req.userId, ...data })
    // },


    // ------- to be implemented ---------

    // createCommit: (parent, { data }, { prisma, req }) => {
    //   // invite random reviewers by creating commitReview
    //   return prisma.comment.create({ userId: req.userId, ...data })
    // },

    // updateCommit: (parent, { id, data }, { prisma, req }) => {
    //   return prisma.comment.create({ userId: req.userId, ...data })
    // },

    // updateCommitReview: (parent, { id, data }, { prisma, req }) => {
    //   return prisma.comment.create({ userId: req.userId, ...data })
    // },

    // applyCommitReview: (parent, { id, data }, { prisma, req }) => {
    //   return prisma.comment.create({ userId: req.userId, ...data })
    // },

    // createFollow: (parent, { symbolId, data }, { prisma, req }) => {
    //   return prisma.comment.create({ userId: req.userId, ...data })
    // },

    // updateFollow: (parent, { symbolId, data }, { prisma, req }) => {
    //   return prisma.comment.create({ userId: req.userId, ...data })
    // },
  },
}
