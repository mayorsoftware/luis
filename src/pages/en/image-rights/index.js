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
    background: var(--legal2);
    font-size: var(--textSize);
    width: 500px;
    &:hover {
      background: var(--legal2);
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
    background: var(--underage2);
    width: 500px;
    font-size: var(--textSize);
    &:hover {
      background: var(--underage2);
      color: black;
    }
  }
  ${media.phone`
    &.ant-btn {
      width: 100%;
    }`}
`

const Div = styled.div`
  margin: 40px 0px 0px 0px;
`

const Index = () => (
  <Layout>
    <MainHeader link="/image-rights" />
    <Container>
      <Div>
        <Typography.Text strong>
          Assignment of image rights, Authorization for taking and Publishing
          photographs, video and audio.
        </Typography.Text>
        <br />
        <br />
        <Typography.Text>Select one of these options</Typography.Text>
        <br />
        <br />
        <Link to="/en/image-rights/legal">
          <ButtonStyled1>
            <strong>Legal age</strong>
          </ButtonStyled1>
        </Link>
        <br />
        <br />
        <Link to="/en/image-rights/underage">
          <ButtonStyled2>
            <strong>Underage with legal tutor</strong>
          </ButtonStyled2>
        </Link>
      </Div>
    </Container>
  </Layout>
)

export default Index
