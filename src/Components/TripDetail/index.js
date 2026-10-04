import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ExpenseList from '../ExpenseList'
import JournalList from '../JournalList'
import TripDescription from '../TripDescription'
import service from '../../services/apiService'
import { fmtRange } from '../../utils/format'

function TripDetail() {
    const { id } = useParams()
    const [trip, setTrip] = useState(null)

    useEffect(() => {
        service.getTrip(id).then(setTrip)
    }, [id])

    return (
        <section className="page">
            <header className="page__header">
                <div>
                    <Link className="page__back" to="/">← All trips</Link>
                    <h1 className="page__title">{trip?.name ?? '…'}</h1>
                    {trip && (
                        <p className="page__subtitle">
                            {fmtRange(trip.start, trip.end)}
                            {trip.days != null && <> · {trip.days} d · {trip.nights ?? '—'} n</>}
                            {trip.tripType && <> · {trip.tripType}</>}
                        </p>
                    )}
                </div>
                <div className="page__actions">
                    <Link className="btn btn--ghost" to={`/tripedit/${id}`}>Edit trip</Link>
                    <Link className="btn btn--ghost" to={`/journaladd/?tripId=${id}`}>Add notes</Link>
                    <Link className="btn btn--primary" to={`/expenseadd/?tripId=${id}`}>＋ Add expense</Link>
                </div>
            </header>

            <TripDescription trip={trip} />
            <ExpenseList />
            <JournalList />
        </section>
    )
}

export default TripDetail