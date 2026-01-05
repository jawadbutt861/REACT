import React from 'react'
import Card from '../components/Card'
import { useParams } from 'react-router'

const Product = () => {
    const {id} = useParams();
  return (
  <>
    <div>Products {id}</div>
    <Card title="Burger" description="lorem20"/>
    <Card title="Chicken" description="lorem30"/>
    <Card title="Pizza" description="lorem40"/>
    <Card title="Roll" description="lorem50"/>
    <Card title="Cold Drink" description="lorem60"/>
    <Card title="Pratha" description="lorem70"/>
    <Card title="Karahi" description="lorem80"/>
    <Card title="Nuggets" description="lorem90"/>
  </>
  )
}

export default Product