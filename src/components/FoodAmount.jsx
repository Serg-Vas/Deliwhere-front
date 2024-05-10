import React, {useEffect, useState} from 'react'

const FoodAmount = (props) => {
  function addToStorage(amount) {
    const key = "food"
    const food = localStorage.getItem(key) || "[]"
    let food2 = JSON.parse(food)
    food2.push({ id:props.id, amount });
    let food3 = new Set(food2)
    let array = Array.from(food3)
    let food4 = JSON.stringify(array)
    localStorage.setItem(key, food4)
    console.log(food2, food3, food4, "localStorage")
  }
    const [amount, setAmount] = useState(1)
    useEffect(() => {
      console.log(amount, '- Has changed')
      props.sum[props.id] = amount*props.price
      console.log(props.sum);
      props.setSum({...props.sum})
  },[amount])

  
  
  return (
    <>
        <button onClick={()=>addToStorage(setAmount(amount + 1))}>+</button>
        <button onClick={()=> amount===0 ? amount : setAmount(amount - 1)}>-</button>
        <p>{amount}</p>
    </>
  )
}

export default FoodAmount