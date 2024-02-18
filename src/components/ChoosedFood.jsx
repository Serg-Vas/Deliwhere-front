import React from 'react';
import FoodAmount from './FoodAmount';

function ChoosedFood(props) {
  console.log(props, localStorage.getItem("food"),'choosed');

  // function getItems(){
  //   const key = "food"
  //   const food = localStorage.getItem(key) || "[]"
  //   return JSON.parse(food)
  // }

  function setDeleted() 
  {
    const items = localStorage.getItem("food");
    if (items) {
      var itemsArray = JSON.parse(items)
      var index = itemsArray.indexOf(props.name)
      if (index !== -1) {
        itemsArray.splice(index, 1)
        localStorage.setItem("food", JSON.stringify(itemsArray))
        console.log(itemsArray, localStorage.getItem('food'), 'check')
        props.setOrdered([...itemsArray])
        delete props.sum[props.name]
        props.setSum({...props.sum})
      }
      // alert(props.name + " removed from cart")
      console.log(props.name + " removed from cart");
    }
    // else {
      // alert(props.name + " not found")
    // }
  }
  
    return (
      <div>
        <ul>
          <p>{props.name}</p>
          <button onClick={setDeleted}>Remove from cart</button>
          <FoodAmount setSum={props.setSum} sum={props.sum} name={props.name} price={props.price}/>
          <p>{props.price}</p>
        </ul>
      </div>
  );
};

export default ChoosedFood;