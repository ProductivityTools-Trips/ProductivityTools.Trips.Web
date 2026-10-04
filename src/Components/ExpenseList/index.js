import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import service from '../../services/apiService'
import BarChart from './barchart'
import { SortHeader, useSort } from '../Shared/Table'
import { fmtDate, fmtMoney, sortBy } from '../../utils/format'

const COLUMNS = [
    { key: 'expenseName', label: 'Name' },
    { key: 'date', label: 'Date' },
    { key: 'categoryName', label: 'Category' },
    { key: 'value', label: 'Value', numeric: true },
    { key: 'expensed', label: 'Expensed', numeric: true },
    { key: 'familyCost', label: 'Family', numeric: true },
    { key: 'friendsDebit', label: 'Friends', numeric: true, className: 'hide-sm' },
    { key: 'valuePln', label: 'Value PLN', numeric: true },
    { key: 'expensedInPln', label: 'Expensed PLN', numeric: true },
    { key: 'familyCostInPln', label: 'Family PLN', numeric: true, className: 'hide-sm' },
    { key: 'checked', label: 'Chart', sortable: false },
    { key: '_edit', label: '', sortable: false },
]

const SUM_KEYS = ['expensed', 'familyCost', 'friendsDebit', 'valuePln', 'expensedInPln', 'familyCostInPln']

function ExpenseList() {
    const { id } = useParams()
    const [expenses, setExpenses] = useState(null)
    const [sort, toggleSort] = useSort('date', 'desc', ['expenseName', 'categoryName'])

    useEffect(() => {
        service.getExpenseFullView(id).then(r => setExpenses(r.map(x => ({ ...x, checked: true }))))
    }, [id])

    const toggleChart = (expenseId) =>
        setExpenses(prev => prev.map(x => x.expenseId === expenseId ? { ...x, checked: !x.checked } : x))

    const toggleAll = (checked) => setExpenses(prev => prev.map(x => ({ ...x, checked })))

    const visible = useMemo(() => expenses ? sortBy(expenses, sort.key, sort.dir) : null, [expenses, sort])

    const totals = useMemo(() => {
        const t = Object.fromEntries(SUM_KEYS.map(k => [k, 0]))
        expenses?.filter(x => x.checked).forEach(x => SUM_KEYS.forEach(k => { t[k] += x[k] || 0 }))
        return t
    }, [expenses])

    const selectedCount = expenses?.filter(x => x.checked).length ?? 0
    const allChecked = !!expenses?.length && selectedCount === expenses.length

    return (
        <>
            <div className="section">
                <div className="section__head">
                    <h2 className="section__title">Expenses</h2>
                    <span className="section__meta">
                        {allChecked
                            ? `${expenses?.length ?? 0} items`
                            : `${selectedCount} of ${expenses?.length ?? 0} selected`}
                        {' · '}{fmtMoney(totals.expensedInPln)} PLN expensed
                    </span>
                </div>

                <div className="card card--scroll">
                    <table className="tbl tbl--dense">
                        <thead>
                            <tr>
                                {COLUMNS.map(c => c.key === 'checked' ? (
                                    <th key={c.key} title="Include in chart">
                                        <input
                                            type="checkbox"
                                            className="check"
                                            checked={allChecked}
                                            onChange={e => toggleAll(e.target.checked)}
                                        />
                                    </th>
                                ) : (
                                    <SortHeader key={c.key} col={c} sort={sort} onSort={toggleSort} />
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {visible?.map(x => (
                                <tr key={x.expenseId} title={`#${x.expenseId}`}>
                                    <td className="tbl__strong">{x.expenseName}</td>
                                    <td className="tbl__nowrap">{fmtDate(x.date)}</td>
                                    <td><span className="pill">{x.categoryName}</span></td>
                                    <td className="tbl__num">
                                        {fmtMoney(x.value)} <span className="tbl__muted">{x.currencyName}</span>
                                    </td>
                                    <td className="tbl__num">{fmtMoney(x.expensed)}</td>
                                    <td className="tbl__num">{fmtMoney(x.familyCost)}</td>
                                    <td className="tbl__num hide-sm">{fmtMoney(x.friendsDebit)}</td>
                                    <td className="tbl__num">{fmtMoney(x.valuePln)}</td>
                                    <td className="tbl__num">{fmtMoney(x.expensedInPln)}</td>
                                    <td className="tbl__num hide-sm">{fmtMoney(x.familyCostInPln)}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="check"
                                            checked={x.checked}
                                            onChange={() => toggleChart(x.expenseId)}
                                        />
                                    </td>
                                    <td className="tbl__num">
                                        <Link className="tbl__link" to={`/expenseedit/${x.expenseId}`}>Edit</Link>
                                    </td>
                                </tr>
                            ))}
                            {visible && visible.length === 0 && (
                                <tr><td colSpan={COLUMNS.length} className="tbl__empty">No expenses yet</td></tr>
                            )}
                        </tbody>
                        {!!expenses?.length && (
                            <tfoot>
                                <tr>
                                    <td colSpan={4}>{allChecked ? "Total" : `Total (${selectedCount} selected)`}</td>
                                    <td className="tbl__num">{fmtMoney(totals.expensed)}</td>
                                    <td className="tbl__num">{fmtMoney(totals.familyCost)}</td>
                                    <td className="tbl__num hide-sm">{fmtMoney(totals.friendsDebit)}</td>
                                    <td className="tbl__num">{fmtMoney(totals.valuePln)}</td>
                                    <td className="tbl__num">{fmtMoney(totals.expensedInPln)}</td>
                                    <td className="tbl__num hide-sm">{fmtMoney(totals.familyCostInPln)}</td>
                                    <td colSpan={2} />
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </div>
            </div>

            <BarChart expenses={expenses} />
        </>
    )
}

export default ExpenseList