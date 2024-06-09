import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import 'D:\\work\\Food shop\\front\\src\\css\\Header.css';

const MainPage = (props) => {
  console.log(props.shop, 'name')
  console.log(props.token);

  return (
    <section className="Header restaurants">
      <nav className='board' style={{ position: 'relative'}}>
      <img className='select-restaurant' src="sighboard.svg" style={{ width: "25vw"}}/>
      <h2 className='board-text'>Select restaurant</h2>
      {/* <h2>{props.token}</h2> */}
      </nav>
      <figure>
        <img className='restaurant-table' src="table.svg" alt="Description of the image" style={{width:'63vw'}}/>
        <figcaption>
          {props.shop.length != 0 ?
          props.shop.map((shop) => {
            return (
              <Link key={shop.id} to={"/" + shop.id}>
                <div style={{ position: 'relative' }}>
                  <img className='restaurant-blank' src="white_paper.svg" alt="White Paper" />
                  <h3 className="restaurant-item">
                    {shop.name}
                  </h3>
                </div>
              </Link>
            );
          }) : <h1 className='flowerFont'>No shops around...</h1>}
        </figcaption>
      </figure>
    </section>

  )
}

export default MainPage