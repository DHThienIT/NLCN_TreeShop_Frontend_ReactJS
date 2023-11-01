import { SET_QUANTITY } from "../constants/constants"

export const initState = {
    quantity: 1
}

const subAddReducer = (state = initState, action) => {
    // console.log('action.type: ', action.payload);

    switch (action.type) {
        case SET_QUANTITY:
            return {
                ...state,
                quantity: action.payload
            }
        
        default:
            return state;
    }
}

export default subAddReducer