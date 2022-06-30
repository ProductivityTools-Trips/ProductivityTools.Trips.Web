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
                            <tr key={x.bagID}>
                                <td><Link to={"tripdetail/"+x.bagID}>{x.bagID}</Link></td>
                                <td>{x.name}</td>
                            </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TripList