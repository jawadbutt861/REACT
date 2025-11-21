import { useState } from "react";
import "./app.css"
function Practice() {


    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [todo,setTodo] = useState([]);
    
    const addTodo = (event)=>{
        event.preventDefault();

        todo.push({
            title : title,
            description:description
        })

        setTodo([...todo]);
    }

    const deleteTodo = (index)=>{
        todo.splice(index,1)
        setTodo([...todo])
    }

    const editTodo = (index)=>{
        const title = prompt("Enter Title"); 
        const description = prompt("Enter Description");
        todo.splice(index,1,{title,description}) 
        setTodo([...todo])
    }
  return (
    <>
      <div className="todo-app">
        <h1>Todo App</h1>
        
        <form className="todo-form" onSubmit={addTodo}>

          <input type="text" placeholder="Title" required value={title} onChange={(event)=>{setTitle(event.target.value)}}/>

          <textarea placeholder="Description" required value={description} onChange={(event)=>{setDescription(event.target.value)}} ></textarea>
          
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
  );
}
export default Practice;

