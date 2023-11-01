import {
    GET_ALL_LIST_TREE, SET_CHECK_PASSWORD, SET_EMAIL, SET_FIRSTNAME, SET_LASTNAME,
    SET_LIST_TREE, SET_LOADING, SET_MESSAGE, SET_NOTIFICATION, SET_NUMBER_OF_TREE,
    SET_PASSWORD, SET_PATH_NAME, SET_TEXT_SEARCH, SET_SELECTED_PAGE, SET_TRACKING_LIST_TREE,
    SET_USERNAME, SUCCESSFUL_LOGIN_NOTIFICATION, PLANTING_PLACE_LIST_FILTER, COLOR_LIST_FILTER, PRICE_LIST_FILTER,
    SET_ACTION_FILTER, SET_MIN_FILTER_VALUE, SET_MAX_FILTER_VALUE, SET_SORT_BY, SET_FILTER_BY,
    SET_CONDITION_FILTER_CHECKED, SET_LIST_PAGE, COLOR_LIST_SELECTED, SET_CART, SET_QUANTITY,
    SET_ONE_TREE_INFO, SET_PAYMENT_METHOD, SET_AVATAR_IMAGE, RESTART_TRACKING_LIST_TREE, SET_ACCOUNT_INFORMATION,
    SET_PHONE, SET_ALLOW_EDIT, SET_LIST_ADDRESS, SET_ADDRESS_ID, SET_DEFAULT_ADDRESS,
    SET_SELECTED_COMPONENT, SET_NEW_PASSWORD, SET_PROVINCE_AND_CITY_LIST, SET_COUNTRY_AND_DISTRICT_LIST, SET_WARD_LIST,
    CHECK_DEFAULT, SET_SPECIFIC_ADDRESS, SET_RECIPIENT_NAME, RESTART_lIST_ADDRESS, SET_LIST_INVOICE,
    SET_LIST_DELIVERY_METHOD, SET_TOTAL_CART_AMOUNT, SET_SELECTED_ADDRESS_ID, SET_SELECTED_DELIVERY_METHOD_ID,
    SET_TOTAL_PAYMENT, SET_SHIPPING_FEE, SET_DISCOUNT, SET_CURRENT_DELIVERY_METHOD, SET_DISCOUNT_CODE,
    SET_LIST_PAYMENT_METHOD, SET_SELECTED_PAYMENT_METHOD_ID,
} from '../constants/constants'

export const getAllListTree = () => ({
    type: GET_ALL_LIST_TREE
})

// mainReducer Actions
export const setListTree = (payload) => ({
    type: SET_LIST_TREE,
    payload
})

export const setNumberOfTree = (payload) => ({
    type: SET_NUMBER_OF_TREE,
    payload
})

export const setPathName = (payload) => ({
    type: SET_PATH_NAME,
    payload
})

export const setOneTreeInfo = (payload) => ({
    type: SET_ONE_TREE_INFO,
    payload
})

export const setAllowEdit = (payload) => ({
    type: SET_ALLOW_EDIT,
    payload
})

export const setLoading = (payload) => ({
    type: SET_LOADING,
    payload
})

export const setMessage = (payload) => ({
    type: SET_MESSAGE,
    payload
})

export const setNotification = (payload) => ({
    type: SET_NOTIFICATION,
    payload
})

export const setSelectedComponent = (payload) => ({
    type: SET_SELECTED_COMPONENT,
    payload
})

// accountReducer Actions
export const setUsername = (payload) => ({
    type: SET_USERNAME,
    payload
})

export const setPassword = (payload) => ({
    type: SET_PASSWORD,
    payload
})

export const setFirstname = (payload) => ({
    type: SET_FIRSTNAME,
    payload
})

export const setLastname = (payload) => ({
    type: SET_LASTNAME,
    payload
})

export const setEmail = (payload) => ({
    type: SET_EMAIL,
    payload
})

export const setPhone = (payload) => ({
    type: SET_PHONE,
    payload
})

export const setNewPassword = (payload) => ({
    type: SET_NEW_PASSWORD,
    payload
})

export const setCheckPassword = (payload) => ({
    type: SET_CHECK_PASSWORD,
    payload
})

export const successfulLoginNotification = (payload) => ({
    type: SUCCESSFUL_LOGIN_NOTIFICATION,
    payload
})

// paginationReducer Constants
export const setListPage = (payload) => ({
    type: SET_LIST_PAGE,
    payload
})

export const setSelectedPage = (payload) => ({
    type: SET_SELECTED_PAGE,
    payload
})

