import React from 'react'
import  WorkPageTemplate from '../../templates/work'

const WorkPagePreview = ({ entry, widgetFor }) => {
    let ent = entry.getIn(['data']).toJS()
    let {featuredimage, title, description, url, type, postContent} = ent;
    let {slug, mediaFiles,collection} = entry.toJS();
    return (
        //   <WorkPageTemplate
        //     title={entry.getIn(['data', 'title'])}
        //     content={widgetFor('description')}
        //   />
        <div className="stuff">
               <WorkPageTemplate data={{
                markdownRemark: {
                    frontmatter: {
                        featuredimage, 
                        title, 
                        description, 
                        url, 
                        type, 
                        postContent,  
                        mediaFiles, 
                        collection
                    },
                    fields: {
                        slug,
                    },
                }
               }}
           />
        </div>
    )

}



// WorkPagePreview.propTypes = {
//   entry: PropTypes.shape({
//     getIn: PropTypes.func,
//   }),
//   widgetFor: PropTypes.func,
// }

export default WorkPagePreview
