import {
    logoutSaga,
    checkAuthTimeoutSaga,
    authSaga,
    authCheckStateSaga,
} from './auth'
import {initIngredientSaga} from './burgerBuilder'
import {fetchBurgerSaga,purchaseBurgerSaga} from './orders'
import {takeEvery,all} from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes'


export function* watchAuth(){
    yield all([
        takeEvery(actionTypes.AUTH_INTIATE_LOGOUT,logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT,checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER,authSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE,authCheckStateSaga)
    ])
     
    
}

export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.INIT_INGREDIENT,initIngredientSaga)
}

export function* watchOrders(){
    yield all([
         takeEvery(actionTypes.FETCH_ORDER,fetchBurgerSaga),
         takeEvery(actionTypes.PURCHASE_BURGER,purchaseBurgerSaga)
    ])
  
}