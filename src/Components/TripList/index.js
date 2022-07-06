import { useEffect, useState } from 'react'
import service from '../../services/apiService'
import {Link} from 'react-router-dom'

function TripList() {


    const [trips, setTrips] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const r = await service.getTrips();
            setTrips(r);
        }
        fetchData();
    }, [])

    return (
        <div>
        
            <p>Trips:</p>
            <table>
                <tbody>
                    {trips && trips.map(x => {
                        return (
                            <tr key={x.tripId}>
                                <td><Link to={"tripdetail/"+x.tripId}>{x.tripId}</Link></td>
                                <td>{x.name}</td>
                            </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TripList