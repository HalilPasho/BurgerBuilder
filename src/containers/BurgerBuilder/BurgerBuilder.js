import React, {Component} from 'react'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'

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
        purchaseable: false,
        purchasing: false
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

    hideShowHandler = () => {
        this.setState({purchasing: true})
    };

    closeShowHandler = () => {
        this.setState({purchasing: false})
    };

    continueShowHandler = () => {
        alert("test alert")
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
                <Modal show={this.state.purchasing} closed={this.closeShowHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                                  cancelled={this.closeShowHandler}
                                  continued={this.continueShowHandler}
                                  totalPrice={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingAdded={this.addHandler}
                               ingRemoved={this.removeHandler}
                               disInfo={disabledInfo}
                               price={this.state.totalPrice}
                               order={this.hideShowHandler}
                               purchaseable={this.state.purchaseable}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;