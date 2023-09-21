import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='my-5 text-center'>
       <h1 className='py-5 px-1'> WELCOME TO DRAG AND DROP IMAGE GALLERY </h1>

       <div>
        <Link to='/signup'><button className='btn btn-primary'>Get started</button></Link>
       </div>
    </div>
  )
}

export default Home