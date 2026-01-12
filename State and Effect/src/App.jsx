import React from 'react'
import { useState,useEffect } from 'react'


const App = () => {

  const [count, setCount] = useState(0)
  useEffect(() => {
    alert("I run on every render")
  }, [])

  useEffect(()=>{
    alert("I will run on change in count")
  },[count])
  
  return (
    <>
    <button onClick={()=>setCount(count - 1)}>-</button>
    <h1>{count}</h1>
    <button onClick={()=>setCount(count + 1)}>+</button>
    </>
    
  )
}

export default App