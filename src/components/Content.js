import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from "gatsby-plugin-image"
import md from 'snarkdown';
import YoutubeEmbed from "./YoutubeEmbed"

export const clickedContent = (e) => {
  const {target} = e;
  if(target.play){
    target.play()
    target.parentElement.className = target.parentElement.className+" clicked"
  }
}

export const HTMLContent = ({ content, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
)


const Content = ({ content, className }) => {
  console.log(content)
  return (
  <div role="button" onClick={clickedContent} onKeyDown={clickedContent} tabIndex={0} className={className}>{content}</div>
  )
}
// export const Blocks = () => <div>hello</div>;
export const Blocks = ({ postContent, images }) => {
  let imagesUsed = 0;
  console.log("yes",{postContent})
  console.log("images: ",images)
  return postContent.length === 0 ? [] : postContent.map((block,i) => {
    switch (block.type) {
      case "text":
        console.log(block.text)
        return <p key={i} className={"block block-text work-text"}
        dangerouslySetInnerHTML={{__html: md(block.text)}}>
        </p>;
      case "image":
          return (<div key={i} className='caption-container image-caption block block-image work-image'>
              <GatsbyImage image={images[imagesUsed++].childImageSharp.gatsbyImageData} alt="" />
            {block.caption && <div className='caption'>{block.caption}</div>}
            </div>)

      case "video":
        return <div key={i} className={"caption-container block block-video work-video videowrapper"}>
          <div className="mobile-video-cover">
            <video playsInline webkit-playsinline="true" autoPlay loop muted key={i} src={block.video[0]}></video>
            </div>
            {block.caption && <div className='caption'>{block.caption}</div>}
          </div>
      case "youtube":
        return <div key={i} className={"caption-container block block-video work-video videowrapper"}>
          <div className="mobile-video-cover">
            <YoutubeEmbed embedId={block.text.indexOf("v=")> -1 ? block.text.split("v=")[1] : block.text} />
            </div>
            {block.caption && <div className='caption'>{block.caption}</div>}
          </div>
      case "code":
        return <div key={i} className={"block block-code work-code"}>code</div>

      default:

    }
  });
}


Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes

export default Content
