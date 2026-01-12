import { useDispatch,useSelector } from 'react-redux'
import { increment,decrement } from './config/redux/reducers/counterSlice'

function App() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

  return (
    <>
      <div>
      <button onClick={()=>dispatch(decrement())}>-</button>
      <h1>{count}</h1>
      <button onClick={()=>dispatch(increment())}>+</button>
      </div>
    </>
  )
}

export default App
