import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addVolunteer, updateVolunteer } from "./volunteerSlice"
import { useParams } from "react-router-dom"

export const VolunteerForm = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const volunteers = useSelector((state) => state.volunteers.volunteers)
    const volunteer = volunteers.find((v) => v._id === id) 
    const [newVolunteer, setNewVolunteer] = useState({
    volunteerName: volunteer ? volunteer.volunteerName : "",
    contactNumber: volunteer ? volunteer.contactNumber : "",
    skills: volunteer ? volunteer.skills : "",
    availability: volunteer ? volunteer.availability : "",
    areaOfInterest: volunteer ? volunteer.areaOfInterest : "",
    })

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setNewVolunteer({...newVolunteer, [name]: value })
    }

    const handleSubmit = () => {
        volunteer ? 
        dispatch(updateVolunteer({id: volunteer._id, updatedData: newVolunteer})) :
        dispatch(addVolunteer(newVolunteer))
    }

    return(
        <div>
            <input type="text" name="volunteerName" value={newVolunteer.volunteerName} onChange={handleChange} placeholder="Full Name" autoComplete="off" />
            <input type="Number" name="contactNumber" value={newVolunteer.contactNumber} onChange={handleChange} placeholder="Contact Number" autoComplete="off" />
            <input type="text" name="skills" value={newVolunteer.skills} onChange={handleChange} placeholder="Skills" autoComplete="off" />
            <select name="availability" value={newVolunteer.availability} onChange={handleChange} autoComplete="off" >
               <option>Availability</option>
               <option value= "true" >Yes</option>
               <option value= "false" >No</option>
            </select>
            <input type="text" name="areaOfInterest" value={newVolunteer.areaOfInterest} onChange={handleChange} placeholder="Area of Interest" autoComplete="off" />
    
            <button onClick={handleSubmit} >{ volunteer ? "Update Volunteer" : "Add New Volunteer"}</button>
        </div>
    )
}