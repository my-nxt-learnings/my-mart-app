import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

const linkConstants = {
  home: 'home',
  cart: 'cart',
}

class Header extends Component {
  state = {selectedLink: linkConstants.home}

  clickHome = () => {
    const {history} = this.props

    this.setState(
      {
        selectedLink: linkConstants.home,
      },
      () => {
        history.replace('/')
      },
    )
  }

  clickCart = () => {
    const {history} = this.props

    this.setState(
      {
        selectedLink: linkConstants.cart,
      },
      () => {
        history.replace('/cart')
      },
    )
  }

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {selectedLink} = this.state
    const homeClass =
      selectedLink === linkConstants.home ? 'selected' : 'unselected'
    const cartClass =
      selectedLink === linkConstants.cart ? 'selected' : 'unselected'

    return (
      <nav className="navbar">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/djan3q2wv/image/upload/v1740051362/Logo_2NxtMartLogo_f5gpzd.png"
            className="login-logo"
            alt="website logo"
          />
        </Link>
        <div className="home-cart-logout">
          <button type="button" onClick={this.clickHome} className={homeClass}>
            Home
          </button>

          <button type="button" onClick={this.clickCart} className={cartClass}>
            Cart
          </button>

          <button
            type="button"
            className="logout-container"
            onClick={this.onLogout}
          >
            <img
              src="https://res.cloudinary.com/djan3q2wv/image/upload/v1740063005/logout_mesfip.png"
              className="logout-logo"
            />
            <p className="logout-text">Logout</p>
          </button>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
