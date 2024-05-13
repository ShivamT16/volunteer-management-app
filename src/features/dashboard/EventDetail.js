import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

export const EventDetail = () => {
    const {eventName} = useParams()
    const events = useSelector((state) => state.events.events)
    const volunteers = useSelector((state) => state.volunteers.volunteers )
    
    return(
        <div className="event-Main">
            <h2>Event Details</h2>
            {events.filter((event) => event.eventName.includes(eventName)).map((item) => 
            <div className="event-list" key={item._id}>
                <p>Event Name - {item.eventName}</p> 
                <p>Description - {item.description}</p>
                <p>Date - {item.date.split("-").reverse().join("-")} </p>
                <p>Location - {item.location} </p>
                <p>Volunteer's Role - {item.volunteerRole}  </p>
                <p>Volunteer required - {item.requirement} </p>
            </div>
            )}
            <h2>Registered volunteers for this event- </h2>
            {
             volunteers.filter((event) => event.eventAssigned.includes(eventName)).map((item) =>
             <div className="event-List"  >
                <Link className="link" to={`/volunteerDetail/${item._id}`} >
                <p> Name - {item.volunteerName} , Skills - {item.skills} , Events - {item.eventAssigned.join(" | ")} -- <span style={{ color: item.availability ? "green" : "red"}} >{item.availability ? "Available" : "Not available"} </span> </p>
                </Link>
             </div>   
            )}
        </div>
    )
}