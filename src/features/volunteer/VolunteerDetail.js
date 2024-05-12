import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { deleteVolunteer } from "./volunteerSlice"

export const VolunteerDetail = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const volunteers = useSelector((state) => state.volunteers.volunteers )

    return(
        <div>
            <h2>V Detail</h2>
            {
             volunteers.filter((event) => event._id === id ).map((item) =>
             <div>
                {item.volunteerName} ||
                {item.availability ? "true" : "false"} ||
                {item.skills} ||
                {item.eventAssigned.join(" | ")}
                <button onClick={() => dispatch(deleteVolunteer(item._id)) } >Delete</button>
                <Link to={`/volunteers/update/${item._id}`} ><button>Edit</button></Link>
             </div>   
            )}
        </div>
    )
}