import React from 'react'
import { RouteComponentProps, Link } from '@reach/router'
import { useQuery } from '@apollo/client'
import {
  Badge,
  Button,
  Card,
  Descriptions,
  Radio,
  Space,
  List,
  Typography,
  Input,
  Form,
} from 'antd'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'
import { Pane } from '../components/layout'
import { PollList } from '../components/pollList'

import BlockMeta from '../components/BlockMeta/blockMeta'
import Anchor from '../components/Anchor/anchor'

interface StageProps {
  me?: QT.me_me
}

const demo = (
  <>
    {/* <h1>hello world</h1> */}
    {/* <Card>(討論) 如何看半導體的GAA技術？ #專門 #GAA</Card>

    <Card>
      (轉) 台積電 2 奈米取得突破，將採 GAA 技術並於2023~2024年投產 [來源]
    </Card>

    <Card>
      <Typography.Paragraph>
        <Typography.Text strong>
          特斯拉宣布調降Model Y售價6% [cnyes] [+3來源] $TSLA
        </Typography.Text>
      </Typography.Paragraph>

      <Typography.Paragraph>
        (Meta)
        <ul>
          <li>標的：[$TSLA[看多] [看空]]</li>
          <li>重要性：[大] [中] [小]</li>
          <li>[新增]</li>
        </ul>
        <Button size="small" shape="round">
          投票
        </Button>
        <br />
        <br />
        如何看？
        <ul>
          <li>[大打價格戰擠壓競爭對手獲利空間] [up] [down] [comment]</li>
          <Card>
            #1（投up）總之就是一些留言 *選項作者 [up] [down]
            <br />
            #2（投up）總之就是一些留言 [up] [down]
          </Card>
          <li>加入S&#38;P500可能有一波回調 [up] [down]</li>
          <li>[新增]</li>
        </ul>
        <Button size="small" shape="round">
          投票
        </Button>
      </Typography.Paragraph>
    </Card>

    <Card>
      <Typography.Paragraph>
        <Typography.Text strong>$TSMC</Typography.Text>
      </Typography.Paragraph>

      <Typography.Paragraph>
        <ul>
          <li>TAG：#半導體製造</li>
          <li>
            當前：
            <ul>
              <li>亮點：[產品有競爭力]、[寡占市場]、[+]</li>
              <li>暗點：本益比高、資本額高</li>
            </ul>
          </li>
          <li>
            未來：
            <ul>
              <li>機會：5G、互聯網</li>
              <li>風險：物理之壁</li>
            </ul>
          </li>
          <li>判斷：看多、看空</li>
          <li>[新增]</li>
        </ul>
        <Button size="small" shape="round">
          投票
        </Button>{' '}
        [結果]
      </Typography.Paragraph>
    </Card> */}
  </>
)

const Stage: React.FC<StageProps> = ({ me }) => {
  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography>
          <Typography.Title level={2}>
            <Space size="large">
              <i>Stage</i>
              {/* <i>{getSymbol.data.symbol.name}</i> */}
            </Space>
          </Typography.Title>
        </Typography>

        {/* <Divider>Focus</Divider> */}

        <div>
          <Button type="link">最新</Button>
          <Button type="text">
            <b>火熱</b>
          </Button>
          <Link to="/cpoll">
            <Button type="primary">新討論</Button>
          </Link>
        </div>

        {demo}
        <BlockMeta />

        {/* <PollList me={me}/> */}
      </Space>
    </>
  )
}

interface Props extends RouteComponentProps, StageProps {}

export const StagePage: React.FC<Props> = ({ me }) => {
  // const demoRight = (
  //   <Space direction="vertical" style={{ width: '100%' }}>
  //     <div />
  //     <Card>
  //       <List
  //         size="small"
  //         // header={<b>關聯</b>}
  //         dataSource={[
  //           '#COVID-19#',
  //           '#聯準會',
  //           '#歐洲央行',
  //           '#日本央行',
  //           '#外匯',
  //           '$^USD',
  //           '$^GOLD',
  //         ]}
  //         renderItem={(e) => <List.Item>{e}</List.Item>}
  //       />
  //     </Card>
  //     <Card>
  //       <List
  //         size="small"
  //         // header={<b>關聯</b>}
  //         dataSource={[
  //           '預測$XXXX未來走勢',
  //           '$XXXX還會持續上漲？',
  //           '該買哪個好？$XXXX, $XXXY, $XXXXZ?',
  //         ]}
  //         renderItem={(e) => <List.Item>{e}</List.Item>}
  //       />
  //     </Card>
  //   </Space>
  // )

  return <Pane left={<Stage me={me} />} right={<Anchor />} />
  // return <Pane left={<Stage me={me} />} right={demoRight} />
  // return <Stage me={me} />
}

