import React from 'react'
import FoodShops from './FoodShops'
import Food from './Food'
// import 'D:\\work\\Food shop\\food\\src\\css\\Header.css';

const Shops = (props) => {
  return (
    <div>
        {/* <ul><FoodShops /></ul> */}
        {props.food.map((food) => (<Food key={food.id} name={food.name} price={food.price}/>))}
    </div>
  )
}

export default Shops