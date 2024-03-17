import React from 'react'

export default function FoodCard() {
    return (
        <>
            <div className="card mt-4" style={{ "width": "18rem" }}>
                <img className="card-img-top" src="https://source.unsplash.com/random/300x300/?donut" alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
                            <option value="half">Half</option>
                            <option value="full">Full</option>
                        </select>
                        <div className='h-100 px-2 fs-5'>Total Price</div>
                    </div>
                </div>
            </div>
        </>
    )
}
