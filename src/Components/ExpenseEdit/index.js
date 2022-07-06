import { useEffect, useState, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import service from '../../services/apiService';

function ExpenseEdit() {


    let params = useParams();
    const [expense, setExpense] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const r = await service.getExpense(params.id);
            setExpense(r);
        }
        fetchData();
    }, [])

    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        setExpense(prevState => ({
            ...prevState, [name]: value
        }))
    }
    const save = () => {
        service.saveExpense(expense);
    }


    const tripDetails = () => {
        navigate('/tripdetail/' + expense.tripId, { replace: true })
    };


    return (
        <div>
            <p>Expense EditA</p>
            <p>TripDetail</p>
            <p>{expense && expense.tripId}</p>
            <button onClick={tripDetails}>Back</button>
            <p>{expense && expense.name}</p>
            <input type='edit' name='name' value={expense && expense.name || ""} onChange={handleChange}></input>
            <button onClick={save}>Save</button>
        </div>)
}
export default ExpenseEdit;