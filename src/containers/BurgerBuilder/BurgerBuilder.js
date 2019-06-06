import React, {Component} from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
// import * as actionTypes from '../../components/store/actions/actionTypes'
import * as actions from '../../components/store/actions/index'
import {connect} from 'react-redux'




export class BurgerBuilder extends Component {

state= {
    purchasing: false,

}

componentDidMount = () => {
//     console.log(this.props)
this.props.onInitIngredient()
}


updatePurchaseState (ingredients) {
 
    const sum= Object.keys(ingredients)
    .map(igKey=>{
        return ingredients[igKey];
    })
    .reduce((sum, el)=>{
        return sum + el;
    },0)

     return sum>0
}




purchaseHandler =()=>{
    if(this.props.isAuthenticated){
        this.setState({purchasing:true})
    }else{
        this.props.onSetAuthRedirectPath('/checkout')
        this.props.history.push('/auth')
    }
    
}

purchaseCancelHandler = ()=> {
    this.setState({purchasing:false})

}

purchaseContinueHandler= ()=> {
    this.props.onPurchaseInit()
    this.props.history.push('./checkout')
}

    render(){
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }

      
           
        let orderSummary=null
        let burger=this.props.error? <p>Ingredient can't be loaded!</p>:<Spinner/>
       
        if(this.props.ings){
            burger= (
                <>
                 <Burger ingredients={this.props.ings}/>
                <BuildControls 
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientRemoved}
                disabled={disabledInfo}
                price={this.props.totalPrice}
                purchasable={this.updatePurchaseState(this.props.ings)}
                isAuth={this.props.isAuthenticated}
                ordered={this.purchaseHandler} />
                </> 
            )
            orderSummary=(
                <OrderSummary 
                  price={this.props.totalPrice}
                  cancel={this.purchaseCancelHandler}
                  continue={this.purchaseContinueHandler}
                     ingredients={this.props.ings}/>
      )
        }
        // if(this.state.loading){
        //     orderSummary=(<Spinner/>)
        // }

         

        return(
            <>
                <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler} >
                   {orderSummary} 
                </Modal>
              {burger}
               
            </>
        )
    }
}

const mapStateToProps= state=>{
    return{
        ings: state.builder.ingredients,
        totalPrice: state.builder.totalPrice,
        error: state.builder.error,
        isAuthenticated:state.auth.token!==null
    }
}

const mapDispatchToProps= dispatch=>{
    return{
        onIngredientAdded: (ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=> dispatch(actions.removeIngredient(ingName)),
        onInitIngredient: ()=> dispatch(actions.initIngredient()),
        onPurchaseInit: ()=> dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path)=> dispatch(actions.setAuthRedirectPath(path))
    }
}
    


export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler (BurgerBuilder, axios))