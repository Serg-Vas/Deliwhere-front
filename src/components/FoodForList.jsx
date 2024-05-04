import React from 'react'

class FoodForList extends React.Component {
    addToCart(id, name) {
        const key = "food"
        const food = localStorage.getItem(key) || "[]"
        let food2 = JSON.parse(food)
        food2.push({ id, name });
        let food3 = new Set(food2)
        let array = Array.from(food3)
        let food4 = JSON.stringify(array)
        localStorage.setItem(key, food4)
        console.log(food4, "localStorage")
        // alert(name + " added to cart")
    }
    render() {
        const manipulatedSVG = this.props.image.replace('<svg ', '<svg height="160" ');
        return (
            <figure className = "food-container">
                <img src="foodBackground.svg" style={{width: '120%', marginRight: '20%'}}/>
                <figcaption className='food-item'>
                    <span className = 'food-img' dangerouslySetInnerHTML={{__html: manipulatedSVG}}/>
                    <h3>{this.props.name}</h3>
                    <h4>{this.props.price}$</h4>
                    {/* <img src={this.props.image} alt="bimbimbambam" /> */}
                    <button onClick={()=>this.addToCart(this.props.id, this.props.name)}>Add to Cart</button>
                </figcaption>
            </figure>
        )
    }
}

export default FoodForList