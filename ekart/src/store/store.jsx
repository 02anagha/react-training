import { createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk';

const initialState = { items: [], value: 0 }
const cartReducer = (state = { items: [], value: 0 }, action) => {
    if (action.type === 'ADD_ITEM') {
        console.log(action)
        state.value = state.value + 1;
        const existingCartItemIndex = state.items.findIndex(
            (item) => item['itemId'] === action.item['itemId']
        );

        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === 'REMOVE_ITEM') {
        state.value = state.value - 1;
        const existingCartItemIndex = state.items.findIndex(
            (item) => item['itemId'] === action.item['itemId']
        );
        const existingCartItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items];

        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === 'CLEAR_CART') {
        state.value = 0;
        return { ...state, items: [] };
    }

    return state;
}

const store = createStore(cartReducer, applyMiddleware(thunk))

export default store

