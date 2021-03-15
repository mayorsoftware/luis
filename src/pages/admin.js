import React, { useContext } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ShowData from "../components/ShowData"
import { Button, Typography } from "antd"
import { Flex } from "./../components/styles"
import { Context } from "./../FormContext"
import ni from "netlify-identity-widget"

const { Title } = Typography

const AdminScreen = () => {
  const context = useContext(Context)
  return context.authentication.isAuthenticated ? (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Link to="/form_a/adult">
        <Button
          style={{ width: 300, color: "white", background: 'var(--legal)' }}
          type="primary"
          size="large"
        >
          Form A/ Legal Age
        </Button>
      </Link>
      <Link to="/form_a/underage">
        <Button
          style={{ width: 300, color: "white", background: 'var(--underage)' }}
          type="primary"
          size="large"
        >
          Form A/ Underage w/ Legal Tutor
        </Button>
      </Link>
      <Link to="/form_b/adult">
        <Button
          style={{ width: 300, color: "white", background: 'var(--legal2)' }}
          type="primary"
          size="large"
        >
          Form B/ Legal Age
        </Button>
      </Link>
      <Link to="/form_b/underage">
        <Button
          style={{ width: 300, color: "white", background: 'var(--underage2)' }}
          type="primary"
          size="large"
        >
          Form B/ Underage w/ Legal Tutor
        </Button>
      </Link>
      <Button
        onClick={context.logout}
        style={{ width: 300, color: "white" }}
        type="danger"
        size="large"
      >
        Logout
      </Button>
    </div>
  ) : (
    <Flex h="100vh" justify="center" align="center" column>
      <Link to="/login">Please Login</Link>
    </Flex>
  )
}

const Admin = () => {
  return (
    <Layout>
      <AdminScreen />
    </Layout>
  )
}

export default Admin
