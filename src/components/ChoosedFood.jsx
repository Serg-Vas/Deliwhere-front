import React from 'react';
import FoodAmount from './FoodAmount';

function ChoosedFood(props) {
  console.log(props, localStorage.getItem("food"), 'choosed');

  function setDeleted() {
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
        props.setSum({ ...props.sum })
      }
      console.log(props.id + " removed from cart");
    }
  }
  
  // const manipulatedFoodSVG = props.image.replace('<svg ', '<svg height="120" ');
  // const manipulatedLogoSVG = props.logo.replace('<svg ', '<svg height="70" ');
  const host ="localhost" //18.197.164.43
  // const host ="localhost" //
  const imageUrl = `http://${host}/DeliveryBack/foodimages/${props.id}.svg`;
  const logoUrl = `http://${host}/DeliveryBack/images/${props.shopId}.svg`;
  return (
    <figure className='foodItem'>
      <img className='foodBackground' src="foodBackground.svg"/>
      <figcaption className='choosedfood-item'>
        {/* <span dangerouslySetInnerHTML={{ __html: manipulatedLogoSVG }} style={{position:"absolute", top:"15%", left:"57%"}}/>
        <span dangerouslySetInnerHTML={{ __html: manipulatedFoodSVG }} /> */}
        <img src={logoUrl} alt="" className="logo"/>
        <img src={imageUrl} alt="" className="foodImage"/>
        <h4>{props.name}</h4>
        {/* <h4>{props.id}</h4>
        <h4>{props.shopId}</h4> */}
        <h4>{props.price}$</h4>
        <div>
          <button onClick={setDeleted}>Remove from cart</button>
          <FoodAmount 
            setSum={props.setSum} 
            sum={props.sum} 
            id={props.id} 
            price={props.price}
            updateAmount={props.updateAmount}  // Pass the update function to FoodAmount
          />
        </div>
      </figcaption>
    </figure>
  );
};

export default ChoosedFood;
