import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header({resolveSearch}) {
  const [searchTerm,setSearchTerm] = useState('')
  
  const handleSubmit = (e)=>{
    resolveSearch(searchTerm)
    e.preventDefault()
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    if(e.target.value === ""){
      resolveSearch(e.target.value)
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/">GoFood</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/signup'>Sign up</Link>
            </li>
          </ul>

          <form className="d-flex ms-auto" onSubmit={handleSubmit}>
            <input className="form-control me-2" type="search" 
            placeholder="Search" aria-label="Search" value={searchTerm} 
            onChange={handleChange}/>

            {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
          </form>
        </div>
      </nav>
    </>
  )
}
