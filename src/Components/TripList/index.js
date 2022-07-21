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



    const columns = [
        { field: 'name', headerName: 'Name', width: 150, renderCell:(params)=>(<Link to={"tripdetail/" + params.row.tripId}>{params.row.name}</Link>) },
        { field: 'days', headerName: 'Days', width: 100 },
        { field: 'nights', headerName: 'Nigths', width: 100 },
        { field: 'start', headerName: 'Start', width: 140, valueGetter: (params) => moment(params.row.start).format('YYYY.MM.DD') },
        { field: 'end', headerName: 'End', width: 140, valueGetter: (params) => moment(params.row.end).format('YYYY.MM.DD') },
        { field: 'cost', headerName: 'Cost', width: 100, valueGetter: (params) => Math.round(params.row.cost) },
        { field: 'expensed', headerName: 'Expensed', width: 100, valueGetter: (params) => Math.round(params.row.expensed) },
        // { field: 'firstName', headerName: 'First name', width: 130 },
        // { field: 'lastName', headerName: 'Last name', width: 130 },
        // {
        //     field: 'age',
        //     headerName: 'Age',
        //     type: 'number',
        //     width: 90,
        // },
        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     width: 160,
        //     valueGetter: (params) =>
        //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        // },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    return (
        <div>

            <p>Trip1s:</p>
            <p><Link to={"addtrip/"}>AddTrip</Link></p>
            {/* <table>
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
            </table> */}
            <div style={{ height: 1400, width: '100%' }}>
                {trips && <DataGrid
                    getRowId={(row) => row.tripId}
                    rows={trips}
                    columns={columns}
                    rowHeight={25}
                />}
            </div>
        </div>
    )
}

export default TripList