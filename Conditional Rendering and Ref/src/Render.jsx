import React from 'react'
import { useState } from 'react';

const Render = () => {
    const [show, setShow] = useState(true);
  return (
  <>
    <h1>Rendering in React</h1>
   {show &&  <h1>I Love You</h1>}
    <button onClick={()=>{setShow(!show)}}>Click Me</button>
  </>
  )
}

export default Render