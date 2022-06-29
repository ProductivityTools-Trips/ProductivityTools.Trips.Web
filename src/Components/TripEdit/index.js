
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import service from '../../services/apiService'



function TripEdit() {
    let params = useParams();

    const [trip, setTrip] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const r = await service.getTrip(params.id);
            setTrip(r);
        }
        fetchData();
    }, [])


    return (
        <div>
            <p>TripEdit</p>
            <p>{params.id}</p>
            <p>{trip && trip.name}</p>
        </div>
    )
}

export default TripEdit