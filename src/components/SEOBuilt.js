import React from 'react'
import SEO from './seo'

export default function SEOBuilt({ spanish }) {
  return <SEO title={spanish ? 'Luis Muñoz Fotografía / Formularios' : 'Luis Muñoz Photography / Forms'} description={spanish ? 'Luis Muñoz - Fotografía profesional Arquitectura / Editorial / Producto Formularios y autorizaciones' : 'Luis Muñoz - Professional Photography Architecture / Editorial / Product Forms and authorizations'}/>
}
