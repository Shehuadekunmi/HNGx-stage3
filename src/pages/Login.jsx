import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import {RxCross2} from 'react-icons/rx'
import '../styles/signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../components/Firebaseconfig'
import { ToastContainer, toast } from 'react-toastify'


const Login = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({})
    const redirect = useNavigate()


    useEffect(()=>{
      const unsubscribe =  onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return ()=>{
        unsubscribe()
      }
    }, [])
   

    const login = async (e) => {
      e.preventDefault()
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
  redirect('/drag')
  toast.success('Login successful')

        console.log(user);
      } catch (error) {
        console.log(error.message);
        toast.error('error occure while login please try agian')
        if(error.status=404){
          alert("invalid email");
       }
      }
    };
  
    const logout = async () => {
      await signOut(auth);
    };


  return (
    <div className="bg container">
    <div className='hei py-5'>
    <form  className="text-center   py-5 log form">
    <Link to='/'> <RxCross2 className='cross'/> </Link>
      <div  className='my-4'>
        <label htmlFor="email">Email</label> <br />
        <input
          type="email"
          id="email"
          required
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div  className='my-4'>
        <label htmlFor="password">Password</label> <br />
        <input
          type="password"
          id="password"
          required
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <button type="submit" onClick={login} className="btn btn-primary">{loading ? <Loading/> : "Continue"}</button>
      <p className="pt-3">No account? <Link to={'/signup'}>Sign Up</Link> </p>
      <h4> User Logged In: </h4>
      {user?.email}

      <button onClick={logout}> Sign Out </button>
    </form>
    </div>
  </div>
  )
}

export default Login