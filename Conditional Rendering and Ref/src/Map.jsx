import React from 'react'
import { useState } from 'react'

const Map = () => {
    // eslint-disable-next-line no-unused-vars
    const [Todo, setTodo] = useState([
        {
            id : 1,
            title : "Mystery of Astola"
        },
        {
            id : 2,
            title : "Laila Majnu"
        },
        {
            id : 3,
            title : "Horse and Donkey"
        }
    ])
  return (
    <>
    {Todo.map ((item,index)=>{
        <div key={index}>
            <h1>Title : {item.title}</h1>
            <h3>Id : {item.id}</h3>
        </div>
    })}
    </>
  )
}

export default Map