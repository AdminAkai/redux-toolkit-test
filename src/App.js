import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Navbar from "./app/components/Navbar";
import CartContainer from "./app/containers/CartContainer";
import Modal from './app/components/Modal';

import { calculateTotals, getCartItems } from './app/redux/reducers/cart'

function App() {
  const { cartItems, isLoading } = useSelector(state => state.cart)
  const { isOpen } = useSelector(state => state.modal)
  const dispatch = useDispatch()  

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems, dispatch])

  useEffect(() => {
    dispatch(getCartItems())
  }, [dispatch])

  if (isLoading) {
    return <div className='loading'>
      <h1>Loading...</h1>
    </div>
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  )
}
export default App;
