import React, {useEffect, useState} from 'react'

const FoodAmount = (props) => {
    const [click, setClick] = useState(1)
    useEffect(() => {
      console.log(click, '- Has changed')
      props.sum[props.name] = click*props.price
      props.setSum({...props.sum})
  },[click])
  return (
    <>
        <button onClick={()=>setClick(click + 1)}>+</button>
        <button onClick={()=> click===0 ? click : setClick(click - 1)}>-</button>
        <p>{click}</p>
    </>
  )
}

export default FoodAmount