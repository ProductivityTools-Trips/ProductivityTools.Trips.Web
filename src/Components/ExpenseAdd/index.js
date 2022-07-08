import { useEffect, useState } from 'react'
import service from '../../services/apiService';
import {useSearchParams} from 'react-router-dom'

function ExpenseAdd() {


    const [searchParams, setSearchParams] = useSearchParams();
    const tripId=searchParams.get("tripId")



    const [expense, setExpense] = useState({ currency: 'PLN', category: 'Food' })
    const [currencies, setCurrencies] = useState([]);
    const [categories, setCategories] = useState([])

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
        const fetchCurrencies = async () => {
            const r = await service.getCurrencyDictionary();
            setCurrencies(r);
            console.log(r);
        };

        const fetchCategories = async () => {
            const r = await service.getCategoryDictionary();
            setCategories(r);
            console.log(r);
        }

        fetchCurrencies();
        fetchCategories();
    }, [])

    const changeCurrency = (e) => {
        console.log('change currency');
        console.log(e);
        setExpense(prevState => ({
            ...prevState, currency: e
        }))
    }

    const changeCategory = (e) => {
        console.log('change category')
        setExpense(prevState => ({
            ...prevState, category: e
        }))
    }

    return (
        <div>
            <p>Add</p>
            <p>Adding to trip: {tripId}</p>
            <p><span>Expense Name: </span><span>{expense && expense.name}</span></p>
            <p><span>Expense value: </span><span>{expense && expense.value}</span></p>
            <p><span>Discount value: </span><span>{expense && expense.discount}</span></p>

            <p>Name:<input type='edit' name='name' value={expense && expense.name || ""} onChange={handleChange}></input></p>
            <p>Value:<input type='edit' name='value' value={expense && expense.value || ""} onChange={handleChange}></input></p>
            <p>Discount: :<input type='edit' name='discount' value={expense && expense.discount || ""} onChange={handleChange}></input></p>
            <p>{currencies && currencies.length > 0 && currencies[0].name}</p>
            <p>Currencies:

                {currencies && currencies.map(x => {
                    return (
                        <span  key={x.currencyId}>
                            <input type="radio" value={x.name} onChange={() => changeCurrency(x.name)} checked={expense.currency == x.name} name="currency"></input>{x.name}
                        </span>
                    )
                })}
            </p>
            <p>
                Category:
                {categories && categories.map(x => {
                    return (
                        <span  key={x.categoryId}>
                            <input type="radio" value={x.name} onChange={() => changeCategory(x.name)} checked={expense.category == x.name} name='category'></input>{x.name}
                        </span>
                    )
                })}
            </p>
        </div>
    )
}

export default ExpenseAdd;