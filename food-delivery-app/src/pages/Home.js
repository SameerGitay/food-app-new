import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FoodCard from '../components/FoodCard'
import MainCarousel from '../components/MainCarousel'

export default function Home() {
    return (
        <>
            <Header />
            <MainCarousel/>
            <FoodCard />
            <Footer />
        </>
    )
}