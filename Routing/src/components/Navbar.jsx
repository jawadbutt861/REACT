import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <div>
    <Link to = {'/'}>Home</Link>
    <Link to = {'About'}>About</Link>
    <Link to = {'Services'}>Services</Link>
    <Link to = {'Contact'}>Contact</Link>
    <Link to = {'Dashboard'}>Dashboard</Link>
    <Link to = {'Product/:id'}>Product</Link>

    </div>
  )
}

export default Navbar