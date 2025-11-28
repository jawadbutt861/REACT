import { useEffect,useState } from "react"

function App(){
  const [count,setCount] = useState(0);

  useEffect(()=>{
    console.log("Component Mounted");
    // return console.log("Component Unmounted");
    
  },[count])
  return(
    <>
    <button onClick={()=>setCount(count + 1)}>+</button>
    <p>{count}</p>
    <button onClick={()=>setCount(count - 1)}>-</button>
    </>
  )
}

export default App