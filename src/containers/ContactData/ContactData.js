import React, {Component} from 'react';
import Button from '../../components/UI/Buttons/Button'
import classes from './ContactData.css'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Halil',
                adress: {
                    street: 'Test',
                    country: 'Albania'
                },
                email: 'halil@gmail.com'
            },
            delivery: 'fastestOne'
        };
        axios.post('/order.json', order)
            .then(response => {
                this.setState({loading: false})
                this.props.history.push('/')
            }).catch(err => {
            this.setState({loading: false})
        });
    };

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail"/>
                <input className={classes.Input} type="text" name="street" placeholder="Your Street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                <Button clicked={this.orderHandler} btnType="Success"> ORDER NOW </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data:</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;