import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm:{
                name: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:''
                },
                street: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'street'
                    },
                    value:''
                },
                zipCode:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'zipCode'
                    },
                    value:''
                },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'country'
                    },
                    value:''
                },
                email: {
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'email'
                    },
                    value:''
                },
                deliverMethod:{
                    elementType:'select',
                    elementConfig:{
                        options: [
                            {value: 'fastest', displayValues:'Fastest'},
                            {value: 'cheapest', displayValues:'Cheapest'}
                        ]
                    },
                    value:''
                }
        },
        loading:false 
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true})
        const order = {
            ingredients:this.props.ingredients,
            price: this.props.price,
        }
        console.log('see see what have i ordered :::', order)
        axios.post('/orders.json', order)
            .then(res =>{
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(err =>{
                this.setState({ loading: false })
            });
    }

    render() {
        const forElementsArray = []
        for (let key in this.state.orderForm){
            forElementsArray.push({
                id:key,
                config: this.state.orderForm[key],
            })
        }
        console.log('forElementsArray:::', forElementsArray)
        let form = (
            <form>
                    {/* <Input elementType='...' elementConfig='...' value='...'/> */}
                    {forElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig} 
                            value={formElement.config.value}/>
                    ))}
                    <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if (this.state.loading) {
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

export default ContactData;