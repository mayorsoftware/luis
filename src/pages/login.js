import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import { Button } from "antd"
import { Flex } from "./../components/styles"
import { Context } from "./../FormContext"
import ni from "netlify-identity-widget"

function Login() {
  const ctx = React.useContext(Context)
  return (
    <div>
      {!ctx.authentication.isAuthenticated ? (
        <>
          {ctx.login()}
          <Flex h="100vh" justify="center" align="center" column>
            <Button onClick={ctx.login} type="primary">
              Login
            </Button>
          </Flex>
        </>
      ) : (
        <Flex h="100vh" justify="center" align="center" column>
          <Link to="/admin">
            <Button type="primary">Go To Admin Panel</Button>
          </Link>
        </Flex>
      )}
    </div>
  )
}

export default function LoginScree() {
  return (
    <Layout>
      <Login />
    </Layout>
  )
}
