import { useEffect, useState, useContext } from 'react'
import { CacheContext } from '../../session/CacheContext';
import service from '../../services/apiService';
import { useSearchParams, useNavigate } from 'react-router-dom'

function ExpenseAdd() {


    const [searchParams, setSearchParams] = useSearchParams();
    const tripId = parseInt(searchParams.get("tripId"));
    const navigate = useNavigate();
    let cache = useContext(CacheContext);

    const [expense, setExpense] = useState({ currencyId: 1, categoryId: 1, tripId: tripId, date: '2022-01-01' })
    // const [currencies, setCurrencies] = useState([]);
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

        const loadCurrencies = () => {
            //       setCurrencies(cache.currencies);
            console.log("cachecurrencies");
            console.log(cache.currencies);
            let pln = cache.currencies.find(x => x.name == 'PLN');
            setExpense(prevState => ({
                ...prevState, currencyId: pln.currencyId
            }))
        }
        // const fetchCurrencies = async () => {
        //     const r = await service.getCurrencyDictionary();
        //     setCurrencies(r);
        //     let pln = r.find(x => x.name == 'PLN');
        //     setExpense(prevState => ({
        //         ...prevState, currencyId: pln.currencyId
        //     }))
        //     console.log(r);
        // };

        const fetchCategories = async () => {
            const r = await service.getCategoryDictionary();
            setCategories(r);
            let food = r.find(x => x.name = 'Food');
            console.log(food);
            setExpense(prevState => ({
                ...prevState, categorIdy: food.categoryId
            }))
            console.log(r);
        }
        console.log("useeffect")
        if (cache) {
            loadCurrencies();
        }
        //fetchCurrencies();
        fetchCategories();
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
        navigate('/tripdetail/' + expense.tripId, { replace: true })
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
            <p>{cache && cache.currencies && cache.currencies.length > 0 && cache.currencies[0].name}</p>
            { <p>Currencies:

                {cache && cache.currencies && cache.currencies.map(x => {
                    return (
                        <span key={x.currencyId}>
                            <input type="radio" value={x.name} onChange={() => changeCurrency(x.currencyId)} checked={expense.currencyId == x.currencyId} name="currency"></input>{x.name}
                        </span>
                    )
                })}
            </p> }
            <p>
                Category:
                {categories && categories.map(x => {
                    return (
                        <span key={x.categoryId}>
                            <input type="radio" value={x.name} onChange={() => changeCategory(x.categoryId)} checked={expense.categoryId == x.categoryId} name='category'></input>{x.name}
                        </span>
                    )
                })}
            </p>
            <p>
                <input type="button" value="Add" onClick={addExpense}></input>
            </p>
        </div>
    )
}

export default ExpenseAdd;