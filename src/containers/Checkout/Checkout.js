import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './contactData/contactData'
import {connect} from 'react-redux'


class Checkout extends Component {

    
   
    
    checkoutCancelledHandler = ()=> {
        this.props.history.goBack();
    }
    checkoutContinuedHandler= ()=> {
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        let summary= <Redirect to='/'/>
        if(this.props.ings){
            const purchaseRedirect= this.props.purchased?<Redirect to='/'/>:null

            summary=(
                <>
                {purchaseRedirect}
                <CheckoutSummary 
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                ingredients={this.props.ings}/>

                <Route path={this.props.match.path+ '/contact-data'}
                    component={ContactData}/>
                    </>
            )
        }
        return(
            <div>
            {summary}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ings: state.builder.ingredients,
        purchased: state.order.purchased
    }
}



export default connect(mapStateToProps)(Checkout) 