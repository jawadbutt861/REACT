import React from 'react'
import { useContext } from 'react'
import { counterContext } from '../context/context'
const Button = () => {
    const value = useContext(counterContext)
  return (
    <>
    <button onClick={() => value.setCount((count) => count + 1)}>{value.count}</button>
    </>
  )
}

export default Button