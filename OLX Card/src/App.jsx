import Card from "./Card.jsx";
function App(){
  return(
    <>
    <div className="container" style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "20px",
    }}>
    <Card image={"https://g-mart.pk/wp-content/uploads/Apple-iPhone-17-1.jpg"} name={"Iphone 17 Air"} price={"$999"} location={"Quetta"}/>

    <Card image={"https://motors-content-cdn.el.olx.com.pk/Artboardd_eh1_copy_7_f347aba4a3.jpg"} name={"Toyota,Civic 2025"} price={"$1000"} location={"Karachi"}/>

    <Card image={"https://easternhousing.com.pk/wp-content/uploads/2025/04/Top-5-Marla-House-Design-Ideas-2025.jpg"} name={"5 Marla House"} price={"$20000"} location={"Islamabad"}/>

    <Card image={"https://images.olx.com.pk/thumbnails/583363712-400x300.jpeg"} name={"Honda CD 125,2024"} price={"$2000"} location={"Lahore"}/>

    <Card image={"https://www.pakmobizone.pk/wp-content/uploads/2025/01/Samsung-Galaxy-S25-Ultra-Titanium-Gray-1.jpg"} name={"Samsung S25 Ultra"} price={"$5000"} location={"Peshawar"}/>
    </div>
    </>
  )
}

export default App