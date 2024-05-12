import React from 'react'
import ChoosedFood from './ChoosedFood';
import { useState, useEffect } from 'react';
import Confirm from './Confirm';

const Cart = (props) => {
  console.log(props, 'cart')
  console.log(props.clientName);
  const clientName = props.clientName
  const foods = localStorage.getItem('food')
  console.log(foods)
  const order = JSON.parse(foods)   // const ordered = foods ? JSON.parse(foods) : [];
  console.log(order)
  const [ordered, setOrdered] = useState(order)
  const indeces = ordered && ordered.map(x => x.id)
  console.log(ordered, props.shops);
  const list = props.shops.reduce((acc, shop) => {
    shop.food.forEach(food => {
      if (ordered.find(item => item.id === food.id)) {
        acc.push({ ...food, logo: shop.logo }); // Include logo information
      }
    });
    return acc;
  }, []);
  console.log(list, 'items')
  
  function test() {
    const store = localStorage.getItem("food")
    console.log(localStorage.getItem("food"), store, JSON.stringify(new Set(store)));
    localStorage.clear();
  }

  const [sum, setSum] = useState(0);
  let subSum0 = list.reduce(function (map, obj) {
    map[obj.id] = 0;
    return map;
  }, {});

  const [subSum, setSubSum] = useState(subSum0);
  useEffect(() => {
    console.log(subSum, '- Has changed2')
    const sum2 = Object.values(subSum).reduce((sum, current) => sum + current, 0);
    setSum(sum2.toFixed(2));
  }, [subSum])

  console.log(subSum, 'subSum')

  return (
    <section className="Header restaurants board">
      <nav className='' style={{ position: 'relative' }}>
        <img src="sighboard.svg" style={{ width: "25vw" }} />
        <h1 className='board-text'>Cart</h1>
      </nav>
      <img src="table.svg" alt="Description of the image" style={{ width: "95vw" }} />
      
      <figure className='choosedfood-container'>
        {/* <figcaption> */}
          {list.map((food) => (<ChoosedFood setOrdered={setOrdered} key={food.id} id={food.id} name={food.name} price={food.price} image={food.image} logo={food.logo} sum={subSum} setSum={setSubSum} />))}
        {/* </figcaption> */}
      </figure>
          <h3>Total price: {sum}$</h3>
          {<Confirm clientName={clientName} totalOrderPrice={sum} totalFoodPrice={subSum} foodItems={list} localStorageData={localStorage.getItem('food')}/>}
      {/* <button onClick={test}>Submit</button> DO NOT PRESS!!!  */}
    </section>
  )
}

export default Cart