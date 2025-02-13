import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import './appLayout.less'
import BlockMeta from '../../components/BlockMeta/blockMeta'
import ProsCons from '../../components/ProsCons/prosCons'
import Anchor from '../../components/Anchor/tickerAnchor'
import TickerComment from '../../components/TickerComment/tickerComment'
import Tab from '../../components/Tab/tab'

import ParentSize from '@visx/responsive/lib/components/ParentSize'
import Chart from '../../components/Chart/chart'

const { Header, Sider, Content } = Layout

class AppLayout extends Component {
  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render() {
    return (
      <Layout className="my-app">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          theme="light"
          style={{ position: 'relative' }}
        >
          <div className="logo" />
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              探索
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              熱門
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              關注
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ position: 'relative' }}>
          <Header
            className="site-layout-background header "
            style={{ padding: 0 }}
          >
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: this.toggle,
              },
            )}
          </Header>
          <div className="anchorWrapper">
            <Anchor />
          </div>
          <Content
            className="site-layout-background content"
            style={{
              minHeight: 280,
            }}
          >
            <BlockMeta />
            <ProsCons />
            <TickerComment />
            <Tab />
            <ParentSize>
              {({ width }) => <Chart width={width} height={300} />}
            </ParentSize>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default AppLayout
