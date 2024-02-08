import CMS from 'decap-cms-app'
// import uploadcare from 'decap-cms-media-library-uploadcare'
import cloudinary from 'decap-cms-media-library-cloudinary'

// import * as scss from '!css-loader!sass-loader!../components/all.scss'

import WorkPagePreview from './preview-templates/WorkPagePreview'
//depending on if we're in production or development, run registerPreviewStyle with the appropriate css
// if(process.env.NODE_ENV === "production"){
    
// } else {
//     CMS.registerPreviewStyle(scss.default.toString(), { raw: true });
// }

CMS.registerPreviewStyle("/commons.css");

// import BlogPostPreview from './preview-templates/BlogPostPreview'
// import ProductPagePreview from './preview-templates/ProductPagePreview'
// import IndexPagePreview from './preview-templates/IndexPagePreview'
CMS.registerPreviewTemplate("work", WorkPagePreview);


// CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary) 

function block(obj){
    if(obj.img)
    console.log("HEEEEEEENRY",obj, obj.img[0].indexOf(".mp4"))
    const isImage = obj.img && obj.img[0].indexOf(".mp4") === -1
    return `<div class='caption-container ${isImage ? "image-caption" : "video-caption"}'>
      ${isImage ? `<img src=${obj.img}></img>` : `<div class="mobile-video-cover"><video playsinline autoplay muted loop src=${obj.img}></video></div>`}
    <div class='caption'>${typeof obj.caption !== "undefined" ?  obj.caption : ""}</div></div>`;
  }
  
  CMS.registerEditorComponent({
    // Internal id of the component
    id: "caption",
    // Visible label
    label: "Img/Vid w Caption",
    // Fields the user need to fill out when adding an instance of the component
    fields: [
      {name: 'img', label: 'Image', widget: 'image'},
    {name: 'caption', label: 'Caption', widget: 'text'}],
    // Pattern to identify a block as being an instance of this component
    pattern: /^caption (\S+)$/,
    // Function to extract data elements from the regexp match
    fromBlock: function(match) {
      console.log("match", match)
      let captionz = match[1].split("~")[0]
      const attempt = {
        caption: captionz ? captionz : "",
        img: match[1].split("~")[1]
      }
      console.log("attempt: ", attempt)
      return attempt;
    },
    // Function to create a text block from an instance of this component
    toBlock: block,
    // Preview output for this component. Can either be a string or a React component
    // (component gives better render performance)
    toPreview: block
  });
