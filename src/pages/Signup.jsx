import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { RiClose2Line } from 'react-icons/ri';
import Loading from '../components/Loading';
import '../styles/signup.css';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../components/Firebaseconfig';

const Signup = () => {
  const redirect = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const createUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (password.length < 6) {
        setErrors({ password: 'Password length must be at least 6 characters' });
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      redirect('/login');
      console.log(userCredential);
    } catch (error) {
      console.error(error.message);

      if (error.code === 'auth/email-already-in-use') {
        setErrors({ email: 'Email address is already registered' });
      } else {
        setErrors({ general: 'An error occurred during registration' });
      }

      setLoading(false);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <div className="bg container">
        <div className="hei pt-4 pt-md-5">
          <form onSubmit={createUser} className="text-center log form">

            <p className="px-2">Enter your email address to create an account on Image Gallery.</p>

            <div className="my-4">
              <label>Your Email Address</label> <br />
              <input
                type="email"
                required
                placeholder="Enter your email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                value={email}
              />
              {errors.email && <p className="error-message text-danger">{errors.email}</p>}
            </div>

            <div className="my-4">
              <label htmlFor="password">Password</label> <br />
              <input
                type="password"
                id="password"
                required
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                value={password}
              />
              {errors.password && <p className="error-message text-danger">{errors.password}</p>}
            </div>

            {errors.general && <p className="error-message text-danger">{errors.general}</p>}

            <button type="submit" className="btn btn-primary mb-3">
              {loading ? <Loading /> : 'Continue'}
            </button>

            <p className="pb-2">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
