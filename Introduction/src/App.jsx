import { useState } from "react";


function App(){
  let name = "Jawad";

  let [count, setCount] = useState(0);
 return(
  <>
  <h1>Hello Jawad</h1>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam praesentium consequatur cumque! Ex officiis dolore quas non commodi placeat itaque vero {name} sed error, nulla magnam expedita, veritatis, ad officia reprehenderit.</p>
  <button onClick={()=>setCount(count + 1)}>Click to +</button>
  <h1>Count : {count}</h1>
  <button onClick={()=>setCount(count - 1)}>Click to -</button>
  

  </>

 )
}

export default App

// <></> React Fragment
//Hook(useState)