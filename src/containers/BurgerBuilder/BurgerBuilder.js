import React, {Component} from 'react'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const Prices = {
    salad: 1.9,
    bacon: 1.2,
    meat: 1.5,
    cheese: 2.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: 0,
        purchaseable: false
    };

    // object to array
    updatePurchase = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingKey => {
            return ingredients[ingKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchaseable: sum > 0})
    };

    addHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIng = {
            ...this.state.ingredients
        };
        updatedIng[type] = updatedCount;
        const priceAddition = Prices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIng});
        this.updatePurchase(updatedIng);
    };

    removeHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIng = {
            ...this.state.ingredients
        };
        updatedIng[type] = updatedCount;
        const priceDeduct = Prices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduct;
        this.setState({totalPrice: newPrice, ingredients: updatedIng});
        this.updatePurchase(updatedIng);
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingAdded={this.addHandler}
                               ingRemoved={this.removeHandler}
                               disInfo={disabledInfo}
                               price={this.state.totalPrice}
                               purchaseable = {this.state.purchaseable}
                />
            </Aux>
        )
    }
};

export default BurgerBuilder;