import React, { useState, useRef, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Render from "../../../components/RenderEngine"

const IndexPage = () => {
  const response = useStaticQuery(graphql`
    query dataQuery {
      allMongodbFormsForms {
        edges {
          node {
            data
            id
          }
        }
      }
    }
  `)

  console.log(
    "Res => ",
    JSON.parse(response.allMongodbFormsForms.edges[0].node.data)
  )
  const data = JSON.parse(
    response.allMongodbFormsForms.edges[0].node.data
  ).filter(({ page, category }) => page === "form_a" && category === "adult")

  console.log("Data ->", data)

  console.log(data)
  const Renderer = () => (
    <Render
      data={data}
      link="/authorization/legal"
      page="form_a"
      category="adult"
    />
  )
  return <Renderer />
}

export default IndexPage
