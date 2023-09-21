import React, { useState } from 'react'
import logo from '../assets/images.png'
import SearchBar from './Searchbar'
import { Link } from 'react-router-dom'


const Header = () => {

 
  return (
    <div className='d-fle text-center  search'>
      <div className='log mx-2'> <Link to={'/'}><img src={logo} alt="" /> </Link>  </div>
       <div > <SearchBar/> </div>
    </div>
  )
}

export default Header