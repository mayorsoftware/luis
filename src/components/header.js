import { useContext } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Typography, Button } from "antd"
import Form from "./Form"
import { Context } from "./../FormContext"
import { Container, Flex } from "./styles"
const { Title } = Typography

const Header = ({ siteTitle, page, category }) => {
  const { toggleModal, load, saveData } = useContext(Context)
  return (
    <header
      style={{
        background: `white`,
        paddingTop: "20px",
        marginBottom: `1.45rem`,
        boxShadow: "0px 1px 0px rgba(0, 0, 0, 0.06)",
      }}
    >
      <Container>
        <Flex>
          <Link
            to="/admin"
            style={{
              color: `rgba(0, 0, 0, 0.8)`,
              textDecoration: `none`,
              display: "flex",
              alignItems: "center",
              margin: 0,
              flex: 3,
            }}
          >
            <Title
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Admin Panel
            </Title>
          </Link>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Button onClick={toggleModal} type="primary">
              Add Field
            </Button>
            <Button onClick={saveData} disabled={load.loading} type="primary">
              Save
            </Button>
          </div>
          <Form page={page} category={category} />
        </Flex>
      </Container>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
