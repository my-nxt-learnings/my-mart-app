import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {CgProfile} from 'react-icons/cg'
import {RiLockPasswordLine} from 'react-icons/ri'

const initialState = {
  name: '',
  password: '',
  showPassword: false,
  showError: false,
  errorMsg: '',
}

class LoginForm extends Component {
  state = initialState

  changeName = event => {
    this.setState({name: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  changeCheck = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  renderSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    const {history} = this.props
    history.replace('/')
  }

  renderFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({
      showError: true,
      errorMsg,
    })
  }

  submitForm = async event => {
    event.preventDefault()
    const {name, password} = this.state
    const userDetails = {username: name, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const fetchedData = await fetch('https://apis.ccbp.in/login', options)
    const response = await fetchedData.json()
    console.log(fetchedData)
    if (fetchedData.ok) {
      this.renderSuccess(response.jwt_token)
    } else {
      this.renderFailure(response.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {name, password, showPassword, showError, errorMsg} = this.state

    const passwordType = showPassword ? 'text' : 'password'

    return (
      <div className="login-container">
        <div className="input-container">
          <img
            src="https://res.cloudinary.com/djan3q2wv/image/upload/v1740051362/Logo_2NxtMartLogo_f5gpzd.png"
            className="login-logo"
            alt="login website logo"
          />

          <form onSubmit={this.submitForm} className="form-container">
            <div className="input-top-container">
              <div className="text-password-conatiner">
                <label htmlFor="textInput" className="input-label">
                  Username
                </label>
                <br />
                <div className="logo-input-container">
                  <CgProfile />
                  <input
                    id="textInput"
                    type="text"
                    value={name}
                    className="input-text"
                    onChange={this.changeName}
                  />
                </div>
              </div>
              <div className="text-password-conatiner">
                <label htmlFor="passwordInput" className="input-label">
                  Password
                </label>
                <br />
                <div className="logo-input-container">
                  <RiLockPasswordLine />
                  <input
                    id="passwordInput"
                    type={passwordType}
                    value={password}
                    className="input-text"
                    onChange={this.changePassword}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="checkbox-label-container">
                <input
                  type="checkbox"
                  id="checkboxInput"
                  className="check-box"
                  onChange={this.changeCheck}
                />
                <label className="checkbox-label" htmlFor="checkboxInput">
                  Show Password
                </label>
              </div>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showError && <p className="error_msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
