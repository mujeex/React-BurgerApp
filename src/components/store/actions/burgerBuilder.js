import * as actionTypes from './actionTypes'


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
   return {type: actionTypes.INIT_INGREDIENT};
}
