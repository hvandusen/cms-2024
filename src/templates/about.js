//simple about page component with title and body 
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

const AboutPage = ({data} ) => {
    const { markdownRemark: post } = data
    let title = post.frontmatter.title
    let content = post.html
    return (
        <Layout>
        <div>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{__html: content}} />
        </div>
        </Layout>
    )
}

export const pageQuery = graphql`
  query aboutPage {
    markdownRemark(frontmatter: { templateKey: { eq: "about" } }) {
      frontmatter {
        title
      }
      html
    }
  }
  
`

export default AboutPage