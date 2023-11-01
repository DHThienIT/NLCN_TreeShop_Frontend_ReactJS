import {
    SET_ONE_TREE_INFO,
    SET_LIST_TREE,
    SET_NUMBER_OF_TREE,
    SET_PATH_NAME,
    SET_MESSAGE,
    SET_ALLOW_EDIT,
    SET_NOTIFICATION,
    SET_SELECTED_COMPONENT,
} from "../constants/constants"

export const initState = {
    listTree: [],
    oneTreeInfo: {},
    numberOfTree: 0,
    pathName: 'Toàn bộ',
    allowEdit: false,
    selectedComponent: '',
    notification: '',
    message: '',
}

const mainReducer = (state = initState, action) => {
    // console.log('action.type: ', action);

    switch (action.type) {
        case SET_LIST_TREE:
            return {
                ...state,
                listTree: action.payload
            }
        case SET_ONE_TREE_INFO:
            return {
                ...state,
                oneTreeInfo: action.payload
            }
        case SET_NUMBER_OF_TREE:
            return {
                ...state,
                numberOfTree: action.payload
            }
        case SET_PATH_NAME:
            return {
                ...state,
                pathName: action.payload
            }
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            }
        case SET_ALLOW_EDIT:
            return {
                ...state,
                allowEdit: action.payload
            }
        case SET_NOTIFICATION:
            return {
                ...state,
                notification: action.payload
            }
        case SET_SELECTED_COMPONENT:
            return {
                ...state,
                selectedComponent: action.payload
            }
        default:
            return state;
    }
}

export default mainReducer