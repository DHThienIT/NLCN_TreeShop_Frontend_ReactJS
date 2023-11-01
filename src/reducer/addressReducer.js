import {
    SET_LIST_ADDRESS,
    SET_ADDRESS_ID,
    SET_PROVINCE_AND_CITY_LIST,
    SET_COUNTRY_AND_DISTRICT_LIST,
    SET_WARD_LIST,
    SET_DEFAULT_ADDRESS,
    SET_RECIPIENT_NAME,
    SET_SPECIFIC_ADDRESS,
    CHECK_DEFAULT,
} from "../constants/constants"

export const initState = {
    listAddress: [],
    addressId: 0,
    defaultAddress: {},
    provinceAndCityList: [],
    countryAndDistrictList: [],
    wardList: [],
    recipientName: '',
    specificAddress: '',
    checkDefault: false,
}

const addressReducer = (state = initState, action) => {
    // console.log('action.type: ', action);
    switch (action.type) {
        case SET_LIST_ADDRESS:
            return {
                ...state,
                listAddress: action.payload
            }
        case SET_ADDRESS_ID:
            return {
                ...state,
                addressId: action.payload
            }
        case SET_DEFAULT_ADDRESS:
            return {
                ...state,
                defaultAddress: action.payload
            }
        case SET_PROVINCE_AND_CITY_LIST:
            return {
                ...state,
                provinceAndCityList: action.payload
            }
        case SET_COUNTRY_AND_DISTRICT_LIST:
            return {
                ...state,
                countryAndDistrictList: action.payload
            }
        case SET_WARD_LIST:
            return {
                ...state,
                wardList: action.payload
            }
        case SET_RECIPIENT_NAME:
            return {
                ...state,
                recipientName: action.payload
            }
        case SET_SPECIFIC_ADDRESS:
            return {
                ...state,
                specificAddress: action.payload
            }
        case CHECK_DEFAULT:
            return {
                ...state,
                checkDefault: action.payload
            }
        default:
            return state;
    }
}

export default addressReducer