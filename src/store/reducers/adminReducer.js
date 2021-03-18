const initialState = {
    token: null,
    openBars: false,
    openSideBars: false,
    loading: false,
    orders: [],
    acceptedOrders: [],
    order: { productList: [] },
    averyProductsList: [],
    filterProductsList: [],
    update: false,
}

export default function adminReducer(state = initialState, action) {
    switch (action.type) {
        case 'BARS_TOGGLE':
            return {
                ...state,
                openBars: !state.openBars,
            }
        case 'LOADING':
            return {
                ...state,
                loading: true,
            }
        case 'LOADED':
            return {
                ...state,
                loading: false,
                orders: { ...action.orders },
            }
        case 'LOADED_ORDER':
            return {
                ...state,
                order: { ...action.order },
                loading: false,
            }
        case 'ACCEPT_ORDER':
            return {
                ...state,
                loading: false,
                acceptedOrders: { ...action.acceptedOrders },
            }
        case 'AVERY_PRODUCTS':
            return {
                ...state,
                averyProductsList: { ...action.averyProducts },
            }
        case 'FILTER_PRODUCTS':
            const categoryToRender = state.averyProductsList[action.category]
            return {
                ...state,
                update: true,
                filterProductsList: categoryToRender,
            }
        case 'SEARCH_ITEMS':
            const value = action.value.toLowerCase().trim()
            const serchedItems = []
            Object.keys(state.averyProductsList).forEach((category) => {
                state.averyProductsList[category].forEach((item) =>
                    item.title.toLowerCase().trim().indexOf(value) > -1
                        ? serchedItems.push(item)
                        : null
                )
                return serchedItems
            })

            return {
                ...state,
                update: true,
                filterProductsList: serchedItems,
            }
        case 'ADD_TO_STOP_LIST':
            const { category, title } = action.params
            const updateItems = { ...state.averyProductsList }
            updateItems[category].forEach((item) => {
                if (item.title === title) {
                    item.stopList = !item.stopList
                }
            })
            return {
                ...state,
                averyProductsList: updateItems,
            }

        case 'LOGIN':
            return {
                ...state,
                token: action.token,
            }
        case 'OPEN_SIDE_BARS':
            return {
                ...state,
                openSideBars: !state.openSideBars,
            }
        default:
            return state
    }
}
