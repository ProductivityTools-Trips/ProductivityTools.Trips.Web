import { useEffect, useState } from 'react'
import service from '../../services/apiService'
import {Link} from 'react-router-dom'
import moment from 'moment';

function TripList() {


    const [trips, setTrips] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const r = await service.getTripsFullView();
            setTrips(r);
        }
        fetchData();
    }, [])

    return (
        <div>
        
            <p>Trip1s:</p>
            <table>
                <tbody>
                    <tr>
                        <th>TripId</th>
                        <th>Name</th>
                        <th>Days</th>
                        <th>Nights</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Cost</th>
                        <th>Expensed</th>
                    </tr>
                    {trips && trips.map(x => {
                        return (
                            <tr key={x.tripId}>
                                <td><Link to={"tripdetail/"+x.tripId}>{x.tripId}</Link></td>
                                <td>{x.name}</td>
                                <td>{x.days}</td>
                                <td>{x.nights}</td>
                                <td>{moment(x.start).format('YYYY.MM.DD')}</td>
                                <td>{moment(x.end).format('YYYY.MM.DD')}</td>
                                <td>{x.cost}</td>
                                <td>{x.expensed}</td>
                            </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TripList