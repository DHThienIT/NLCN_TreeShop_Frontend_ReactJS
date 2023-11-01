import {
    SET_LIST_INVOICE,
    SET_LIST_DELIVERY_METHOD,
    SET_CURRENT_DELIVERY_METHOD,
    SET_SELECTED_ADDRESS_ID,
    SET_SELECTED_DELIVERY_METHOD_ID,
    SET_TOTAL_PAYMENT,
    SET_SHIPPING_FEE,
    SET_DISCOUNT,
    SET_DISCOUNT_CODE,
    SET_LIST_PAYMENT_METHOD,
    SET_SELECTED_PAYMENT_METHOD_ID,
} from "../constants/constants"

export const initState = {
    listInvoice: [],
    listDeliveryMethod: [],
    listPaymentMethod: [],
    curentDeliveryMethod: '',
    selectedAddressId: 0,
    selectedDeliveryMethodId: 0,
    selectedPaymentMethodId: 0,
    discountCode: '',

    totalPayment: 0,
    shippingFee: 0,
    discount: 0
}

const orderReducer = (state = initState, action) => {
    // console.log('action.type: ', action);
    switch (action.type) {
        case SET_LIST_INVOICE:
            return {
                ...state,
                listInvoice: action.payload
            }
        case SET_LIST_DELIVERY_METHOD:
            return {
                ...state,
                listDeliveryMethod: action.payload
            }
        case SET_LIST_PAYMENT_METHOD:
            return {
                ...state,
                listPaymentMethod: action.payload
            }
        case SET_CURRENT_DELIVERY_METHOD:
            return {
                ...state,
                curentDeliveryMethod: action.payload
            }
        case SET_SELECTED_ADDRESS_ID:
            return {
                ...state,
                selectedAddressId: action.payload
            }
        case SET_SELECTED_DELIVERY_METHOD_ID:
            return {
                ...state,
                selectedDeliveryMethodId: action.payload
            }
        case SET_SELECTED_PAYMENT_METHOD_ID:
            return {
                ...state,
                selectedPaymentMethodId: action.payload
            }
        case SET_DISCOUNT_CODE:
            return {
                ...state,
                discountCode: action.payload
            }
        case SET_TOTAL_PAYMENT:
            return {
                ...state,
                totalPayment: action.payload
            }
        case SET_SHIPPING_FEE:
            return {
                ...state,
                shippingFee: action.payload
            }
        case SET_DISCOUNT:
            return {
                ...state,
                discount: action.payload
            }

        default:
            return state;
    }
}

export default orderReducer