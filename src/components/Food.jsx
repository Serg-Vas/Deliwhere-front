import React from 'react'
import FoodList from './FoodList'

class Food extends React.Component {
  render() {
    console.log(3, this.props);    //check
    return (
      <div>
        <FoodList key={this.key} name={this.props.name} price={this.props.price} image={this.props.image}/>
      </div>
    )
  }
}

export default Food