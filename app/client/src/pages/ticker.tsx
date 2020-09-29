import React, { useState } from 'react'
import { RouteComponentProps, Link } from '@reach/router'
import { useQuery } from '@apollo/client'
import { Form, Button, Card, Descriptions, Radio, Space, List, Typography, Result, Divider, Row, Col, Input } from 'antd'
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons'
import { Pane } from '../components/layout'
import { LineChart, BarChart } from '../components/charts'
// import blur from '../assets/download.jpeg'

// import count from '../assets/ticker_count.json'

const ticker = "BA"
// const keywords = count["BA"]["co_keywords"]
// const tickers = count["BA"]["co_tickers"]

const demoCard0 =
  <Card>
    <Typography.Paragraph>
      <Typography.Text strong>新產品將進一步推升＄AAA股價[開放式回答]</Typography.Text>
          &nbsp;#hash #tag
          <br />
      <Space>
        <Button size="small" shape="round">同意</Button>
        <Button size="small" shape="round">不同意</Button>
        <Button size="small" shape="round">不知道</Button>
        {/* <Button size="small" type="link">不知道</Button> */}
      </Space>

    </Typography.Paragraph>

    {/* <BarChart /> */}

    <Typography.Paragraph>
      [針對於投票的一些資訊：投票期間：]
        </Typography.Paragraph>

    <Typography.Paragraph>
      新產品將進一步推升＄AAA股價新產品將進一步推升＄AAA股價新產品將進一步推升＄AAA股價新產品將進一步推升＄AAA股價
          <Button size="small" type="link" >全文</Button>
    </Typography.Paragraph>
        [up] [down]

        <Divider />

    <Space>
      <Button size="small" shape="round">同意</Button>
      <Button size="small" shape="round">不同意</Button>
      <Button size="small" shape="round" type="primary">不知道</Button>
      <Button size="small" type="link">新增</Button>
    </Space>
    <List
      // bordered
      size="small"
      dataSource={[
        "產品有競爭力產品有競爭力產品有競爭力產品有競爭力產品有競爭力",
        "產品有競爭力產品有競爭力產品有競爭力產品有競爭力產品有競爭力",
      ]}
      renderItem={e => (
        <List.Item>
          {/* <Button size="small" shape="round">產品有競爭力</Button><br /> */}
                [產品有競爭力]<br />
          {e}<br />
                [up] [down]
        </List.Item>
      )}
    />

    <Card size="small">
      <Form size="small">
        <Form.Item label="選項" required>
          [同意]
              {/* <Input /> */}
        </Form.Item>
        <Form.Item label="說明" required>
          <Input.TextArea autoSize={{ minRows: 1 }} />
        </Form.Item>
        <Form.Item>
          <Button>投票</Button>
        </Form.Item>
      </Form>
    </Card>
  </Card>

