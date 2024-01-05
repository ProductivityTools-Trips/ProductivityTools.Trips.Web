import { useEffect, useState, useContext } from 'react'
import { CacheContext } from '../../session/CacheContext';

import { useParams, useNavigate } from 'react-router-dom'
import service from '../../services/apiService';
import { Button, TextField } from "@mui/material";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function ExpenseEdit() {


    let params = useParams();
    const [expense, setExpense] = useState(null)
    const navigate = useNavigate();
    let cache = useContext(CacheContext);


    useEffect(() => {
        const fetchData = async () => {
            const r = await service.getExpense(params.id);
            setExpense(r);
        }
        fetchData();
    }, [params.id])

    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        setExpense(prevState => ({
            ...prevState, [name]: value
        }))
    }
    const save = async () => {
        await service.saveExpense(expense);
        tripDetails();
    }


    const tripDetails = () => {
        navigate('/tripdetail/' + expense.tripId, { replace: true })
    };

    const deleteRecord = () => {
        service.deleteExpense(params.id);
        tripDetails();
    }

    const changeCurrency = (e) => {
        console.log('change currency');
        console.log(e);
        setExpense(prevState => ({
            ...prevState, currencyId: e
        }))
    }

    const changeCategory = (e) => {
        console.log('change category')
        setExpense(prevState => ({
            ...prevState, categoryId: e
        }))
    }

    const defaultValue=(expense, value)=>{
        if (expense==undefined || value==undefined)
        {
            return ""
        }
        else
        {
            return value;
        }
    }

    return (
        <div>
            <p>Expense EditA</p>
            <p>TripDetail</p>
            <p>{expense && expense.tripId}</p>
            <p>{expense && expense.name}</p>
            <div><TextField label="Name" name='name'  value={(expense && expense?.name)|| ""} onChange={handleChange} fullWidth></TextField></div>
            <div><TextField label="Value" name='value' type='number' value={defaultValue(expense,expense?.value)} onChange={handleChange} fullWidth></TextField></div>
            <div><TextField label="Expensed" name='expensed' type='number' value={defaultValue(expense,expense?.expensed)} onChange={handleChange} fullWidth></TextField></div>
            <div><TextField label="FamilyCost" name='familyCost' type='number' value={defaultValue(expense,expense?.familyCost)} onChange={handleChange} fullWidth></TextField></div>
            <div><TextField label="FriendsDebit" name='friendsDebit' type='number' value={defaultValue(expense,expense?.friendsDebit)} onChange={handleChange} fullWidth></TextField></div>

            <p>{cache && cache.currencies && cache.currencies.length > 0 && cache.currencies[0].name}</p>
            
            {<p>Currencies:

                {cache && cache.currencies && cache.currencies.map(x => {
                    console.log("currency map")
                    console.log(x);
                    return (
                        <span key={x.currencyId}>
                            <input type="radio" value={x.name} onChange={() => changeCurrency(x.currencyId)} checked={expense && expense.currencyId === x.currencyId} name="currency"></input>{x.name}
                        </span>
                    )
                })}
            </p>}
            <p>
                Category:
                {cache && cache.categories && cache.categories.map(x => {
                    return (
                        <span key={x.categoryId}>
                            <input type="radio" value={x.name} onChange={() => changeCategory(x.categoryId)} checked={expense && expense.categoryId === x.categoryId} name='category'></input>{x.name}
                        </span>
                    )
                })}
            </p>
            <p>date</p>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    label="Date"
                    value={expense && expense.date}
                    onChange={(newValue) => {
                        console.log(newValue.format());
                        setExpense(prevState => ({
                            ...prevState, date: newValue.format('yyyy-MM-DD')
                        }));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <p>
                <Button variant="contained" onClick={save}>Save & Close</Button>
                <Button variant="outlined" onClick={deleteRecord}>Delete</Button>
                <Button variant="outlined" onClick={tripDetails}>Close</Button>
            </p>
        </div>)
}
export default ExpenseEdit;