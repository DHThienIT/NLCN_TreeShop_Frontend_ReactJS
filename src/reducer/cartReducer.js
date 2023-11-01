import { SET_CART, SET_TOTAL_CART_AMOUNT } from "../constants/constants"

export const initState = {
    cart: [],
    totalCartAmount: 0,
}

const cartReducer = (state = initState, action) => {
    // console.log('action.type: ', action);
    switch (action.type) {
        case SET_CART:
            return {
                ...state,
                cart: action.payload
            }
        case SET_TOTAL_CART_AMOUNT:
            return {
                ...state,
                totalCartAmount: action.payload
            }

        default:
            return state;
    }
}

export default cartReducer