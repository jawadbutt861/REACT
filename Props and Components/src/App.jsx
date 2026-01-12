import React from 'react'
import Navbar from './components/Navbar'
import Card from './components/Card'
import Footer from './components/Footer'


const App = () => {
  return (
    <>
    <Navbar />
    <div style={{
        padding : "20px",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        flexWrap : "wrap",
        gap : "2rem"
    }}>
    
        <Card img = "https://img.freepik.com/free-photo/courage-man-jump-through-gap-hill-business-concept-idea_1323-262.jpg?semt=ais_hybrid&w=740&q=80" title = "car" description = "asdas ndsadj aidkas"/>
        <Card img = "https://img.freepik.com/free-photo/courage-man-jump-through-gap-hill-business-concept-idea_1323-262.jpg?semt=ais_hybrid&w=740&q=80" title = "car" description = "asdas ndsadj aidkas"/>
        <Card img = "https://img.freepik.com/free-photo/courage-man-jump-through-gap-hill-business-concept-idea_1323-262.jpg?semt=ais_hybrid&w=740&q=80" title = "car" description = "asdas ndsadj aidkas"/>
        <Card img = "https://img.freepik.com/free-photo/courage-man-jump-through-gap-hill-business-concept-idea_1323-262.jpg?semt=ais_hybrid&w=740&q=80" title = "car" description = "asdas ndsadj aidkas"/>
        <Card img = "https://img.freepik.com/free-photo/courage-man-jump-through-gap-hill-business-concept-idea_1323-262.jpg?semt=ais_hybrid&w=740&q=80" title = "car" description = "asdas ndsadj aidkas"/>
        </div>
    <Footer />
    </>
  )
}

export default App