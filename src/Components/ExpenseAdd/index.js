import { useEffect, useState } from 'react'
import service from '../../services/apiService';

function ExpenseAdd() {

    const [expense, setExpense] = useState(null)
    const [currencies, setCurrencies] = useState([]);

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
        const fetchData = async () => {
            const r = await service.getCurrencyDictionary();
            setCurrencies(r);
            console.log(r);
        };
        fetchData();
    }, [])


    return (
        <div>
            <p>Add</p>
            <p><span>Expense Name: </span><span>{expense && expense.name}</span></p>
            <p><span>Expense value: </span><span>{expense && expense.value}</span></p>
            <p><span>Discount value: </span><span>{expense && expense.discount}</span></p>

            <p>Name:<input type='edit' name='name' value={expense && expense.name || ""} onChange={handleChange}></input></p>
            <p>Value:<input type='edit' name='value' value={expense && expense.value || ""} onChange={handleChange}></input></p>
            <p>Discount: :<input type='edit' name='discount' value={expense && expense.discount || ""} onChange={handleChange}></input></p>
            <p>{currencies && currencies[0].name}</p>
            <p>Currencies:
                {currencies && currencies.map(x => {
                    return (<span>{x.name}</span>)
                })}
            </p>
        </div>
    )
}

export default ExpenseAdd;