import React, { useState, useRef, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Render from "./../../components/RenderEngine"

const IndexPage = () => {
  const response = useStaticQuery(graphql`
    query rightsDataUnderageSpanishQuery {
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
  ).filter(({ page, category }) => page === "form_b" && category === "underage")

  // console.log(data)
  return (
    <Render
      link="/en/image-rights/underage"
      data={data}
      spanish
      page="form_b"
      category="underage"
    />
  )
}

export default IndexPage
