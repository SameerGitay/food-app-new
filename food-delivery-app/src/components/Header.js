import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CartModal from '../CartModal'
import Cart from '../pages/Cart'
import { CartContext } from '../App'

export default function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Pending - Call the server to logout
    localStorage.removeItem('authtoken')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const [cartView, setCartView] = useState(false)
  const cartContext = useContext(CartContext)

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand ms-2" to="/">GoFood</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {
              localStorage.getItem('authtoken')
                ?
                <li className="nav-item active">
                  <Link className="nav-link" to="/myorders">My Orders</Link>
                </li>
                : ""
            }
          </ul>
          {
            (!localStorage.getItem('authtoken'))
              ?
              <div className="d-flex ms-auto">
                <Link className="btn bg-white text-success me-2" to="/login">Login</Link>
                <Link className='btn bg-white text-success me-2' to='/signup'>Sign up</Link>
              </div>
              : <div className='d-flex ms-auto'>
                <div className="btn bg-white text-success me-2 position-relative" onClick={() => setCartView(true)}>Cart
                  {cartContext.cartState.length
                    ? <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartContext.cartState.length}</span>
                    : ""
                  }
                </div>
                {cartView ? <CartModal onClose={() => setCartView(false)}><Cart /></CartModal> : null}
                <button className="btn bg-white text-success me-2" onClick={handleLogout}>Logout</button>
              </div>
          }


        </div>
      </nav>
    </>
  )
}
