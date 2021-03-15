import React, { useState, useRef, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Render from "./../../../components/RenderEngine"

const IndexPage = () => {
  const response = useStaticQuery(graphql`
    query rightsDataUnderageQuery {
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
  console.log("Res -> ", response)
  const data = JSON.parse(
    response.allMongodbFormsForms.edges[0].node.data
  ).filter(({ page, category }) => page === "form_b" && category === "underage")

  return (
    <Render
      link="/image-rights/underage"
      data={data}
      page="form_b"
      category="underage"
    />
  )
}

export default IndexPage
