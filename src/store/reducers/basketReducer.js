const initialState = {
    basket: [],
    openBasket: false,
    openOrderingWindow: false,
    order: {
        name: '',
        numberOfPhone: '',
        address: '',
        payCard: false,
        payCash: false,
        comment: '',
        change: '',
        cost: null,
        successfull: false,
        clearForm: false,
        productList: [],
    },
}

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            const newBasket = [...state.basket]
            const newProduct = { ...action.payload }
            const productIndex = newBasket
                .map((item) => item.id)
                .indexOf(action.payload.id)

            if (productIndex === -1) {
                newBasket.push(newProduct)
            } else {
                newBasket[productIndex].count += newProduct.count
                newBasket[productIndex].price =
                    newBasket[productIndex].totalPrice *
                    newBasket[productIndex].count
            }

            return {
                ...state,
                basket: newBasket,
            }
        case 'DELETE':
            const basket = [
                ...state.basket.slice(0, action.payload),
                ...state.basket.slice(action.payload + 1),
            ]
            return {
                ...state,
                basket,
            }
        case 'CLEAR_BASKET':
            return {
                ...state,
                basket: [],
            }
        case 'TOGGLE_BASKET':
            return {
                ...state,
                openBasket: !state.openBasket,
                openOrderingWindow: false,
            }

        case 'TO_ORDER_TOGGLE':
            return {
                ...state,
                openBasket: false,
                openOrderingWindow: !state.openOrderingWindow,
            }
        case 'CHANGE':
            const id = action.id
            const value = action.value
            return {
                ...state,
                order: {
                    ...state.order,
                    cost: state.basket.reduce(
                        (accumulator, value) => accumulator + value.price,
                        0
                    ),
                    productList: [...state.basket],
                    [id]: value,
                },
            }
        case 'PAY_CARD':
            return {
                ...state,
                order: {
                    ...state.order,
                    payCard: true,
                    payCash: false,
                },
            }
        case 'PAY_CASH':
            return {
                ...state,
                order: {
                    ...state.order,
                    payCard: false,
                    payCash: true,
                },
            }
        case 'CHECKOUT':
            return {
                ...state,
                order: {
                    ...state.order,
                    clearForm: true,
                    successfull: true,
                },
            }
        case 'CLEAR_STATE':
            return {
                ...state,
                order: {
                    ...state.order,
                    name: '',
                    numberOfPhone: '',
                    address: '',
                    payCard: false,
                    payCash: false,
                    comment: '',
                    change: '',
                    cost: null,
                    successfull: false,
                    clearForm: false,
                },
                basket: [],
                openBasket: false,
                openOrderingWindow: false,
            }

        default:
            return state
    }
}
