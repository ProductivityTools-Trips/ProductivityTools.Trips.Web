import { useEffect, useState, useContext } from 'react'
import { CacheContext } from '../../session/CacheContext';
import service from '../../services/apiService';
import { useSearchParams, useNavigate } from 'react-router-dom'

import { Button, TextField } from "@mui/material";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';


function ExpenseAdd() {


    const [searchParams, setSearchParams] = useSearchParams();
    const tripId = parseInt(searchParams.get("tripId"));
    const navigate = useNavigate();
    let cache = useContext(CacheContext);
    let cdate=moment().format();
    const [expense, setExpense] = useState({ currencyId: 1, categoryId: 1, tripId: tripId, date: cdate })
    const [value, setValue] = useState(null);


    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        setExpense(prevState => ({
            ...prevState, [name]: value
        }))
    }

    useEffect(() => {

        const markPln = () => {
            console.log("cachecurrencies");
            console.log(cache.currencies);
            let pln = cache.currencies.find(x => x.name == 'PLN');
            setExpense(prevState => ({
                ...prevState, currencyId: pln.currencyId
            }))
        }

        const markFood = () => {
            let food = cache.categories.find(x => x.name == 'Food');
            setExpense(prevState => ({
                ...prevState, categoryId: food.categoryId
            }))
        }

        if (cache && cache.currencies) {
            console.log(cache)
            markPln();
        }

        if (cache && cache.categories) {
            console.log(cache)
            markFood();
        }
    }, [cache])

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

    const addExpense = async () => {
        await service.addExpense(expense);
        close();
    }

    const close = async () => {
        navigate('/tripdetail/' + expense.tripId, { replace: true })
    }

    return (
        <div>
            <p>Add</p>
            <p>Adding to trip: {tripId}</p>
            <p><span>Expense Name: </span><span>{expense && expense.name}</span></p>
            <p><span>Expense value: </span><span>{expense && expense.value}</span></p>
            <p><span>Discount value: </span><span>{expense && expense.discount}</span></p>
            <p><span>Date: </span><span>{expense && expense.date}</span></p>

            <p>Name:<input type='edit' name='name' value={expense && expense.name || ""} onChange={handleChange}></input></p>
            <p>Value:<input type='edit' name='value' value={expense && expense.value || ""} onChange={handleChange}></input></p>
            <p>Expensed: :<input type='edit' name='expensed' value={expense && expense.expensed || ""} onChange={handleChange}></input></p>
            <p>FamilyCost: <input type='edit' name='familyCost' value={expense && expense.familyCost || ""} onChange={handleChange}></input></p> 
            <p>{cache && cache.currencies && cache.currencies.length > 0 && cache.currencies[0].name}</p>
            {<p>Currencies:

                {cache && cache.currencies && cache.currencies.map(x => {
                    return (
                        <span key={x.currencyId}>
                            <input type="radio" value={x.name} onChange={() => changeCurrency(x.currencyId)} checked={expense.currencyId == x.currencyId} name="currency"></input>{x.name}
                        </span>
                    )
                })}
            </p>}
            <p>
                Category:
                {cache && cache.categories && cache.categories.map(x => {
                    return (
                        <span key={x.categoryId}>
                            <input type="radio" value={x.name} onChange={() => changeCategory(x.categoryId)} checked={expense.categoryId == x.categoryId} name='category'></input>{x.name}
                        </span>
                    )
                })}
            </p>
            <p>date</p>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    label="Date"
                    value={expense.date}
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
                <Button variant="contained" onClick={addExpense}>Save & Close</Button>
                <Button variant="outlined" onClick={close}>Close</Button>
            </p>
        </div>
    )
}

export default ExpenseAdd;