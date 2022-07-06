import { useEffect, useState } from 'react'
import service from '../../services/apiService'
import { useParams,Link } from "react-router-dom";

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
            
            <table>
                <tbody>
                    {expenses && expenses.map(x => {
                        return (
                            <tr>
                                <td>
                                    {x.name}
                                </td>
                                <td>
                                <Link to={"/expenseedit/" + x.expenseId}>Edit expense</Link>

                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <p></p>
        </div>

    )
}

export default ExpenseList;