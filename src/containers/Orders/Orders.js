import React, { Component } from 'react';
// import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Order from '../../components/Order/Order';

class Orders extends Component {
    render(){
        return (
            <div>
                <Order/>
                <Order/>
            </div>
        );
    }
}

export default Orders;