import {
    SUCCESSFUL_LOGIN_NOTIFICATION,
    SET_TRACKING_LIST_TREE,
    SET_AVATAR_IMAGE,
    SET_ACCOUNT_INFORMATION,
    SET_CHECK_PASSWORD,
    SET_PHONE,
    SET_NEW_PASSWORD,
} from "../constants/constants"

export const initState = {
    currentUser: '',
    listTrackingListTree: [],
    avatarImage: '',
    accountInformation: {},
    phone: '',
    newPassword: '',
    checkPassword: '',
}

const accountReducer = (state = initState, action) => {
    // console.log('action.type: ', action);

    switch (action.type) {
        case SUCCESSFUL_LOGIN_NOTIFICATION:
            return {
                ...state,
                currentUser: action.payload
            }
        case SET_TRACKING_LIST_TREE:
            return {
                ...state,
                listTrackingListTree: action.payload
            }
        case SET_AVATAR_IMAGE:
            return {
                ...state,
                avatarImage: action.payload
            }
        case SET_ACCOUNT_INFORMATION:
            return {
                ...state,
                accountInformation: action.payload
            }
        case SET_PHONE:
            return {
                ...state,
                phone: action.payload
            }
        case SET_NEW_PASSWORD:
            return {
                ...state,
                newPassword: action.payload
            }
        case SET_CHECK_PASSWORD:
            return {
                ...state,
                checkPassword: action.payload
            }

        default:
            return state;
    }
}

export default accountReducer