// accountInfoReducer Actions
export const setTrackingListTree = (payload) => ({
    type: SET_TRACKING_LIST_TREE,
    payload
})

export const setAvatarImage = (payload) => ({
    type: SET_AVATAR_IMAGE,
    payload
})

export const setAccountInformation = (payload) => ({
    type: SET_ACCOUNT_INFORMATION,
    payload
})

export const restartTrackingListTree = (currentUserId, treeId) => ({
    type: RESTART_TRACKING_LIST_TREE,
    currentUserId,
    treeId
})

// filterTreeReducer Actions
export const setActionFilter = (payload) => ({
    type: SET_ACTION_FILTER,
    payload
})

export const setTextSearch = (payload) => ({
    type: SET_TEXT_SEARCH,
    payload
})

export const setPriceListFilter = (payload) => ({
    type: PRICE_LIST_FILTER,
    payload
})

export const setMinFilterValue = (payload) => ({
    type: SET_MIN_FILTER_VALUE,
    payload
})

export const setMaxFilterValue = (payload) => ({
    type: SET_MAX_FILTER_VALUE,
    payload
})

export const setConditionFilterChecked = (payload) => ({
    type: SET_CONDITION_FILTER_CHECKED,
    payload
})

export const setSortBy = (payload) => ({
    type: SET_SORT_BY,
    payload
})

export const setFilterBy = (payload) => ({
    type: SET_FILTER_BY,
    payload
})

export const setPlantingPlaceListFilter = (payload) => ({
    type: PLANTING_PLACE_LIST_FILTER,
    payload
})

export const setColorListFilter = (payload) => ({
    type: COLOR_LIST_FILTER,
    payload
})

export const setColorListSelected = (payload) => ({
    type: COLOR_LIST_SELECTED,
    payload
})

// cartReducer Actions
export const setCart = (payload) => ({
    type: SET_CART,
    payload
})

export const setTotalCartAmount = (payload) => ({
    type: SET_TOTAL_CART_AMOUNT,
    payload
})

// subAddReducer Actions
export const setQuantity = (payload) => ({
    type: SET_QUANTITY,
    payload
})

// addressReducer Actions
export const restartListAddress = (payload) => ({
    type: RESTART_lIST_ADDRESS,
    payload
})

export const setListAddress = (payload) => ({
    type: SET_LIST_ADDRESS,
    payload
})

export const setAddresseId = (payload) => ({
    type: SET_ADDRESS_ID,
    payload
})

export const setDefaultAddress = (payload) => ({
    type: SET_DEFAULT_ADDRESS,
    payload
})

export const setProvinceAndCityList = (payload) => ({
    type: SET_PROVINCE_AND_CITY_LIST,
    payload
})

export const setCountryAndDistrictList = (payload) => ({
    type: SET_COUNTRY_AND_DISTRICT_LIST,
    payload
})

export const setWardList = (payload) => ({
    type: SET_WARD_LIST,
    payload
})

export const setRecipientName = (payload) => ({
    type: SET_RECIPIENT_NAME,
    payload
})

export const setSpecificAddress = (payload) => ({
    type: SET_SPECIFIC_ADDRESS,
    payload
})

export const switchCheckDefault = (payload) => ({
    type: CHECK_DEFAULT,
    payload
})

// orderReducer Actions
export const setListInvoice = (payload) => ({
    type: SET_LIST_INVOICE,
    payload
})

export const setListDeliveryMethod = (payload) => ({
    type: SET_LIST_DELIVERY_METHOD,
    payload
})

export const setListPaymentMethod = (payload) => ({
    type: SET_LIST_PAYMENT_METHOD,
    payload
})

export const setCurrentDeliveryMethod = (payload) => ({
    type: SET_CURRENT_DELIVERY_METHOD,
    payload
})

export const setSelectedAddressId = (payload) => ({
    type: SET_SELECTED_ADDRESS_ID,
    payload
})

export const setSelectedDeliveryMethodId = (payload) => ({
    type: SET_SELECTED_DELIVERY_METHOD_ID,
    payload
})

export const setSelectedPaymentMethodId = (payload) => ({
    type: SET_SELECTED_PAYMENT_METHOD_ID,
    payload
})

export const setTotalPayment = (payload) => ({
    type: SET_TOTAL_PAYMENT,
    payload
})

export const setDiscountCode = (payload) => ({
    type: SET_DISCOUNT_CODE,
    payload
})

export const setShippingFee = (payload) => ({
    type: SET_SHIPPING_FEE,
    payload
})

export const setDiscount = (payload) => ({
    type: SET_DISCOUNT,
    payload
})