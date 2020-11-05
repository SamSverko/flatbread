import PropTypes from 'prop-types'
import React, { createContext, useReducer } from 'react'
import Reducer from './reducer'

const initialState = {
  bottomNavValue: 0,
}

export default function Store({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState)
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
}

Store.propTypes = {
  children: PropTypes.any,
}

export const Context = createContext(initialState)
