import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Buttons/Button'
import classes from './CheckoutSummary.css'

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button clicked={props.cancelOrder} btnType="Danger">CANCEL </Button>
            <Button clicked={props.continueOrder} btnType="Success">CONTINUE </Button>
        </div>
    );
};

export default CheckoutSummary;