import React from 'react'
import ChoosedFood from './ChoosedFood';
import { useState, useEffect } from 'react';
import Confirm from './Confirm';

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
  order && order.forEach(item => {
    initialAmounts[item.id] = item.amount;
  });
  return initialAmounts;
});
// const indices = ordered && ordered.map(x => x.id);
console.log(ordered, props.shops);

const list = props.shops.reduce((acc, shop) => {
  shop.food.forEach(food => {
    const orderedItem = ordered && ordered.find(item => item.id === food.id);
    if (orderedItem) {
      // const items = localStorage.getItem('food');
      // var itemsArray = JSON.parse(items);
      // var index = itemsArray.findIndex(item => item.id === props.id);
      // console.log(index, itemsArray);
      // const image = itemsArray[index].image
      // console.log(image);
        
      acc.push({
        ...food, 
        // logo: logo, // Include the logo SVG data
        // image: image, // Include the food image SVG data
        shopId: shop.id,
        shopName: shop.name, 
        amount: amounts[food.id]  // Include the amount information
      });
    }
  });
  console.log(acc);
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

  useEffect(() => {
    if (document.querySelectorAll('.choosedfood-item').length <= 8) {
      const table2Element = document.getElementsByClassName('table2')[0];
      if (table2Element) {
        table2Element.style.display = 'none';
      }
    }
  }, []);
  
  const element = document.getElementsByClassName("table2");
  // element.style.display = 'none';
  return (
    <section className="Header restaurants board">
      <nav className='' style={{ position: 'relative' }}>
        <img className='select-restaurant' src="sighboard.svg" style={{ width: "25vw" }} />
        <h1 className='board-text'>Cart</h1>
        {/* <Map /> */}

      </nav>
      {/* {list.length !== 0 &&   */}
      {document.querySelectorAll('.choosedfood-item').length <= 3 ?
      <img className='table1' draggable="false" src="table.svg" alt="Description of the image" style={{ width: "95vw"}} /> :
      // document.querySelectorAll('.choosedfood-item').length <= 8 ?
      <img className='table1' draggable="false" src="tableVertical.png" alt="Description of the image" style={{ width: "100%"}} /> 
      // <img className='table1' draggable="false" src="table.svg" alt="Description of the image" style={{ width: "180vw", transform: 'rotate(90deg)', margin: '38% 0%', marginLeft:'3%'}} />
      }
      
      <figure className='choosedfood-container'>
          {list.map((food) => (<ChoosedFood setOrdered={setOrdered} key={food.id} id={food.id} name={food.name} price={food.price} image={food.image} logo={food.logo} shopId={food.shopId} sum={subSum} setSum={setSubSum} updateAmount={updateAmount}/>))}
          {list.length == 0 && <h1 className='empty'>Your cart is empty...</h1>}
      </figure>
      {list.length !== 0 && <div>
          <h2 className='total'>Total price: {sum}$</h2>
          {<Confirm clientData={JSON.parse(localStorage.getItem('userData'))} totalOrderPrice={sum} totalFoodPrice={subSum} foodItems={list} localStorageData={localStorage.getItem('food')}/>}
      </div>}
      {/* <button onClick={test}>Submit</button> clear storage!!!  */}
          {/* <nav style={{ width: "25vw" }}>
          <Map />
          </nav> */}
    </section>
  )
}

export default Cart