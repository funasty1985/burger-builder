import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-orders'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import {updateObject, checkValidatity} from '../../../shared/utility'

class ContactData extends Component {
    state = {
        orderForm:{
                name: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',  // the value displayed in the input field 
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'street'
                    },
                    value:'',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipCode:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'zipCode'
                    },
                    value:'',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false
                },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'country'
                    },
                    value:'',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'email'
                    },
                    value:'',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliverMethod:{
                    elementType:'select',
                    elementConfig:{
                        options: [
                            {value: 'fastest', displayValues:'Fastest'},
                            {value: 'cheapest', displayValues:'Cheapest'}
                        ]
                    },
                    value:'fastest',
                    valid: true,
                    validation: {}
                }
        },
        formIsValid:false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {}
        for (let forElementIdentifer in this.state.orderForm){
            formData[forElementIdentifer] = this.state.orderForm[forElementIdentifer].value
        }
        const order = {
            ingredients:this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        console.log('see see what have i ordered :::', order)
        this.props.onOrderBurger(order, this.props.token)
    }

    // event.target.value is the value inputed to the input value 
    inputChangedHandler = (event, inputIdentifier) => {
        // as this.state.orderForm is a nested oject, (this.state.orderForm.name is also a object)
        // spread operator alone itself is not enough to deep clone the inside object 
        // ie. change in updateOrderForm.name.value will also cause the change in this.state.orderForm.name.value
        // In order to change the value of updateOrderForm.name.value, we change the whole updateOrderForm.name object all together see ## 
        const updatedOrderElement = updateObject(this.state.orderForm[inputIdentifier],{
            value: event.target.value,
            valid: checkValidatity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });
        
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier] : updatedOrderElement
        })
        
        let formIsValid = true; 

        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;  
            console.log('formIsValid for', inputIdentifier,'indside the for loop is ', formIsValid)
        }

        this.setState({orderForm: updatedOrderForm, formIsValid});   // the change in input value also change the display value correspondingly
        console.log('inputChangedHandler',this.state.formIsValid)
    }

    render() {
        const forElementsArray = []
        for (let key in this.state.orderForm){
            forElementsArray.push({
                id:key,
                config: this.state.orderForm[key],
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                    {/* <Input elementType='...' elementConfig='...' value='...'/> */}
                    {forElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            inputType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig} 
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event)=> this.inputChangedHandler(event, formElement.id)} />
                    ))}
                    <Button btnType='Success' clicked={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (oderData, token) => dispatch(actions.purchaseBurger(oderData, token))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData, axios));