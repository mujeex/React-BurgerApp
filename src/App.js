import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import './App.css';


import {Route,Switch,withRouter,Redirect} from 'react-router-dom'

import Logout from './containers/Auth/logout/logout'
import {connect} from 'react-redux'
import { authCheckState } from './components/store/actions';
import asyncComponent from './hoc/asynComponent/asyncComponent'



const asyncCheckout= asyncComponent(()=>{
  return import('./containers/Checkout/Checkout')
})

const asyncOrders= asyncComponent(()=>{
  return import('./containers/Orders/Orders')
})

const asyncAuth= asyncComponent(()=>{
  return import('./containers/Auth/Auth')
})


class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignUp()
  }


  render() {
    let routes= (
      <Switch>
      <Route path='/auth' component={asyncAuth}/>
       <Route path='/'  exact component={BurgerBuilder}/>
       <Redirect to='/'/>
      </Switch>
    )
      if(this.props.isAuthenticated){
        routes=(
          <Switch>
        <Route path='/checkout' component={asyncCheckout}/>
        <Route path='/orders' component={asyncOrders}/>
        <Route path='/auth' component={asyncAuth}/>
        <Route path='/logout' component={Logout}/>
        <Route path='/'  exact component={BurgerBuilder}/>
        </Switch>
        )
      }

    return (
      <div >
      <Layout>
        {routes}
       
      </Layout>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isAuthenticated:state.auth.token !== null
  }
}

const mapDispatchToProps= dispatch=>{
  return{
    onTryAutoSignUp: ()=> dispatch(authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
