import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { CartContext } from '../App'

export default function FoodCard({ item, itemOptions }) {
    delete itemOptions._id
    const optionKeys = Object.keys(itemOptions)

    const portionRef = useRef()

    const [quantity, setQuantity] = useState(1)
    const [portion, setPortion] = useState('')
    const cartContext = useContext(CartContext)

    const handleAddToCart = async () => {
        let currentCartItems = cartContext.cartState
        let temp = undefined

        for (const currentItem of currentCartItems) {
            if ((item._id === currentItem.id) && (portion === currentItem.portion)) {
                console.log("ITEM MATCH")
                temp = currentItem
                break
            }
        }

        if (temp) {
            console.log("ITEM FOUND IN CART")
            console.log(portion)
            console.log(temp.portion)
            //Only qantity has changed. So update existing item in cart

            console.log("UPDATING CART")
            await cartContext.cartDispatch({
                type: "UPDATE_CART",
                id: item._id,
                name: item.name,
                description: item.description,
                quantity,
                portion,
                totalPrice
            })
        } else {
            console.log("ADDING TO CART")
            await cartContext.cartDispatch({
                type: "ADD_TO_CART",
                id: item._id,
                name: item.name,
                description: item.description,
                quantity,
                portion,
                totalPrice
            })

        }

        console.log("#########################Cart########################")
        console.log(cartContext.cartState)
        console.log("#########################Cart########################")
    }

    useEffect(() => {
        setPortion(portionRef.current.value)
    },)

    let totalPrice = quantity * parseInt(itemOptions[portion])

    return (
        <>
            <div className="card mt-4" >
                <img className="card-img-top gofood-card-img" src={item.img} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <div className='container w-100'>
                        <select className='m-2 h-100 px-2 rounded' onChange={e => setQuantity(e.target.value)}>
                            {
                                Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })
                            }
                        </select>
                        <select className='m-2 h-100 px-2 rounded' ref={portionRef} onChange={e => setPortion(e.target.value)}>
                            {
                                optionKeys.map((key) => {
                                    return (<option key={key} value={key}>{key}</option>)
                                })
                            }
                        </select>
                        <div className='h-100 px-2 fs-6'>Total: <span>&#8377;</span> {totalPrice}</div>
                    </div>
                    <hr />
                    <button className='btn btn-success' onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </>
    )
}
