import {
    SET_LIST_PAGE,
    SET_SELECTED_PAGE
} from "../constants/constants"

export const initState = {
    listPage: [],
    selectedPage: 1
}

const paginationReducer = (state = initState, action) => {
    // console.log('action.type: ', action.payload);

    switch (action.type) {
        case SET_LIST_PAGE:
            return {
                ...state,
                listPage: action.payload
            }
        case SET_SELECTED_PAGE:
            return {
                ...state,
                selectedPage: action.payload
            }
        
        default:
            return state;
    }
}

export default paginationReducer