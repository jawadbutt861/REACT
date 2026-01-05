import { useEffect,useState } from "react"
import Card from "./Card.jsx"

function App(){
  const [counter,setCounter] = useState(0);
  const [secondCounter,setSecondCounter] = useState(100);

  useEffect(()=>{
    console.log("Component Mounted");
    return () =>{
      console.log("Component Unmounted");
      
    }
    
  },[counter])
  return(
    <>
    <div>
    <Card image="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=" name="Eye" price="Not for Sale" location="Unknown"/>
    </div>
    <div>
    <button onClick={()=>setCounter(preVal => preVal + 1)}>+</button>
    <p>{counter}</p>
    <button onClick={()=>setCounter(preVal => preVal - 1)}>-</button>
    </div>
    <div>
    <button onClick={()=>setSecondCounter(preVal => preVal + 1)}>+</button>
    <p>{secondCounter}</p>
    <button onClick={()=>setSecondCounter(preVal => preVal - 1)}>-</button>
    </div>
    </>
  )
}

export default App