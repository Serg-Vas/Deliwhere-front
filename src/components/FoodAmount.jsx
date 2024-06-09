import React, {useEffect, useState} from 'react';

const FoodAmount = (props) => {
  function addToStorage(amount) {
    const key = "food";
    const items = localStorage.getItem(key);
    if (items) {
      var itemsArray = JSON.parse(items);
      console.log("props.id:", props.id);
      var index = itemsArray.findIndex(item => item.id === props.id);
      console.log(index, itemsArray);
      if (index !== -1) {
        itemsArray[index].amount = amount;
        localStorage.setItem(key, JSON.stringify(itemsArray));
      }
      console.log(itemsArray, "localStorage", amount);
    }
  }
  
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    addToStorage(amount);
    console.log(amount, '- Has changed');
    props.sum[props.id] = amount * props.price;
    console.log(props.sum);
    props.setSum({...props.sum});
    props.updateAmount(props.id, amount);  // Update the amount in Cart
  }, [amount]);

  return (
    <>
      <button onClick={() => setAmount(amount + 1)}>+</button>
      <button onClick={() => amount === 1 ? amount : setAmount(amount - 1)}>-</button>
      <p>{amount}</p>
    </>
  );
}

export default FoodAmount;
