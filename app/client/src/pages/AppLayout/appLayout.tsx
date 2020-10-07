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
import ConsPros from '../../components/ConsPros/consPros'

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
          className="shadow"
          style={{ position: 'relative', zIndex: 1 }}
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
        <Layout
          className="site-layout"
          style={{ position: 'relative', zIndex: -100 }}
        >
          <Header
            className="site-layout-background white"
            style={{ padding: 0, position: 'relative', zIndex: 2 }}
          >
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: this.toggle,
              },
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              // padding: 24,
              minHeight: 280,
            }}
          >
            <BlockMeta />
            <ConsPros />
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default AppLayout
