const initialState = {
    category: {
        salad: 'Салаты',
        soup: 'Супы',
        vegetables: 'Овощи',
        meat: 'Мясные блюда',
        fish: 'Моремпродукты',
        tofu: 'Тофу',
        rice: 'Рис',
        noodles: 'Лапша',
    },
    products: [],
    error: false,
    loading: true,
}

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                products: action.payload,

                loading: false,
            }
        case 'MENU_ERROR':
            return {
                ...state,
                products: state.products,
                error: true,
            }
        case 'MENU_REQUEST':
            return {
                ...state,
                products: state.products,
                loading: true,
            }

        case 'DEC':
            const index = state.products.findIndex((item) => {
                return item.id === action.payload
            })
            const oldItem = state.products[index]

            if (oldItem.count > 1) {
                const price = oldItem.price - oldItem.totalPrice
                const newItem = {
                    ...oldItem,
                    price: price,
                    count: oldItem.count - 1,
                }
                const newState = [
                    ...state.products.slice(0, index),
                    newItem,
                    ...state.products.slice(index + 1),
                ]
                return {
                    ...state,
                    products: newState,
                }
            }
            return {
                ...state,
            }

        case 'INC':
            const i = state.products.findIndex((item) => {
                return item.id === action.payload
            })
            const item = state.products[i]
            const price = item.price + item.totalPrice
            const newItem = {
                ...item,
                price: price,
                count: item.count + 1,
            }
            const newState = [
                ...state.products.slice(0, i),
                newItem,
                ...state.products.slice(i + 1),
            ]
            return {
                ...state,
                products: newState,
            }

        default:
            return state
    }
}
