import { FaStar,FaAngleRight } from "react-icons/fa";
const Card = ({car}) =>{
    return (
        <>
        <div className="p-2">
            <img src={car.imageUrl} alt="" className="w-70 h-40 rounded-2xl"/>

            <h1 className="font-bold text-2xl font-sans m-2">{car.title}</h1>

            <h2 className="font-bold flex items-center gap-1 font-sans m-2"> {car.rating} <FaStar className="text-yellow-500 font-sans"/> <span className="font-normal text-gray-600 font-sans">({car.trips} trips)</span></h2>
            <div className="flex items-center gap-30 font-sans mt-12">
                <h2 className="bg-blue-200 text-blue-500 font-medium p-1 rounded-lg font-sans">Save ${car.discountPercentage}</h2>
                <h2 className="font-bold font-sans text-xl">${car.pricePerDay}/Day</h2>
            </div>
        </div>
        </>
    )
}

export default Card;