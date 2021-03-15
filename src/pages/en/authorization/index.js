import React from "react"
import { Link } from "gatsby"
// import SEO from "../components/seo"
import Layout from "../../../components/layout"
import MainHeader from "../../../components/MainHeader"
import styled from "styled-components"
import { Typography, Button } from "antd"
import { Container, Filler, media } from "../../../components/styles"

const ButtonStyled1 = styled(Button)`
  &.ant-btn {
    background: var(--legal);
    width: 500px;
    font-size: var(--textSize);
    color: black;
    &:hover {
      background: var(--legal);
      color: black;
    }
  }
  ${media.phone`
    &.ant-btn {
      width: 100%;
    }`}
`

const ButtonStyled2 = styled(Button)`
  &.ant-btn {
    background: var(--underage);
    width: 500px;
    font-size: var(--textSize);
    color: black;
    &:hover {
      background: var(--underage);
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

const Index = () => (
  <Layout>
    <MainHeader link="/authorization" />
    <Container>
      <Div>
        <Typography.Text style={{ color: "black" }} strong>
          Authorisation for taking and publishing photographs, video and audio.{" "}
        </Typography.Text>
        <br />
        <br />
        <Typography.Text style={{ color: "black" }}>
          Select one of these options{" "}
        </Typography.Text>
        <br />
        <br />
        <Link to="/en/authorization/legal">
          <ButtonStyled1>
            <strong>Legal Age</strong>
          </ButtonStyled1>
        </Link>
        <br />
        <br />
        <Link to="/en/authorization/underage">
          <ButtonStyled2>
            <strong>Underage with Legal Tutor</strong>
          </ButtonStyled2>
        </Link>
      </Div>
    </Container>
  </Layout>
)

export default Index
