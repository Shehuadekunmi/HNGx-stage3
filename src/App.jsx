
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Draganddrop from './pages/Draganddrop'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
import Drop from './pages/Drop'



function App() {
 
  

  return (
    <>
        <Toaster/>

    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/drag' element={<Draganddrop/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/drop' element={<Drop/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
