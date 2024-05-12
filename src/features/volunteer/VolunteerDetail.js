import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

export const VolunteerDetail = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const volunteers = useSelector((state) => state.volunteers.volunteers )

    return(
        <div className="event-Main">
            <h2>Volunteer Details</h2>
            {
             volunteers.filter((event) => event._id === id ).map((item) =>
             <div className="event-list" key={item._id} >
                <p>Volunteer Name - {item.volunteerName}</p>
                <p>Skills - {item.skills} </p>
                <p>Area of Interest - {item.areaOfInterest} </p>
                <p>Volunteering in Events - {item.eventAssigned} </p>
                <p>Contact - {item.contactNumber} </p>
                <p>Volunteer available - {item.availability ? "Yes" : "No"} </p>
             </div>   
            )}
            <button className="button" onClick={() => navigate(-1) } >Back</button>
        </div>
    )
}