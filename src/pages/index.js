import React from "react"
import { Link } from "gatsby"
// import SEO from "../components/seo"
import Layout from "../components/layout"
import MainHeader from "../components/MainHeader"
import styled from "styled-components"
import { Typography, Button } from "antd"
import { Container, media } from "../components/styles"

const ButtonStyled1 = styled(Button)`
  &.ant-btn {
    background: var(--authorization);
    width: 500px;
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

const Index = () => (
  <Layout>
    <MainHeader link="/en" spanish />
    <Container>
      <Div>
        <Typography.Text strong>
          Por favor seleccione el tipo de formulario
        </Typography.Text>
        <br />
        <br />
        <Link to="/authorization">
          <ButtonStyled1>
            <strong>Autorización / Publicación</strong>
          </ButtonStyled1>
        </Link>
        <br />
        <br />
        <Link to="/image-rights">
          <ButtonStyled2>
            <strong>Cesión de derechos de imagen</strong>
          </ButtonStyled2>
        </Link>
      </Div>
    </Container>
  </Layout>
)

export default Index
