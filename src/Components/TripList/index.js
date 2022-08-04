import { useEffect, useState } from 'react'
import service from '../../services/apiService'
import { Link } from 'react-router-dom'
import moment from 'moment';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


function TripList() {


    const [trips, setTrips] = useState(null);
    const [order, setOrder] = useState('asc');

    useEffect(() => {
        const fetchData = async () => {
            const r = await service.getTripsFullView();
            const sorted = r.sort((a, b) => (a.start > b.start ? -1 : 1))
            setTrips(sorted);
        }
        fetchData();
    }, [])

    const setSortedField = (field) => {

        if (order == 'asc') { setOrder('desc') } else { setOrder('asc') }

        const t1 = [...trips]
        debugger;
        const sorted = t1.sort((a, b) => {
            if (a[field] > b[field]) {
                return (order == 'asc' ? 1 : -1)

            }
            else {
                return (order == 'desc' ? 1 : -1)
            }
        })
        setTrips(sorted);
        console.log(trips);
    }



    return (
        <container>

            <p>Trip1s:</p>
            <p><Link to={"addtrip/"}>AddTrip</Link></p>
            <table className='green'>
                <tbody>
                    <tr>
                        <th><button onClick={() => setSortedField('name')}>Name</button></th>
                        <th><button onClick={() => setSortedField('start')}>Start</button></th>
                        <th><button onClick={() => setSortedField('end')}>End</button></th>
                        <th><button onClick={() => setSortedField('days')}>Days</button></th>
                        <th><button onClick={() => setSortedField('nights')}>Nights</button></th>
                        <th><button onClick={() => setSortedField('cost')}>Cost</button></th>
                        <th><button onClick={() => setSortedField('expensed')}>Expensed</button></th>
                    </tr>
                    {trips && trips.map(x => {
                        return (
                            <tr key={x.tripId}>
                                <td><Link to={"tripdetail/" + x.tripId}>{x.name}</Link></td>
                                <td>{moment(x.start).format('YYYY.MM.DD')}</td>
                                <td>{moment(x.end).format('YYYY.MM.DD')}</td>
                                <td>{x.days}</td>
                                <td>{x.nights}</td>
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