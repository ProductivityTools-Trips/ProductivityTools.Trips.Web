import { useEffect, useState, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import service from '../../services/apiService';
import { Button, TextField } from "@mui/material";

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
        tripDetails();
    }


    const tripDetails = () => {
        navigate('/tripdetail/' + expense.tripId, { replace: true })
    };

    const deleteRecord=()=>{
        service.deleteExpense(params.id);
        tripDetails();
    }

    return (
        <div>
            <p>Expense EditA</p>
            <p>TripDetail</p>
            <p>{expense && expense.tripId}</p>
            <p>{expense && expense.name}</p>
            <div><TextField label="name" name='name' multiline value={expense && expense.name || ""} onChange={handleChange} fullWidth></TextField></div>
            <input type='edit' name='name' value={expense && expense.name || ""} onChange={handleChange}></input>
            <Button variant="contained" onClick={save}>Save & Close</Button>
            <Button variant="outlined" onClick={deleteRecord}>Delete</Button>
            <Button variant="outlined" onClick={tripDetails}>Close</Button>
        </div>)
}
export default ExpenseEdit;