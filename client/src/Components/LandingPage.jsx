import React from 'react'
import './style.css'
import bgVideo from './../Assets/video/bg.mp4'
function LandingPage() {
  return (
    <div className='landing-page'>
      <video autoPlay muted loop id='video-bg'>
        <source src={bgVideo} type='video/mp4' />
        <p>Your browser does not support the video tag.</p>
      </video>
      <div className="content-container">
        <div className="content">
          <h1>Welcome to our Community</h1>
          <p>
            Welcome to our Community Support Agricultural Platform! Our
            platform serves as a vibrant hub connecting farmers, consumers,
            and enthusiasts,
            fostering a sustainable and supportive ecosystem for
            agriculture.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage