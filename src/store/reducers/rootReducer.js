import { combineReducers } from 'redux'
import productsReducer from './productsReducer'
import basketReducer from './basketReducer'
import adminReducer from './adminReducer'

export default combineReducers({
    products: productsReducer,
    basket: basketReducer,
    admin: adminReducer,
})
