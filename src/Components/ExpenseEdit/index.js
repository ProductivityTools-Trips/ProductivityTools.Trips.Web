import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import service from '../../services/apiService'
import ExpenseForm from '../ExpenseForm'

function ExpenseEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [expense, setExpense] = useState(null)
    const [trip, setTrip] = useState(null)

    useEffect(() => {
        service.getExpense(id).then(e => {
            setExpense(e)
            if (e?.tripId) service.getTrip(e.tripId).then(setTrip)
        })
    }, [id])

    const close = () => navigate(`/tripdetail/${expense.tripId}`, { replace: true })
    const save = async () => {
        await service.saveExpense(expense)
        close()
    }
    const remove = async () => {
        if (!window.confirm(`Delete "${expense.name || 'this expense'}"?`)) return
        await service.deleteExpense(id)
        close()
    }

    return (
        <section className="page">
            <header className="page__header">
                <div>
                    {expense && <Link className="page__back" to={`/tripdetail/${expense.tripId}`}>← {trip?.name ?? 'Trip'}</Link>}
                    <h1 className="page__title">Edit expense</h1>
                    <p className="page__subtitle">{expense?.name || '…'}</p>
                </div>
            </header>

            <ExpenseForm
                expense={expense}
                setExpense={setExpense}
                onSave={save}
                onClose={close}
                onDelete={remove}
                saveLabel="Save changes"
            />
        </section>
    )
}

export default ExpenseEdit