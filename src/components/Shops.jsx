import React, { useEffect, useState } from 'react'
import FoodForList from './FoodForList'
import { selectRestaurant } from './API';


// import 'D:\\work\\Food shop\\food\\src\\css\\Header.css';

const Shops = (props) => {
  const [restaurantInfo, setRestaurantInfo] = useState();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        console.log(props.food);
        const restaurantData = await selectRestaurant(props.food);
        console.log(restaurantData);
        setRestaurantInfo(restaurantData);
        // const info = JSON.stringify(restaurantData)
        // console.log(info.food);
        // console.log(restaurantInfo.food);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };
    fetchRestaurant();
  }, [props.food]);

  console.log(3, props);
  return (
    <>
    {restaurantInfo && (
        <>
          <span className='shop-icon' dangerouslySetInnerHTML={{ __html: restaurantInfo.logo }} />
          <div className='food'>
            {restaurantInfo.food.map((food) => (
              <FoodForList key={food.id} id={food.id} name={food.name} price={food.price} image={food.image} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
      // <span className='shop-icon' dangerouslySetInnerHTML={{ __html: props.logo }} />
      // <div className='food'>
      //   {/* <ul><FoodShops /></ul> */}
      //   {restaurantInfo}
      //   {/* {props.food.map((food) => (<FoodForList key={food.id} id={food.id} name={food.name} price={food.price} image={food.image} />))} */}
      //   {/* {restaurantInfo.food.map((food) => (<FoodForList key={food.id} id={food.id} name={food.name} price={food.price} image={food.image} />))} */}
      // </div>

export default Shops