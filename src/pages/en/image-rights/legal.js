import React, { useState, useRef, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Render from "../../../components/RenderEngine"

const IndexPage = () => {
  const response = useStaticQuery(graphql`
    query rightsDataQuery {
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
  ).filter(({ page, category }) => page === "form_b" && category === "adult")

  // console.log(data)
  return (
    <Render
      link="/image-rights/legal"
      data={data}
      page="form_b"
      category="adult"
    />
  )
}

export default IndexPage
