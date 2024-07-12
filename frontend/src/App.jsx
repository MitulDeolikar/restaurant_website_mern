import './App.css'
import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Success from './pages/Success'
import NotFound from './pages/NotFound'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="*" element={<NotFound/>}/>
        
      </Routes>
      <Toaster 
      toastOptions={{
       
        style: {
          width: '500px', // Set the desired width
          
        },
        className:'react-hot-toast react-hot-toast-icon react-hot-toast-body'
      }} />
    </Router>
  )
}

export default App