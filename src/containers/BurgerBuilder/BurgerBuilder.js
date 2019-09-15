import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-order';
import withError from '../../components/UI/withError/withError';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions'


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        // axios.get('https://react-myburger-a81d8.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data})

        //     }).catch(error => {
        //     this.setState({error: true})
        // })
    }

    // object to array
    updatePurchase = (ingredients) => {
        const sum = Object.keys(ingredients).map(ingKey => {
            return ingredients[ingKey]
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    };

    // addHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIng = {
    //         ...this.state.ingredients
    //     };
    //     updatedIng[type] = updatedCount;
    //     const priceAddition = Prices[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIng});
    //     this.updatePurchase(updatedIng);
    // };

    // removeHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIng = {
    //         ...this.state.ingredients
    //     };
    //     updatedIng[type] = updatedCount;
    //     const priceDeduct = Prices[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduct;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIng});
    //     this.updatePurchase(updatedIng);
    // };

    hideShowHandler = () => {
        this.setState({purchasing: true})
    };

    closeShowHandler = () => {
        this.setState({purchasing: false})
    };

    continueShowHandler = () => {
        this.props.history.push('/checkout')
    };


    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;


        let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner/>;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls ingAdded={this.props.onIngredientsAdded}
                                   ingRemoved={this.props.onIngredientsRemoved}
                                   disInfo={disabledInfo}
                                   price={this.props.price}
                                   order={this.hideShowHandler}
                                   purchaseable={this.updatePurchase(this.props.ings)}
                    />
                </Aux>

            );
            orderSummary = <OrderSummary ingredients={this.props.ings}
                                         cancelled={this.closeShowHandler}
                                         continued={this.continueShowHandler}
                                         totalPrice={this.props.price}/>;
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} closed={this.closeShowHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}
const mapStatetoProps = state =>{
    return{
        ings: state.ingredients,
        price :state.totalPrice
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onIngredientsAdded: (IngName) =>dispatch({type:actionTypes.ADD_INGRIDIENT,ingredientName:IngName}),
        onIngredientsRemoved: (IngName) =>dispatch({type:actionTypes.REMOVE_INGRIDIENT,ingredientName:IngName})
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(withError(BurgerBuilder, axios));