import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <div className="empty-container">
      <img
        src="https://res.cloudinary.com/djan3q2wv/image/upload/v1740228326/Logo_ekg3f0.png"
        className="cart-empty-img"
        alt="empty cart"
      />
      <h1 className="cart-empty-heading">Your cart is empty</h1>
      <Link to="/">
        <button type="button" className="shop-now-btn">
          Shop Now
        </button>
      </Link>
    </div>
  </div>
)

export default EmptyCartView
