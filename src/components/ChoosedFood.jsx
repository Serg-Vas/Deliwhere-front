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
      console.log("props.id:", props.id);
      var index = itemsArray.findIndex(item => item.id === props.id)
      if (index !== -1) {
        itemsArray.splice(index, 1)
        localStorage.setItem("food", JSON.stringify(itemsArray))
        console.log(itemsArray, localStorage.getItem('food'), 'check')
        props.setOrdered([...itemsArray])
        delete props.sum[props.id]
        props.setSum({...props.sum})
      }
      // alert(props.name + " removed from cart")
      console.log(props.id + " removed from cart");
    }
    // else {
      // alert(props.name + " not found")
    // }
  }
  
    return (
      <div>
        <ul>
        <span dangerouslySetInnerHTML={{__html: props.image}}/>
          <p>{props.name}</p>
          <button onClick={setDeleted}>Remove from cart</button>
          <FoodAmount setSum={props.setSum} sum={props.sum} id={props.id} price={props.price}/>
          <p>{props.price}</p>
        </ul>
      </div>
  );
};

export default ChoosedFood;