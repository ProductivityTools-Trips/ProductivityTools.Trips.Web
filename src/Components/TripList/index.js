import { useEffect, useState } from 'react'
import service from '../../services/apiService'
import { Link } from 'react-router-dom'
import moment from 'moment';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


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
        <container>

            <p>Trip1s:</p>
            <p><Link to={"addtrip/"}>AddTrip</Link></p>
            <table>
                <tbody>
                    <tr>
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
                                <td><Link to={"tripdetail/" + x.tripId}>{x.name}</Link></td>
                                <td>{x.days}</td>
                                <td>{x.nights}</td>
                                <td>{moment(x.start).format('YYYY.MM.DD')}</td>
                                <td>{moment(x.end).format('YYYY.MM.DD')}</td>
                                <td>{x.cost && (x.cost).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                <td>{x.expensed && (x.expensed).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                            </tr>)
                    })}
                </tbody>
            </table>
    
        </container>
    )
}

export default TripList