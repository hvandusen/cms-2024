// create a simple gatsby page component for an about page with a title and body

// Path: src/components/About.js
import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { HTMLContent } from "../components/Content"

export const AboutPageTemplate = ({ title, content }) => {
  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">{title}</h2>
              <HTMLContent content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}