import React from 'react'
import FoodShops from './FoodShops'
import FoodForList from './FoodForList'
// import 'D:\\work\\Food shop\\food\\src\\css\\Header.css';

const Shops = (props) => {
  console.log(3, props);
  return (
    <div className='food'>
        {/* <ul><FoodShops /></ul> */}
        {props.food.map((food) => (<FoodForList key={food.id} id={food.id} name={food.name} price={food.price} image={food.image}/>))}  
    </div>
  )
}

export default Shops