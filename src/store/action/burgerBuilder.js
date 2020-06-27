import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addingredients = (name) => {

    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name

    }
};

export const removeingredients = (name) => {

    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name

    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients 
    };
}

export const fetchIngredientsFailed = () => {

    return {
        type: actionTypes.FETCH_INGREDIENT_FAIL,
       
    };
}

export const initIngredients = () => {

    return dispatch => {

        axios.get('https://react-myburger-app-9336d.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed());
        });
    }
};