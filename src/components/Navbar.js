import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/ellsworth-shape-logo-padding.png'
import cartLogo from '../img/ellsworth-shape-cart.png'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
      emailCopied: false
    }
  }

  toggleMenu = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    const cartmode = this.props.cartcount > 0
    return (
      <nav
        className={`navbar is-transparent ${this.state.navBarActiveClass}`}
        role="navigation"
        aria-label="main-navigation"
      >
        <Link to="/" className="navbar-item navbar-icon" title="henry van dusen homepage">
          <div className={`nav-icon ${(cartmode ? 'cart-mode' : "")}`}
          role="menu" tabIndex={0}
          data-target="nav"
          style={{
            backgroundImage: `url(${(cartmode ? cartLogo : logo)})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"

          }}
          onClick={() => this.toggleMenu()}
          onKeyPress={console.log}
          ></div>
        </Link>
        <Link to="/" id="nav-main-link" className="navbar-item" title="henry van dusen homepage"><h1 className="header"><span>H</span><span>e</span><span>n</span><span>r</span><span>y</span><span> </span><span>V</span><span>a</span><span>n</span><span> </span><span>D</span><span>u</span><span>s</span><span>e</span><span>n</span></h1></Link>
        <button className={`email ${this.state.emailCopied ? "copied" : ""}`}type="email" value="henry@candusen.net" onClick={() => {
          navigator.clipboard.writeText("henry@candusen.net");
          this.setState({emailCopied: true});
        }}>{this.state.emailCopied ? "Email copied!" : "Wanna work together?"}</button>
        <div className="container">
          <div className="navbar-brand">

          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
