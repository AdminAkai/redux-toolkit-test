import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: true
}

export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
    try {
        const resp = await axios(url)
        return resp.data
    } catch(err) {
        console.error(err, 'Failed to fetch data')
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: state => {
            state.cartItems = []
            state.amount = state.cartItems.length
        },
        removeItem: (state, { payload: itemId }) => {
            state.cartItems = state.cartItems.filter(item => item.id !== itemId)
            state.amount = state.cartItems.length
        },
        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find(item => item.id === payload.id)
            cartItem.amount = cartItem.amount + 1
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find(item => item.id === payload.id)
            cartItem.amount = cartItem.amount - 1
        },
        calculateTotals: state => {
            let amount = 0
            let total = 0
            state.cartItems.forEach(item => {
                amount += item.amount
                total += item.amount * item.price
            })
            state.amount = amount
            state.total = total
        }
    },
    extraReducers: {
        [getCartItems.pending]: state => {
            state.isLoading = true
        },
        [getCartItems.fulfilled]: (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload
        },
        [getCartItems.rejected]: state => {
            state.isLoading = false
        }
    }
})

// console.log(initialState)
export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions

export default cartSlice.reducer