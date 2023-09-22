import React, { useState } from 'react'
import logo from '../assets/images.png'
import SearchBar from './Searchbar'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from './Firebaseconfig'


const Header = () => {
const redirect = useNavigate()

const logout = () =>{
  signOut(auth)
  .then(() =>{
    redirect('/')
  })
  .catch((error) => {
    console.log('logout failed', error);
  });
};
 
  return (
    <div className='d-fle text-center  search'>
      <div className='log mx-2'> <Link to={'/'}><img src={logo} alt="" /> </Link>  </div>
       <div> <SearchBar /> </div>
      <div className='btt'> <button onClick={logout} className='btn btn-primary mx-2'> Logout</button></div>
    </div>
  )
}

export default Header