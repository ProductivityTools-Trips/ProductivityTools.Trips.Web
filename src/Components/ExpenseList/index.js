import React, { useContext, useEffect, useState } from 'react'
import service from '../../services/apiService'
import { useParams, Link } from "react-router-dom";
import { CacheContext } from '../../session/CacheContext';
import moment from 'moment';
import BarChart from './barchart';

function ExpenseList() {

    let params = useParams();
    const [expenses, setExpenses] = useState(null)
    let cache = React.useContext(CacheContext);

    useEffect(() => {
        const fetchData = async () => {
            const r = await service.getExpenseFullView(params.id);
            r.map(x => {
                x.checked = true;
                return x;
            })
            setExpenses(r);
        }
        fetchData();
    }, [])

    console.log("cx");
    console.log(cache);

    const markExpenseForChart = (id, event) => {
        let newList = [...expenses]
        for (var i = 0; i < newList.length; i++) {
            if (newList[i].expenseId == id) {
                newList[i].checked = !newList[i].checked;
                console.log("checked chaned");
            }
        }
        setExpenses(newList);
        console.log("markExpenseForChart")
        console.log(id);
        console.log(event);
    }

    return (
        <div>
            <div>ExpenseList1</div>
            <div>
                {cache && cache.currencies && cache.currencies[0].name}
            </div>
            <table className="green right">
                <thead>
                    <tr>
                        <th>Expense Id</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Value</th>
                        <th>Currency</th>
                        <th>Expensed</th>
                        <th>FamilyCost</th>
                        <th>FriendsDebit</th>
                        <th>Value in Pln</th>
                        <th>Expensed din Pln</th>
                        {/* <th>Day value in Pln</th>
                        <th>Day expensed in Pln</th> */}
                        <th>Chart</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses && expenses.map(x => {
                        return (
                            <tr key={x.expenseId}>
                                <td>{x.expenseId}</td>
                                <td>{x.expenseName}</td>
                                <td>{moment(x.date).format('YYYY.MM.DD')}</td>
                                <td>{x.categoryName}</td>
                                <td>{x.value}</td>
                                <td>{x.currencyName}</td>
                                <td>{x.expensed}</td>
                                <td>{x.familyCost}</td>
                                <td>{x.friendsDebit}</td>
                                <td>{(x.valuePln).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                <td>{(x.expensedInPln).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                {/* <td>{(x.dayValueInPln).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                <td>{(x.dayExpensedInPln).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td> */}
                                <td><input name="fsda" type="checkbox" checked={x.checked} onChange={(e) => markExpenseForChart(x.expenseId, e)}></input></td>
                                <td><Link to={"/expenseedit/" + x.expenseId}>Edit expense</Link></td>
                            </tr>
                        )
                    })}

                    <tr>
                    <th>Expense Id</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Value</th>
                        <th>Currency</th>
                        <th>Expensed</th>
                        <th>FamilyCost</th>
                        <th>{expenses?.reduce((a,v) =>  a = a + v.friendsDebit , 0 )}</th>
                        <th>Value in Pln</th>
                        <th>Expensed din Pln</th>
                        {/* <th>Day value in Pln</th>
                        <th>Day expensed in Pln</th> */}
                        <th>Chart</th>
                    </tr>
                </tbody>
            </table>
            <BarChart expenses={expenses}></BarChart>
        </div>

    )
}

export default ExpenseList;