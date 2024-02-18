import React from 'react'

class FoodShops extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shop: []
    }
  }
  
  render() {
    return (this.state.shop.map((shop, id) =><li key={id}>{shop.name}</li>))
  }
}
export default FoodShops
