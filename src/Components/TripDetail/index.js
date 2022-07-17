import { Link, useParams } from "react-router-dom";
import ExpenseList from "../ExpenseList";
import JournalList from "../JournalList";


function TripDetail() {

    let params = useParams();

    return (
        <div>
            <Link to={"/"}>Trip List</Link>
            <Link to={"/tripedit/" + params.id}>Edit this trip</Link>
            <Link to={"/expenseadd/?tripId=" + params.id}>AddExpense</Link>
            <Link to={"/journaladd/?tripId=" + params.id}>Add Notes</Link>
            <p>TripDetail</p>
            <ExpenseList></ExpenseList>
            <JournalList></JournalList>
        </div>)
}

export default TripDetail