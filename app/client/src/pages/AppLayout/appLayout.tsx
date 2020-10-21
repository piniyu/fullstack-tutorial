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
import DiscussionList from '../../components/DiscussionList/discussionList'

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
              margin: '24px 16px',
              // padding: 24,
              minHeight: 280,
            }}
          >
            <BlockMeta />
            <ProsCons />
            <TickerComment />
            <DiscussionList />
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default AppLayout
