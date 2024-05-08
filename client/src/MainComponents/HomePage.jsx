import React from 'react'
import LandingPage from '../Components/LandingPage'
import ProductsSection from '../Components/Products/ProductsSection'
import Services from '../Components/Services'
import AboutUs from '../Components/AboutUs'


function HomePage() {
  return (
    <div>
      <LandingPage />
      <ProductsSection />
      <Services />
      <AboutUs />
    </div>
  )
}

export default HomePage