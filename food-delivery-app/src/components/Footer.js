import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-muted">© 2024 GoFood, Inc</p>

        <Link href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <svg className="bi me-2" width="40" height="32"></svg>
        </Link>

        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item"><Link href="#" className="nav-link px-2 text-muted">Privacy Policy</Link></li>
          <li className="nav-item"><Link href="#" className="nav-link px-2 text-muted">FAQs</Link></li>
          <li className="nav-item"><Link href="#" className="nav-link px-2 text-muted">About</Link></li>
        </ul>
      </footer>
    </div>
  )
}
