import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import '../styles/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../components/Firebaseconfig';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const redirect = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      redirect('/drop');
      console.log(userCredential);
    } catch (error) {
      console.error(error.message);
      if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please check your password.');
      } else if (error.code === 'auth/user-not-found') {
        setError('Invalid email address. Please check your email.');
      } else {
        setError('An error occurred while logging in. Please try again later.');
      }
    } finally {
      setLoading(true);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="bg container">
      <div className="hei py-5">
        <form className="text-center py-5 log form">
          
          <div className="my-4">
            <label htmlFor="email">Email</label> <br />
            <input
              type="email"
              id="email"
              required
              onChange={(event) => {
                setEmail(event.target.value);
                setError(null); 
              }}
            />
          </div>
          <div className="my-4">
            <label htmlFor="password">Password</label> <br />
            <input
              type="password"
              id="password"
              required
              onChange={(event) => {
                setPassword(event.target.value);
                setError(null); 
              }}
            />
          </div>
          {error && <p className="error text-danger">{error}</p>}

          <button type="submit" onClick={login} className="btn btn-primary">
            {loading ? <Loading /> : 'Continue'}
          </button>
          <p className="pt-3">
            No account? <Link to={'/signup'}>Sign Up</Link>{' '}
          </p>
          <h4> User Logged In: </h4>
          {user?.email}
          <br />
          <button className="btn btn-secondary" onClick={logout}>
            {' '}
            Sign Out{' '}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
