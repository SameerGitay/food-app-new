import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FoodCard from '../components/FoodCard'
import MainCarousel from '../components/MainCarousel'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
    const [categories, setCategories] = useState([])
    const [items, setItems] = useState([])
    const [searchData,setSearchData] = useState('')

    useEffect(() => {
        axios.post('http://localhost:7000/api/categories', {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.data.success && response.data.data) {
                    setCategories(response.data.data)
                    axios.post('http://localhost:7000/api/items', {}, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response2 => {

                            if (response2.data.success && response2.data.data) {
                                setItems(response2.data.data)
                                console.log(categories)
                                console.log(items)

                            } else {
                                console.log(response2.data.msg)
                            }
                        })
                        .catch(error2 => {
                            console.log(error2)
                        })
                } else {
                    console.log(response.data.msg)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const resolveSearch=(searchTerm)=>{
        setSearchData(searchTerm.toLowerCase())
    }
    
    return (
        <>
            <Header />
            <MainCarousel resolveSearch={resolveSearch}/>
            <div>
                <div className='container'>
                    {
                        categories !== [] ? categories.map((category) => {
                            return (<div className='row m-3'>
                                <div key={category._id} className='fs-4'>
                                    {category.CategoryName}
                                </div>
                                {
                                    items !== [] ? 
                                    items.filter((item) => (item.CategoryName === category.CategoryName) 
                                    && (item.name.toLowerCase().includes(searchData)))
                                    .map((filteredItem) => {
                                        return(
                                            <div key={filteredItem._id} className='col-12 col-md-6 col-lg-4'>
                                                <FoodCard item={filteredItem}
                                                itemOptions={filteredItem.options[0]}/>
                                            </div>
                                        )
                                    })
                                    :<div>No item found</div>
                                }
                                
                            </div>)
                        }) : ""
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}