import React from 'react'
import { BrowserRouter as Router,  Routes,  Route,  Link } from "react-router-dom";
import 'D:\\work\\Food shop\\front\\src\\css\\Header.css';

const MainPage = (props) => {
  console.log(props.shop, 'name')

  return (
    <div className="Header">
      <ul>
        {props.shop.map((shop)=>{
        return <li><h3><Link to={"/"+shop.id}>{shop.name}</Link></h3></li>
        })}
      </ul>
    </div>
  )
}

export default MainPage