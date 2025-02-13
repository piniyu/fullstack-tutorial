import React from 'react'
import { Redirect, RouteComponentProps, Link } from '@reach/router'
import { useMutation, useQuery } from '@apollo/client'
import { Space, Form, Input, Button, Row, Col, Result } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import * as queries from '../store/queries'
import * as QT from '../store/queryTypes'

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// }
// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// }

function LoginForm({ login }: { login: (a: { variables: QT.loginVariables }) => void }) {
  const [form] = Form.useForm()
  function onFinish(values: any) {
    login({
      variables: {
        email: values.email,
        password: values.password,
      }
    })
  }
  function onFinishFailed(errorInfo: any) {
    console.log('Failed:', errorInfo);
  }

  return (
    <Form
      // {...layout}
      form={form}
      name="login"
      size="small"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your username' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
      // {...tailLayout}
      >
        <Button type="primary" htmlType="submit">送出</Button>
      </Form.Item>

    </Form >
  )

}

interface LoginProps extends RouteComponentProps { }

export const Login: React.FC<LoginProps> = () => {
  // const client: ApolloClient<any> = useApolloClient()
  // const [login, { loading, error }] = useMutation<QT.login, QT.loginVariables>(
  //   queries.LOGIN,
  //   {
  //     onCompleted(data) {
  //       // localStorage.setItem('token', data.token as string)
  //       // localStorage.setItem('token', data.login as string)
  //       client.writeData({ data: { isLoggedIn: true } })

  //       // TODO: 在這裡fetch me
  //     }
  //   }
  // )
  const me = useQuery<QT.me>(queries.ME)
  const [login, { data, loading, error }] = useMutation<QT.login, QT.loginVariables>(
    queries.LOGIN,
    {
      onCompleted() {
        me.refetch()
      },
      onError(e) {
        // 需要這個來catch error，useMutation返回的`error`只是for render
        // https://stackoverflow.com/questions/59465864/handling-errors-with-react-apollo-usemutation-hook
        console.log(e)
      },
      errorPolicy: 'all'
    }
  )

  if (loading) return null
  if (me.data) return <Result
    status="success"
    title="Successfully Logged In"
    extra={<Button type="primary"><Link to="/">Go to Main Page</Link></Button>}
  />
  if (error) return <Result
    status="warning"
    title="Oops! Log In Failed"
    subTitle={error.message}
  />
  return (
    <Row justify="center">
      <Col span={6}>
        <Space direction="vertical">
          <h1>登入</h1>
          <p>需要登入才能瀏覽本站</p>
          <LoginForm login={login} />
        </Space>
      </Col>
    </Row>
  )
}

interface ProtectedRouteProps extends RouteComponentProps {
  // as: React.FC
  as: React.ReactElement
  isLoggedIn: boolean
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ as: Component, isLoggedIn, ...rest }) => {
  if (isLoggedIn)
    return <>{React.cloneElement(Component, { ...rest })}</>
  return <Redirect from="" to="/login" noThrow />
}

export function AutoLogin() {
  // console.log(typeof refetch)
  const me = useQuery<QT.me>(queries.ME)
  const [login, { data, loading }] = useMutation<QT.login, QT.loginVariables>(
    queries.LOGIN,
    {
      onCompleted() {
        me.refetch()
      }
    }
  )
  if (loading) return null
  if (!data) {
    login({
      variables: {
        email: "aaa@aaa.com",
        password: "aaa"
      }
    })
    console.log('logging')
    // me.refetch()
  } else {
    console.log(data)
    // me.refetch()
  }

  if (me.data) {
    console.log(me.data)
  } else {
    console.log('no me data')
  }

  return <></>
}
