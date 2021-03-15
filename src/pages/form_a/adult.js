import React from "react"
// import { Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import ShowData from "../../components/ShowData"
import Header from "../../components/header"
// import FormContext, { Context } from "./../FormContext"
import { Container } from "./../../components/styles"
import PrivateRoute from "./../../components/PrivateRoute"

const AdultPrivatePage = () => (
  <>
    <Header page="form_a" category="adult" />
    <SEO title="Home" />
    <Container>
      <ShowData page="form_a" category="adult" />
    </Container>
  </>
)

const IndexPage = () => {
  return (
    <>
      <Layout>
        <PrivateRoute component={AdultPrivatePage} />
      </Layout>
    </>
  )
}

export default IndexPage
