import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4, 
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredients = (state,action) => {
    const updatedIngredient = { [action.ingredientName] : state.ingredients[action.ingredientName] + 1 }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient) 
            const updatedState = {
                ingredients : updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedState)
            // return {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         // a ES6 expression for dynamically accept a param as property key
            //         [action.ingredientName] : state.ingredients[action.ingredientName] + 1 
            //     },
            //     totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            // };
}

const removeIngredients = (state, action) => {
    const updatedIng = {[action.ingredientName] : state.ingredients[action.ingredientName] - 1};
            const updatedIngs = updateObject(state.ingredients, updatedIng);
            const updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedSt)
            // return {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         // a ES6 expression for dynamically accept a param as property key
            //         [action.ingredientName] : state.ingredients[action.ingredientName] - 1 
            //     },
            //     totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            // };

}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false    // reset the error to false eveytime for retrieving intial ingredients from firebase
    })
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {
        error: true 
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT : return addIngredients(state, action);    
        case actionTypes.REMOVE_INGREDIENT : return removeIngredients(state, action);    
        case actionTypes.SET_INGREDIENTS : return setIngredients(state, action);     
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default:
            return state;
    }
};

export default reducer; 