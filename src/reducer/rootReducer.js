import { combineReducers } from 'redux'
import mainReducer from './mainReducer'
import authReducer from './authReducer'
import paginationReducer from './paginationReducer'
import accountReducer from './accountReducer'
import filterTreeReducer from './filterTreeReducer'
import cartReducer from './cartReducer'
import subAddReducer from './subAddReducer'
import addressReducer from './addressReducer'
import orderReducer from './orderReducer'

const rootReducer = combineReducers({
    mainReducer,
    authReducer,
    paginationReducer,
    accountReducer,
    filterTreeReducer,
    cartReducer,
    subAddReducer,
    addressReducer,
    orderReducer,
})

export default rootReducer;