import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import 'D:\\work\\Food shop\\front\\src\\css\\Header.css';

const MainPage = (props) => {
  console.log(props.shop, 'name')
  console.log(props.token);

  return (
    <section className="Header restaurants">
      <nav className='board' style={{ position: 'relative'}}>
      <img src="sighboard.svg" style={{ width: "25vw"}}/>
      <h2 className='board-text'>Select restaurant</h2>
      <h2>{props.token}</h2>
      </nav>
      <figure>
        <img src="table.svg" alt="Description of the image" style={{ width: "63vw"}}/>
        <figcaption>
          {props.shop.map((shop) => {
            return (
              <Link to={"/" + shop.id}>
                <div style={{ position: 'relative' }}>
                  <img src="white_paper.svg" alt="White Paper" />
                  <h3 className="restaurant-item">
                    {shop.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </figcaption>
      </figure>
    </section>

  )
}

export default MainPage