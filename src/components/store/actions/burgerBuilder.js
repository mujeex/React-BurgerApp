import * as actionTypes from './actionTypes'
import axios from '../../../axios-orders'

export const addIngredient= (ingName)=> {
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient= (ingName)=> {
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const setIngredient= (ingredients)=> {
    return{
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed= ()=>{
    return{
        type: actionTypes.SET_INGREDIENTS_FAILED
    }
}


export const initIngredient=()=>{
    return dispatch => {
    axios.get('/ingredients.json')
  .then(response=> {
      dispatch(setIngredient(response.data))
  })
  .catch(error=> {
    dispatch(fetchIngredientsFailed())
    })
}
}
