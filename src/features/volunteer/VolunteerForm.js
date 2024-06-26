import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addVolunteer, updateVolunteer } from "./volunteerSlice"
import { useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const VolunteerForm = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const events = useSelector((state) => state.events.events)

    const volunteers = useSelector((state) => state.volunteers.volunteers)
    const volunteer = volunteers.find((v) => v._id === id) 
    const [newVolunteer, setNewVolunteer] = useState({
    volunteerName: volunteer ? volunteer.volunteerName : "",
    contactNumber: volunteer ? volunteer.contactNumber : "",
    skills: volunteer ? volunteer.skills : "",
    availability: volunteer ? volunteer.availability : "",
    areaOfInterest: volunteer ? volunteer.areaOfInterest : "",
    eventAssigned: volunteer ? volunteer.eventAssigned : []
    })

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setNewVolunteer({...newVolunteer, [name]: value })
    }

    const handleChangeEvent = (e) => {
      newVolunteer.eventAssigned.includes(e.target.value) ?
      setNewVolunteer({...newVolunteer, eventAssigned: newVolunteer.eventAssigned.filter((event) => event !== e.target.value)}) :
      setNewVolunteer({...newVolunteer, eventAssigned: [...newVolunteer.eventAssigned, e.target.value] })
    }

    const handleSubmit = () => {
        if(!newVolunteer.volunteerName || !newVolunteer.contactNumber || !newVolunteer.skills || !newVolunteer.areaOfInterest){
            toast.warn("All fields are required")
        }
        else 
        {
            volunteer ? 
        dispatch(updateVolunteer({id: volunteer._id, updatedData: newVolunteer})) :
        dispatch(addVolunteer(newVolunteer))
        navigate("/volunteers")
        }
    }

    return(
        <div className="input-Main">
            <h2>Add New Volunteer</h2>
            <input className="input" type="text" name="volunteerName" value={newVolunteer.volunteerName} onChange={handleChange} placeholder="Full Name" autoComplete="off" />
            <input className="input" type="Number" name="contactNumber" value={newVolunteer.contactNumber} onChange={handleChange} placeholder="Contact Number" autoComplete="off" />
            <input className="input" type="text" name="skills" value={newVolunteer.skills} onChange={handleChange} placeholder="Skills" autoComplete="off" />
            <select className="input" name="availability" value={newVolunteer.availability} onChange={handleChange} autoComplete="off" >
               <option>Volunteer available</option>
               <option value= "true" >Yes</option>
               <option value= "false" >No</option>
            </select>
            <input className="input" type="text" name="areaOfInterest" value={newVolunteer.areaOfInterest} onChange={handleChange} placeholder="Area of Interest" autoComplete="off" />
            <p className="label" >Assign event below-</p>    
                {events.map((e) => 
                    <div className="eventInput" key={e._id}>
                    <input type="checkbox" name="eventAssigned" value={e.eventName} onChange={handleChangeEvent}  />
                    {e.eventName}
                    </div> 
                )}
            <button className="submit-btn" onClick={handleSubmit} >{ volunteer ? "Update Volunteer" : "Add New Volunteer"}</button>
            <ToastContainer autoClose={2000} />
        </div>
    )
}