import { useEffect, useState } from 'react'
import service from '../../services/apiService'
import { useParams } from "react-router-dom";

function ExpenseList() {

    let params = useParams();
    const [expenses, setExpenses] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const r = await service.getExpenses(params.id);
            setExpenses(r);
        }
        fetchData();
    }, [])



    return (
        <div>
            <div>ExpenseList</div>
            <p>{expenses && expenses.map(x => x.name)}</p>
        </div>

    )
}

export default ExpenseList;