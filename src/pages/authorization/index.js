import React from "react"
import { Link } from "gatsby"
// import SEO from "../components/seo"
import Layout from "../../components/layout"
import MainHeader from "../../components/MainHeader"
import styled from "styled-components"
import { Typography, Button } from "antd"
import { Container, media } from "../../components/styles"

const ButtonStyled1 = styled(Button)`
  &.ant-btn {
    background: var(--legal);
    width: 500px;
    font-size: var(--textSize);
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
    <MainHeader link="/en/authorization" spanish />
    <Container>
      <Div>
        <Typography.Text strong>
          Autorización para la realización y publicación de fotografías, vídeo y
          audio.{" "}
        </Typography.Text>
        <br />
        <br />
        <Typography.Text>Seleccione una de estas opciones</Typography.Text>
        <br />
        <br />
        <Link to="/authorization/legal">
          <ButtonStyled1>
            <strong>Mayor de edad</strong>
          </ButtonStyled1>
        </Link>
        <br />
        <br />
        <Link to="/authorization/underage">
          <ButtonStyled2>
            <strong>Menor de edad con tutor legal</strong>
          </ButtonStyled2>
        </Link>
      </Div>
    </Container>
  </Layout>
)

export default Index
