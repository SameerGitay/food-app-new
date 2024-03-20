import './App.css';
import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap'
import Signup from './pages/Signup';
import { useReducer } from 'react';
import MyOrders from './pages/MyOrders';

const initialState = []

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      console.log("********************Before********************")
      console.log(state)
      console.log("********************Before********************")
      state = [...state, {
        id: action.id,
        name: action.name,
        description: action.description,
        quantity: action.quantity,
        portion: action.portion,
        totalPrice: action.totalPrice
      }]
      console.log("********************After********************")
      console.log(state)
      console.log("********************After********************")
      return state
    case 'REMOVE_FROM_CART':
      let newState = [...state]
      newState.splice(action.index, 1)
      return newState
    case 'UPDATE_CART':
      let updateState = [...state]
      updateState.find((cartItem, index) => {
        if (cartItem.id === action.id) {
          updateState[index] = {
            ...cartItem,
            quantity: parseInt(action.quantity) + parseInt(cartItem.quantity),
            totalPrice: parseInt(action.totalPrice) + parseInt(cartItem.totalPrice)
          }
        }
      })
      return updateState
    case 'DROP_CART':
      return []
    default:
      return state
  }
}

export const CartContext = React.createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <CartContext.Provider value={{ cartState: state, cartDispatch: dispatch }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/myorders" element={<MyOrders/>}/>
        </Routes>
      </Router>
    </CartContext.Provider>
  );
}

export default App;
