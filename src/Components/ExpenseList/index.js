import React, { useContext, useEffect, useState } from 'react'
import service from '../../services/apiService'
import { useParams, Link } from "react-router-dom";
import { CacheContext } from '../../session/CacheContext';
import moment from 'moment';

function ExpenseList() {

    let params = useParams();
    const [expenses, setExpenses] = useState(null)
    let cache = React.useContext(CacheContext);

    useEffect(() => {
        const fetchData = async () => {
            const r = await service.getExpenseFullView(params.id);
            setExpenses(r);
        }
        fetchData();
    }, [])

    console.log("cx");
    console.log(cache);

    // const getCategoryName=(id)=>{
    //     if (cache && cache.categories){
    //         let val=cache.categories.find(x=>x.categoryId==id);
    //         return val.name;
    //     }
    //     else
    //     {
    //         return id;
    //     }
    // }

    // const getCurrencyName=(id)=>{
    //     if (cache && cache.currencies){
    //         let val=cache.currencies.find(x=>x.currencyId==id);
    //         return val.name;
    //     }
    //     else
    //     {
    //         return id;
    //     }
    // }


    return (
        <div>
            <div>ExpenseList1</div>
            <div>
                {cache && cache.currencies && cache.currencies[0].name}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Expense Id</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Value</th>
                        <th>Currency</th>
                        <th>Expensed</th>
                        <th>Value in Pln</th>
                        <th>Expensed din Pln</th>
                        <th>Day value in Pln</th>
                        <th>Day expensed in Pln</th>
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
                                <td>{(x.valuePln).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                <td>{(x.expensedInPln).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                <td>{(x.dayValueInPln).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                <td>{(x.dayExpensedInPln).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
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