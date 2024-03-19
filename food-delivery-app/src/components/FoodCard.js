import React from 'react'

export default function FoodCard({itemName,itemImage,itemDescription,itemOptions}) {
    delete itemOptions._id
    const optionKeys =Object.keys(itemOptions)
    
    
    return (
        <>
            <div className="card mt-4" style={{ "width": "18rem" }}>
                <img className="card-img-top" src={itemImage} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{itemName}</h5>
                    <p className="card-text">{itemDescription}</p>
                    <div className='container w-100'>
                        <select className='m-2 h-100 px-2 rounded'>
                            {
                                Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })
                            }
                        </select>
                        <select className='m-2 h-100 px-2 rounded'>
                            {
                                optionKeys.map((key)=>{
                                    return (<option key={key} value={key}>{key}</option>)
                                })
                            }
                        </select>
                        <div className='h-100 px-2 fs-5'>Total Price</div>
                    </div>
                </div>
            </div>
        </>
    )
}
