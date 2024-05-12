import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

export const EventDetail = () => {
    const {eventName} = useParams()
    const events = useSelector((state) => state.events.events)
    const volunteers = useSelector((state) => state.volunteers.volunteers )

    return(
        <div>
            <h2>Detail</h2>
            {events.filter((event) => event.eventName.includes(eventName)).map((item) => 
            <div key={item._id}>
                {item.eventName} || {item.location} || {item.description} || {item.requirement} Volunteer
            </div>
            )}
            <h3>Registered Volunteers for this event- </h3>
            {
             volunteers.filter((event) => event.eventAssigned.includes(eventName)).map((item) =>
             <div>
                <Link to={`/volunteerDetail/${item._id}`} >
                {item.volunteerName} ||
                {item.availability ? "true" : "false"} ||
                {item.skills} ||
                {item.eventAssigned.join(" | ")}
                </Link>
             </div>   
            )}
        </div>
    )
}