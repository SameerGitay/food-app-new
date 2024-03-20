import React from 'react'
import { useState } from 'react'

export default function MainCarousel({ resolveSearch }) {
    const [searchTerm, setSearchTerm] = useState('')

    const handleSubmit = (e) => {
        resolveSearch(searchTerm)
        e.preventDefault()
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
        if (e.target.value === "") {
            resolveSearch(e.target.value)
        }
    }


    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className='carousel-caption gofood-search'>
                    <form className="d-flex" onSubmit={handleSubmit}>
                        <input className="form-control me-2" type="search"
                            placeholder="Search" aria-label="Search" value={searchTerm}
                            onChange={handleChange} />
                    </form>
                </div>
                <div className="carousel-item active carousel-item-style">
                    <img className="img-fluid" src="https://source.unsplash.com/random/900x700?burger" className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>First slide label</h5>
                        <p>Some representative placeholder content for the first slide.</p>
                    </div>
                </div>
                <div className="carousel-item carousel-item-style">
                    <img className="img-fluid" src="https://source.unsplash.com/random/900x700?pizza" className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div>
                </div>
                <div className="carousel-item carousel-item-style">
                    <img className="img-fluid" src="https://source.unsplash.com/random/900x700?pastry" className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>Some representative placeholder content for the third slide.</p>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}
