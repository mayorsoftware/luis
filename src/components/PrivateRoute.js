import React, { useContext } from "react"
import { Link } from "gatsby"
import { Context } from "../FormContext"
import { Button } from "antd"
import { Flex } from "./styles"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const ctx = useContext(Context)
  if (!ctx.authentication.isAuthenticated) {
    return (
      <Flex h="100vh" justify="center" align="center" column>
        <Link to="/login">
          <Button type="primary">Go To Login Page</Button>
        </Link>
      </Flex>
    )
  }

  return <Component {...rest} />
}

export default PrivateRoute
