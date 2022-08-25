import React from 'react'
import "./Home.css";
import img from "../image/imgg.png";


const Home = () => {
  return (
    <div>
      <div className="HomePage"
        
      >
        <div className="HomeContainer">
        
        <img src={img} alt="imgg"/>
        </div>
      </div>

    </div>
  )
}

export default Home