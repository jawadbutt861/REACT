import cars from "./cars.js"
import Card from "../components/card.jsx"
import Navbar from "../components/Navbar.jsx"
const Home = () =>{
    return (
        <>
         <Navbar />
        <div className="flex justify-center items-center flex-wrap gap-4">
        {
            cars.map((item)=>{
               return <Card key = {item.id} car = {item}/>
            })
        }
        </div>
        </>
    )
}
export default Home;