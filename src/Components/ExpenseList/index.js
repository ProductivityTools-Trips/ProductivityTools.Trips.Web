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
                        <th>Discount</th>
                        <th>Value after Discount</th>
                        <th>Pln</th>
                        <th>Pln after discount</th>
                        <th>Day in Pln</th>
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
                                <td>{x.discount}</td>
                                <td>{(x.valueAfterDiscount).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                <td>{(x.pln).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                <td>{(x.plnAfterDiscount).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                <td>{(x.dayInPln).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
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