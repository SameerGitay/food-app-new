import React, { useState } from 'react'
import axios from 'axios'

export default function Signup() {
    const [userDetails, setUserDetails] = useState({ name: "", email: "", password: "", city: "pune" })


    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = JSON.stringify(userDetails);
        alert(userData)
        axios.post('http://localhost:7000/api/user', userData, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.data.success){
                setUserDetails({ name: "", email: "", password: "", city: "pune" })
            }else{
                console.log(response.data.msg)
            }
        })
        .catch(error => console.log(error))
    }

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }

    return (
        <section className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" id="exampleInputName" aria-describedby="nameHelp" onChange={handleChange} value={userDetails.name}/>
                    <div id="nameHelp" className="form-text">We'll never share your personal details with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} value={userDetails.email}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="exampleInputPassword1" onChange={handleChange} value={userDetails.password}/>
                </div>
                <button type="submit" className="btn btn-primary me-5">Sign up</button>
                <button type="submit" className="btn btn-success">Aready registered</button>
            </form>
        </section>
    )
}