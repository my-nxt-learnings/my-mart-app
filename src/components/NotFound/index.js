import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <div className="notfound">
      <img
        src="https://res.cloudinary.com/djan3q2wv/image/upload/v1740147044/Group_7520_uolc1x.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound
