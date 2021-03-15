import React, { useState, useRef, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Render from "../../../components/RenderEngine"

const IndexPage = () => {
  const response = useStaticQuery(graphql`
    query underageQuery {
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

  const data = JSON.parse(
    response.allMongodbFormsForms.edges[0].node.data
  ).filter(({ page, category }) => page === "form_a" && category === "underage")

  // console.log(data)
  return (
    <Render
      data={data}
      link="/authorization/underage"
      page="form_a"
      category="underage"
    />
  )
}

export default IndexPage
