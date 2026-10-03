import { useEffect, useState, useContext } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { CacheContext } from '../../session/CacheContext'
import service from '../../services/apiService'
import ExpenseForm from '../ExpenseForm'

function ExpenseAdd() {
    const [searchParams] = useSearchParams()
    const tripId = parseInt(searchParams.get('tripId'))
    const navigate = useNavigate()
    const cache = useContext(CacheContext)

    const [trip, setTrip] = useState(null)
    const [expense, setExpense] = useState({
        tripId,
        currencyId: 1,
        categoryId: 1,
        date: moment().format('yyyy-MM-DD'),
    })

    useEffect(() => {
        service.getTrip(tripId).then(setTrip)
    }, [tripId])

    // Default to PLN / Food once dictionaries are loaded.
    useEffect(() => {
        const pln = cache?.currencies?.find(x => x.name === 'PLN')
        const food = cache?.categories?.find(x => x.name === 'Food')
        setExpense(prev => ({
            ...prev,
            ...(pln && { currencyId: pln.currencyId }),
            ...(food && { categoryId: food.categoryId }),
        }))
    }, [cache])

    const close = () => navigate(`/tripdetail/${tripId}`, { replace: true })
    const add = async () => {
        await service.addExpense(expense)
        close()
    }

    return (
        <section className="page">
            <header className="page__header">
                <div>
                    <Link className="page__back" to={`/tripdetail/${tripId}`}>← {trip?.name ?? 'Trip'}</Link>
                    <h1 className="page__title">Add expense</h1>
                    <p className="page__subtitle">New expense for {trip?.name ?? `trip #${tripId}`}</p>
                </div>
            </header>

            <ExpenseForm
                expense={expense}
                setExpense={setExpense}
                onSave={add}
                onClose={close}
                saveLabel="Add expense"
            />
        </section>
    )
}

export default ExpenseAdd
