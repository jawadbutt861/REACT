/* eslint-disable no-unused-vars */
import React from 'react'
import { useForm } from "react-hook-form";

const App = () => {
  const { register, handleSubmit, watch, formState: { errors , isSubmitting} } = useForm();
  const delay = (d)=>{
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve()
      },d * 1000)
    })
  }
  const onSubmit = async data =>{
    await delay(2)
    console.log(data);
    
  }

  return (
    <>
    {isSubmitting && <div>Loading...</div>}
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder='Enter Name' {...register("username",{required : {value : true, message : "This Field is Required"} , minLength:{value : 3 , message : "Min length is 3"},maxLength : {value : 8, message:"Max length is 8"}})}/>
      {errors.username && <div>{errors.username.message}</div>}

      <br />
      <input type="password" placeholder='Enter Password' {...register("password",{required: {value : true,message: "This field is required"},minLength : {value : 8,message : "Min length is 8"},})}/>
      <br />
      <button type='Submit' value='Submit' disabled={isSubmitting}>Submit</button>
    </form>
    </>
  )
}

export default App