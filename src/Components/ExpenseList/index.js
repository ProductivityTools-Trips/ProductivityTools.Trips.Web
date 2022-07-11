import React, { useContext, useEffect, useState } from 'react'
import service from '../../services/apiService'
import { useParams, Link } from "react-router-dom";
import { CacheContext } from '../../session/CacheContext';

function ExpenseList() {

    let params = useParams();
    const [expenses, setExpenses] = useState(null)
    let cx = React.useContext(CacheContext);

    useEffect(() => {
        const fetchData = async () => {
            const r = await service.getExpenses(params.id);
            setExpenses(r);
        }
        fetchData();
    }, [])

    console.log("cx");
    console.log(cx);


    return (
        <div>
            <div>ExpenseList1</div>
            <div>
                {cx && cx.currencies && cx.currencies[0].name}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Value</th>
                        <th>Discount</th>
                        <th>Value after Discount</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses && expenses.map(x => {
                        return (
                            <tr key={x.expenseId}>
                                <td>{x.name}</td>
                                <td>{x.date}</td>
                                <td>{x.value}</td>

                                <td>{x.discount}</td>
                                <td>{x.valueAfterDiscount}</td>
                                <td><Link to={"/expenseedit/" + x.expenseId}>Edit expense</Link></td>
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