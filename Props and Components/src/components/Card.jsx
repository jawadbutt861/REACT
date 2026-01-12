import React from 'react'
import './Card.css'

const Card = (props) => {
  return (
   <>
   <div className='card'>
    <img src={props.img} alt="" className='img'/>
    <h3>{props.title}</h3>
    <p>{props.description}</p>
   </div>
   </>
  )
}

export default Card