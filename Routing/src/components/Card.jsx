import React from 'react'


const Card = ({title,description}) => {
    
  return (
    <>
    <div>

        <h1>{title} </h1>
        <h2>{description}</h2>
        <button>Click me</button>
    </div>
    </>
  )
}

export default Card