import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import EmptyCartView from '../EmptyCartView'
import Payment from '../Payment'
import './index.css'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cartItems: [],
      isCheckedOut: false,
    }
  }

  componentDidMount() {
    const storedCartItems = JSON.parse(localStorage.getItem('cartData')) || []
    this.setState({cartItems: storedCartItems})
  }

  removeAll = () => {
    localStorage.removeItem('cartData')
    this.setState({cartItems: []})
  }

  handleIncrement = itemId => {
    const {cartItems} = this.state
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        }
      }
      return item
    })

    localStorage.setItem('cartData', JSON.stringify(updatedCartItems))
    this.setState({cartItems: updatedCartItems})
  }

  handleDecrement = itemId => {
    const {cartItems} = this.state
    const updatedCartItems = cartItems
      .map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          }
        }
        return item
      })
      .filter(item => item.quantity > 0)

    localStorage.setItem('cartData', JSON.stringify(updatedCartItems))
    this.setState({cartItems: updatedCartItems})
  }

  calculateTotalPrice = () => {
    const {cartItems} = this.state
    return cartItems.reduce(
      (total, item) =>
        total + parseFloat(item.price.replace('₹', '')) * item.quantity,
      0,
    )
  }

  calculateTotalUniqueProducts = () => {
    const {cartItems} = this.state
    return cartItems.length
  }

  checkOut = () => {
    localStorage.removeItem('cartData')
    this.setState({isCheckedOut: true})
  }

  renderCartView = () => {
    const {isCheckedOut, cartItems} = this.state
    return (
      <>
        {isCheckedOut ? (
          <Payment />
        ) : (
          <div id="if-cart-container">
            <div id="remove-section">
              <h1 id="cart-head">Items</h1>
              <button
                type="button"
                id="hyper-converter"
                onClick={this.removeAll}
              >
                Remove all
              </button>
            </div>

            <ul className="boxsy-container">
              <div className="cart-added-items">
                {cartItems.map(item => (
                  <div>
                    <li key={item.id} data-testid="cartItem" id="cart-item">
                      <div className="imgandcontent">
                        <img
                          src={item.image}
                          alt={item.name}
                          id="sub-list-image"
                        />
                        <div id="content-box">
                          <p id="item-naam">{item.name}</p>
                          <p id="item-eight">{item.weight}</p>
                          <p id="item-rice">{item.price}</p>
                        </div>
                      </div>
                      <div className="item-quantity">
                        <button
                          type="button"
                          className="cart-inc cart-dec"
                          data-testid="decrement-quantity"
                          onClick={() => this.handleDecrement(item.id)}
                        >
                          -
                        </button>
                        <div className="quantity" data-testid="item-quantity">
                          {item.quantity}
                        </div>
                        <button
                          type="button"
                          className="cart-inc"
                          data-testid="increment-quantity"
                          onClick={() => this.handleIncrement(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </li>
                    <hr />
                  </div>
                ))}
              </div>
              <div id="priceandcheckout">
                <div>
                  <h1>
                    Total ({' '}
                    <span style={{color: 'red'}}>
                      {this.calculateTotalUniqueProducts()}{' '}
                    </span>{' '}
                    items ):{' '}
                  </h1>{' '}
                  <p data-test-id="total-price">
                    ₹ {this.calculateTotalPrice().toFixed(2)}{' '}
                  </p>
                </div>
                <button type="button" id="checkout" onClick={this.checkOut}>
                  Checkout
                </button>
              </div>
            </ul>
          </div>
        )}
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    const {cartItems} = this.state

    return (
      <div>
        <Header />
        <div className="cartsy-container">
          {cartItems.length === 0 ? <EmptyCartView /> : this.renderCartView()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Cart
