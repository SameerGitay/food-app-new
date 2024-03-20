import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [credetials,setCredentials] = useState({email:"",password:""})
  const navigate = useNavigate()

  const handleChange = (e)=>{
    setCredentials({...credetials,[e.target.name]:e.target.value})
  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    axios.post('http://localhost:7000/api/login',credetials,{
      headers:{
         'Content-Type':'application/json'
      }
    })
    .then(resonse => {
      if(resonse.data.success){
        localStorage.setItem('authtoken',resonse.data.authToken)
        localStorage.setItem('user',credetials.email)

        setCredentials({email:"",password:""})
        navigate("/")
      }else{
        console.log(resonse.data.msg)
      }
    })
    .catch(error => console.log(error))
    
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" name="email" value={credetials.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" name="password" value={credetials.password} className="form-control" id="exampleInputPassword1" onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary me-5">Login</button>
        <button type="submit" className="btn btn-success me-5">Don't have a account</button>
      </form>
    </>
  )
}
