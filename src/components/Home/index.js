import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Products from '../Products'
import Category from '../Category'
import Footer from '../Footer'
import './index.css'

const statusConstants = {
  initial: 'Initial',
  success: 'Success',
  failure: 'Failure',
  loading: 'Loading',
}

class Home extends Component {
  state = {
    selectedId: '',
    status: statusConstants.initial,
    categoriesList: [],
  }

  componentDidMount() {
    this.getCataegoryListDetails()
  }

  successfulFetch = data => {
    this.setState({
      status: statusConstants.success,
      categoriesList: [...data],
      selectedId: data[0].name,
    })
  }

  failedFetch = () => {
    this.setState({
      status: statusConstants.failure,
    })
  }

  getCataegoryListDetails = async () => {
    this.setState({status: statusConstants.loading})

    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis2.ccbp.in/nxt-mart/category-list-details'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()
    console.log(response)
    console.log(fetchedData)
    if (response.ok) {
      this.successfulFetch(fetchedData.categories)
    } else {
      this.failedFetch()
    }
  }

  updateActiveCategory = name => {
    this.setState({selectedId: name})
  }

  getFilteredData = () => {
    const {categoriesList} = this.state
    const {selectedId} = this.state
    const filteredData = categoriesList.filter(each => each.name === selectedId)
    return filteredData
  }

  retry = () => {
    this.setState(
      {status: statusConstants.loading},
      this.getCataegoryListDetails,
    )
  }

  renderLoadingView = () => (
    <div className="loader-container loader-class" data-testid="loader">
      <Loader type="ThreeDots" color="#088c03" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/djan3q2wv/image/upload/v1740137179/Group_7519_wofdu7.png"
        alt="failure view"
      />
      <div className="retry-block">
        <h1>Oops! Something went wrong.</h1>
        <p>We are having some trouble</p>
        <button type="button" className="retry-button" onClick={this.retry}>
          Retry
        </button>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const data = this.getFilteredData()
    const {selectedId, categoriesList} = this.state
    return (
      <>
        <Category
          details={categoriesList}
          updateActiveCategory={this.updateActiveCategory}
          activeCategory={selectedId}
        />
        <div className="products-container">
          {data.map(eachItem => (
            <Products key={eachItem.name} productDetails={eachItem} />
          ))}
        </div>
      </>
    )
  }

  renderMainView = () => {
    const {status} = this.state
    switch (status) {
      case statusConstants.success:
        return this.renderSuccessView()
      case statusConstants.failure:
        return this.renderFailureView()
      case statusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">{this.renderMainView()}</div>
        <Footer />
      </>
    )
  }
}

export default Home
