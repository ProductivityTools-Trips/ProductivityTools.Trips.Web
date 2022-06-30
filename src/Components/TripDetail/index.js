import {Link, useParams } from "react-router-dom";


function TripDetail() {

    let params = useParams();

    return (
        <div>
            Edit:
            <Link to={"/tripedit/" + params.id}>{params.id}</Link>
            <p>TripDetail</p>
        </div>)
}

export default TripDetail