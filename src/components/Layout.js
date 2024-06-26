import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
// import Cart from '../components/Cart'
import './all.scss'
// import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'
// import { useShoppingCart } from 'use-shopping-cart'
// const netlifyIdentity = require('netlify-identity-widget');
const TemplateWrapper = ({pageClass, children }) => {
  // const {cartCount} = useShoppingCart()

  // const { title, description } = useSiteMetadata()
//   useEffect(() => {
//     netlifyIdentity.init();  
//   }, []);
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>Henry Van Dusen</title>
        <meta name="description" content="henry van dusen's work :)" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content="Henry Van Dusen" />
        <meta property="og:url" content="/" />
        {/* <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        /> */}
      </Helmet>
      {/* <Cart cartcount={cartCount}/> */}
      <Navbar />
      <div id="page" className={pageClass}>{children}</div>
        <Footer />
    </div>
  )
}

export default TemplateWrapper
