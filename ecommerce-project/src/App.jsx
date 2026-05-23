// import { useState } from 'react'
import { Route, Routes } from 'react-router'
import { HomePage } from './components/pages/HomePage' 
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/checkout" element={<div>Test checkout page</div>} />
    </Routes>
  )
}

export default App
