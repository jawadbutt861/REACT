import React, { useRef } from 'react'

const App = () => {
  const ref = useRef();


  const handleInput = () =>{
    console.log(ref.current.value);
   
  }

  return (
    <>
      <input type="text" ref={ref}/>
      <button onClick={handleInput}>Click me</button>
    </>
  )
  
}
export default App