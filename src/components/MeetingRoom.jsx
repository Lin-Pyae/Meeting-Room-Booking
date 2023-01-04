import React from 'react'
import './meetingRoom.css'

const MeetingRoom = () => {
    return (

        <div className='meetingRoomContainer'>
            <form >
                <fieldset>
                    <legend>Meeting Room</legend>

                    <div className='inputContainer'>
                        <p className='labels'>Room Name</p>
                        <input type="text" />
                    </div>

                    <div className='inputContainer'>
                        <p className='labels'>Location</p>
                        <input type="text" />
                    </div>

                    <div className='inputContainer'>
                        <p className='labels'>Capacity</p>
                        <select name="capacity">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>

                    <div className='inputContainer'>
                        <p className='labels'>Facilities</p>
                        <input type="checkbox" id='microphone' />
                        <label className='cLabels' htmlFor="microphone">Microphone</label>
                        <input type="checkbox" id='projector' />
                        <label className='cLabels' htmlFor="projector">Projector</label>
                        <input type="checkbox" id='aircon' />
                        <label className='cLabels' htmlFor="aircon">Aircon</label>
                    </div>
                </fieldset>
            </form>

        </div >
    )
}

export default MeetingRoom