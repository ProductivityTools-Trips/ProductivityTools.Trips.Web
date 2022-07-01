import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import service from '../../services/apiService';

function ExpenseEdit() {


    let params = useParams();
    const [expense, setExpense] = useState(null)

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

    return (
    <div>
        <p>Expense EditA</p>
        <p>{expense && expense.name}</p>
        <input type='edit' name='name' value={expense && expense.name || ""} onChange={handleChange}></input> 
        <button onClick={save}>Save</button>
    </div>)
}
export default ExpenseEdit;