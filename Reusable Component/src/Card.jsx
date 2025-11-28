import "./index.css"
function Card(props){
    return(
        <>
        <div className="card">
            <img src={props.image} alt="Product Image" className="card-image"></img>
        <div className="card-content">
            <h2 className="name">{props.name}</h2>
            <p className="price">{props.price}</p>
            <p className="location">{props.location}</p>
            <div className="actions">
                <button className="favourite"><i className="fas fa-heart"></i></button>
                <button className="view-details">View Details</button>
            </div>
        </div>
    </div>
        </>
    )
}

export default Card