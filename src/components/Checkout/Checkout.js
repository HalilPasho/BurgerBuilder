import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import ContactData from '../../containers/ContactData/ContactData'
import {connect} from 'react-redux';


class Checkout extends Component {
 
    cancelHandler = () => {
        this.props.history.goBack()
    };

    continueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    cancelOrder={this.cancelHandler}
                    continueOrder={this.continueHandler}
                    ingredients={this.props.ings}/>
                <Route path={this.props.match.path + '/contact-data'}
                      component={ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);