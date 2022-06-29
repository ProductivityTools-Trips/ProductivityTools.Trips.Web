import { useEffect, useState } from 'react'
import service from '../../services/apiService'

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
                {trips && trips.map(x => {
                    return (
                        <tr>
                            <td>{x.name}</td>
                        </tr>)
                })}

            </table>
        </div>
    )
}

export default TripList