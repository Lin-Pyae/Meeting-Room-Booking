import React from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className='navContainer'>
            <div className='pages'>
                <div className='page'>
                    <NavLink to={'/'}>Home</NavLink>
                </div>
                <div className='page'>
                    <NavLink to={'/booking'}>Booking</NavLink>
                </div>
                <div className='page'>
                    <NavLink to={'/meetingRoom'}>Meeting Rooms</NavLink>
                </div>
            </div>

            <div className='loginout'>
                <div className='loginoutBtn'>
                    Login
                </div>
            </div>

        </div>
    )
}

export default NavBar