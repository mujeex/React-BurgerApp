import {combineReducers} from 'redux'
import burgerBuilderReducer from './burgerBuilder'
import orderReducer from './order'
import authReducer from './auth'



const rootReducer= combineReducers({
    builder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
})

export default rootReducer