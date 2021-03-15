import React, { useEffect } from "react"
import { Link } from "gatsby"
// import SEO from "../components/seo"
import Layout from "../../components/layout"
import MainHeader from "../../components/MainHeader"
import styled from "styled-components"
import { Typography, Button } from "antd"
import { Container, Filler, media } from "../../components/styles"
import netlifyIdentity from "netlify-identity-widget"

const ButtonStyled1 = styled(Button)`
  &.ant-btn {
    background: var(--authorization);
    width: 500px;
    color: black;
    font-size: var(--textSize);
    &:hover {
      background: var(--authorization);
      color: black;
    }
  }
  ${media.phone`
    &.ant-btn {
      width: 100%;
    }
  `}
`

const ButtonStyled2 = styled(Button)`
  &.ant-btn {
    background: var(--assignment);
    width: 500px;
    color: black;
    font-size: var(--textSize);
    &:hover {
      background: var(--assignment);
      color: black;
    }
  }
  ${media.phone`
    &.ant-btn {
      width: 100%;
    }`}
`

const Div = styled.div`
  margin: 30px 0px 0px 0px;
`

const Index = () => {
  useEffect(() => {
    if (!window.netlifyIdentity) {
      netlifyIdentity.init()
      window.netlifyIdentity = netlifyIdentity
    }
  }, [])

  return (
    <Layout>
      <MainHeader link="/" />
      <Container>
        <Div>
          <Typography.Text style={{ color: "black" }} strong>
            Please Select The Type of Form:
          </Typography.Text>
          <br />
          <br />
          <Link to="/en/authorization">
            <ButtonStyled1>
              <strong>Authorization/Publishing</strong>
            </ButtonStyled1>
          </Link>
          <br />
          <br />
          <Link to="/en/image-rights">
            <ButtonStyled2>
              <strong>Assignment of image rights</strong>
            </ButtonStyled2>
          </Link>
        </Div>
      </Container>
    </Layout>
  )
}

export default Index
