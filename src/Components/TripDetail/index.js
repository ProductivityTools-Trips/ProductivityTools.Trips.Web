import { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import ExpenseList from "../ExpenseList";
import JournalList from "../JournalList";
import TripDescription from "../TripDescription"
import service from '../../services/apiService'



function TripDetail() {

    let params = useParams();
    // const [trip, setTrip] = useState(null);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const r = await service.getTrip(params.id);
    //         setTrip(r);
    //     }
    //     fetchData();
    // }, [])

    return (
        <div>
            <Link to={"/"}>Trip List</Link>
            <Link to={"/tripedit/" + params.id}>Edit this trip</Link>
            <Link to={"/expenseadd/?tripId=" + params.id}>AddExpense</Link>
            <Link to={"/journaladd/?tripId=" + params.id}>Add Notes</Link>
            <TripDescription></TripDescription>
            <ExpenseList></ExpenseList>
            <JournalList></JournalList>

        </div>)
}

export default TripDetail