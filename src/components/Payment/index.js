import {Link} from 'react-router-dom'
import './index.css'

const Payment = () => (
  <div className="success-container">
    <img
      src="https://res.cloudinary.com/dezjxjqqp/image/upload/v1709987763/success_x9ndwy.png"
      alt="success"
    />
    <h1 className="text">Payment Successful</h1>
    <p className="info">Thank you for ordering</p>
    <p className="info">Your payment is successfully completed.</p>
    <Link to="/" className="link-to-home">
      <button type="button" className="return-btn">
        Return to Homepage
      </button>
    </Link>
  </div>
)
export default Payment
