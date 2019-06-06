import React, { Component } from 'react'

import classes from './Auth.css'
import Input from '../../components/UI/input/input'
import Button from '../../components/UI/Button/Button'
import * as actions from '../../components/store/actions/index'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Spinner from '../../components/UI/Spinner/Spinner'
import {updateObject,checkValidity} from '../../shared/utility'

class Auth extends Component{

    state={
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail:true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:6,
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

componentDidMount() {
    if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
        this.props.onSetAuthRedirectPath()
    }
    
}


    switchAuthModeHandler= ()=> {
        this.setState(prevState => {
            return {isSignUp:!prevState.isSignUp}
        })
    }


    inputChangedHandler=(event, controlName)=>{
        const updatedControls = updateObject(this.state.controls,{
            [controlName]:updateObject(this.state.controls,{
                value: event.target.value,
                valid: checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched: true
            })
        })


        console.log(event.target.value)

        this.setState({controls: updatedControls})
        
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignUp)
    }

   

   


    render(){
        const formElementsArray=[];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        const form= formElementsArray.map(formElement=>(
            <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event)=>this.inputChangedHandler(event,formElement.id)}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            valueType={formElement.id}
            />
            ))

            let errorMessage=this.props.onError?<p>{this.props.onError.message}</p>:null
            let authRedirect=this.props.isAuth?<Redirect to={this.props.authRedirectPath}/>:null

            const completeForm= this.props.onLoading?<Spinner/>:(
                <>
                
                {errorMessage}
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                {form}
                <Button btnType='Success'>Submit</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler} btnType='Danger'>Switch To {this.state.isSignUp?'SignIn':'SignUp'}</Button>
                </>
            )

      

        return(
            <div className={classes.Auth}>
               {completeForm}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        onLoading: state.auth.loading,
        onError: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger :state.builder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps= dispatch=>{
    return{
        onAuth: (email,password,isSignUp)=>dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath: ()=> dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)