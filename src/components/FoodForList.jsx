import React from 'react'

class FoodForList extends React.Component {
    addToCart(name) {
        const key = "food"
        const food = localStorage.getItem(key) || "[]"
        let food2 = JSON.parse(food)
        food2.push(name)
        let food3 = new Set(food2)
        let array = Array.from(food3)
        let food4 = JSON.stringify(array)
        localStorage.setItem(key, food4)
        console.log(food4)
        // alert(name + " added to cart")
    }
    render() {
        return (
            <div className = "food">
                <h2>{this.props.name}</h2>
                <h3>{this.props.price}</h3>
                <button onClick={()=>this.addToCart(this.props.name)}>Add to Cart</button>
            </div>
        )
    }
}

export default FoodForList