const demo0 = (
  <>
    <Card>
      // user建立的poll，fixed-choices
      <br />
      [新] 2020-2021年房價會大跌嗎？
      <Radio>會</Radio>
      <Radio>不會</Radio>
      <Input placeholder={'你的意見（可留空）'} />
      <br />
      #房價
      <br />
      <div style={{ textAlign: 'right' }}>
        @anonymous 12:31 [up] [down] [comments] [replies?] [給author的特別功能]
      </div>
      -------------
      <br />
      時間：
      <br />
      判定方式：投票人小組
      <br />
      成立條件：
      <br />
      references：1. ..... 2. 前次未通過審查的poll <br />
      [舉報] - [問題重複]
      <br />
      [建議如何修正問題 ＆ 建議：....]
      <br />
      [無法判斷] - [看不懂問題、問題無法驗證、問題缺少選項、問題的價值不夠]
      <br />
      <br />
      最新想法 [完整] [分享你的想法]
      <br />
      {/* [會] [不會] [棄權（可以嗎？）]<br /> */}
      <Card>
        [會] <br />
        總之是一些回覆總之是一些回覆總之是一些回覆總之是一些回覆總之是一些回覆
        <div style={{ textAlign: 'right' }}>
          @anonymous 12:31 [up] [down] [comments]
        </div>
        ----predicates-----
        <br />
        1. OOOOOOOOOO <br />
        2. OOOOOOOOOO <br />
      </Card>
      <Card>
        [會] <br />
        總之是一些回覆總之是一些回覆總之是一些回覆總之是一些回覆總之是一些回覆
        <div style={{ textAlign: 'right' }}>
          @anonymous 12:31 [up] [down] [comments]
        </div>
      </Card>
      <Card>
        [會] <br />
        總之是一些回覆總之是一些回覆總之是一些回覆總之是一些回覆總之是一些回覆
        <div style={{ textAlign: 'right' }}>
          @anonymous 12:31 [up] [down] [comments]
        </div>
      </Card>
      <Card>
        [會] <br />
        總之是一些回覆總之是一些回覆總之是一些回覆總之是一些回覆總之是一些回覆
        <div style={{ textAlign: 'right' }}>
          @anonymous 12:31 [up] [down] [comments]
        </div>
      </Card>
      <Card>
        [會] <br />
        總之是一些回覆總之是一些回覆總之是一些回覆總之是一些回覆總之是一些回覆
        <div style={{ textAlign: 'right' }}>
          @anonymous 12:31 [up] [down] [comments]
        </div>
      </Card>
      <Card>
        [會] <br />
        總之是一些回覆總之是一些回覆總之是一些回覆總之是一些回覆總之是一些回覆
        <div style={{ textAlign: 'right' }}>
          @anonymous 12:31 [up] [down] [comments]
        </div>
      </Card>
      <Card>
        [會] <br />
        總之是一些回覆總之是一些回覆總之是一些回覆總之是一些回覆總之是一些回覆
        <div style={{ textAlign: 'right' }}>
          @anonymous 12:31 [up] [down] [comments]
        </div>
      </Card>
      <Card>
        [會] <br />
        總之是一些回覆總之是一些回覆總之是一些回覆總之是一些回覆總之是一些回覆
        <div style={{ textAlign: 'right' }}>
          @anonymous 12:31 [up] [down] [comments]
        </div>
      </Card>
    </Card>

    <Card>
      // user建立的poll，open-choices
      <br />
      [新] 航空股哪隻值得買？[開放回答]
      <br />
      #航空運輸 <br />
      <div style={{ textAlign: 'right' }}>
        @anonymous 12:31 [up] [down] [comments] [replies?]
      </div>
      ------最新想法-----
      <br />
      [$AAA(AAA航空)] [$BBB(...)] <br />
      <Card>
        [$AAA(AAA航空)] 理由在這裡理由在這裡理由在這裡理由在這裡理由在這裡
      </Card>
      [新增一個選項] [查看完整]
    </Card>

    <Card>
      此網站應該要有哪些tag？[開放回答]
      <br />
      #站方 <br />
      <div style={{ textAlign: 'right' }}>
        @webmaster 12:31 [up] [down] [comments] [replies?]
      </div>
      ------最新想法-----
      <br />
      [#AAA] [#BBB] [#CCC] [回答] [查看完整]
    </Card>

    <Card>
      //
      自link取出的predicate，需要考慮到有些時後link都講的太過含糊，例如說大漲，但具體到底是漲多少？
      <br />
      [新]美股會大漲 [同意] [不同意] - [投票] [投票並分享想法] [回報] <br />
      #美股 $SP500 $<br />
      -------------
      <br />
      狀態：審核中
      <br />
      時間：
      <br />
      判定方式：投票人小組
      <br />
      成立條件：
      <br />
      references：1. [link-post(某篇文章、某個影片)] <br />
      [舉報] - [問題重複]
      <br />
      [建議如何修正問題 ＆ 建議：....]
      <br />
      [無法判斷] - [看不懂問題、問題無法驗證、問題缺少選項、問題的價值不夠]
      <br />
      -------------
      <br />
      源自於[link-post]，author可以做一些發言，雖然不是強制，但可以當作是補充說明。author可以做一些發言，雖然不是強制，但可以當作是補充說明。author可以做一些發言，雖然不是強制，但可以當作是補充說明。
      <br />
      <br />
      <div style={{ textAlign: 'right' }}>
        @anonymous 12:31 [up] [down] [comments] [回應]
      </div>
      <br />
      最新 [完整] [分享你的想法]
      <br />
      <Card>
        [會] @open-user：最前面的幾個字.... [link] [predicates]
        <br />
        <div style={{ textAlign: 'right' }}>
          @open-user 12:31 [up] [down] [comments] [predicates]
        </div>
        ----predicates-----
        <br />
        1. [OOOOOOOOOO?] (選項1) 選項2
        <br />
        2. [OOOOOOOOOO?] <br />
      </Card>
    </Card>

    <Card>
      // user建立的poll，fixed-choices
      <br />
      [新] 2020-2021年房價會大跌嗎？ [會] [不會]
      <br />
      #房價 <br />
      <div style={{ textAlign: 'right' }}>
        @anonymous 12:31 [up] [down] [comments]
      </div>
      -------------
      <br />
      時間：
      <br />
      判定方式：投票人小組
      <br />
      成立條件：
      <br />
      references：1. ..... 2. .... <br />
      [舉報] - [問題重複]
      <br />
      [建議如何修正問題 ＆ 建議：....]
      <br />
      [無法判斷] - [看不懂問題、問題無法驗證、問題缺少選項、問題的價值不夠]
    </Card>

    <Card>
      // user建立的poll，fixed-choices
      <br />
      [新進] 2020-2021年房價會大跌嗎？ [會] [不會]
      <br />
      #房價 <br />
      -------------
      <br />
      時間：
      <br />
      判定方式：投票人小組
      <br />
      成立條件：
      <br />
      references：1. ..... 2. .... <br />
      [無法判斷] - [看不懂問題、問題無法驗證、問題缺少選項、問題的價值不夠]
    </Card>

    <Card>
      [user建立的poll，open-choices]
      <br />
      COVID-19若2次爆發，會重挫全球經濟嗎？
      <br />
    </Card>

    <Card>
      美聯儲會用一切力量拉抬股市，本次疫情危機已結束，美股轉為熊市 []同意
      []不同意
      <br />
      判定式：美股1年期間皆為熊市
      <br />
      <br />
      來源：
      <br />
      <Card>某篇文章、某個影片</Card>
    </Card>

    <Card>
      [共筆]某篇文章、某個影片
      <br />
      重點（社群整理）：
      <br />
      1. <br />
      2. <br />
      3. <br />
      <br />
      討論 / comments
    </Card>

    <Card>
      票選本日頭條
      <br />
    </Card>

    <Card>
      航空業的復甦時間？（載客量回到歷年水準） []2020年6-9月 []2020年9-12月
      []2021年1-3月 []2021年4-6月
      <br />
      <br />
      <br />
      回覆：
      <Card>選[2021年4-6月] 我認為....</Card>
      <Card>選[2021年1-3月] 這個問題....</Card>
    </Card>

    <Card>美股會反轉嗎？ []會 []不會</Card>

    <Card>
      [新]iPhone12將有助蘋果($AAPL)股價持續攀升 []同意 []不同意 <br />
    </Card>
  </>
)
