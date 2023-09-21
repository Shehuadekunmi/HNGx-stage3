import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {RxCross2} from 'react-icons/rx'
import Loading from '../components/Loading'
import '../styles/signup.css'
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from '../components/Firebaseconfig'


const Signup = () => {
  const redirect = useNavigate()
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})


  const createUser = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if(password.length < 5){
            errors.password = 'password length must be greater than 6'
          }
        redirect('/login')

      console.log(user);
    } catch (error) {
      console.log(error.message);
      if(error.status=404){
        alert('password length must be greater than 6');
     }

    }

    setEmail('')
    setPassword('')
    setLoading(false)
  };

 

  return (
    <div>

<div className='bg container '>
     
     <div className='hei pt-4 pt-md-5'>
      <form onSubmit={createUser} className='text-center log  form' >
     <Link to='/'> <RxCross2 className='cross'/> </Link>


      <p className=' px-2'>Enter your email address to create an account on Image Gallery.</p>
       
        <div className='my-4'>
          <label>Your Email Address</label> <br />
          <input type="email"  required placeholder='enter your email'
         onChange={(event) => {
          setEmail(event.target.value);
        }}
        value={email}
          />
        </div>
        <div className='my-4'>
          <label htmlFor="password">Password</label> <br />
          <input type="password" id='password'  required
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
          />

        </div>
        <button type='submit'   className='btn btn-primary mb-3'>{loading ? <Loading/> : "Continue"}</button>
        <p className='pb-2'>Already have an account? <Link to={'/login'}>Sign In</Link></p>
      </form>
     
      </div>
    </div>
    </div>
  )
}

export default Signup