/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"
import "antd/dist/antd.css"
import FormContext from "./../FormContext"
import { Normalize } from "./styles"
// import netlifyIdentity from "netlify-identity-widget"

const Layout = ({ children, page, category }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  // useEffect(() => {
  //   window.netlifyIdentity = netlifyIdentity
  //   netlifyIdentity.init()
  // }, [])
  return (
    <FormContext>
      <Normalize />
      <main>{children}</main>
    </FormContext>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

// export const Provider = Context.Provider
// export const Consumer = Context.Consumer

// // export Context

export default Layout
