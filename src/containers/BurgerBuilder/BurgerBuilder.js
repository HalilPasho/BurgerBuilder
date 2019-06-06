import React, {Component} from 'react'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'
import axios from '../../axios-order'
import withError from '../../components/UI/withError/withError'
import Spinner from '../../components/UI/Spinner/Spinner'

const Prices = {
    salad: 1.9,
    bacon: 1.2,
    meat: 1.5,
    cheese: 2.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 0,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('https://react-myburger-a81d8.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})

            }).catch(error => {
            this.setState({error: true})
        })
    }

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
        //
        // // alert("test alert")
        // console.log('test111', this.state.purchasing);
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    };


    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;


        let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner/>;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls ingAdded={this.addHandler}
                                   ingRemoved={this.removeHandler}
                                   disInfo={disabledInfo}
                                   price={this.state.totalPrice}
                                   order={this.hideShowHandler}
                                   purchaseable={this.state.purchaseable}
                    />
                </Aux>

            );
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                                         cancelled={this.closeShowHandler}
                                         continued={this.continueShowHandler}
                                         totalPrice={this.state.totalPrice}/>;
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

export default withError(BurgerBuilder, axios);