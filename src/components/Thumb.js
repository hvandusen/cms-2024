import React from 'react'
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { convertToBgImage } from "gbimage-bridge"

const num = (range) => Math.floor(Math.random()*range)

const Thumb = ({work,filter}) =>{
  // console.log("work supplied at one", work)
  const fm = work.frontmatter
  const workType = fm.type
  const theClass = " thumb thumb-"+fm.type.split(" ")[0].toLowerCase()
  const img = getImage(work.featuredImg)
  let thumbSize = {};
  if(fm.grid_col) thumbSize.gridColumn = `span ${fm.grid_col}`;
  if(fm.grid_row) thumbSize.gridRow = `span ${fm.grid_row}`;
  let bgImg;
  try {
    bgImg = convertToBgImage(img)
  } catch (e) {
  }
  switch(workType){
    default:
    return <Link to={work.fields.slug} className={theClass+" wrappler"} style={thumbSize}>
      <span className="thumb-label color">{workType === 'Candusen page' ? "fun" : workType}</span>
      <p className="thumb-title">{fm.title.replace(".com"," . com")}</p>
      <p className="thumb-description">{fm.description}</p>
      {bgImg ?
        <BackgroundImage
          {...bgImg}
          className="thumb-image"
          preserveStackingContext
          style={{
            backgroundSize: "contain",
            backgroundPosition: "top",
            backgroundImage: `url(${bgImg ? '' : img.images.fallback.src})`
          }}>
      </BackgroundImage> :
      <GatsbyImage image={img} alt={"we testin"} />
    }


    </Link>
    case "Candusen page":
      return <Link to={work.fields.slug} className={(theClass)+" wrappler"} style={{
          transform: `rotate(${num(20)} translate(${num(40)-20}px,${num(40)-20}px)`
        }}>
        {bgImg ?
          <BackgroundImage
            // Spread bgImage into BackgroundImage:
            {...bgImg}
            className="thumb-image"
            preserveStackingContext
            style={{
              backgroundSize: "contain",
              backgroundImage: `url(${bgImg ? '' : img.images.fallback.src})`
            }}
          >
        </BackgroundImage> :
        <GatsbyImage image={img} alt={"we testin"} />
      }
      </Link>
    case "Drawing":
      return <Link to={work.fields.slug} className={(theClass)+" wrappler"}>
        {bgImg ?
          <BackgroundImage
            // Spread bgImage into BackgroundImage:
            {...bgImg}
            className="thumb-image"
            preserveStackingContext
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${bgImg ? '' : img.images.fallback.src})`
            }}
          >
        </BackgroundImage> :
        <GatsbyImage image={img} alt={"we testin"} />
      }
      </Link>
  }
}

export default Thumb
