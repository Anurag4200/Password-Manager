import React from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import { Toaster } from 'react-hot-toast'


const App = () => {
  return (
    <>
    <Navbar/>
    <div>
    <Manager/>
    <Toaster/>
    </div>
    
    
    </>
  )
}

export default App