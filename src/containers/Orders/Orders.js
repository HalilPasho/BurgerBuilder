import React, {Component} from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import withError from '../../components/UI/withError/withError'

class Orders extends Component {
    state = {
        loading: true,
        orders: []
    };

    componentDidMount() {
        axios.get('/order.json')
            .then(res => {
                let fetchOrders = [];
                for (let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({loading: false, orders: fetchOrders})
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                           ingredients={order.ingredients}
                           price={order.price}/>
                ))}
            </div>
        );
    }
}

export default withError(Orders, axios);