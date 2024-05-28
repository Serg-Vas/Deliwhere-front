import React from 'react'
import ChoosedFood from './ChoosedFood';
import { useState, useEffect } from 'react';
import Confirm from './Confirm';
import Map from './Map';

const Cart = (props) => {
  console.log(props, 'cart')
  console.log(props.clientName);
  const clientName = props.clientName
  const foods = localStorage.getItem('food');
console.log(foods);
const order = JSON.parse(foods); // const ordered = foods ? JSON.parse(foods) : [];
console.log(order);
const [ordered, setOrdered] = useState(order);
const [amounts, setAmounts] = useState(() => {
  const initialAmounts = {};
  order.forEach(item => {
    initialAmounts[item.id] = item.amount;
  });
  return initialAmounts;
});
const indices = ordered && ordered.map(x => x.id);
console.log(ordered, props.shops);

const list = props.shops.reduce((acc, shop) => {
  shop.food.forEach(food => {
    const orderedItem = ordered && ordered.find(item => item.id === food.id);
    if (orderedItem) {
      acc.push({ 
        ...food, 
        logo: shop.logo, 
        shopName: shop.name, 
        amount: amounts[food.id]  // Include the amount information
      });
    }
  });
  return acc;
}, []);

console.log(list, 'items');

  
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

  const updateAmount = (id, amount) => {
    setAmounts(prevAmounts => ({
      ...prevAmounts,
      [id]: amount 
    }));
  };

  return (
    <section className="Header restaurants board">
      <nav className='' style={{ position: 'relative' }}>
        <img src="sighboard.svg" style={{ width: "25vw" }} />
        <h1 className='board-text'>Cart</h1>
        {/* <Map /> */}

      </nav>
      {/* {list.length !== 0 &&   */}
      <img className='table' draggable="false" src="table.svg" alt="Description of the image" style={{ width: "95vw"}} />
      {/* } */}
      
      <figure className='choosedfood-container'>
          {list.map((food) => (<ChoosedFood setOrdered={setOrdered} key={food.id} id={food.id} name={food.name} price={food.price} image={food.image} logo={food.logo} sum={subSum} setSum={setSubSum} updateAmount={updateAmount}/>))}
          {list.length == 0 && <h1 className='empty'>Your cart is empty...</h1>}
      </figure>
      {list.length !== 0 && <div>
          <h2 className='total'>Total price: {sum}$</h2>
          {<Confirm clientData={JSON.parse(localStorage.getItem('userData'))} totalOrderPrice={sum} totalFoodPrice={subSum} foodItems={list} localStorageData={localStorage.getItem('food')}/>}
      </div>}
      {/* <button onClick={test}>Submit</button> DO NOT PRESS!!!  */}
          {/* <nav style={{ width: "25vw" }}>
          <Map />
          </nav> */}

    </section>
  )
}

export default Cart