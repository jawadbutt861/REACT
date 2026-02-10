import React from 'react'
import { useContext } from 'react'
import { counterContext } from '../context/context'

const Footer = () => {
    const value = useContext(counterContext)
  return (
    <>
        <div>Footer</div>
        <h1>Click to add count{value.count}</h1>
    </>
  )
}

export default Footer