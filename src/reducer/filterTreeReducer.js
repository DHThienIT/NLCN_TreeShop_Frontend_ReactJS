import {
    SET_ACTION_FILTER,
    COLOR_LIST_FILTER,
    PLANTING_PLACE_LIST_FILTER,
    PRICE_LIST_FILTER,
    SET_TEXT_SEARCH,
    SET_MIN_FILTER_VALUE,
    SET_MAX_FILTER_VALUE,
    SET_SORT_BY,
    SET_FILTER_BY,
    // SET_CONDITION_FILTER_CHECKED,
    COLOR_LIST_SELECTED
} from "../constants/constants"

import { PlantingPlaceList } from "../utils/initState"

export const initState = {
    actionFilter: 'none',
    textSearch: '',
    priceListFilter: [],
    plantingPlaceListFilter: PlantingPlaceList,
    colorListFilter: [],

    sortBy: 'tree_id',
    filterBy: 'Decrease',
    filterMin: 0,
    filterMax: 0,
    // conditionFilterChecked: false,
    colorListSelected: []
}

const filterTreeReducer = (state = initState, action) => {
    // console.log('action.type: ', action);

    switch (action.type) {
        case SET_ACTION_FILTER:
            return {
                ...state,
                actionFilter: action.payload
            }
        case SET_TEXT_SEARCH:
            return {
                ...state,
                textSearch: action.payload
            }
        case PRICE_LIST_FILTER:
            return {
                ...state,
                priceListFilter: action.payload,
            }
        case SET_MIN_FILTER_VALUE:
            return {
                ...state,
                filterMin: action.payload
            }
        case SET_MAX_FILTER_VALUE:
            return {
                ...state,
                filterMax: action.payload
            }
        // case SET_CONDITION_FILTER_CHECKED:
        //     return {
        //         ...state,
        //         conditionFilterChecked: action.payload
        //     }
        case SET_SORT_BY:
            return {
                ...state,
                sortBy: action.payload
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: action.payload
            }
        case PLANTING_PLACE_LIST_FILTER:
            return {
                ...state,
                plantingPlaceListFilter: action.payload
            }
        case COLOR_LIST_FILTER:
            return {
                ...state,
                colorListFilter: action.payload
            }
        case COLOR_LIST_SELECTED:
            return {
                ...state,
                colorListSelected: action.payload
            }
        default:
            return state;
    }
}

export default filterTreeReducer