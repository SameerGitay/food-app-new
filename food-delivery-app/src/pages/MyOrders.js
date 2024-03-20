import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

export default function MyOrders() {
    const [orderData, setOrderData] = useState([])
    let userEmail = localStorage.getItem('user')
    useEffect(() => {
        axios.post('http://localhost:7000/api/orders', {
            email: userEmail
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.data.data)
            setOrderData(response.data.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const calculateOrderTotal = (item) =>{
        let orderTotal = 0;
        console.log("Calculating Total")
        console.log(item)
        item.map((i,index) =>{
            if(index > 0){
                orderTotal += parseInt(i.totalPrice);
            }
        })
        return orderTotal
    }
    return (
        <div className='container'>
            <div className='row'>
    {
        orderData.length ? (
            orderData.map((order, index) => {
                let orderTotal = calculateOrderTotal(order)
                return order.map((item, innerIndex) => { 
                    if (innerIndex === 0) {
                        
                        return (
                            <div key={index + '-' + innerIndex}>
                                <div className='ms-auto mt-5 fs-5'>
                                    {order[0].Order_Date} - Order Total <span>&#8377;</span> {orderTotal}
                                </div>
                                <hr />
                            </div>
                        );
                    } else {
                         
                        return (
                            <div className='col-12 col-md-6 col-lg-3' key={index + '-' + innerIndex}>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h5 className='card-title'>{item.name}</h5>
                                        <hr />
                                        <p className="card-text">{item.description}</p>
                                        <div className='h-100 px-2 fs-6'>Quantity: {item.quantity} Total: <span>&#8377;</span> {item.totalPrice}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })
            })
        ) : "No Orders Found"
    }
</div>

        </div>
    )
}