const demo =
  <>
    <Space direction="vertical" style={{ width: "100%" }}>
      <Typography>
        <Typography.Title level={2}>
          <Space size="large">
            <i>${ticker}</i>
            {/* <i>{getSymbol.data.symbol.name}</i> */}
            <Button type="primary">追蹤</Button>
          </Space>
        </Typography.Title>
        <Typography.Paragraph>
          OOO XXX 有限公司, Nasdaq<br />
            #Saas類股 #新產品＃
          </Typography.Paragraph>
      </Typography>

      <Descriptions title="基本面" size="small">
        <Descriptions.Item label="EPS">1.2</Descriptions.Item>
        <Descriptions.Item label="本益比">32</Descriptions.Item>
        <Descriptions.Item label="資本負債比">32</Descriptions.Item>
        <Descriptions.Item label="現金資本比">32</Descriptions.Item>
        <Descriptions.Item label="產業">#Saas #網路基礎設備</Descriptions.Item>
        <Descriptions.Item label="總體面">#COVID-19# ##</Descriptions.Item>
        <Descriptions.Item label="消息面">#新產品發布# ##</Descriptions.Item>
        <Descriptions.Item label="比較">與類股相比、與大盤相比</Descriptions.Item>
      </Descriptions>

      <Card>
        事件：#新產品發布#
        感受：優於預期、符合預期、低於預期
        關聯類股：
        機會：首發備貨量將拉抬供應鏈、`
        風險：股價可能反應過度後回落、提前反應 ＊有沒有辦法延伸某些point？例如針對一個point做提問然後獲得更多回答？
        </Card>

      <Card>
        事件：#新產品發布# [重要 不重要]
        感受：優於預期、符合預期、低於預期
        5W1H：哪些股票、將如何影響、將如何發展
        關聯類股：
        機會：首發備貨量將拉抬供應鏈、
        風險：股價可能反應過度後回落、提前反應 ＊有沒有辦法延伸某些point？例如針對一個point做提問然後獲得更多回答？
        </Card>

      <Typography.Title level={4}>擂台</Typography.Title>
      <Card>新產品將進一步推升＄AAA股價</Card>
      <Card>後疫情時代，實體服務業將持續萎縮</Card>

      <Typography.Title level={4}>事件</Typography.Title>
      <Card>OO產品發表 5W1H（想知道）</Card>
      <Card>南北韓衝突</Card>
      <Card>OOO積欠工資</Card>
      <Card>發放消費券</Card>

      {/* <LineChart /> */}

      <div>
        風向標 / 股價預測 <Button size="small">解鎖</Button>
        <br />
        {/* <img src={blur} alt="" /> */}
      </div>

      <Row>
        <Col span={12}>
          <Card>
            <Typography.Title level={4}>機會</Typography.Title>
            <Typography.Paragraph>
              <Typography.Text strong>機會</Typography.Text><br />
                產品有競爭力（?+）<br />
                有成長潛力（?+）<br />
                產品市佔率高（?+）<br />
              <Button type="link">...更多</Button>
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Text strong>風險</Typography.Text><br />
                尚未實現獲利（?+）<br />
              <Button type="link">...更多</Button>
            </Typography.Paragraph>
            <Button size="small">解鎖</Button>
          </Card>
        </Col>

        <Col span={12}>
          <Card>
            <Typography.Title level={4}>技術面</Typography.Title>
            <Typography.Paragraph>
              型態：上升通道 (?+) <br />
              <small>前次型態：下降通道</small>
            </Typography.Paragraph>
            <Typography.Paragraph>
              可能發展
                <br />1. 壓力點$123附近反彈 (?+)
                <br />2. 突破壓力點$123 (?+)
                <br />
            </Typography.Paragraph>
            <Typography.Paragraph>
              壓力：$123<br />
                支撐：$107
              </Typography.Paragraph>
            <Button size="small">解鎖</Button>
            <Button type="link" size="small">新型態</Button>
          </Card>

        </Col>
      </Row>

      <Card>
        [預測] Buy Hold Sell
        [貢獻] 你熟悉$AAA嗎？ Yes No
        </Card>


      {/* <Divider>Focus</Divider> */}

      <div>
        <Button type="text"><b>熱門</b></Button>
        <Button type="link">最新</Button>
          #新產品發表#
        </div>

      <Card>
        ＯＯＯ產品上市對股價影響？
        </Card>

      <Card>
        Reply:可以投資$AAA了嗎？
        </Card>

      <Card>
        買哪隻好？
        可以投資了嗎？
        </Card>

      <Card>
        技術分析$AAA
        </Card>



      <Card>
        <Typography.Paragraph>
          <Space>
            <Typography.Text strong>$XXXX-30日走勢預測</Typography.Text>
            <i><Typography.Text type="secondary">$AADR</Typography.Text></i>
            <i><Typography.Text type="secondary">預測</Typography.Text></i>
          </Space>
          <Radio.Group>
            <Radio value={1}>大跌（-10%以上）</Radio>
            <Radio value={2}>小跌（-10% ~ -3%）</Radio>
            <Radio value={3}>平盤（-3% ~ 3%）</Radio>
            <Radio value={4}>小漲（+3 ~ +10%)</Radio>
            <Radio value={5}>大漲（+10%以上）</Radio>
          </Radio.Group>
          <Button type="link">7日期預測</Button>
          <Button shape="round">投票</Button>
        </Typography.Paragraph>
      </Card>


      <Card>
        <Typography.Paragraph>
          <Typography.Text strong>$XXXX進場點</Typography.Text><br />
            社群： Buy: 123.45 Sell: 146.78<br />
            機器：Buy: 123.45 Sell: 146.78
          </Typography.Paragraph>
      </Card>

      <Card>
        <Typography.Paragraph>
          <Typography.Text strong>$XXXX還會持續上漲？</Typography.Text><br />
        </Typography.Paragraph>
      </Card>

      <Card>
        <Typography.Paragraph>
          <Typography.Text strong>該買哪個好？$XXXX, $XXXY, $XXXXZ?</Typography.Text><br />
        </Typography.Paragraph>
      </Card>

    </Space>
  </>

const demoRight =
  <Space direction="vertical" style={{ width: "100%" }}>
    <div />
    <Card>
      <List
        size="small"
        // header={<b>關聯</b>}
        dataSource={["#COVID-19#", "#英國脫歐#", "$AAAA", "$BBBB", "#電動車", "#電池"]}
        renderItem={e => <List.Item>{e}</List.Item>}
      />
    </Card>
    {/* <Card>
        <List
          size="small"
          // header={<b>關聯</b>}
          dataSource={["預測$XXXX未來走勢", "$XXXX還會持續上漲？", "該買哪個好？$XXXX, $XXXY, $XXXXZ?"]}
          renderItem={e => <List.Item>{e}</List.Item>}
        />
      </Card> */}
  </Space>

interface Props extends RouteComponentProps {
  id?: any
}

function DemoChoice({ name }: { name: string }) {
  const [showPanel, setShowPanel] = useState<boolean>(false)
  function onClick() {
    setShowPanel(!showPanel)
  }

  return (
    <>
      {
        showPanel ?
          <>
            <Button size="small" type="primary" shape="round" onClick={onClick}>產品市佔率高</Button>
            <small><LikeOutlined /> <DislikeOutlined /> </small>
          </>
          :
          <Button size="small" shape="round" onClick={onClick}>產品市佔率高</Button>
      }
    </>
  )

}

function _Ticker() {
  const [showChoiceForm, setShowChoiceForm] = useState<boolean>(false)
  const [showComments, setShowComments] = useState<boolean>(false)
  const [showOppCard, setShowOppCard] = useState<boolean>(false)

  // const kws = Object.entries(keywords)
  //   .sort((a, b) => b[1] - a[1])
  //   .map(e => e[0])
  // const tks = Object.entries(tickers)
  //   .sort((a, b) => b[1] - a[1])
  //   .map(e => e[0])



  const demoOppCard = (
    <Card>
      {/* <Typography.Title level={4}>機會</Typography.Title> */}
      <Typography.Paragraph>
        <Typography.Text strong>$BA機會？</Typography.Text>
        <Button size="small" type="link" onClick={() => { setShowChoiceForm(!showChoiceForm) }}>前5名</Button>
        <br />
        <DemoChoice name="有成長潛力" />
        <DemoChoice name="產品市佔率高" />

        {/* <Button size="small" shape="round" onClick={() => { setShowComments(!showComments) }}>產品有競爭力&nbsp;
              <small><LikeOutlined />30</small>
        </Button>

        <Button size="small" shape="round">產品市佔率高</Button>
        <Button size="small" shape="round">有成長潛力</Button>
        <Button size="small" type="dashed" shape="round" onClick={function () { setShowChoiceForm(!showChoiceForm) }}>新增</Button> */}
      </Typography.Paragraph>


      {
        showChoiceForm &&
        <Card size="small">
          <Form size="small">
            <Form.Item label="選項" required>
              <Input />
              <Button size="small" type="dashed" shape="round">有成長潛力</Button>
              <Button size="small" type="dashed" shape="round">產品有競爭力</Button>
              <Button size="small" type="dashed" shape="round">產品市佔率高</Button>
            </Form.Item>
            <Form.Item label="說明" required>
              <Input.TextArea autoSize={{ minRows: 1 }} />
            </Form.Item>
            <Form.Item>
              <Button>送出</Button>
            </Form.Item>
          </Form>
        </Card>
      }

      <Button type="link">最新</Button>

      {
        showComments &&
        <List
          // bordered
          size="small"
          dataSource={[
            "產品有競爭力產品有競爭力產品有競爭力產品有競爭力產品有競爭力",
            "產品有競爭力產品有競爭力產品有競爭力產品有競爭力產品有競爭力",
          ]}
          renderItem={e => (
            <List.Item>
              {/* <Button size="small" shape="round">產品有競爭力</Button><br /> */}
                [產品有競爭力]<br />
              {e}<br />
                [up] [down]
            </List.Item>
          )}
        />
      }

    </Card>
  )

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Typography>
        <Typography.Title level={2}>
          <Space size="large">
            <i>Boeing Co, ${ticker}</i>
            {/* <i>{getSymbol.data.symbol.name}</i> */}
          </Space>
        </Typography.Title>

        {/* <Descriptions title="基本面" size="small">
          <Descriptions.Item label="屬性">
            <Space>
              <Link to="">#Transportation</Link>
              <Link to="">#Travel</Link>
              <Link to="">#Aerospace</Link>
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label="EPS">1.2</Descriptions.Item>
          <Descriptions.Item label="本益比">32</Descriptions.Item>
          <Descriptions.Item label="資本負債比">32</Descriptions.Item>
          <Descriptions.Item label="現金資本比">32</Descriptions.Item>
          <Descriptions.Item label="產業">#Saas #網路基礎設備</Descriptions.Item>
          <Descriptions.Item label="總體面">#COVID-19# ##</Descriptions.Item>
          <Descriptions.Item label="消息面">#新產品發布# ##</Descriptions.Item>
          <Descriptions.Item label="比較">與類股相比、與大盤相比</Descriptions.Item>
        </Descriptions> */}

        <Typography.Paragraph>
          <Space>
            <Link to="">#Transportation</Link>
            <Link to="">#Travel</Link>
            <Link to="">#Aerospace</Link>
            <span>#熱門</span>
            <span>#熱度竄升中</span>
            <span>#冷門</span>
            <span>#交易量高</span>
            <Button type="text">...</Button>
          </Space>
        </Typography.Paragraph>

        <Typography.Paragraph>
          <span>事件：</span>
          <Space>
            <Link to="">#脫歐#</Link>
            <Button type="text">...</Button>
          </Space>
        </Typography.Paragraph>

        <Typography.Paragraph>
          <span>機會：</span>
          <Button type="text" size="small">
            產品有競爭力
              <small><LikeOutlined />?</small>
          </Button>
          <Button type="text" size="small">股價低於長期平均</Button>
          <Button type="text" size="small" onClick={function () { setShowOppCard(!showOppCard) }}>...</Button>
        </Typography.Paragraph>

        {showOppCard && demoOppCard}

        <Typography.Paragraph>
          <Space>
            <span>判斷：</span>
            <Button type="text" size="small">看多</Button>
            <Button type="text" size="small">看空</Button>
          </Space>
        </Typography.Paragraph>
      </Typography>

      {/* <Typography.Title level={4}>擂台</Typography.Title> */}
      <Divider />

      <div>
        <Button type="link">最新</Button>
        <Button type="text"><b>火熱</b></Button>
        <Link to="/cpoll">
          <Button type="primary">新問題</Button>
        </Link>
      </div>

      <Card>OO產品發表 5W1H（想知道）</Card>
      <Card>南北韓衝突</Card>
      <Card>OOO積欠工資</Card>
      <Card>發放消費券</Card>


      <Card>
        <Typography.Title level={4}>Tickers</Typography.Title>
        <div>
          {/* {tks.map((e, i) => <Button key={i} size="small" shape="round" type="text">${e}</Button>)} */}
        </div>
      </Card>


      <Card>
        <Typography.Title level={4}>屬性</Typography.Title>
        <div>
          {/* {kws.map((e, i) => <Button key={i} size="small" shape="round" type="text">#{e}</Button>)} */}
        </div>
      </Card>



      <Card>
        <Typography.Paragraph>
          <Typography.Text strong>票選頭條新聞[開放式回答]</Typography.Text>
          &nbsp;#頭條
          <br />
          <ul>
            <li>這是第1個頭條 [up] [down]</li>
            <li>這是第2個頭條 [up] [down]</li>
            <li>這是第3個頭條 [up] [down]</li>
          </ul>

        </Typography.Paragraph>
      </Card>

      <Card>
        <Typography.Title level={4}>風險</Typography.Title>
        <Button size="small" shape="round" type="primary">產品有競爭力</Button>
        <Button size="small" type="text">有成長潛力</Button>
        <Button size="small" type="text">產品市佔率高</Button>
        <Button size="small" type="link">新增選項</Button>
      </Card>

      <Card>
        <Typography.Title level={4}>判斷</Typography.Title>
        <Button size="small" type="dashed">看空</Button>
        <Button size="small" type="text">看多</Button>
      </Card>


      <Divider />

      <Typography.Title level={4}>擂台</Typography.Title>
      <Card>新產品將進一步推升＄AAA股價</Card>
      <Card>後疫情時代，實體服務業將持續萎縮</Card>

      <Typography.Title level={4}>事件</Typography.Title>
      <Card>OO產品發表 5W1H（想知道）</Card>
      <Card>南北韓衝突</Card>
      <Card>OOO積欠工資</Card>
      <Card>發放消費券</Card>

      {/* <LineChart /> */}

      {/* <div>
      風向標 / 股價預測 <Button size="small">解鎖</Button>
      <br />
      <img src={blur} alt="" />
    </div> */}
      <Card>
        <Typography.Paragraph>
          <Typography.Text strong>新產品將進一步推升$AAA股價[開放式回答]</Typography.Text>
          &nbsp;#hash #tag
          <br />
          <Space>
            <Button size="small" shape="round">同意</Button>
            <Button size="small" shape="round">不同意</Button>
            <Button size="small" shape="round">不知道</Button>
            {/* <Button size="small" type="link">不知道</Button> */}
          </Space>

        </Typography.Paragraph>
      </Card>




      <Card>
        [預測] Buy Hold Sell
        [貢獻] 你熟悉$AAA嗎？ Yes No
    </Card>

    </Space>
  )
}

export const Ticker: React.FC<Props> = ({ id }) => {
  return <Pane left={<_Ticker />} />
}