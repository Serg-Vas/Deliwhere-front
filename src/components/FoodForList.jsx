import React from 'react'

class FoodForList extends React.Component {
    addToCart(id, name, image) {
        const key = "food"
        const food = localStorage.getItem(key) || "[]"
        let food2 = JSON.parse(food)
        if (!food2.some(item => item.id === id)) {
            food2.push({ id, name, amount:1 });
            let food3 = new Set(food2)
            let array = Array.from(food3)
            let food4 = JSON.stringify(array)
            localStorage.setItem(key, food4)
            console.log(food4, "localStorage")    
        }
        // alert(name + " added to cart")
    }
    render() {
        // const manipulatedSVG = this.props.image.replace('<svg ', '<svg height="160" ');
        const host ="54.93.231.47" //localhost
        // const host ="localhost" //
        const imageUrl = `http://${host}/DeliveryBack/foodimages/${this.props.id}.svg`;
        return (
            <figure className = "food-container">
                <img src="foodBackground.svg" style={{width: '120%'}}/>
                <figcaption className='food-item'>
                    {/* <span className = 'food-img' dangerouslySetInnerHTML={{__html: manipulatedSVG}}/> */}
                    <img src={imageUrl} alt="" style={{height: '160px'}}/>
                    <h3>{this.props.name}</h3>
                    <h4>{this.props.price}$</h4>
                    <button onClick={()=>this.addToCart(this.props.id, this.props.name, this.props.image)}>Add to Cart</button>
                </figcaption>
            </figure>
        )
    }
}

export default FoodForList