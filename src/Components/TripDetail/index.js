import { Link, useParams } from "react-router-dom";
import ExpenseList from "../ExpenseList";


function TripDetail() {

    let params = useParams();

    return (
        <div>
            <Link to={"/"}>Trip List</Link>
            <Link to={"/tripedit/" + params.id}>Edit this trip</Link>
            <Link to={"/expenseadd/"}>AddExpense</Link>
            <p>TripDetail</p>
            <ExpenseList></ExpenseList>
        </div>)
}

export default TripDetail