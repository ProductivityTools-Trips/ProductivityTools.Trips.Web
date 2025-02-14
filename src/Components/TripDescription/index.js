import React, { useContext, useEffect, useState } from 'react'
import service from '../../services/apiService'
import { useParams, Link } from "react-router-dom";


function TripDescription() {
    let params = useParams();
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const r = await service.getTrip(params.id);
            setTrip(r);
        }
        fetchData();
    }, [])
  
  return(
    <div>
        <p>trip description:</p>
        <p>{trip && trip.description}</p>
        <p>trip learnings:</p>
        <p>{trip && trip.learnings}</p>
    </div>
  )
}

export default TripDescription;