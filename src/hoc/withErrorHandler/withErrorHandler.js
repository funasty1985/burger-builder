import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'

const withErrorHandler = (WrappedComponent, axiosObj) => {
    // return an annomymous class
    return class extends Component {
        state = {
            errror:null
        }
        // **
        // ComponentDidMount is called after all the childs component have been rendered which means after the componentDidMount of the child components have completed
        // So the componentDidMount in the withErrorHandler will only be called when the componentDidMount in burgerBuilder has completed 
        // So the interceptors here will not applied to axios call @ componentDidMount of BurgerBuilder.
        // So no error message model will pop out when that axios call returns a error message. (although the error of the post axios call of purchaseContinueHandler is still detectable)
        // So we put interceptors to componentWillMount instead of componentDidMount
        // recall : componentWillMount is called before child component is rendered 
        // componentDidMount(){
        componentWillMount(){
            this.reqInterceptor = axiosObj.interceptors.request.use(req => {
                // reset the error to null new a new request is set 
                this.setState({error:null})  
                return req   
            })
            //** 
            this.resInterceptor = axiosObj.interceptors.response.use(res =>res, error=>{
                this.setState({error: error})
            })   
        }
        // imagine we apply withErrorHandler to place with axios res or req in an app,
        // multiple interceptors will be created .
        // To kill an interceptor when the targeted component is unount, we use eject() 
        // Firstly we assign the interceptors to either this.reInterceptor or this.resInterceptor at componentWillMount and eject them as below
        // this.reInterceptor is just a normal property of the return class instance, unlike state property , normal property will not trigger rerender of component
        componentWillUnmount(){
            axiosObj.interceptors.request.eject(this.reqInterceptor);
            axiosObj.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error:null})
        }

        render(){
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error? this.state.error.message : null}
                    </Modal>
                     {/* keep the props of the WrappedComponent */}
                    <WrappedComponent {...this.props}/> 
                </Aux>
                    );
        }
        }
    }
    

export default withErrorHandler; 