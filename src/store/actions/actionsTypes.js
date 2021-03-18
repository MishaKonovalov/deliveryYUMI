import axios from 'axios'
// productPage actions

export const menuLoaded = (menuItems) => {
    return {
        type: 'MENU_LOADED',
        payload: menuItems,
    }
}

export const menuRequest = () => {
    return {
        type: 'MENU_REQUEST',
    }
}

export const menuError = () => {
    return {
        type: 'MENU_ERROR',
    }
}

export const dec = (id) => {
    return {
        type: 'DEC',
        payload: id,
    }
}

export const inc = (id) => {
    return {
        type: 'INC',
        payload: id,
    }
}

// basket actions

export const addToBasket = (item) => {
    return {
        type: 'ADD_TO_BASKET',
        payload: item,
    }
}

export const deleteItem = (index) => {
    return {
        type: 'DELETE',
        payload: index,
    }
}

export const clear = () => {
    return {
        type: 'CLEAR_BASKET',
    }
}

export const toggleBasket = () => {
    return {
        type: 'TOGGLE_BASKET',
    }
}

//Ordering

export const toOrderToggle = () => {
    return {
        type: 'TO_ORDER_TOGGLE',
    }
}

export const onChange = (e, cost) => {
    return {
        type: 'CHANGE',
        id: e.target.id,
        value: e.target.value,
        cost: cost,
    }
}

export const payCash = () => {
    return {
        type: 'PAY_CASH',
    }
}

export const payCard = (cost) => {
    return {
        type: 'PAY_CARD',
    }
}

export const checkout = () => {
    return {
        type: 'CHECKOUT',
    }
}

export const clearState = () => {
    return {
        type: 'CLEAR_STATE',
    }
}

// AdminPanel

export const barsToggle = () => {
    return {
        type: 'BARS_TOGGLE',
    }
}
export const loading = () => {
    return {
        type: 'LOADING',
    }
}
export const loaded = (orders) => {
    return {
        orders: orders,
        type: 'LOADED',
    }
}
export const loadedOrder = (order) => {
    return {
        order: order,
        type: 'LOADED_ORDER',
    }
}

export const acceptedOrdersLoaded = (acceptedOrders) => {
    return {
        acceptedOrders,
        type: 'ACCEPT_ORDER',
    }
}

export const filterProductList = (category) => {
    return {
        type: 'FILTER_PRODUCTS',
        category,
    }
}

export const searchItems = (value) => {
    return {
        type: 'SEARCH_ITEMS',
        value,
    }
}

export const addToStopList = (category, title, inStopList) => {
    return {
        type: 'ADD_TO_STOP_LIST',
        params: { category, title },
    }
}

export const isAccepted = (order) => {
    return {
        type: 'IS_ACCEPTED',
        order,
    }
}
export const open = () => {
    return {
        type: 'OPEN_SIDE_BARS',
    }
}

//THUNK
export const fetchMenuItems = (url) => {
    return async (dispatch) => {
        dispatch(menuRequest())
        await axios
            .get(
                `https://delivery-ymi-default-rtdb.firebaseio.com/menu/${url}.json`
            )
            .then((res) =>
                res.data === null
                    ? dispatch(menuError())
                    : dispatch(menuLoaded(res.data))
            )
    }
}
export const getOrders = () => {
    return async (dispatch) => {
        dispatch(loading())
        await axios
            .get(`https://delivery-ymi-default-rtdb.firebaseio.com/orders.json`)
            .then((res) => dispatch(loaded(res.data)))
    }
}
export const getAcceptedOrdersLoaded = () => {
    return async (dispatch) => {
        dispatch(loading())
        await axios
            .get(
                `https://delivery-ymi-default-rtdb.firebaseio.com/acceptedOrders.json`
            )
            .then((res) => dispatch(acceptedOrdersLoaded(res.data)))
    }
}

export const postItems = (order) => {
    return async (dispatch) => {
        await axios({
            method: 'post',
            url: 'https://delivery-ymi-default-rtdb.firebaseio.com/orders.json',
            data: {
                name: order.name,
                numberOfPhone: order.numberOfPhone,
                address: order.address,
                payCard: order.payCard,
                payCash: order.payCash,
                comment: order.comment,
                change: order.change,
                cost: order.cost,
                productList: order.productList,
                accepted: false,
                numbersOfOrder: String(
                    Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
                ).slice(0, 4),
            },
        })
            .then((res) => {
                dispatch(checkout())

                setTimeout(() => {
                    dispatch(clearState())
                }, 2000)
            })
            .then(dispatch({ type: 'UPDATE_ADMIN' }))
    }
}
export const fetchOrder = (orderId, accepted) => {
    return async (dispatch) => {
        dispatch(loading())
        let acceptedOrder = await axios
            .get(
                `https://delivery-ymi-default-rtdb.firebaseio.com/acceptedOrders/${orderId}.json`
            )
            .then((res) => res.data)
        let order = await axios
            .get(
                `https://delivery-ymi-default-rtdb.firebaseio.com/orders/${orderId}.json`
            )
            .then((res) => res.data)

        order === null
            ? dispatch(loadedOrder(acceptedOrder))
            : dispatch(loadedOrder(order))
    }
}

export const acceptOrder = (order, id) => {
    const newOrder = { ...order, accepted: true }
    return async (dispatch) => {
        await axios.delete(
            `https://delivery-ymi-default-rtdb.firebaseio.com/orders/${id}.json`
        )
        await axios.post(
            'https://delivery-ymi-default-rtdb.firebaseio.com/acceptedOrders.json',
            newOrder
        )
    }
}

export const fetchAveryProductsItems = () => {
    return async (dispatch) => {
        await axios
            .get(`https://delivery-ymi-default-rtdb.firebaseio.com/menu.json`)
            .then((res) => {
                dispatch({ type: 'AVERY_PRODUCTS', averyProducts: res.data })
            })
    }
}

export const postStopListItems = (menuList) => {
    const newMenuList = { ...menuList }
    return async (dispatch) => {
        await axios.patch(
            `https:delivery-ymi-default-rtdb.firebaseio.com/menu/.json`,
            newMenuList
        )
    }
}

export const login = ({ email, password }) => {
    const loginData = {
        email,
        password,
        returnSecureToken: true,
    }
    return async (dispatch) => {
        await axios
            .post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAzb-EN7QTAcjtYCr3aM7cb3Rf2rJ6VPdQ`,
                loginData
            )
            .then((res) => dispatch({ token: res.data.idToken, type: 'LOGIN' }))
    }
}
