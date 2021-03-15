import React from "react"
// import { Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import ShowData from "../../components/ShowData"
import Header from "../../components/header"
// import FormContext, { Context } from "./../FormContext"
import { Container } from "./../../components/styles"
import PrivateRoute from "./../../components/PrivateRoute"

const UnderagePrivatePage = () => (
  <>
    <Header page="form_a" category="underage" />
    <SEO title="Home" />
    <Container>
      <ShowData page="form_a" category="underage" />
    </Container>
  </>
)

const IndexPage = () => {
  return (
    <Layout>
      <PrivateRoute component={UnderagePrivatePage} />
    </Layout>
  )
}

export default IndexPage
