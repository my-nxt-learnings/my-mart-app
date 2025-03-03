import {Component} from 'react'
import './index.css'

class ProductCard extends Component {
  state = {quantity: 0}

  addCartItem = productDetails => {
    const cartList = JSON.parse(localStorage.getItem('cartData')) || []
    const isProductPresent = cartList.filter(
      each => each.id === productDetails.id,
    )

    let updatedList

    if (isProductPresent.length > 0) {
      updatedList = cartList.map(each => {
        if (each.id === productDetails.id) {
          const quantity = productDetails.quantity + 1
          return {...each, quantity}
        }
        return each
      })
    } else {
      updatedList = [...cartList, {...productDetails, quantity: 1}]
    }

    localStorage.setItem('cartData', JSON.stringify(updatedList))

    this.setState({quantity: 1})
  }

  incrementCartItemQuantity = id => {
    const cartList = JSON.parse(localStorage.getItem('cartData')) || []
    const updatedList = cartList.map(each => {
      if (each.id === id) {
        const quantity = each.quantity + 1
        return {...each, quantity}
      }
      return each
    })
    localStorage.setItem('cartData', JSON.stringify(updatedList))
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  decrementCartItemQuantity = id => {
    const cartList = JSON.parse(localStorage.getItem('cartData')) || []
    const productDetails = cartList.find(each => each.id === id)
    let updatedList

    if (productDetails.quantity > 1) {
      console.log(productDetails.quantity)
      updatedList = cartList.map(each => {
        if (each.id === id) {
          const quantity = each.quantity - 1
          return {...each, quantity}
        }
        return each
      })
    } else {
      updatedList = cartList.filter(each => each.id !== id)
    }
    localStorage.setItem('cartData', JSON.stringify(updatedList))
    this.setState(prevState => ({
      quantity: prevState.quantity - 1,
    }))
  }

  render() {
    const {quantity} = this.state
    const {details} = this.props
    const {id, name, weight, price, image} = details
    return (
      <li className="product-card" data-testid="product">
        <img src={image} alt={name} className="image" />
        <div className="product-details">
          <div className="info">
            <p className="product-name">{name}</p>
            <p className="product-weight">{weight}</p>
            <p className="product-price">{price}</p>
          </div>
          {quantity > 0 ? (
            <div className="controls">
              <button
                type="button"
                className="control-btn"
                data-testid="decrement-count"
                onClick={() => this.decrementCartItemQuantity(id)}
              >
                -
              </button>
              <p className="quantity" data-testid="active-count">
                {quantity}
              </p>
              <button
                type="button"
                className="control-btn"
                data-testid="increment-count"
                onClick={() => this.incrementCartItemQuantity(id)}
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn"
              data-testid="add-button"
              onClick={() => this.addCartItem({...details, quantity})}
            >
              Add
            </button>
          )}
        </div>
      </li>
    )
  }
}
export default ProductCard
