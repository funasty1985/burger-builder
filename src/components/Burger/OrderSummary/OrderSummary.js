import React,{Component, Fragment} from 'react';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    // This could be a func component, only for performance checking propose 
    componentWillUpdate(){
        console.log('Order Summary will update')
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform:"capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>);
        });

        return (
            <Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with thee following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Fragment>
        );

    }
} 

export default OrderSummary; 