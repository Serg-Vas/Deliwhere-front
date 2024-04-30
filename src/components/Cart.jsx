import React from 'react'
import ChoosedFood from './ChoosedFood';
import Register from './Register';
import { useState, useEffect } from 'react';

const Cart = (props) => {
  console.log(props, 'cart')
  const foods = localStorage.getItem('food')
  const order = JSON.parse(foods)   // const ordered = foods ? JSON.parse(foods) : [];
  const [ordered, setOrdered] = useState(order)
  const list = props.food.filter(item => ordered && ordered.includes(item.name))  //null check
  console.log(list.length, 'items')

  // function getItems(){
  //   const key = "food"
  //       const food = localStorage.getItem(key) || "[]"
  //       return JSON.parse(food)
  // }

  function test() {
    const store = localStorage.getItem("food")
    console.log(localStorage.getItem("food"), store, JSON.stringify(new Set(store)));
    localStorage.clear();
  }

  const [sum, setSum] = useState(0);
  let subSum0 = list.reduce(function (map, obj) {
    map[obj.name] = 0;
    return map;
  }, {});

  const [subSum, setSubSum] = useState(subSum0);
  useEffect(() => {
    console.log(subSum, '- Has changed2')
    const sum2 = Object.values(subSum).reduce((sum, current) => sum + current, 0);
    setSum(sum2);
  }, [subSum])

  console.log(subSum, 'subSum')

  return (
    <section className="Header restaurants">
      <nav className='board' style={{ position: 'relative' }}>
        <img src="sighboard.svg" style={{ width: "25vw" }} />
        <h1 className='board-text'>Cart</h1>
      </nav>
      <figure>
        <img src="table.svg" alt="Description of the image" style={{ width: "80vw" }} />
        <figcaption>
          {list.map((food) => (<ChoosedFood setOrdered={setOrdered} key={food.id} name={food.name} price={food.price} sum={subSum} setSum={setSubSum} />))}
        </figcaption>
          <h3>Total price: {sum}</h3>
      </figure>
      {/* <h1>Cart</h1> */}
      {/* <h3>{localStorage.getItem("food").replace(/["\[\]]/g, '')}</h3> */}
      {/* <button onClick={test}>Submit</button> */}
      {/* <Register subSum={subSum} sum={sum}/> */}
    </section>
  )
}

export default Cart