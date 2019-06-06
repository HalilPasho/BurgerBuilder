import React, {Component} from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Buttons/Button'

class OrderSummary extends Component {
    componentWillUpdate() {
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return <li key={igKey}><span
                style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>
        });
        return (
            <Aux>
                <h3>Your Order:</h3>
                <p>A Burger with :</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}$</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelled}> CANCEL </Button>
                <Button btnType="Success" clicked={this.props.continued}> CONTINUE </Button>
            </Aux>
        )
    }


};


export default OrderSummary;



