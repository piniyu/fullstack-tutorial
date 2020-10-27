import React from 'react'
import { Tabs } from 'antd'
import { StickyContainer, Sticky } from 'react-sticky'
import Block from '../Block/block'

const { TabPane } = Tabs

const renderTabBar = (props: any, DefaultTabBar: any) => (
  <Sticky>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        className="site-custom-tab-bar"
        style={{ ...style }}
      />
    )}
  </Sticky>
)
const DisccussList = () => (
  <Block title="討論">
    <Tabs defaultActiveKey="1">
      <TabPane tab="新聞" key="1" />
      <TabPane tab="發問" key="2" />
    </Tabs>
  </Block>
)

export default DisccussList
