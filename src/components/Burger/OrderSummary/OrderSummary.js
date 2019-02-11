import React, {Component} from 'react'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    componentWillUpdate = (nextProps, nextState) => {
      console.log('[orderSummary] WillUpdate');
    };
    

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
        return <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}
            </li>
    })
    return(
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            {/* <p>Continue to Checkout</p> */}
            <Button clicked={this.props.cancel} btnType='Danger'>Cancel</Button>
            <Button clicked={this.props.continue} btnType='Success'>Continue</Button>
        </>
    )
    }

    
   
}

export default OrderSummary