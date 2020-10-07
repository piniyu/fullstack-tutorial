import gql from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    # blockId(path: string): string!
    block(id: ID, path: String): Block!
    
    # 會有找不到的情況，需要注意sanitize(?)
    # searchBlock(symbolName: String): Block!

    comments(blockId: ID!, afterId: ID): [Comment!]!    
    replies(commentId: ID!, afterId: ID): [Reply!]!

    ticks(symbolId: ID!, after: String): [Tick!]!

    myCommentLikes(after: String): [CommentLike!]!
    myReplyLikes(after: String): [ReplyLike!]!
    myVotes(after: String): [Vote!]!

    me: User!

    # ---------

    roboPolls(symbolName: String): [Poll!]!
    latestPolls(symbolId: ID, afterId: String): [Poll!]!
    pollHints(symbols: [String], title: String): [Poll!]!
    poll(id: ID!): Poll!

    myPollLikes(afterId: ID): [PollLike!]!

    post(id: ID!): Post!

    latestPosts(symbolId: ID, afterId: String): [Post!]!
    repliedPosts(parentId: ID!, afterId: String): [Post!]!
    risingPosts(afterId: String): [Post!]!
    trendPosts(afterId: String): [Post!]!

    symbol(name: String!): Symbol!
    
    # event(id: ID!): Event!
    # ticker(id: ID, name: String): Ticker!
    commit(id: ID!): Commit!
    commits(symbolId: ID!, after: String): [Commit!]!
    
    # myComments(after: String): [ID!]!
    # myPosts(afterId: String): [Post!]!

    # myPostLikes(after: String): [PostLike!]!
    # myCommentLikes(after: String): [CommentLike!]!

    myFollows: [Follow!]!
    myCommits(after: String): [ID!]!
    myCommitReviews(after: String): [CommitReview!]!
    # myWaitedCommitReviews: [CommitReview!]!

    tagHints(term: String): [String!]!
    tickerHints(term: String): [String!]!
    eventHints(term: String): [String!]!

    ### upcoming ###
    # fetchPage(url: String!): Page!

    # myBets: [Bet!]!
    # myNotices: [Notice!]!
    # mySignals: [Signal]
    # groups: [Group]
    # myGroups: [Group]
    # groupPosts(groupId: ID): [Post]
  }

  type Mutation {    
    createComment(blockId: ID!, data: CommentInput!): Comment!
    # updateComment(id: ID!, data: CommentInput!): Comment!

    createReply(replyId: ID!, data: ReplyInput!): Reply!
    # updateComment(id: ID!, data: CommentInput!): Comment!

    createVote(pollId: ID!, choiceIdx: Int!): Vote!

    createCommentLike(commentId: ID!, data: LikeInput!): CommentLikeResonse!
    updateCommentLike(id: ID!, data: LikeInput!): CommentLikeResonse!

    signup(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logout: Boolean!

    # --- NEXT ---

    createPoll(data: PollInput!): Poll!
    createPollLike(pollId: ID!, data: LikeInput!): PollLikeResonse!
    updatePollLike(id: ID!, data: LikeInput!): PollLikeResonse!

    # createVotePost(pollId: ID!, choiceId: ID!, data: PostInput!): Post!
    # createPost(data: PostInput!, pollId: ID): Post!
    # updatePost(id: ID!, data: PostInput!): Post!
    # createPostLike(postId: ID!, data: LikeInput!): PostLikeResonse!
    # updatePostLike(id: ID!, data: LikeInput!): PostLikeResonse!

    # 允許更新postVote？
    # updatePollVote(pollId: ID!, data: VoteInput!): PollVote!

    createCommit(data: CommitInput!): Commit!
    updateCommit(id: ID!, data: CommitInput!): Commit!
    # applyCommitReview(commitId: ID!): ApplyCommitReviewResult!
    applyCommitReview(commitId: ID!): CommitReview!
    updateCommitReview(id: ID!, data: CommitReviewInput!): CommitReview!

    createFollow(symbolId: ID!, data: FollowInput!): Follow!
    updateFollow(symbolId: ID!, data: FollowInput!): Follow!

    ### upcoming ###
    
    # uploadImg(): Img
    # createBet(): Bet
    # upsertBet(data: BetInput): Bet
    # createGroup(data: GroupInput): Group
    # updateGroup(data: GroupInput): Group
    # joinGroup(id: ID): Boolean
    # leaveGroup(id: ID): Boolean
    # inviteJoin(groupId: ID, criteria: String): Boolean
  }

  # type Choice {
  #   id: ID!
  #   userId: ID!
  #   text: String!
  # }

  type Poll {
    id: ID!
    commentId: ID!
    # userId: ID!
    # cat: PollCat!
    # status: PollStatus!
    choices: [String!]!
    nVotes: [Int!]!
    # title: String!
    # text: String
    # start: DateTime!
    # end: DateTime!
    # nDays: Int!
    # minVotes: Int!
    # nDaysJudge: Int!
    # minJudgments: Int!
    # count: PollCount!
    # posts: [Post!]!
    createdAt: DateTime!
  }

  type Vote {
    id: ID!
    pollId: ID!
    choiceIdx: Int!
    # reward: Float
    # createdAt: DateTime!
    # updatedAt: DateTime!
  }

  type ReplyCount {
    id: ID!
    nViews: Int!
    nUps: Int!
    nDowns: Int!
    # nComments: Int!
    # updatedAt: DateTime!
  }

  type Reply {
    id: ID!
    userId: ID!
    isSpot: Boolean
    text: String
    count: ReplyCount!
    updatedAt: DateTime!
  }

  type CommentCount {
    id: ID!
    nViews: Int!
    nUps: Int!
    nDowns: Int!
    # nComments: Int!
    # updatedAt: DateTime!
  }

  type Comment {
    id: ID!
    userId: ID!
    symbols: [Symbol!]
    cat: CommentCat!
    isSpot: Boolean
    text: String
    count: CommentCount!
    replies: [Reply!]
    # createdAt: DateTime!
    updatedAt: DateTime!
    poll: Poll
  }

  type Tick {
    id: ID!
    symbolId: ID!
    value: Float!
    at: DateTime!
  }
  
  type BlockBody {
    blocks: [Block]
    text: String
    ticks: [Tick!]
    table: [Int]
    chart: [Int]
  }

  type BlockProperties {
    name: String
    longName: String
    path: String
    symbol: String
    canComment: Boolean
    canOpenAsPage: Boolean
    
    # prop-comment
    commentIntro: Comment
    commentSymbols: Comment
  }

  type Block {
    id: ID!
    tempalte: String
    props: BlockProperties!
    body: BlockBody!
    propComments: [Comment!]
    comments: [Comment!]
  }

  type CommentLike {
    id: ID!
    commentId: ID!
    choice: LikeChoice!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type ReplyLike {
    id: ID!
    replyId: ID!
    choice: LikeChoice!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # type CommentCount {
  #   id: ID!
  #   # nViews: Int!
  #   nUps: Int!
  #   nDowns: Int!
  #   # updatedAt: DateTime!
  # }

  type CommentLikeResonse {
    like: CommentLike!
    count: CommentCount!
  }

  enum CommentCat {
    TEXT
    POLL
    PROP
  }

  enum CommentStatus {
    ACTIVE
    LOCK
    DELETED
    REPORTED
    ARCHIVED
  }

  enum LikeChoice {
    UP
    DOWN
    NEUTRAL
  }

  input ReplyInput {
    text: String!
  }

  input PollInput {
    # cat: PollCat!
    choices: [String!]!
  }

  input CommentInput {
    # status: PostStatus
    # content: String!
    # symbolIds: [ID!]!
    cat: CommentCat!
    symbols: [String!]!
    text: String!
    poll: PollInput
  }

  input LikeInput {
    choice: LikeChoice!
  }

  # --- NEXT ---
  
  type Post {
    id: ID!
    userId: ID!
    cat: PostCat!
    status: PostStatus!
    text: String!
    symbols: [Symbol!]
    # count: PostCount!
    createdAt: DateTime
    updatedAt: DateTime
    votes: [Vote!]!
    # voteCommits: [VoteCommit!]!
  }

  type PollCount {
    id: ID!
    nViews: Int!
    nUps: Int!
    nDowns: Int!
    nComments: Int!
    nVotes: [Int!]!
    # nJudgements: [Int]
    # judgeStartedAt: DateTime
    # judgeEndedAt: DateTime
    # verdictValid: Boolean
    # verdictChoice: Int
    # updatedAt: DateTime!
    # failedMsg: String
  }

  type PollLike {
    id: ID!
    pollId: ID!
    choice: LikeChoice!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type PollLikeResonse {
    like: PollLike!
    count: PollCount!
  }

  input VoteInput {
    choiceId: ID!
  }

  type PollJudgment {
    id: ID!
    pollId: ID!
    choice: Int!
    comment: Comment!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input PollJudgmentInput {
    choice: Int!
  }


  # type Page {
  #   id: ID!
  #   # null if not existed
  #   createdPostId: ID
  #   # symbols: [String!]
  #   suggestTitle: String
  #   suggestTags: [String!]!
  #   suggestEvents: [String!]!
  #   suggestTickers: [String!]!
  #   # null if not created
  #   createdEvent: Symbol
  # }

  # type EventContent {
  #   tags: [String!]!
  #   tickers: [String!]!
  #   events: [String!]!
  #   equalEvents: [String!]!
  # }


  type AuthPayload {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    email: String!
    # profileImage: String
    # trips: [Launch]!
  }

    # type PostLink {
  #   url: String!
  # }

  type Symbol {
    id: ID!
    name: String!
    cat: SymbolCat!
    status: SymbolStatus!
    body: String
    sys: String
    # posts: [Post!]!
    ticks: [Tick!]!
    # commits: [ID!]!
  }

  type Follow {
    id: ID!
    # symbol: Symbol!
    symbolId: ID!
    followed: Boolean!
    # createdAt: DateTime!
    updatedAt: DateTime!
  }

  input FollowInput {
    symbolId: ID!
    followed: Boolean!
  }

  type Commit {
    id: ID!
    symbolId: ID!
    status: CommitStatus!
    action: CommitAction!
    content: String!
    post: Post!
    # TODO:洩漏問題？
    reviews: [CommitReview!]!
    createdAt: DateTime
    updatedAt: DateTime
  }

  input CommitInput {
    symbolId: ID
    action: CommitAction!
    content: String!
    # postContent: String!
    # post: String!
  }

  type CommitReview {
    id: ID!
    userId: ID!
    choice: Int!
    createdAt: DateTime
    updatedAt: DateTime
  }

  input CommitReviewInput {
    # commitId: ID!
    choice: Int!
  }



  enum PostCat {
    LINK
    REPLY
  }

  enum PostStatus {
    ACTIVE
    LOCK
    DELETED
    REPORTED
    ARCHIVED
  }

  enum PollCat {
    FIXED
    ADD
    ADD_BY_POST
  }

  enum SymbolCat {
    TAG
    TICKER
    EVENT
    SYS_TICKER_FOLLOWERS
  }

  enum SymbolStatus {
    ACTIVE
    REPORTED
    ARCHIVED
    DUPLICATED
  }

  enum CommitStatus {
    REVIEW
    PASS
    REJECT
  }

  enum CommitAction {
    CREATE
    UPDATE
    DELETE
    MERGE
  }

  

  enum PollStatus {
    OPEN
    JUDGE
    CLOSE_SUCCESS
    CLOSE_FAIL
  }

  scalar DateTime
`
