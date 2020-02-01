import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        purchasing: false,
    }

    componentDidMount(){
        // axios.get('https://react-my-burger-41272.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients:response.data});
        //         console.log(this.state.ingredients)
        //     })
        //     .catch(
        //         this.setState({error:true})
        //     )
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum,el)=>{
                return sum +el;
            },0);
        return sum > 0;
    }

    purchaseHandler = ()=>{
        if (this.props.isAuthenticated){
            this.setState({purchasing:true})
        } else {
            this.props.onSetRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {
        // alert("You continue");
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ....}

        let orderSummary = null
        let burger =this.props.error? <p>there is a error</p>: <Spinner/>

        if(this.props.ings) {
            burger = (
                <Fragment>
                <Burger ingredients={this.props.ings}/>
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    price={this.props.price}
                    isAuth={this.props.isAuthenticated} 
                    ordered={this.purchaseHandler}/>
                </Fragment>
            );
            
            orderSummary = (
                <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>
            );
        };
         
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {/* remeber to added nextProps.children !== this.props.children to shouldComponentUpdate to Modal.js 
                        in order to makes the web to show  the loading spinner */}
                    {orderSummary} 
                </Modal>
                {burger}
            </Fragment>
        ); 
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch(actions.addIngredients(ingName)),
        onIngredientRemoved : (ingName) => dispatch(actions.removeIngredients(ingName)),
        onInitIngredients : ()=> dispatch(actions.initIngredients()),
        onInitPurchase : ()=> dispatch(actions.purchaseInit()),
        onSetRedirectPath : (path)=> dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios)); 