import {
    SET_USERNAME,
    SET_PASSWORD,
    SET_FIRSTNAME,
    SET_LASTNAME,
    SET_EMAIL,
    SET_LOADING,
} from "../constants/constants"

export const initState = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    loading: false,
}

const authReducer = (state = initState, action) => {
    // console.log('action.type: ', action.payload);

    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case SET_FIRSTNAME:
            return {
                ...state,
                firstname: action.payload
            }
        case SET_LASTNAME:
            return {
                ...state,
                lastname: action.payload
            }
        case SET_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}

export default authReducer