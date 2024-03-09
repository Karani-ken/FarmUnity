import React from 'react'
import LandingPage from '../Components/LandingPage'
import ProductsSection from '../Components/ProductsSection'
import Services from '../Components/Services'
import AboutUs from '../Components/AboutUs'
import Footer from '../Components/Footer'

function HomePage() {
  return (
    <div>
        <LandingPage/>
        <ProductsSection/>
        <Services/>
        <AboutUs/>
        <Footer/>
    </div>
  )
}

export default HomePage