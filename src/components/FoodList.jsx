import React from 'react'
import FoodForList from './FoodForList';

class FoodList extends React.Component{
    render(){
        console.log(this.props);
        return(<>
            <FoodForList key={this.key} name={this.props.name} price={this.props.price} image={this.props.image}/>
        </>
        )
    }
}

export default FoodList