// import { useEffect, useState } from "react"

import { useEffect, useState } from "react"

// function App(){
//   const [user,setUser] = useState(null);
//   const [error,setError] = useState(false);
//   useEffect(()=>{
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then(res => res.json())
//     .then(res => {
//       setUser(res)
//     })
//     .catch(err =>{
//       console.log(err);
//       setError(true)
//     })

//   },[])
//   return(
//     <>
//     {user ? user.map(item =>{
//       return <h1>{item.name}</h1>
//     }) : error ? <h1>Error loading users</h1> :<h1>Loading.....</h1>}
//     </>
//   )
// }
// export default App


function App(){
  const [user,setUser] = useState(null);
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(res =>{
      setUser(res)
    })
    .catch(err =>{
      console.log(err);
      setError(true)
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])
  return(
    <>
    {loading && <h1>Loading...</h1>}
    {error && <h1>Error Occured while Loading Data</h1>}
    <ol>
    {user && user.map((item,index) =>{
      return <li key={index}>{item.name}</li>
     
    })}
    </ol>
    </>
    
  )
}

export default App