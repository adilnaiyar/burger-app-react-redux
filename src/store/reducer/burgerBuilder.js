import * as actionType from '../action/actionTypes';

const initialState = {

    ingredients: null,
    totalPrice: 20,
    error: false,
    building: false
}

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.2,
    bacon: 0.7
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case actionType.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                building: true
            };
        case actionType.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1 
                },

                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
                building: true
            };
        case actionType.SET_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,  
                },
                totalPrice: 20,
                error: false,
                building: false
            };
        case actionType.FETCH_INGREDIENT_FAIL:
            return {
                ...state,
                error: true
            };

        default:
            return state;
    }
};

export default reducer;