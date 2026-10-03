/**
 * Read-only description / learnings block for a trip.
 * Receives `trip` from TripDetail (no extra fetch); hidden when both fields are empty.
 */
function TripDescription({ trip }) {
    if (!trip) return null
    const hasAny = (trip.description && trip.description.trim()) || (trip.learnings && trip.learnings.trim())
    if (!hasAny) return null

    return (
        <div className="card card--pad">
            <div className="kv">
                {trip.description?.trim() && (
                    <div>
                        <p className="kv__label">Description</p>
                        <p className="kv__value">{trip.description}</p>
                    </div>
                )}
                {trip.learnings?.trim() && (
                    <div>
                        <p className="kv__label">Learnings</p>
                        <p className="kv__value">{trip.learnings}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TripDescription