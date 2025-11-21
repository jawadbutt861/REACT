import { useRef,useState } from "react"
import "./app.css"


function App(){
  
  let title = useRef();
  let description = useRef();
  let [todo,setTodo] = useState([])

  const addTodo = (event) =>{

    event.preventDefault();
    console.log(title.current.value);
    console.log(description.current.value);
    todo.push({
      title : title.current.value,
      description : description.current.value
    })
    setTodo([...todo])
  }

  const deleteTodo = (index)=>{
    todo.splice(index,1)
    setTodo([...todo])
  }

  const editTodo = (index) =>{
    let title = prompt("Enter Title");
    let description = prompt("Enter Description");
    
    todo.splice(index,1,{title,description})
    setTodo([...todo])


  }
  return(
    <>
    <div className="todo-app">
  <h1>Todo App</h1>
  <form className="todo-form" onSubmit={addTodo}>
    <input type="text" placeholder="Title" required ref = {title}/>
    <textarea placeholder="Description" required ref = {description}></textarea>
    <button type="submit">Submit</button>
  </form>
  <ul className="todo-list">
   {
    todo.map((item,index)=>{
      return <li key={index} className="todo-item">
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
      <div>
        <button onClick={()=>{editTodo(index)}}>Edit</button>
        <button onClick={()=>{deleteTodo(index)}}>Delete</button>
      </div>
    </li>
    })
   }
  </ul>
</div>
    </>
  )
}

export default App