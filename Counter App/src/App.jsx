import { useState } from "react";
import "./app.css";
function App(){
  let [count , setCount] = useState(0);
  
  return(
    <>
    <div className="counter-container">
      <h1 className="counter-title">Counter App</h1>
      <h2 className="counter-display">{count}</h2>
      <div className="button-group">
        <button className="counter-button" onClick={() => setCount(count + 1)}>
          Increment
        </button>
        <button className="counter-button" onClick={() => setCount(count - 1)}>
          Decrement
        </button>
        <button className="counter-button reset" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
    </>
  )
}

export default App