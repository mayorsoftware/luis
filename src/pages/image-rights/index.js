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
    background: var(--legal2);
    width: 500px;
    font-size: var(--textSize);
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
    font-size: var(--textSize);
    width: 500px;
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
    <MainHeader link="/en/image-rights" spanish />
    <Container>
      <Div>
        <Typography.Text strong>
          Cesión de Derechos de Imagen Autorización para la realización y
          Publicación de fotografías, vídeo y audio.
        </Typography.Text>
        <br />
        <br />
        <Typography.Text>Seleccione una de estas opciones</Typography.Text>
        <br />
        <br />
        <Link to="/image-rights/legal">
          <ButtonStyled1>
            <strong>Mayores de edad</strong>
          </ButtonStyled1>
        </Link>
        <br />
        <br />
        <Link to="/image-rights/underage">
          <ButtonStyled2>
            <strong>Menor de edad con tutor legal </strong>
          </ButtonStyled2>
        </Link>
      </Div>
    </Container>
  </Layout>
)

export default Index
