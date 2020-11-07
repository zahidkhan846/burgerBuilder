import * as actionType from "../Actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 2,
  error: false,
  building: false,
};

const ingredientsPrices = { salad: 0.5, bacon: 0.7, cheese: 1, meat: 1.2 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        totalPrice: state.totalPrice + ingredientsPrices[action.ingredient],
        building: true,
      };
    }
    case actionType.REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1,
        },
        totalPrice: state.totalPrice - ingredientsPrices[action.ingredient],
        building: true,
      };
    }

    case actionType.SET_INGREDIENTS: {
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        error: false,
        totalPrice: 2,
        building: false,
      };
    }
    case actionType.FETCH_INGREDIENTS_FAILED: {
      return {
        ...state,
        error: true,
      };
    }

    default:
      return state;
  }
};

export default reducer;
