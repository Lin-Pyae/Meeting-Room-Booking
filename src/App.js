import React from 'react'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Booking from './components/Booking'
import MeetingRoom from './components/MeetingRoom'
import Err from './components/Err'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/booking' element={<Booking />}></Route>
        <Route path='/meetingRoom' element={<MeetingRoom />}></Route>
        <Route path='*' element={<Err />}></Route>
      </Routes>
    </Router>
  )
}

export default App