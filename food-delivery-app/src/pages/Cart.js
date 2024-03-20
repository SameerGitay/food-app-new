import React from 'react'
import { CartContext } from '../App'
import { useContext } from 'react'
import axios from 'axios'

export default function Cart() {
    const cartContext = useContext(CartContext)

    let data = cartContext.cartState
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center text-white fs-3'>The Cart Is Empty!</div>
            </div>
        )

    }

    let finalTotal = data.reduce((total, food) => total + food.totalPrice, 0)

    const handleOrder = () => {
        const userEmail = localStorage.getItem('user')


        axios.post('http://localhost:7000/api/order', {
            order_data: data,
            email: userEmail,
            order_date: new Date().toDateString()
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.data.success) {
                    console.log("Order created succfully")
                    cartContext.cartDispatch({type:'DROP_CART'})
                } else {
                    console.log(response.data.msg)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            <div className='container m-auto mt-5'>
                <table className='table'>
                    <thead className='fs-4 text-success'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amout</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((food, index) => (
                            <tr className='fs-6 text-success'>
                                <td>{index + 1}</td>
                                <td>{food.name}</td>
                                <td>{food.quantity}</td>
                                <td>{food.portion}</td>
                                <td><span>&#8377; </span>{food.totalPrice}</td>
                                <td>
                                    <button type='button' className='btn p-2 btn-outline-success' onClick={() => cartContext.cartDispatch({ type: 'REMOVE_FROM_CART', index })}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                    </svg> Remove</button>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
                <div><h1 className='fs-2 text-success mt-8'>Total Price - <span>&#8377; </span>{finalTotal}</h1></div>
                <div>
                    <button className='btn btn-success' onClick={handleOrder}>Order Now</button>
                </div>
            </div>
        </div>
    )
}
