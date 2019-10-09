import React, { Component } from 'react'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuidler extends Component {

    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat:0
        // },
        ingredients:null,
        totalPrice: 4,
        purchasable:false,
        purchasing: false,
        loading: false, 
        error: false  
    }

    componentDidMount(){
        axios.get('https://react-my-burger-41272.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients:response.data});
                console.log(this.state.ingredients)
            })
            .catch(
                this.setState({error:true})
            )
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum,el)=>{
                return sum +el;
            },0);
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
                const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1  
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount; 
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount -1 ;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandler = ()=>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = () => {
        console.log('purchaseCancelHandler detected')
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {
        // alert("You continue");
        // this.setState({loading:true})
        // const order = {
        //     ingredients:this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name:'Liang Fu',
        //         address: {
        //             street: 'Teststreet 1',
        //             zipCode: '12345',
        //             country: 'Germany'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliverMethod:'fastest'
        // }
        // axios.post('/orders.json', order)
        //     .then(res =>{
        //         this.setState({ loading: false, purchasing: false })
        //     })
        //     .catch(err =>{
        //         this.setState({ loading: false, purchasing: false })
        //     });
        const queryParams =[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?' + queryString
        })
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ....}

        let orderSummary = null
        let burger =this.state.error? <p>there is a error</p>: <Spinner/>

        if(this.state.ingredients) {
            burger = (
                <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice} 
                    ordered={this.purchaseHandler}/>
                </Aux>
            )
            
            orderSummary = (
                <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>
            )
        }
        if(this.state.loading){
            orderSummary=<Spinner/>
        }   
         
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {/* remeber to added nextProps.children !== this.props.children to shouldComponentUpdate to Modal.js 
                        in order to makes the web to show  the loading spinner */}
                    {orderSummary} 
                </Modal>
                {burger}
            </Aux>
        ); 
    }
}

export default withErrorHandler(BurgerBuidler,axios) 